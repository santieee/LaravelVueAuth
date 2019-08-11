import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light:    {
        primary: "#2196f3",
        secondary: "#009688",
        accent: "#ff9800",
        error: "#f44336",
        warning: "#ff5722",
        info: "#3f51b5",
        success: "#4caf50"
      },
      dark: {
        primary: "#FF6200",
        secondary: "#0C5CB2",
        accent: "#009688",
        error: "#f44336",
        warning: "#ff5722",
        info: "#ff9800",
        success:"#4caf50"
      }
    },
  },
  icons: {
    iconfont: 'mdi',
  }
})