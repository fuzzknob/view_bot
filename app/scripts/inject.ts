import Util from '@libs/Utils'

class Viewer {

    private video: HTMLVideoElement
    private videoDuration: number
    private isAsia: boolean
    private isAdRunning: boolean

    constructor() {
        this.video = <HTMLVideoElement>Util.select('.html5-main-video')
        console.log('inside constructor')
        this.video.addEventListener('ended', () => {
            this.videoEnd()
        })

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
        console.log('video duration', this.videoDuration)
        setTimeout(() => {
            console.log('inside ad timeout', button)
            if (button && this.videoDuration > 15) {
                console.log('perform-click')
                Util.performClick(button)
            }
            setTimeout(() => {
                this.isAdRunning = false
            }, 2000)
        }, 10000)

    }

    public initialize(): void {
        console.log('Initialize')
        this.videoDuration = this.video.duration
        if (this.checkAd()) {
            console.log('Found Ad.')
            this.handleAd()
        }
        this.video.addEventListener('ended', () => {
            this.videoEnd()
        })
    }

    public videoEnd(): void {
        if (!this.isAdRunning) {
            console.log('page reload')
            location.reload(true)
        }
    }

}

new Viewer()
