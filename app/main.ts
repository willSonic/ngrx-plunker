/*import { Component, Output, Input } from '@angular/core';
import { MdAnchor, MdButton } from '@angular2-material/button';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import {MATERIAL_DIRECTIVES } from 'ng2-material';*/


import 'rxjs/Rx';
import { Http} from '@angular/http';
import { Component, Injectable} from '@angular/core';
import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { StateUpdates, Effect } from '@ngrx/effects';
import 'rxjs/Rx';
import {Component, Injectable} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Observable} from 'rxjs/Rx';
import {provideStore, Store, Dispatcher} from '@ngrx/store';
import { StateUpdates, Effect, runEffects } from '@ngrx/effects'
const LOAD = 'LOAD';
const LOADED = 'LOADED';


@Component({
    selector: 'app',
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
    template: `
                <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                  <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
                    <div class="mdl-layout__header-row">
                      <span class="mdl-layout-title">NGRX Harness For Plunker</span>
                    </div>
                  </header>
                  <main class="mdl-layout__content mdl-color--grey-12">
                       <div class="mdl-grid">
                          <div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--5-col"> 
                                <svg fill="currentColor" viewBox="0 0 300 250" class="demo-graph">
                                  <use xlink:href="#chart" />
                                </svg>
                          </div>
                          <div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--5-col"> 
                                <svg fill="currentColor" viewBox="0 0 300 250" class="demo-graph">
                                  <use xlink:href="#chart" />
                                </svg>       
                         </div>
                        </div>
                  </main>
                </div>
              `
})
export default  class App {
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
export const questions = (state = [], {type, payload})=> {
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

 //App {}
