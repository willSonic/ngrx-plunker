import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';



import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import audioArtistsReducer, * as fromAudioArtist from './audioArtistReducer';
import audioItemsReducer, * as   fromAudioItem from './audioItemReducer';
import playListReducer, * as fromPlayList from './playListReducer';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
    audioArtists: fromAudioArtist.AudioArtistState;
    playList: fromPlayList.PlayListState;
    audioItems: fromAudioItem.AudioItemState;
}

export default compose(storeLogger(), combineReducers)({
    router: routerReducer,
    search: searchReducer,
    albums:albumsReducer,
    audioArtists: audioArtistsReducer,
    collection: collectionReducer,
    playList:playListReducer,
    audioTracks:audioTrackReducer
});
