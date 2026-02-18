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
