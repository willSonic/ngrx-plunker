import {Component, ChangeDetectionStrategy, Output, Input, EventEmitter} from "@angular/core";
import { AudioAlbum } from "../models/audio-album-model";


export type AudioAlbumInput = AudioAlbum;

@Component({
    selector: 'audioalbum-view',
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
                <i class="material-icons mdl-list__item-icon">albums</i>{{trackTitle}}
       </span>
    </li>
    `
})
export class AudioAlbumViewComponent {
    @Input()  audioAlbum: AudioAlbumInput;
    
    get trackTitle(){
       return this.audioAlbum.trackTitle;
    }
}