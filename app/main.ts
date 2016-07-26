import { provideStore, Store } from '@ngrx/store';
import { provide, Input, Directive,HostBinding } from '@angular/core';
import { runEffects } from '@ngrx/effects';
import { Component, Injectable, Output, Input} from '@angular/core';

import { AudioItemServices } from './services/audioItemServices';
import { AppState,AudioItemState, getAudioArtists, getAudioAlbums, getAudioItems, getAudioItemState } from './reducers/index';
import { AudioArtistListComponent, AudioArtistsInput } from './components/audioArtistListComponent';
import { AudioAlbumListComponent, AudioAlbumsInput } from './components/audioAlbumListComponent';
import { AudioItemListComponent, AudioItemsInput } from './components/audioItemListComponent';



@Component({
    selector: 'app',
    directives: [
      AudioArtistListComponent,
      AudioAlbumListComponent,
      AudioItemListComponent
      ],
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
    .headline{
      color:#2aa4c9;
      padding-left:10px;
    }
    `],
    template: `
                <div mdl class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                  <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
                    <div class="mdl-layout__header-row">
                      <span class="mdl-layout-title">NGRX Harness For Plunker</span>
                    </div>
                  </header>
                  <main class="mdl-layout__content mdl-color--grey-12">
                       <div class="mdl-grid">
                          <div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--5-col">
                               <h5 class="headline"> List of Artists</h5>
                               <audioartist-list [audioArtists]="audioArtists$ | async"
                                                  class="demo-list-icon mdl-list"></audioartist-list>
                          </div>
                          <div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--5-col"> 
                               <h5 class="headline">List of Albums</h5>     
                               <audioalbum-list [audioAlbums]="audioAlbums$ | async"
                                                  class="demo-list-icon mdl-list"></audioalbum-list> 
                         </div>
                          <div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--5-col"> 
                               <h5 class="headline">List of Audio Items</h5>     
                               <audioitems-list [audioItems]="audioItems$ | async"
                                                 (changeState)="changeStateOfAudioItem($event)"
                                                  class="demo-list-icon mdl-list"></audioitems-list> 
                         </div>
                        </div>
                  </main>
                </div>
              `
})
export default class App{

  audioArtists$: Observable<AudioArtistsInput>;
  audioAlbums$: Observable<AudioAlbumsInput>;
  audioItems$: Observable<AudioItemsInput>;
  audioItemState$: Observable<AudioItemState>;
  
  

  constructor(private store: Store<AppState>, private audioItemServices:AudioItemServices) {
       this.audioArtists$      = store.let(getAudioArtists());
       this.audioAlbums$       = store.let(getAudioAlbums());
       this.audioItems$        = store.let(getAudioItems());
       this.audioItemState$    = store.let(getAudioItemState());
       this.audioItems$.subscribe(state =>{
             console.log("[Main.ts] ----App---  this.audioItems$.subscribe state =",state);
             });
  }

  changeStateOfAudioItem(audioItem:AudioItem){
             this.audioItemServices.updateAudioItemState(audioItem);
  }

  
}