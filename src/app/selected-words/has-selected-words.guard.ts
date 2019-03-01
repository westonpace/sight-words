import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SelectedWordsService } from './selected-words.service';

@Injectable({
  providedIn: 'root',
})
export class HasSelectedWordsGuard implements CanActivate {

  constructor(
    private selectedWordsService: SelectedWordsService,
    private router: Router
    ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.selectedWordsService.isSet()) {
        return true;
      } else {
        this.router.navigate(['choose-words']);
        return false;
      }
  }
}
