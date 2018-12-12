import Event from '@libs/Event'
import Counter from '@interface/Counter'

const $event = new Event('background')

$event.on('increase-counter', (data:Counter) => {
    let parsedJSON: any = JSON.parse(localStorage.getItem(data.id))
    let lastCount: number = parsedJSON ? parseInt(parsedJSON.counter) : 0
    localStorage.setItem(data.id, JSON.stringify({
        name: data.name,
        counter: (lastCount + 1)
    }))
})

chrome.tabs.onUpdated.addListener((id, info) => {
    if (info.status === 'complete') {
        $event.emit('page-load', null, {tabId: id})
    }
})
