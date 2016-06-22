/*import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideStore } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';

import reducer from './reducers/index';
import App from 'main';
import effects from './effects/index';
import services from './services/index';
import actions from './actions/index';



bootstrap(App, [
    provideStore(reducer),
    runEffects(effects),
    services,
    actions
]);
*/
import { bootstrap } from '@angular/platform-browser-dynamic';
import 'rxjs/Rx';
import {HTTP_PROVIDERS} from '@angular/http';
import {provideStore} from '@ngrx/store';
import { runEffects } from '@ngrx/effects';
import { App, StackExchangeEffects, questions } from './main';



bootstrap(App, [
    HTTP_PROVIDERS,
    provideStore({questions}),
    runEffects(StackExchangeEffects)
]);