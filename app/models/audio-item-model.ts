export interface AudioItem {
    id:string;
    audioAlbumId:string;
    albumImgSrc:string;
    trackURL:string;
    artistAudioBuffer:ArrayBuffer;
    downloadComplete:boolean;
    loadProgress:number;
    isPlaying:boolean;
    currentPosition:number;
}
