import {Injectable} from '@angular/core';
import {Store, State, Action} from '@ngrx/store';
import {Subject} from "rxjs/Subject";
import {Observable} from 'rxjs/Observable';
import {AudioAlbum} from '../models/audio_album_model';
import {AudioItemActions} from '../actions/audioItemActions';
import {getAudioAlbums} from '../reducers/index';

@Injectable()
export class AudioItemServices {
    audioAlbumlist$:Observable<AudioAlbum[]>;
    
    actions$ = new Subject<Action>();
    
    constructor( private _store: Store, private audioItemActions:AudioItemActions){
       this.audioAlbumlist$ =  this._store.let(getAudioAlbums());
    }
   
  
    public getAudioItems():Observable<AudioAlbum[]>{
      return this.audioAlbumlist$;
    }
  
    updateAudioItemState = (audioItem:AudioItem) =>{
         if(!audioItem.downloadComplete){
               //console.log("[AudioItemServices]--updateAudioItemState ---   this.audioItem = ", audioItem);
              let actionResult = this.audioItemActions.startAudioItemDownLoad(audioItem);
              this._store.dispatch(actionResult);
            // this._store.dispatch(this.actions$.next({type: AudioItemActions.BEGIN_AUDIOITEM_DOWNLOAD,  payload: audioItem});
         }
    }
}

