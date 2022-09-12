import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works to add a song.
 *  It will be managed by the transaction stack.
 * 
 * @author Jillian Unkenholz
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initNewSong) {
        super();
        this.model = initModel;
        this.newSong = initNewSong;
    }

    doTransaction() {
        this.model.addSong(this.newSong);
    }
    
    undoTransaction() {
        let song = document.getElementById("playlist-card-"+ (this.model.currentList.songs.length));
        song.remove();
    }
}