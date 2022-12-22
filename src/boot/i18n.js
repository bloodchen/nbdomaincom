import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n';
import { tools } from 'src/utils/tools'

export default boot(async ({ app }) => {
  //await tools.init();
  const i18n = createI18n({
    legacy: false,
    locale: 'en-us',
    messages
  })

  // Set i18n instance on app
  app.use(i18n)
})

