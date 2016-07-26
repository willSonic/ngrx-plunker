import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { uuid } from '../utils/uuid';
import { AudioAlbum, AudioArtist } from '../models/index';
import { AudioAlbumActions } from '../actions/audioAlbumActions';


export interface AudioAlbumState {
    ids: string[];
    entities: { [id: string]: AudioAlbum };
};

const initialState: AudioAlbumState = {
    ids: [],
    entities: {}
};


export default function(state = initialState, action: Action): AudioAlbumState {
    switch (action.type) {
        case AudioAlbumActions.CREATE_AUDIOALBUM_LIST:{
             console.log("[audioAlbumReducder.ts]-- CREATE_AUDIOALBUM_LIST - audioAlbums =",  action.payload);
             const audioArtists:AudioArtist[] = action.payload;
             const audioAlbums:AudioAlbum[] = audioArtists.map(audioArtist => { return Object.assign( {}, {id:uuid(),
                          audioArtistId:audioArtist.id,
                          trackTitle:audioArtist.trackTitle,
                          albumImgSrc:audioArtist.albumImgSrc,
                          trackURL:audioArtist.trackURL)});

            const newAudioAlbumIds = audioAlbums.map(audioAlbum => audioAlbum.id);
            const newAudioAlbumEntities = audioAlbums.reduce((entities: { [id: string]: AudioAlbum }, audioAlbum: AudioAlbum) => {
                    return Object.assign(entities, {
                      [audioAlbum.id]: audioAlbum
                    });
                  }, {});


            return {
                ids: [ ...state.ids, ...newAudioAlbumIds ],
                entities: Object.assign({}, state.entities, newAudioAlbumEntities)
            };
        }
        default: {
            return state;
        }
    }
}


export function getAudioAlbumEntities() {
    return (state$: Observable<AudioAlbumState>) => state$
        .select(s => s.entities);
};

export function getAudioAlbumIds() {
  return (state$: Observable<AudioAlbumState>) => state$
    .select(s => s.ids);
};

export function getAudioAlbum(id: string) {
  return (state$: Observable<AudioAlbumState>) => state$
    .select(s => s.entities[id]);
};

export function getAudioAlbums(audioAlbumIds: string[]) {
    return (state$: Observable<AudioAlbumState>) => state$
        .let(getAudioAlbumEntities())
        .map(entities => audioAlbumIds.map(id => entities[id]));
}

export function hasAudioAlbum(id: string) {
  return (state$: Observable<AudioAlbumState>) => state$
    .select(s => s.ids.includes(id));
}

