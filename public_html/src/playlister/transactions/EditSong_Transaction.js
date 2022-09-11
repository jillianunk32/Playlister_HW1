import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works to edit a song.
 *  It will be managed by the transaction stack.
 * 
 * @author Jillian Unkenholz
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initIndex, initSong) {
        super();
        this.model = initModel;
        this.index = initIndex;
        this.song = initSong;
    }

    doTransaction() {
        this.model.editSong(this.index, this.song);
    }
    
    undoTransaction() {
        this.model.editSong(this.index, this.song);
    }
}