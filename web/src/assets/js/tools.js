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
    let { amount_info, full_name, currency: { symbol } } = data
    let title = `${full_name} - DonateCafe`
    let description = symbol === '¥' ? `${amount_info[0].label} - 我在 donate.cafe 接受比特币打赏` : `${amount_info[0].label} with Bitcoin on donate.cafe`
    document.getElementsByTagName('title')[0].innerText = title
    let metas = document.getElementsByTagName('meta')
    for (let i = 0, len = metas.length; i < len; i++) {
      let { name } = metas[i]
      if (name === 'description') {
        metas[i].content = description
        break
      }
    }
  },
  getUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}