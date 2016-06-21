import { Injectable } from '@angular/core';
import { Action} from "@ngrx/store";
import { AudioItem } from '../models';




@Injectable()
export class AudioItemActions {
     static CREATE_AUDIOITEM = '[AudioItem] create an AudioItem from AudioArtist';
      createAudioItem(): Action {
        return {
          type: AudioItemActions.CREATE_AUDIOITEM
        };
      }


}