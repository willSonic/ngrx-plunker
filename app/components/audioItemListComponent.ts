import { Component, Input,Output, EventEmitter  } from '@angular/core';

import { AudioItemViewComponent, AudiItemInput } from './audioItemViewComponent';

export type AudioItemsInput = AudioItemInput[];

@Component({
  selector: 'audioitems-list',
  directives: [ AudioItemViewComponent ],
  template: `
    <audioitem-view
     (changeState) = "changeState.emit($event)"
      *ngFor="let audioItem of audioItems" [audioItem]="audioItem"></audioitem-view>
  `,
  styles: [`
      .demo-list-icon {
        width: 400px;
      }
  `]
})
export class AudioItemListComponent {
  @Input() audioItems: AudioItemsInput;
  @Output() changeState = new EventEmitter<Album>();
}