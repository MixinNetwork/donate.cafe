import _toast from './Message.vue'
let timer;
const toast = {}
toast.install = vue => {
    const ToastCon = vue.extend(_toast)
    const ins = new ToastCon()
    ins.$mount(document.createElement('div'))
    document.body.appendChild(ins.$el)
    vue.prototype.$message = (msg, duration = 3000) => {
        clearTimeout(timer)
        ins.message = msg
        ins.type = 'success'
        ins.visible = true
        timer = setTimeout(() => {
            ins.visible = false
        }, duration)
    }
    vue.prototype.$message.success = (msg, duration = 3000) => {
        clearTimeout(timer)
        ins.message = msg
        ins.type = 'success'
        ins.visible = true
        timer = setTimeout(() => {
            ins.visible = false
        }, duration)
    }
    vue.prototype.$message.error = (msg, duration = 3000) => {
        clearTimeout(timer)
        ins.message = msg
        ins.type = 'warning'
        ins.visible = true
        timer = setTimeout(() => {
            ins.visible = false
        }, duration)
    }
}
export default toast
