
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AppState, getAudioTracks } from '../reducers';
import { ArtistService } from '../services/artistService';
import { AudioArtistActions, AudioItemActions, PlayListActions } from '../actions';
import { AudioArtist, AudioItem} from '../models';


@Injectable()
export class AudioArtistEffects {
  constructor(
    private _store:Store<AppState>,
    private updates$: StateUpdates<AppState>,
    private artistService: ArtistService,
    private audioItemActions: AudioItemActions,
    private audioArtistActions: AudioArtistActions,
    private playListActions:PlayListActions
  ) { }

    

  @Effect() loadAudioArtistsInit$ = Observable.of(this.audioArtistActions.fetchAudioArtist());


  @Effect() fetchAudioArtists = this.updates$
    .whenAction(AudioArtistActions.FETCH_AUDIO_ARTIST)
    .mergeMap(() => this.artistService.requestArtist())
    .map(audioArtists => this.audioArtistActions.fetchAudioArtistComplete(audioArtists))
    .catch(() => Observable.of(this.audioArtistActions.fetchAudioArtistComplete([]) ));


  @Effect() search$ = this.updates$
    .whenAction(AlbumActions.SEARCH_ALBUM)
    .map<string>(toPayload)
    .filter(query => query !== '')
    .switchMap(query => this.spotifyArtists.searchAudioArtist(query)
      .map(audioArtists => this.albumActions.searchAlbumComplete(audioArtists))
      .catch(() => Observable.of(this.albumActions.searchAlbumComplete([]) ))
      );

  @Effect() clearSearch$ = this.updates$
    .whenAction(AlbumActions.SEARCH_ALBUM)
    .map<string>(toPayload)
    .filter(query => query === '')
    .mapTo(this.albumActions.searchAlbumComplete([]));


  @Effect() addAlbumsFromAudioArtistSearh$ = this.updates$
      .whenAction(AudioArtistActions.SEARCH_COMPLETE)
      .map<AudioArtist[]>(toPayload)
      .map((audioArtists:AudioArtist[]) =>  this.albumActions.loadAlbumsFromAudioArtist(audioArtists))
      .catch(() => Observable.of(this.albumActions.searchAlbumComplete([])));


  @Effect() clearAlbumsFromAudioArtistSearh$ = this.updates$
      .whenAction(AudioArtistActions.SEARCH)
      .map<string>(toPayload)
      .filter(query => query !== '')
      .mapTo(this.albumActions.searchAlbumComplete([]));


  @Effect() audioArtistSearch$ = this.updates$
    .whenAction(AudioArtistActions.SEARCH)
    .map<string>(toPayload)
    .filter(query => query !== '')
    .mergeMap(()  => ArtistAPI.default.getArtists(300))
      .map(audioArtists => this.audioArtistActions.searchComplete(audioArtists))
      .catch(() => Observable.of(this.audioArtistActions.searchComplete([]) ))
    );

    @Effect() clearAudioArtistSearch$ = this.updates$
    .whenAction(AudioArtistActions.SEARCH)
    .map<string>(toPayload)
    .filter(query => query === '')
    .mapTo(this.audioArtistActions.searchComplete([]));


  @Effect() addAlbumToCollection$ = this.updates$
    .whenAction(AlbumActions.ADD_TO_COLLECTION)
    .map<Album>(toPayload)
    .mergeMap(album => this.db.insert('albums', [ album ])
      .mapTo(this.albumActions.addToCollectionSuccess(album))
      .catch(() => Observable.of(
        this.albumActions.addToCollectionFail(album)
      ))
    );

  @Effect() createAudioTrack = this.updates$
    .whenAction(AlbumActions.LOAD_COLLECTION_SUCCESS)
    .map<Album[]>(toPayload)
    .map((albums:Album[]) =>  this.audioTrackActions.createAudioTracksFromAlbumList(albums)).mapTo(getAudioTracks())
      .map(entities => entities)
    .do(v => console.log("---------v =", v));
    //.mapTo(this.audioTrackActions.buildComplete());
    //.mapTo(getAudioTracks())
    //.switchMap(entities => this.audioTrackActions.audioTrackCreatonSuccess(entities) );

      //.do(getAudioTracks());

  //  .switchMap((audioTracks = this.getLoadAudioTracks()) => this.audioTrackActions.audioTrackCreatonSuccess(audioTracks));

/*
  @Effect() addAudioTracksToPlayList = this.updates$
      .whenAction(AudioTrackActions.AUDIOTRACK_FROM_COLLECTION_SUCCESS)
      .map<AudioTrack[]>(toPayload)
      .map((audioTracks:AudioTrack[]) => {
        return this.playListActions.addAudioTrackList(audioTracks)
      });
*/

  @Effect() removeAlbumFromCollection$ = this.updates$
    .whenAction(AlbumActions.REMOVE_FROM_COLLECTION)
    .map<Album>(toPayload)
    .mergeMap(album => this.db.executeWrite('albums', 'delete', [ album.trackId ])
      .mapTo(this.albumActions.removeFromCollectionSuccess(album))
      .catch(() => Observable.of(
        this.albumActions.removeFromCollectionFail(album)
      ))
    );
}