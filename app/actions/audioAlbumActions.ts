import { Injectable } from '@angular/core';
import { Action} from "@ngrx/store";
import { AudioAlbum } from '../models';

@Injectable()
export class AudioAlbumActions {

     static CREATE_AUDIOALBUM = '[AudioAlbum] create an AudioAlbum from AudioArtist';
      createAudioAlbum(audioArtist:AudioArtist): Action {
        return {
          type: AudioAlbumActions.CREATE_AUDIOALBUM,
          payload:audioArtist
        };
      }


     static CREATE_AUDIOALBUM_LIST = '[AudioAlbum] create list of AudioAlbum from AudioArtis listt';
      createAudioAlbumList(audioArtists:AudioArtist[]): Action {
        return {
          type: AudioAlbumActions.CREATE_AUDIOALBUM_LIST,
          payload:audioArtists
        };
      }


     static DEFAULT_STATE = '[AudioAlbum] return the current state';
      getCurrentSTate(): Action {
        return {
          type: AudioAlbumActions.DEFAULT_STATE
          
        }
}