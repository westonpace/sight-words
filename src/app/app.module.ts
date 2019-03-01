import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { ChooseWordsComponent } from './choose-words/choose-words.component';
import { AvailableWordsService } from './available-words/available-words.service';
import { SelectedWordsService } from './selected-words/selected-words.service';
import { PlayGameComponent } from './play-game/play-game.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ChooseWordsComponent,
    PlayGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [
    AvailableWordsService,
    SelectedWordsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
