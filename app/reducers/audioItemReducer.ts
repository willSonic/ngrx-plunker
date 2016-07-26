import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { uuid } from '../utils/uuid';
import { AudioAlbum } from '../models/index';
import { AudioItemActions } from '../actions/audioItemActions';


export interface AudioItemState {
  ids: string[];
  entities: { [id: string]: AudioItem };
};

const initialState: AudioItemState = {
  ids: [],
  entities: {}
};


export default function(state = initialState, action: Action): AudioItemState {
  switch (action.type) {
    case AudioItemActions.CREATE_AUDIOITEM_LIST:{
             const audioAlbums:AudioAlbum[] = action.payload;
             const audioItems:AudioItems[] =  audioAlbums.map(audioAlbum => { 
                     return Object.assign( {}, {id:uuid(),
                          audioAlbumId:audioAlbum.id,
                          albumImgSrc: audioAlbum.albumImgSrc,
                          trackURL:audioAlbum.trackURL,
                          artistAudioBuffer:null,
                          loadProgress:0;
                          downloadComplete:false,
                          isPlaying:false,
                          currentPosition:0})});

            const newAudioItemIds      = audioItems.map(audioItem => audioItem.id);
            const newAudioItemEntities = audioItems.reduce((entities: { [id: string]: AudioItem }, audioItem: AudioItem) => {
                    return Object.assign(entities, {
                      [audioItem.id]: audioItem
                    });
                  }, {});


            return {
                ids: [ ...state.ids, ...newAudioItemIds ],
                entities: Object.assign({}, state.entities, newAudioItemEntities)
            };
    }       
    case AudioItemActions.BEGIN_AUDIOITEM_DOWNLOAD:{
      const audioItem: AudioItem = action.payload;
     // console.log('[audioItemReducer.ts]--- BEGIN_AUDIOITEM_DOWNLOAD--- audioItem',audioItem);
      if (state.ids.includes(audioItem.id)) {
        return state;
      }
      
    }
    
    case  AudioItemActions.PROGRESS_OF_AUDIOITEM_DOWNLOAD:{
      const audioItem = action.payload;
      if (state.ids.includes(audioItem.id) {
          return  Object.assign({}, state, {
                      entities: Object.assign({}, state.entities, { [audioItem.id]: audioItem})
                  };
      }
    }
    
    case AudioItemActions.AUDIOITEM_DOWNLOAD_COMPLETE:{
      const audioItem: AudioItem = action.payload;
      if (state.ids.includes(audioItem.id)) {
          console.log('[audioItemReducer.ts]--- AUDIOITEM_DOWNLOAD_COMPLETE--- audioItem = ', audioItem);
          return  {
                      ids: [ ...state.ids],
                      entities: Object.assign({}, state.entities, { [audioItem.id]: audioItem})
                  };
      }
      
    }
    
    default: {
      return state;
    }
  }
}




export function getAudioItemEntities() {
    return (state$: Observable<AudioItemState>) => state$
        .select(s => s.entities);
};

export function getAudioItemIds() {
  return (state$: Observable<AudioItemState>) => state$
    .select(s => s.ids);
};

export function getAudioItem(id: string) {
  return (state$: Observable<AudioItemState>) => state$
    .select(s => s.entities[id]);
};

export function getAudioItems(audioItemIds: string[]) {
    return (state$: Observable<AudioItemState>) => state$
        .let(getAudioItemEntities())
        .map(entities => audioItemIds.map(id => entities[id]));
}

export function hasAudioItem(id: string) {
  return (state$: Observable<AudioItemState>) => state$
    .select(s => s.ids.includes(id));
}
