import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { AudioArtist } from '../models/audio-artist-model';
import { AudioArtistActions } from '../actions/audioArtistActions';


export interface AudioArtistState {
    ids: string[];
    entities: { [id: string]: AudioArtist };
};

const initialState: AudioArtistState = {
    ids: [],
    entities: {}
};


export default function(state = initialState, action: Action): AudioArtistState {
    switch (action.type) {
        case AudioArtistActions.AUDIO_ARTIST_FETCH_COMPLETE: {
                const audioArtists: AudioArtist[] = action.payload;
                const newArtists = audioArtists.filter(audioArtist => !state.entities[audioArtist.id]);

                const newArtistsIds = newArtists.map(audioArtist => audioArtist.id);
                const newArtistsEntities = newArtists.reduce((entities: { [id: string]: AudioArtist }, audioArtist: AudioArtist) => {
                                                          return Object.assign(entities, {
                                                              [audioArtist.id]: audioArtist
                                                          });
                                                      }, {});

               return {
                    ids: [ ...state.ids, ...newArtistsIds ],
                    entities: Object.assign({}, state.entities, newArtistsEntities)
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

export function getAudioArtistIds() {
  return (state$: Observable<AudioArtistState>) => state$
    .select(s => s.ids);
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

