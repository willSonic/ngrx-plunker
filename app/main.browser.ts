import { bootstrap } from '@angular/platform-browser-dynamic';
import {bootstrap} from 'angular2/platform/browser';
import { provideStore } from '@ngrx/store';
import { HTTP_PROVIDERS, BrowserXhr } from '@angular/http';
import { provide,Input,Directive,HostBinding} from '@angular/core';
import { runEffects } from '@ngrx/effects';

import App      from './main';
import reducer  from './reducers/index';
import effects  from './effects/index';
import services from './services/index';
import actions  from './actions/index';


import { CustomBrowserXhr } from './utils/customXHR';

bootstrap(App, [
    provideStore(reducer),
    provide(BrowserXhr, { useClass: CustomBrowserXhr }),
    runEffects(effects),
    services,
    actions
]);
