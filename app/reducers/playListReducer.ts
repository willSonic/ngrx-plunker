import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { AudioItem } from '../models';
import { PlayListActions } from '../actions';


export interface PlayListState {
    audioItemList:AudioItem[]
};

const initialState: PlayListState = {
    audioItemList: []
};


export default function(state = initialState, action: Action): PlayListState {
    switch (action.type) {
        case PlayListActions.ADD_AUDIOITEM:{
            const audioItem: AudioItem  = action.payload;
            if (state.audioItemList.includes(audioItem)) {
                return state;
            }
            return Object.assign({}, state, {
                audioTrackList: [ ...state.audioItemList, audioItem ]
            });
        }
        case PlayListActions.REMOVE_AUDIOITEM:{
            const audioItemToRemove: AudioItem  = action.payload;

            return Object.assign({}, state, {
                audioTrackList: state.audioItemList.filter(audioItem => audioItem.id !== audioItemToRemove.id)
            });
        }
        case PlayListActions.ADD_AUDIOITEM_LIST:{
            const audioItems: AudioItem[]  = action.payload;


            return Object.assign({}, state, {
                audioTrackList: [ ...state.audioItemList, ...audioItems ]
            });
        }
        default: {
            return state;
        }
    }
}


export function getAudioItemList() {
    return (state$: Observable<PlayListState>) => state$
        .select(s => s.audioItemList);
};


