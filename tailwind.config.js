module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],  theme: {
    extend: {
      colors: {
        primary: {
          'DEFAULT': '#EB5757',
          '200': '#d7b9b9',
          '400': '#CC4D4D',
          '600': '#C84B4B',
          '800': '#B54545'
        },
        secondary: {
          'DEFAULT': '#060E2C',
          '200': '#132F95',
          '400': '#0D2066',
          '600': '#0C1B53',
          '800': '#040A20'
        }
      },
      height: {
        '112': '28rem',
      }
    },
  },
  plugins: [],
  important: true,
}