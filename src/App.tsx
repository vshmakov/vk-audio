import React from 'react';
import './App.css';
import {GlobalHotKeys, HotKeys} from "react-hotkeys";
import {getMapping} from "./PlayingAudioHandlers";
import {PlayingAudio} from "./PlayingAudio";
import {VolumeRepository} from "./VolumeRepository";

interface State {
}

class App extends React.Component<{}, State> {
    public readonly state: State = {}
    private playingAudio: PlayingAudio | null = null
    private readonly volumeRepository = new VolumeRepository()

    public render() {
        const {keyMap, handlers} = getMapping((): PlayingAudio | null => this.playingAudio)

        return (
            <div>
                <form>
                    <input type="text" title="Найти"/>
                </form>
                <HotKeys keyMap={keyMap} handlers={handlers}>
                    <h1>Музыка</h1>
                                        <div>
                        <ul style={{listStyleType: 'none'}}>
                            <li onClick={this.clickHandler.bind(this)}>abc</li>
                        </ul>
                    </div>
                </HotKeys>
            </div>
        );
    }

    private clickHandler(): void {
        if (null === this.playingAudio) {
            this.playingAudio = new PlayingAudio('/audio.mp3', this.volumeRepository)
        }

        this.playingAudio.toggle()
    }
}

export default App;
