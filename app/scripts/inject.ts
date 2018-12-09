import Util from '@libs/Utils'

class Main {

    private video: HTMLVideoElement
    private btnSkipAd: Element
    private videoDuration: Number

    constructor() {
        this.video = <HTMLVideoElement>Util.select('.html5-main-video')

        this.video.addEventListener('ended', () => {
            this.videoEnd()
        })

        if (!this.video.duration)
            this.video.addEventListener('loadedmetadata', () => this.initialize())
        else
            this.initialize()
    }

    private checkAd(): boolean {
        if (Util.select('.ytp-ad-texts'))
            return true

        return false
    }

    private handleAd(): void {

    }

    public initialize(): void {
        this.videoDuration = this.video.duration
        if (this.checkAd()) {
            this.handleAd()
        }
    }

    public videoEnd(): void {
        location.reload(true)
    }

}
