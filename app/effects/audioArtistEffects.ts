
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
import { AppState, AudioAlbumState } from '../reducers';
import { AudioItemServices } from '../services/audioItemServices';
import { WebAudioServices } from '../services/webAudioServices';
import { ArtistService } from  '../services/artistService';  
import { AudioArtistActions} from '../actions/audioArtistActions';
import { AudioItemActions} from '../actions/audioItemActions';
import { AudioAlbumActions} from '../actions/audioAlbumActions';
import { AudioArtist, AudioItem} from '../models';


@Injectable()
export class AudioArtistEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private audioItemServices:AudioItemServices,
    private artistService: ArtistService,
    private webAudioServices:WebAudioServices;
    private audioItemActions: AudioItemActions,
    private audioArtistActions: AudioArtistActions,
    private audioAlbumActions:AudioAlbumActions
  ) { }


  @Effect() loadAudioArtistsInit$ = Observable.of(this.audioArtistActions.fetchAudioArtist());


  @Effect() fetchAudioArtists = this.updates$
    .whenAction(AudioArtistActions.FETCH_AUDIO_ARTIST)
    .mergeMap(() => this.artistService.requestArtist())
    .map((audioArtists:AudioArtist[]) => this.audioArtistActions.fetchAudioArtistComplete(audioArtists))
    .catch(() => Observable.of(this.audioArtistActions.fetchAudioArtistComplete([]) ));



  @Effect() createAudioAlbums = this.updates$
    .whenAction(AudioArtistActions.AUDIO_ARTIST_FETCH_COMPLETE)
    .map<AudioArtist[]>(toPayload)
    .map((audioArtists:AudioArtist[]) => this.audioAlbumActions.createAudioAlbumList(audioArtists));
    
    
  @Effect() createAudioItems = this.updates$
    .whenAction(AudioAlbumActions.CREATE_AUDIOALBUM_LIST)
    .mergeMap(() =>this.audioItemServices.getAudioItems())
    .map((audioAlbums:AudioAlbum[]) => this.audioItemActions.createAudioItemList(audioAlbums));
    
  @Effect() downLoadAudioItem = this.updates$
    .whenAction(AudioItemActions.BEGIN_AUDIOITEM_DOWNLOAD)
    .map<AudioItem>(toPayload)
    .mergeMap((audioItem:AudioItem) => this.webAudioServices.downLoadAudioItem(audioItem))
    .map(audioItem => this.audioItemActions.audioItemDownLoadComplete(audioItem)) );
    
    
}