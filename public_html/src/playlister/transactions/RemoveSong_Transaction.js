import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * RemoveSong_Transaction
 * 
 * This class represents a transaction that works to remove a song.
 *  It will be managed by the transaction stack.
 * 
 * @author Jillian Unkenholz
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initIndex) {
        super();
        this.model = initModel;
        this.index = initIndex;
        this.song = this.model.currentList.songs[this.index];
    }

    doTransaction() {
        this.model.removeSong(this.index);
    }
    
    undoTransaction() {
        this.model.currentList.songs.push(this.model.currentList.songs[this.model.currentList.songs.length-1]);
        for (let i = this.model.currentList.songs.length-2; i>this.index; i--){
            let temp = this.model.currentList.songs[i];
            this.model.currentList.songs[i+1]=temp;
        }
        this.model.currentList.songs[this.index]=this.song;
        this.model.view.refreshPlaylist(this.model.currentList);
        this.model.view.controller.registerItemHandlers();
    }
}