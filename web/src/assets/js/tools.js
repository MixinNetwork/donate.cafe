export default {
  environment() {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.MixinContext) {
      return 'iOS'
    }
    if (window.MixinContext && window.MixinContext.getContext) {
      return 'Android'
    }
    return undefined
  },
  setTitleAndDescription(data) {
    let { amount_info, full_name } = data
    let titleContent = `${full_name} - DonateCafe`
    let descriptionContent = `${amount_info[0].label} for ${full_name} with donate.cafe`
    document.getElementsByTagName('title')[0].innerText = titleContent
    let metas = document.getElementsByTagName('meta')
    for (let i = 0, len = metas.length; i < len; i++) {
      let { name } = metas[i]
      if (name === 'description') {
        metas[i].content = descriptionContent
        break
      }
    }
  }
}