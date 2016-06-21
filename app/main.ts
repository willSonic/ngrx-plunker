

import 'rxjs/Rx';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {Component, Injectable} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Observable} from 'rxjs/Rx';
import {provideStore, Store, Dispatcher} from '@ngrx/store';
import { StateUpdates, Effect, runEffects } from '@ngrx/effects'

const LOAD = 'LOAD';
const LOADED = 'LOADED';


@Component({
    selector: 'my-app',
    styles:[`
    *{font-family: Monaco, Consolas;}
    a{
      font-size: 9pt;
      color: black;
      text-decoration: none;
      padding: 2px;
    }
    a:hover{color: blue;}
    a::before{content: ">";}
    .list{
      display: flex;
      flex-direction: column;
    }
    `],
    template: `<div>
        <button (click)="load('rxjs')">RxJS</button>
        <button (click)="load('angular')">Angular</button>
        Custom search: <input #i type="text" (keyup.enter)="load(i.value)">
        <button (click)="load(i.value)">Custom</button>
        <div class="list">
        <a 
          *ngFor="let item of (results$ | async)"
          [href]="item.link"
          >
            {{item.title}}
        </a>
        </div>
        

</div>`
})
export class App {
    results$;

    load(payload){
      this.store.dispatch({type: LOAD, payload});
    };

    constructor(private store:Store) {
      this.results$ = this.store.select('questions');
    }

    ngOnInit(){
      this.store.dispatch({type: LOAD, payload:'rxjs'});
    }
}

//reducers
const questions = (state = [], {type, payload})=> {
    console.log(type)
    switch (type) {
        case LOADED:
            return payload.items;

        default:
            return state;
    }
};

//effects
@Injectable()
export class StackExchangeEffects {
  url$ = Observable.of('https://api.stackexchange.com/2.2/search?site=stackoverflow');

  constructor(private http: Http, private updates$: StateUpdates) { }

  @Effect() load$ = this.updates$
      .whenAction(LOAD)
      .combineLatest(this.url$, ({action:{payload}}, url)=> `${url}&intitle=${payload}`)
        .switchMap(url => http.get(url))
        .map(res => ({
                type: LOADED,
                payload: res.json()
            })
        )
        .do(v=> console.log(v))
}

bootstrap(App, [
    HTTP_PROVIDERS,
    provideStore({questions}),
    runEffects(StackExchangeEffects)
]);