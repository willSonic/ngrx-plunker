import { HTTP_PROVIDERS, BrowserXhr } from '@angular/http';
import { provide } from '@angular/core';
import { ArtistService } from './artistService';
import { CustomBrowserXhr } from '../utils/customXHR';
import { AudioItemServices } from './audioItemServices';
import { WebAudioServices } from './webAudioServices';

export default[
    HTTP_PROVIDERS,
    provide(BrowserXhr, { useClass: CustomBrowserXhr }),
    ArtistService,
    AudioItemServices,
    WebAudioServices
]
