import Util from '@libs/Utils'
import Event from '@libs/Event'

import Counter from '@interface/Counter'

const $event = new Event('inject')

class Viewer {

    private video: HTMLVideoElement
    private videoDuration: number
    private isAsia: boolean
    private isAdRunning: boolean

    constructor() {
        this.video = <HTMLVideoElement>Util.select('.html5-main-video')
        if (!this.video.duration)
            this.video.addEventListener('loadedmetadata', () => this.initialize())
        else
            this.initialize()
    }

    private checkAd(): boolean {
        if (Util.select('.ytp-ad-texts')) {
            this.isAsia = true
            return true
        }

        if (Util.select('.videoAdUiAttribution')) {
            this.isAsia = false
            return true
        }

        return false
    }

    private handleAd(): void {
        let button = Util.select(this.isAsia ? '.ytp-ad-skip-button' : '.videoAdUiSkipButton')
        this.isAdRunning = true
        setTimeout(() => {
            if (button && this.videoDuration > 15) {
                Util.performClick(button)
            }
            setTimeout(() => {
                this.isAdRunning = false
            }, 2000)
        }, 10000)

    }

    public initialize(): void {
        this.videoDuration = this.video.duration
        if (this.checkAd()) {
            this.handleAd()
        }
        this.video.addEventListener('ended', () => {
            this.videoEnd()
        })
    }

    public videoEnd(): void {
        if (!this.isAdRunning) {
            let data: Counter = {
                id: (window.location.search).replace('?v=', ''),
                name: Util.select('title').innerText
            }
            $event.emit('increase-counter', data)
            location.reload(true)
        }
    }

}

new Viewer()
