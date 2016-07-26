import {Component, ChangeDetectionStrategy, Output, Input, EventEmitter} from "@angular/core";
import { AudioArtist } from "../models/audio-artist-model";


export type AudioArtistInput = AudioArtist;

@Component({
    selector: 'audioartist-view',
    styles: [`
         .mdl-list__item-icon, .mdl-list__item-icon.material-icons{
            color:#885ead;
          }
          .mdl-list__item-primary-content{
              color:#65788b;
          }
    `],
    template: `
    <li class="mdl-list__item">
      <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-icon">child_care</i>{{artistName}}
       </span>
    </li>
    `
})
export class AudioArtistViewComponent {
    @Input()  audioArtist: AudioArtistInput;
    
    get artistName(){
       return this.audioArtist.artistName;
    }
    
    get trackTitle(){
       return this.audioArtist.trackTitle;
    }
    
    get thumbnail(): string | boolean {
      if (this.audioArtist) {
        return this.audioArtist.albumImgSrc;
      }

      return false;
    }
}