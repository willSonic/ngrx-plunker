import {Reducer, Action} from "@ngrx/store";

export const REQUEST_ARTISTS  = 'REQUEST_ARTISTS';
export const RECEIVED_ARTISTS = 'RECEIVED_ARTISTS';
export const RECEIVED_ERROR   = 'RECEIVED_ERROR';


export interface IArtist {
    id: number;
    artistName: string;
    trackTitle: string;
    albumImgSrc: string;
    trackURL:string;
}

export const artists: Reducer<{}> = (state: any = {}, action: Action) => {
    switch (action.type) {
        case REQUEST_ARTISTS:
             return state;

        case RECEIVED_ARTISTS:
            //console.log("artistReducer -- Recieved Artist -action.payload", action.payload);
            return Object.assign({},
                state,
                action.payload.reduce((obj, artist) => {
                    //console.log("artists - -", artist);
                    obj[artist.id] = artist;
                    return obj;
                }, {})
            );

        case RECEIVED_ERROR:
            return state;
        default:
            return state;
    }
};