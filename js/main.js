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
    }
})
