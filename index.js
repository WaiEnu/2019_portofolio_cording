new Vue({
  el:"#app",
  data: {
    current: 0,
    list: [
      {id: 0, label: 'All'},
      {id: 1, label: 'Ajax'},
      {id: 2, label: 'Bootstrap'},
      {id: 3, label: 'CSS'},
      {id: 4, label: 'JQuery'},
      {id: 5, label: 'Vuejs'},
      {id: 6, label: 'PHP'},
      {id: 7, label: 'Canvas'},
      {id: 8, label: 'python'},
      {id: 9, label: 'Reactjs'},
    ]
  },
  methods: {
    active: function(id) {
      return this.current == id
    },
    changeTab: function(id) {
      this.current = id
    },
    tab: function(id) {
      return this.current == 0 || this.current == id
    },
  }
})

