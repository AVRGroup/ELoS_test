import * as THREE from "three";

export default class Sound {

    constructor() {
        this.listener = new THREE.AudioListener();
        this.audio = new THREE.Audio(this.listener);
        this.audioLoader = new THREE.AudioLoader();
    }

    playAudio(fileName, volume = 0.1, loop = false) {

        const audioPath = {
            'crystal': new URL(`../../../../assets/audios/crystal.wav`, import.meta.url).toString(),
            'door': new URL(`../../../../assets/audios/door.wav`, import.meta.url).toString(),
            'fire': new URL(`../../../../assets/audios/fire.wav`, import.meta.url).toString(),
            'trap': new URL(`../../../../assets/audios/trap.wav`, import.meta.url).toString(),
            'laser': new URL(`../../../../assets/audios/laser.wav`, import.meta.url).toString(),
            'crystal': new URL(`../../../../assets/audios/crystal.wav`, import.meta.url).toString(),
            'moving': new URL(`../../../../assets/audios/moving.wav`, import.meta.url).toString(),
        }

        this.audioLoader.load(audioPath[fileName], (buffer) => {
            this.audio.setBuffer(buffer);
            this.audio.setLoop(loop);
            this.audio.setVolume(volume);
            this.audio.play();
        }, undefined, (error) => {
            console.error(error);
        });
    }

    stopAudio() {
        this.audio.stop();
    }

}