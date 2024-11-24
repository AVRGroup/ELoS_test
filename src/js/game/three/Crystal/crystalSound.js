import * as THREE from "three";

export default class crystalSound 
{

    playAudio(fileName) {
        const listener = new THREE.AudioListener();
        const audio = new THREE.Audio(listener);
        const audioLoader = new THREE.AudioLoader();

        const audioPath = {
            'crystal' : new URL(`../../../../assets/audios/crystal.wav`, import.meta.url).toString(),
        }

        audioLoader.load(audioPath[fileName], function(buffer) {
            audio.setBuffer(buffer);
            audio.setLoop(false);
            audio.setVolume(0.5);
            audio.play();
        }, undefined, function(error) {
           return;
        });
    }

}