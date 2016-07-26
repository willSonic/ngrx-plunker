import {Injectable, bind} from '@angular/core';
import {Http, BrowserXHhr} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {Observable} from 'rxjs/Observable';
import {AudioItem} from "../models/audio-item-model";
import {Store, State, Action} from '@ngrx/store';
import {Subject} from "rxjs/Subject";
import {Observable} from 'rxjs/Observable';
import {AudioItemActions} from '../actions/audioItemActions';

@Injectable()
export class WebAudioServices{

    private audioContext: AudioContext;
    private audioNode:AudioBufferSourceNode;
    private audioBuffer: AudioBuffer;
    private playbackRate: number = 1.0;
    private gainNode:GainNode;
    private gain: number = .01;


    constructor(  private _store: Store, private audioItemActions:AudioItemActions) {
        this.audioContext = new AudioContext();
    }


    downLoadAudioItem(audioItem:AudioItem): Observable<any> {
       console.log("[WebAudioServices]----  audioItem =", audioItem);
        let storeRef = this._store;
        return Observable.create(observer=> {
            let req = new XMLHttpRequest();
            req.open('GET',  audioItem.trackURL, true );
            req.responseType = "arraybuffer";
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    console.log("[WebAudioServices] loadAudio  --COMPLETE- req.readyState =", req.readyState);
                    audioItem.artistAudioBuffer = req.response;
                    audioItem.downloadComplete = true;
                    audioItem.loadProgress = 100;
                    observer.next(audioItem);
                    observer.complete();
                }
                
              
            };
            req.onprogress = function(evt)
            {
                if( evt.lengthComputable)
                {  //evt.loaded the bytes browser receive
                    //evt.total the total bytes seted by the header
                    //
                    var percentComplete = (evt.loaded / evt.total) * 100;
                    var value =  Math.ceil((evt.loaded / evt.total) * 100));
                    if(value !== 100){
                      console.log("[WebAudioServices] loadAudio  --ONPROGRESS- loadProgress =", audioItem.loadProgress);
                      storeRef.dispatch({type:AudioItemActions.PROGRESS_OF_AUDIOITEM_DOWNLOAD , payload:Object.assign({}, audioItem, {loadProgress:value}));
                    }
                }
            };
            req.send();
        });


    }

    loadAudio(audioItem:AudioItem): Observable<AudioItem>  {
        var ref = this;
        console.log("[WebAudioServices] loadAudio  -----  =", audioItem.artistAudioBuffer.audioBuffer);
        if(this.audioBuffer) {
          if(this.audioNode ) {
            this.audioNode.stop(0);
          }
        }
        return Observable.create(observer=> {
            this.audioContext.decodeAudioData( audioItem.artistAudioBuffer.audioBuffer, function(buffer){
              ref.audioBuffer = buffer;
              observer.next(ref.audioBuffer);
              observer.complete();
            });

         });
    }

    playBuffer(): Array<any> {
            this.audioNode = this.audioContext.createBufferSource();
            this.audioNode.buffer = this.audioBuffer;
            this.audioNode.playbackRate.value = this.playbackRate;
    
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = this.gain;
    
            this.audioNode.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);
    
            this.audioNode.start(0);
            return [ {'playStart':true}];
    }

    stopBuffer(): Array<any>{
           if(this.audioBuffer) {
              if(this.audioNode ) {
                this.audioNode.stop(0);
                this.audioNode = null;
              }
            }
            return [ {'playStop':true}];
    }

}
