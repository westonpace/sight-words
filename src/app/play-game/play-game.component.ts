import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AudioWord } from '../available-words/available-words.service';
import { SelectedWordsService } from '../selected-words/selected-words.service';

export interface WordBlock extends Rectangle {
    audioWord: AudioWord;
}

export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

const BLOCK_COLOR = '#0097A7';
const SELECTED_BLOCK_COLOR = '#00BCD4';
const TEXT_COLOR = '#FFFFFF';
const SHADOW_COLOR = '#000000';
const MAX_ATTEMPTS_TO_PLACE = 1000;
const BLOCK_WIDTH = 150;
const BLOCK_HEIGHT = 50;
const SHADOW_BLUR = 5;
const SHADOW_OFF_X = 5;
const SHADOW_OFF_Y = 5;
const MARGIN_X = 12;
const MARGIN_Y = 12;
const TEXT_FONT = '24px Roboto';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements AfterViewInit {

    @ViewChild('canvas')
    private canvasElement: ElementRef;
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    private possibleWords: AudioWord[];
    private selectableWords: AudioWord[];
    private placedWords: WordBlock[] = [];
    private activeWord = -1;
    private playingWord: HTMLAudioElement | null = null;

    constructor(
        private selectedWordsService: SelectedWordsService
    ) {
        this.possibleWords = selectedWordsService.getPossibleWords();
        this.selectableWords = selectedWordsService.getSelectedWords();
    }

    ngAfterViewInit() {
        const elem = this.canvasElement.nativeElement as HTMLCanvasElement;
        elem.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.ctx = elem.getContext('2d');
        elem.width = elem.clientWidth;
        elem.height = elem.clientHeight;
        this.width = elem.clientWidth;
        this.height = elem.clientHeight;

        this.placeWords(10);
    }

    private placeWords(numWords: number) {
        for (let i = 0; i < numWords; i++) {
            const audioWord = this.randomNoiseWord();
            const location = this.findPossibleLocation();
            if (location === null) {
                console.log('Could not find a spot for the word');
            } else {
                const wordBlock = { audioWord, x: location.x, y: location.y, width: location.width, height: location.height };
                this.placedWords.push(wordBlock);
                this.renderWord(wordBlock, BLOCK_COLOR);
            }
        }
    }

    private renderWord(wordBlock: WordBlock, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.shadowColor = SHADOW_COLOR;
        this.ctx.shadowBlur = SHADOW_BLUR;
        this.ctx.shadowOffsetX = SHADOW_OFF_X;
        this.ctx.shadowOffsetY = SHADOW_OFF_Y;
        this.ctx.fillRect(wordBlock.x, wordBlock.y, wordBlock.width, wordBlock.height);
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = 'transparent';
        this.ctx.font = TEXT_FONT;
        this.ctx.fillStyle = TEXT_COLOR;
        const centerX = wordBlock.x + (wordBlock.width / 2);
        const centerY = wordBlock.y + (wordBlock.height / 2);
        this.ctx.fillText(wordBlock.audioWord.word, centerX, centerY, wordBlock.width);
    }

    private async highlight(index: number) {
        if (this.playingWord) {
            this.playingWord.pause();
            this.playingWord.load();
        }
        this.renderWord(this.placedWords[index], SELECTED_BLOCK_COLOR);
        await this.placedWords[index].audioWord.element.play();
        this.playingWord = this.placedWords[index].audioWord.element;
    }

    private unhighlight(index: number) {
        this.renderWord(this.placedWords[index], BLOCK_COLOR);
    }

    private onMouseMove(e: MouseEvent) {
        const activeBlockIndex = this.findMatchingBlockIndex(e);
        if (activeBlockIndex !== this.activeWord) {
            if (this.activeWord >= 0) {
                this.unhighlight(this.activeWord);
            }
            if (activeBlockIndex >= 0) {
                this.highlight(activeBlockIndex);
            }
            this.activeWord = activeBlockIndex;
        }
    }

    private findMatchingBlockIndex(e: MouseEvent) {
        for (let i = 0; i < this.placedWords.length; i++) {
            const placedWord = this.placedWords[i];
            if (
                e.offsetX > placedWord.x &&
                e.offsetX < placedWord.x + placedWord.width &&
                e.offsetY > placedWord.y &&
                e.offsetY < placedWord.y + placedWord.height
            ) {
                return i;
            }
        }
        return -1;
    }

    private randomRectangle() {
        const x = Math.random() * (this.width - BLOCK_WIDTH);
        const y = Math.random() * (this.height - BLOCK_HEIGHT);
        return { x, y, width: BLOCK_WIDTH, height: BLOCK_HEIGHT };
    }

    private randomNoiseWord() {
        return this.possibleWords[this.randInt(this.possibleWords.length)];
    }

    private randInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private findPossibleLocation() {
        for (let i = 0; i < MAX_ATTEMPTS_TO_PLACE; i ++) {
            const possibleRectangle = this.randomRectangle();
            let locationWorks = true;
            for (const block of this.placedWords) {
                const occupied: Rectangle = {
                    x: block.x - MARGIN_X,
                    y: block.y - MARGIN_Y,
                    width: block.width + MARGIN_X + MARGIN_X,
                    height: block.height + MARGIN_Y + MARGIN_Y
                };
                if (this.overlap(occupied, possibleRectangle)) {
                    locationWorks = false;
                    break;
                }
            }
            if (locationWorks) {
                return possibleRectangle;
            }
        }
        return null;
    }

    private overlap(rectOne: Rectangle, rectTwo: Rectangle) {
        // tslint:disable-next-line:max-line-length
        const oneLeftX = rectOne.x;
        const oneRightX = rectOne.x + rectOne.width;
        const twoLeftX = rectTwo.x;
        const twoRightX = rectTwo.x + rectTwo.width;

        if (oneLeftX > twoRightX || twoLeftX > oneRightX) {
            return false;
        }

        const oneTopY = rectOne.y;
        const oneBottomY = rectOne.y + rectOne.height;
        const twoTopY = rectTwo.y;
        const twoBottomY = rectTwo.y + rectTwo.height;

        if (oneBottomY < twoTopY || twoBottomY < oneTopY) {
            return false;
        }

        return true;
    }

}
