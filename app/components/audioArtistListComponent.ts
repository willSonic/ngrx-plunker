import { Component, Input } from '@angular/core';

import { AudioArtistViewComponent, AudioArtistInput } from './audioArtistViewComponent';

export type AudioArtistsInput = AudioArtistInput[];

@Component({
  selector: 'audioartist-list',
  directives: [ AudioArtistViewComponent ],
  template: `
    <audioartist-view *ngFor="let audioArtist of audioArtists" [audioArtist]="audioArtist"></audioartist-view>
  `,
  styles: [`
      .demo-list-icon {
        width: 400px;
      }
  `]
})
export class AudioArtistListComponent {
  @Input() audioArtists: AudioArtistsInput;
}