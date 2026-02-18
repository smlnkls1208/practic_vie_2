Vue.component('task-component', {
    props: ['task'],
    template: `
        <li>
            <label>
                <input type="checkbox" v-model="task.completed">
                {{ task.text }}
            </label>
        </li>
    `
})

Vue.component('card-component', {
    props: ['card', 'columnIndex'],
    template: `
        <div class="card">
            <h3>{{ card.title }}</h3>
            <ul>
                <task-component v-for="(task, idx) in card.tasks" :key="idx" :task="task"></task-component>
            </ul>
            <button @click="$emit('add-task', columnIndex, card.id)">Добавить пункт</button>
        </div>
    `
})

new Vue({
    el: '#app',
    data() {
        return {
            columns: [
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
    methods: {
        addTask(columnIndex, cardId) {
            const text = prompt('Введите задачу')
            if (!text) return

            const card = this.columns[columnIndex].cards.find(c => c.id === cardId)
            if (card && card.tasks.length < 5) {
                card.tasks.push({ text, completed: false })
            }
        }
    }
})
