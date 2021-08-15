import {PlayingAudio} from "./PlayingAudio";

interface PlayingAudioHandler {

    get key(): string

    handle(playingAudio: PlayingAudio): void
}

class ToggleHandler implements PlayingAudioHandler {
    public get key(): string {
        return "Escape";
    }

    public handle(playingAudio: PlayingAudio): void {
        playingAudio.toggle()
    }
}

class StopHandler implements PlayingAudioHandler {
    public get key(): string {
        return "F2";
    }

    public handle(playingAudio: PlayingAudio): void {
        playingAudio.stop()
    }
}

class MoveBackwardHandler implements PlayingAudioHandler {
    public get key(): string {
        return "F3";
    }

    public handle(playingAudio: PlayingAudio): void {
        playingAudio.changeCurrentTime(-3)
    }
}

class MoveForwardHandler implements PlayingAudioHandler {
    public get key(): string {
        return "F4";
    }

    public handle(playingAudio: PlayingAudio): void {
        playingAudio.changeCurrentTime(3)
    }
}

class DecreaseVolumeHandler implements PlayingAudioHandler {
    public get key(): string {
        return "F6";
    }

    public handle(playingAudio: PlayingAudio): void {
        playingAudio.changeVolume(-0.05)
    }
}

class IncreaseVolumeHandler implements PlayingAudioHandler {
    public get key(): string {
        return "F7";
    }

    public handle(playingAudio: PlayingAudio): void {
        playingAudio.changeVolume(0.05)
    }
}

const playingAudioHandlers: PlayingAudioHandler[] = [
    new ToggleHandler(),
    new StopHandler(),
    new MoveBackwardHandler(),
    new MoveForwardHandler(),
    new DecreaseVolumeHandler(),
    new IncreaseVolumeHandler(),
]
type KeyMap = { [key: string]: string }
type Handlers = { [key: string]: (event: KeyboardEvent | undefined) => void }

export function getMapping(getPlayingAudio: () => PlayingAudio | null): { keyMap: KeyMap, handlers: Handlers } {
    const keyMap: KeyMap = {}
    const handlers: Handlers = {}

    for (const handler of playingAudioHandlers) {
        keyMap[handler.key] = handler.key
        handlers[handler.key] = (event: KeyboardEvent | undefined): void => {
            event?.preventDefault()
            const playingAudio = getPlayingAudio()

            if (null !== playingAudio) {
                handler.handle(playingAudio)
            }
        }
    }

    return {
        keyMap: keyMap,
        handlers: handlers
    }
}
