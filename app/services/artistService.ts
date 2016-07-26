
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { jsonArtists } from '../sampledata/artistDataJSON';
import { Observable } from 'rxjs/Observable';
import { AudioArtist } from '../models/audio-artist-model';

import 'rxjs/Rx';
import 'rxjs/add/observable/timer';

const TIMEOUT = 1000;

@Injectable()
export class ArtistService {

    requestArtist(): Observable<AudioArtist[]> {
        return Observable.of(jsonArtists)
            .delay(TIMEOUT);
    }
}