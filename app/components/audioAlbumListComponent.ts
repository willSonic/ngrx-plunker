import { Component, Input } from '@angular/core';
import { AudioAlbumViewComponent, AudioAlbumInput } from './audioAlbumViewComponent';

export type AudioAlbumsInput = AudioAlbumInput[];

@Component({
  selector: 'audioalbum-list',
  directives: [ AudioAlbumViewComponent ],
  template: `
    <audioalbum-view *ngFor="let audioAlbum of audioAlbums" [audioAlbum]="audioAlbum"></audioalbum-view>
  `,
  styles: [`
      .demo-list-icon {
        width: 400px;
      }
  `]
})
export class AudioAlbumListComponent {
  @Input() audioAlbums:AudioAlbumsInput;
}