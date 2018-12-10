import Options from '@interface/Option'
import Message from '@interface/Message'


interface Handlers {
    [key: string]: Function
}

class Event {

    private handlers: Handlers = {}

    constructor(private emitter: string) {
        chrome.runtime.onMessage.addListener((req, sender) => {
            if (req.to && req.to !== this.emitter) return
            let handler = this.handlers[req.name]
            handler && handler(req.data, sender)
        })
    }

    public emit(name: string, data?: object, options: Options = { to: null, tabId: null }) {
        let message: Message = {
            name,
            emitter: this.emitter,
            data,
            to: options.to
        }
        if (options.tabId) {
            return chrome.tabs.sendMessage(options.tabId, message)
        }
        chrome.runtime.sendMessage(message)
    }

    public on(name: string, callback: Function) {
        this.handlers[name] = callback
    }

}

export default Event
