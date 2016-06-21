import { Injectable } from '@angular/core';
import { Action} from "@ngrx/store";
import { AudioItem } from '../models';




@Injectable()
export class PlayListActions {
     static ADD_AUDIOITEM = '[PlayList] add AudioItem';
      addAudioItem( audioItem:AudioItem): Action {
        return {
          type: PlayListActions.ADD_AUDIOITEM,
          payload:audioItem
        };
      }


}