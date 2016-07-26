import { Injectable } from '@angular/core';
import { Action} from "@ngrx/store";
import { AudioArtist } from '../models';


@Injectable()
export class AudioArtistActions {
      static FETCH_AUDIO_ARTIST = '[AudioArtist] Fetch AudioArtist Json';
      fetchAudioArtist(): Action {
        return {
          type: AudioArtistActions.FETCH_AUDIO_ARTIST
        };
      }

      static AUDIO_ARTIST_FETCH_COMPLETE = '[AudioArtist] fetch of AudioArtist Complete';
      fetchAudioArtistComplete(audioArtists: AudioArtist[]): Action {
        console.log('AudioArtistsActoins]------ audioArtists ', audioArtists)
        return {
          type: AudioArtistActions.AUDIO_ARTIST_FETCH_COMPLETE,
          payload:audioArtists
        };
      }

}