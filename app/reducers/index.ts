import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';

import { compose } from '@ngrx/core/compose';
import { storeLogger } from '../raw/ngrxStoreLogger';
import { combineReducers } from '@ngrx/store';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import  * as fromAudioArtist from './audioArtistReducer';
import  audioArtistReducer from './audioArtistReducer';
import  * as fromAudioItem from './audioItemReducer';
import  audioItemReducer from './audioItemReducer';
import  * as fromAudioAlbum from './audioAlbumReducer';
import audioAlbumReducer from './audioAlbumReducer';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
    audioArtists: fromAudioArtist.AudioArtistState;
    audioAlbums: fromAudioAlbums.AudioAlbumState;
    audioItems: fromAudioItem.AudioItemState;
}

export default compose(storeLogger(), combineReducers)({
    audioArtists: audioArtistReducer,
    audioAlbums: audioAlbumReducer,
    audioItems: audioItemReducer
});



export function getAudioAlbumState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.audioAlbums);
}

export function getAudioAlbumEntities() {
  return compose(fromAudioAlbum.getAudioAlbumtEntities(), getAudioAlbumState());
}
export function getAudioAlbumIds(){
  return compose(fromAudioAlbum.getAudioAlbumIds(), getAudioAlbumState());
}

export function getAudioAlbumList(audioArtistIds: string[]){
  return compose(fromAudioAlbum.getAudioAlbums(audioArtistIds), getAudioAlbumState());
}


export function getAudioAlbums(){
  return (state$: Observable<AppState>) => state$
       .let(getAudioAlbumIds())
       .switchMap(audioAlbumIds => state$.let(getAudioAlbumList(audioAlbumIds)));
}



export function getAudioArtistState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.audioArtists);
}

export function getAudioArtistEntities() {
  return compose(fromAudioArtist.getAudioArtistEntities(), getAudioArtistState());
}
export function getAudioArtistIds(){
  return compose(fromAudioArtist.getAudioArtistIds(), getAudioArtistState());
}

export function getAudioArtistList(audioArtistIds: string[]){
  return compose(fromAudioArtist.getAudioArtists(audioArtistIds), getAudioArtistState());
}


export function getAudioArtists(){
  return (state$: Observable<AppState>) => state$
       .let(getAudioArtistIds())
       .switchMap(audioArtistIds => state$.let(getAudioArtistList(audioArtistIds)));
}


export function getAudioItemState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.audioItems);
}


export function getAudioItemEntities(){
  return compose(fromAudioItem.getAudioItemEntities(), getAudioItemState());
}


export function getAudioItemIds(){
  return compose(fromAudioItem.getAudioItemIds(), getAudioItemState());
}

export function getAudioItemList(audioItemIds: string[]){
  return compose(fromAudioItem.getAudioItems(audioItemIds), getAudioItemState());
}


export function getAudioItems(){
  return (state$: Observable<AppState>) => state$
       .let(getAudioItemIds())
       .switchMap(audioItemIds => state$.let(getAudioItemList(audioItemIds)));
}


export function getPlayListState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.playList);
}
