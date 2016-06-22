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
    static REMOVE_AUDIOITEM = '[PlayList] remove AudioItem';
    removeAudioItem( audioItem:AudioItem): Action {
        return {
            type: PlayListActions.REMOVE_AUDIOITEM,
            payload:audioItem
        };
    }
    static ADD_AUDIOITEM_LIST ='[PlayList] add list of AudioItem';
    addAudioList( audioItems:AudioItem[]): Action {
        return {
            type: PlayListActions.ADD_AUDIOITEM_LIST,
            payload:audioItems
        };
    }


}