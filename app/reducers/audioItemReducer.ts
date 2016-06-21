import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { uuid } from '../util/uuid';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Artist } from '../models';
import { AudioItem } from '../models';
import { AudioItemActions } from '../actions';


export interface AudioItemsState {
  ids: string[];
  loading:boolean,
  entities: { [id: string]: AudioItem };
};

const initialState: AudioItemsState = {
  ids: [],
  loading:false,
  entities: {}
};


export default function(state = initialState, action: Action): AudioItemsState {
  switch (action.type) {
    case AudioItemActions.INITIALIZE_AUDIOITEM:
             const artist:Artist = action.payload;
             const newAudioItem  =  Object.assign(AudioItem, {id:uuid(), artistId:artist.id} );
             const newAudioIds = [ ...state.ids, ...newAudioItem.id ],
             const newAudioItemEntities = newAudioIds.reduce((entities: { [id: string]: Artist }, artist: Artist) => {
                return Object.assign(entities, {
                    [artist.id]: artist
                });
            }, {});]);
             return Object.assign({},
                                  state,
                                  action.payload = Object.assign({},{
                                                                     id:uuid(),
                                                                     artistId:artist.id,
                                                                     artistAudioBuffer:null,
                                                                     downloadComplete:false,
                                                                     isPlaying:false,
                                                                     currentPosition:0
                                                                 }));
    case AudioItemActions.LOAD_AUDIOBUFFER_START:


    case AudioItemActions.LOAD_AUDIOBUFFER_COMPLETE:
    
    
  
  
  
  
    case AudioItemActions.SEARCH_COMPLETE:
    case AudioItemActions.LOAD_COLLECTION_SUCCESS: {
      const books: Book[] = action.payload;
      const newBooks = books.filter(book => !state.entities[book.id]);

      const newBookIds = newBooks.map(book => book.id);
      const newBookEntities = newBooks.reduce((entities: { [id: string]: Book }, book: Book) => {
        return Object.assign(entities, {
          [book.id]: book
        });
      }, {});

      return {
        ids: [ ...state.ids, ...newBookIds ],
        entities: Object.assign({}, state.entities, newBookEntities)
      };
    }

    case BookActions.LOAD_BOOK: {
      const book: Book = action.payload;

      if (state.ids.includes(book.id)) {
        return state;
      }

      return {
        ids: [ ...state.ids, book.id ],
        entities: Object.assign({}, state.entities, {
          [book.id]: book
        })
      };
    }

    default: {
      return state;
    }
  }
}
