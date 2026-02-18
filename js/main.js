new Vue({
    el: '#app',
    data() {
        return {
            columns: [
                { title: "Новые", cards: [] },
                { title: "В процессе", cards: [] },
                { title: "Завершенные", cards: [] }
            ]
        }
    }
})
