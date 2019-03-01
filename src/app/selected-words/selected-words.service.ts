import { Injectable } from '@angular/core';

import { AudioWord, AvailableWordsService } from '../available-words/available-words.service';

@Injectable()
export class SelectedWordsService {

    private possibleWords: AudioWord[] = [];
    private selectedWords: AudioWord[] = [];

    constructor(private availableWordsService: AvailableWordsService) {
        const allWords = this.availableWordsService.getAvailableWords();
        this.possibleWords = allWords;
        this.selectedWords = allWords;
    }

    getSelectedWords() {
        return this.selectedWords;
    }

    getPossibleWords() {
        return this.possibleWords;
    }

    set(possibleWords: AudioWord[], selectedWords: AudioWord[]) {
        this.possibleWords = possibleWords;
        this.selectedWords = selectedWords;
    }

    isSet() {
        return this.selectedWords.length > 0;
    }

}
