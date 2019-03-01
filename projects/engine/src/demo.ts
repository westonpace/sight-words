import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../../../src/environments/environment';

import { ApplicationComponent } from './lib/application.component';
import { DemoHostComponent } from './demo-host.component';

if (environment.production) {
    enableProdMode();
}

@NgModule({
    declarations: [
        ApplicationComponent,
        DemoHostComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [DemoHostComponent]
})
export class DemoModule { }


platformBrowserDynamic().bootstrapModule(DemoModule)
    .catch(err => console.error(err));
