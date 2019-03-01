import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Application, loader, Sprite } from 'pixi.js';

@Component({
  selector: 'eng-app',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements AfterViewInit, OnDestroy {

    private app: Application;

    constructor(private hostRef: ElementRef) {
        this.app = new Application();
        this.app.renderer.autoResize = true;
    }

    ngAfterViewInit() {
        this.app.view.style.position = 'absolute';
        this.app.view.style.display = 'block';
        this.hostRef.nativeElement.appendChild(this.app.view);
        this.app.renderer.resize(this.hostRef.nativeElement.clientWidth, this.hostRef.nativeElement.clientHeight);
        this.loadTextures();
    }

    ngOnDestroy() {
        this.app.destroy(false);
    }

    private loadTextures() {
        this.app.loader
        .add('assets/textures.json')
        .load(() => {
            console.log('Textures loaded');
            const skyTexture = this.app.loader.resources['assets/textures.json'].textures['sky.png'];
            console.log('Sky texture=' + skyTexture);
            const skySprite = new Sprite(skyTexture);
            skySprite.x = 0;
            skySprite.y = 0;
            this.app.stage.addChild(skySprite);
        });
    }

}
