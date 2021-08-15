const volumeKey = 'volume'

export class VolumeRepository {
    public get currentVolume(): number {
        const volume = localStorage.getItem(volumeKey)

        if (null === volume) {
            return 1
        }

        return +volume
    }

    public changeVolume(delta: number): void {
        let volume = this.currentVolume + delta

        if (volume < 0) {
            volume = 0
        }

        if (volume > 1) {
            volume = 1
        }

        localStorage.setItem(volumeKey, volume.toString())
    }
}
