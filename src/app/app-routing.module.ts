import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseWordsComponent } from './choose-words/choose-words.component';
import { PageNotFoundComponent } from './not-found.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { HasSelectedWordsGuard } from './selected-words/has-selected-words.guard';

const routes: Routes = [
  { path: 'play-game', component: PlayGameComponent, canActivate: [ HasSelectedWordsGuard ] },
  { path: 'choose-words', component: ChooseWordsComponent },
  { path: '',
    redirectTo: '/choose-words',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
