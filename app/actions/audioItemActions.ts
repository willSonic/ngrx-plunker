import { Injectable } from '@angular/core';
import { Action} from "@ngrx/store";
import { AudioAlbum, AudioArtist } from '../models/index';




@Injectable()
export class AudioItemActions {
      static CREATE_AUDIOITEM = '[AudioItem] create an AudioItem from AudioAlbum';
      createAudioItem(audioAlbum:AudioAlbum): Action {
        return {
          type: AudioItemActions.CREATE_AUDIOITEM,
          payload:audioAlbum
        };
      }


      static CREATE_AUDIOITEM_LIST = '[AudioItem] create list of AudioItems from AudioAlbum list';
      createAudioItemList(audioAlbums:AudioAlbum[]): Action {
        return {
          type: AudioItemActions.CREATE_AUDIOITEM_LIST,
          payload:audioAlbums
        };
      }
      
      static BEGIN_AUDIOITEM_DOWNLOAD ='[AudioItem] begin downloading audioItem';
      startAudioItemDownLoad(audioItem:AudioItem): Action {
        return {
          type: AudioItemActions.BEGIN_AUDIOITEM_DOWNLOAD,
          payload:audioItem
        };
      }
      
      static PROGRESS_OF_AUDIOITEM_DOWNLOAD ='[AudioItem] progress of audioItem download';
        audioItemDownLoadProgress(audioItem:AudioItem): Action {
         console.log('[AudioItemActions --PROGRESS_OF_AUDIOITEM_DOWNLOAD----audioItem -- ', audioItem);
        return {
          type: AudioItemActions.PROGRESS_OF_AUDIOITEM_DOWNLOAD,
          payload:audioItem
        };
      }
      
      static AUDIOITEM_DOWNLOAD_COMPLETE ='[AudioItem] audioItem download complete';
        audioItemDownLoadComplete(audioItem:AudioItem): Action {
         console.log('[AudioItemActions --AUDIOITEM_DOWNLOAD_COMPLETE----audioItem -- ', audioItem);
        return {
          type: AudioItemActions.AUDIOITEM_DOWNLOAD_COMPLETE,
          payload:audioItem
        };
      }

}