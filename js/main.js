Vue.component('task-component', {
    props: ['task', 'disabled'],
    template: `
        <li>
            <label>
                <input type="checkbox" v-model="task.completed" :disabled="disabled" @change="$emit('task-updated')">
                {{ task.text }}
            </label>
        </li>
    `
})

Vue.component('card-component', {
    props: ['card', 'columnIndex', 'isBlocked'],
    template: `
        <div class="card">
            <h3>{{ card.title }}</h3>
            <ul>
                <task-component v-for="(task, idx) in card.tasks" :key="idx" :task="task" :disabled="isBlocked || !!card.completedAt" @task-updated="$emit('task-updated')"></task-component>
            </ul>
            <button v-if="!isBlocked && !card.completedAt && card.tasks.length < 5" @click="$emit('add-task', columnIndex, card.id)">Добавить пункт</button>
            <p v-if="card.completedAt" class="completed-time">Завершено: {{ card.completedAt }}</p>
        </div>
    `
})

new Vue({
    el: '#app',
    data() {
        return {
            columns: JSON.parse(localStorage.getItem('columns')) || [
                {
                    title: "Новые",
                    cards: [
                        { id: 1, title: "Card 1", tasks: [{ text: "Task 1", completed: false }] }
                    ]
                },
                { title: "В процессе", cards: [] },
                { title: "Завершенные", cards: [] }
            ]
        }
    },
    computed: {
        isFirstColumnBlocked() {
            return this.columns[1].cards.length >= 5
        }
    },
    methods: {
        addCard() {
            const title = prompt('Введите название карточки')
            if (!title) return

            const tasks = []
            for (let i = 0; i < 3; i++) {
                const text = prompt(`Введите задачу ${i + 1}`)
                if (!text) return
                tasks.push({ text, completed: false })
            }

            this.columns[0].cards.push({
                id: Date.now(),
                title,
                tasks,
                completedAt: null
            })
            this.saveData()
        },
        addTask(columnIndex, cardId) {
            const text = prompt('Введите задачу')
            if (!text) return

            const card = this.columns[columnIndex].cards.find(c => c.id === cardId)
            if (card && card.tasks.length < 5) {
                card.tasks.push({ text, completed: false })
                this.saveData()
            }
        },
        updateColumns(columnIndex, cardId) {
            const cardIdx = this.columns[columnIndex].cards.findIndex(c => c.id === cardId)
            const card = this.columns[columnIndex].cards[cardIdx]
            const tasks = card.tasks
            const completedTasks = tasks.filter(t => t.completed)
            const progress = completedTasks.length / tasks.length

            if (columnIndex === 0 && progress > 0.5 && this.columns[1].cards.length < 5) {
                this.moveCard(columnIndex, cardIdx, 1)
            } else if (progress === 1) {
                this.moveCard(columnIndex, cardIdx, 2)
            }
            this.saveData()
        },
        moveCard(fromIndex, cardIdx, toIndex) {
            const [card] = this.columns[fromIndex].cards.splice(cardIdx, 1)
            if (toIndex === 2) {
                card.completedAt = new Date().toLocaleString()
            }
            this.columns[toIndex].cards.push(card)
        },
        saveData() {
            localStorage.setItem('columns', JSON.stringify(this.columns))
        }
    }
})
