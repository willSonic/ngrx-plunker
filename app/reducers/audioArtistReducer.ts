import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { AudioArtist } from '../models';
import { AudioArtistActions } from '../actions';


export interface AudioArtistState {
    ids: string[];
    entities: { [id: string]: AudioArtist };
};

const initialState: AudioArtistState = {
    ids: [],
    entities: {}
};


export default function(state = initialState, action: Action): AudioArtistState {
             //  console.log("[audioArtistsReducer.js]=---- AudioARsit STATE=");
    switch (action.type) {

        case AudioArtistActions.SEARCH_COMPLETE:
        case AudioArtistActions.LOAD_COLLECTION_SUCCESS: {
               console.log("[audioArtistsReducer.js]=---- type= "+action.type);
                const audioArtists: AudioArtist[] = action.payload;
                const newArtists = audioArtists.filter(audioArtist => !state.entities[audioArtist.id]);

                const newArtistsIds = newArtists.map(audioArtist => audioArtist.id);
                const newArtistsEntities = newArtists.reduce((entities: { [id: string]: AudioArtist }, audioArtist: AudioArtist) => {
                    return Object.assign(entities, {
                        [audioArtist.id]: audioArtist
                    });
                }, {});

               console.log("[audioArtistsReducer.js]=-AudioArtistActions.LOAD_COLLECTION_SUCCESS:--- newArtistsEntities =", newArtistsEntities);
                return {
                    ids: [ ...state.ids, ...newArtistsIds ],
                    entities: Object.assign({}, state.entities, newArtistsEntities)
                };
            }
        case AudioArtistActions.LOAD_AUDIOARTIST: {
          const audioArtist: AudioArtist = action.payload;

          if (state.ids.includes(audioArtist.id)) {
            return state;
          }

          return {
            ids: [ ...state.ids, audioArtist.id ],
            entities: Object.assign({}, state.entities, {
              [audioArtist.id]: audioArtist
            })
          };
        }
        default: {
            return state;
        }
    }
}


export function getAudioArtistEntities() {
    return (state$: Observable<AudioArtistState>) => state$
        .select(s => s.entities);
};

export function getAudioArtist(id: string) {
  return (state$: Observable<AudioArtistState>) => state$
    .select(s => s.entities[id]);
};

export function getAudioArtists(audioArtistIds: string[]) {
    return (state$: Observable<AudioArtistState>) => state$
        .let(getAudioArtistEntities())
        .map(entities => audioArtistIds.map(id => entities[id]));
}

export function hasAudioArtist(id: string) {
  return (state$: Observable<AudioArtistState>) => state$
    .select(s => s.ids.includes(id));
}

