import {Component, ChangeDetectionStrategy, Output, Input, SimpleChange, OnInit, EventEmitter, ChangeDetectorRef,OnChanges } from "@angular/core";
import { AudioItem } from "../models/audio-item-model";
import { Observable } from 'rxjs/Observable';


export type AudioItemInput = AudioItem;
export type ChangeStateOutput = AudioItem;
@Component({
    selector: 'audioitem-view',
    inputs: ['audioItem'],
    styles: [`
         .mdl-list__item-icon, .mdl-list__item-icon.material-icons{
            color:#7db500;
          }
          .mdl-list__item-primary-content{
              color:#65788b;
          }    
          img {
              width: 64px;
              height:64px;
              margin-left: 2px;
          }
          label.base{
            color:#7db500;
          }
          label.loading{
            color:#E54028;
          }
          label.loaded{
            color:#4c78a4;
          }
          .mdl-button--raised.mdl-button--colored:hover,
          .mdl-button--raised.mdl-button--colored {
                background-color: #7F8D9E;
          }
}
    `],
    template: `
    <li class="mdl-list__item">
      <span class="mdl-list__item-primary-content">
               <img [src]="thumbnail"/>
       </span>
              
        <div class="mdl-cell mdl-cell--4-col">
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" 
                   (click)="changeState.emit(audioItem)">
                  {{buttonLabel}}
              </button>
        </div>
        <div class="mdl-cell mdl-cell--4-col">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
               <label class="mdl-textfield__label"  [ngClass]="setClasses()"> {{audioItemState}}</label>
             </div>
        </div>

    </li>
    `
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioItemViewComponent implements onChanges{
  @Input('audioItem')  _audioItem: AudioItemInput;
  audioItem:AudioItemInput;
  
  @Output() changeState: EventEmitter<AudioItem> = new EventEmitter<AudioItem>();
  
  buttonLabel:string;
  audioItemState:String;
  
  set _audioItem(value:AudioItem){
    this.audioItem = Object.assign({}, value);
    this.setClasses();
  }
    
  get thumbnail():string{
      return this.audioItem.albumImgSrc;
  }
  
  downloadComplete(){
    this.buttonLabel = (this.audioItem.downloadComplete)? "LOADING":"LOAD";
    this.audioItemState = (this.audioItem.loadProgress==0)? "...":this.audioItem.loadProgress;
    return this.audioItem.downloadComplete;
  }
  
  isPlaying(){
    if(this.audioItem.downloadComplete){
      this.buttonLabel = (this.audioItem.isPlaying)? "STOP":"PLAY";
      this.audioItemState = 'position :'+this.audioItem.currentPosition;
    }
    return this.audioItem.isPlaying;
  }
  
 
  
  setClasses() {
    let classes =  {
      base: (this.downloadComplete() == false),
      loading: (this.downloadComplete() == true),
      loader: (this.isPlaying() == true)
    };
    return classes;
  }
   
    
  ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
    console.log('[AudioItemViewComponent&&&&&&&&&Changes', changes);
    console.log('[AudioItemViewComponent]************this.audioItems', this.audioItem);
  }
}