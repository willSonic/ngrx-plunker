export interface AudioItem {
    id:string;
    artistId:number;
    artistAudioBuffer: ArrayBuffer;
    downloadComplete:boolean;
    isPlaying:boolean;
    currentPosition:number;
}