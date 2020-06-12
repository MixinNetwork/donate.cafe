export default {
  environment() {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.MixinContext) {
      return 'iOS'
    }
    if (window.MixinContext && window.MixinContext.getContext) {
      return 'Android'
    }
    return undefined
  }
}