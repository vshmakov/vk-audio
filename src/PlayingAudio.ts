import {VolumeRepository} from "./VolumeRepository";

export class PlayingAudio {
    private readonly audio: HTMLAudioElement
    private isPlaying: boolean = false

    public constructor(
        private readonly path: string,
        private readonly volumeRepository: VolumeRepository
    ) {
        this.audio = new Audio()
        this.audio.src = this.path
        this.setVolume();
    }

   private setVolume() {
        this.audio.volume = this.volumeRepository.currentVolume
    }

    public toggle(): void {
        !this.isPlaying ? this.audio.play() : this.audio.pause()
        this.isPlaying = !this.isPlaying
    }

    public stop(): void {
        this.audio.pause()
        this.audio.currentTime = 0
        this.isPlaying = false
    }

    public changeCurrentTime(delta: number): void {
        this.audio.currentTime = this.audio.currentTime + delta
    }

    public changeVolume(delta: number): void {
        this.volumeRepository.changeVolume(delta)

        this.setVolume()
    }
}
