import { Component, OnInit } from '@angular/core';

import { AudioWord, AvailableWordsService } from '../available-words/available-words.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectedWordsService } from '../selected-words/selected-words.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-words',
  templateUrl: './choose-words.component.html',
  styleUrls: ['./choose-words.component.scss']
})
export class ChooseWordsComponent implements OnInit {

    availableWords: AudioWord[] = [];
    selectableWords: AudioWord[] = [];
    selectedWords: AudioWord[] = [];

    constructor(
        private availableWordsService: AvailableWordsService,
        private selectedWordsService: SelectedWordsService,
        private router: Router
        ) {

    }

    ngOnInit() {
        this.availableWords = this.availableWordsService.getAvailableWords();
    }

    onAvailableCheckboxChange(event: MatCheckboxChange, index: number) {
        const audioWord = this.availableWords[index];
        if (event.checked) {
            if (!this.selectableWords.find(selectable => selectable.word === audioWord.word)) {
                this.selectableWords.push(audioWord);
            }
        } else {
            this.selectableWords = this.selectableWords.filter(selectable => selectable.word !== audioWord.word);
        }
    }

    onSelectedCheckboxChange(event: MatCheckboxChange, index: number) {
        const audioWord = this.selectableWords[index];
        if (event.checked) {
            if (!this.selectedWords.find(selected => selected.word === audioWord.word)) {
                this.selectedWords.push(audioWord);
            }
        } else {
            this.selectedWords = this.selectedWords.filter(selected => selected.word !== audioWord.word);
        }
    }

    onProceed() {
        this.selectedWordsService.set(this.selectableWords, this.selectedWords);
        this.router.navigate(['play-game']);
    }
}
