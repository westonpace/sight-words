import { Injectable } from '@angular/core';

export interface AudioWord {
    element: HTMLAudioElement;
    word: string;
}

@Injectable()
export class AvailableWordsService {

    getAvailableWords(): AudioWord[] {
        const audioElements = window.document.querySelectorAll('audio');
        const result = [];
        audioElements.forEach(audioElement => {
            result.push({
                element: audioElement,
                word: audioElement.textContent.toLocaleLowerCase()
            });
        });
        return result;
    }

}
