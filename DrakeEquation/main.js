new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  name: "Drake",
  data() {
    return {
      r: 10,
      fp: 0.5,
      ne: 2,
      fl: 1,
      fi: 0.01,
      fc: 0.01,
      l: 10000,
      rd:3,
      drawer: false,
      rules: {
        required: (value) => (!!value) || "Required.",
        integer: (value) => {
          const pattern = /^([1-9]\d*|0)$/;
          return pattern.test(value) || "Invalid.";
        },
        decimal: (value) => {
          const pattern = /(^[0]$)|(0)(\.\d+)?|(^[1]$)$/;
          return pattern.test(value) || "Invalid.";
        },
      },
    };
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  computed: {
    result: function () {
      return Math.floor(
          this.r *
          this.fp *
          this.ne *
          this.fl *
          this.fi *
          this.fc *
          this.l *
          Math.pow( 10, this.rd )
        ) / Math.pow( 10, this.rd );
    },
  },
  methods: {
    reset: function () {
      this.r = 10;
      this.fp = 0.5;
      this.ne = 2;
      this.fl = 1;
      this.fi = 0.01;
      this.fc = 0.01;
      this.l = 10000;
    },
  },
});
