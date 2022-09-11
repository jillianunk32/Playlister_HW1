import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works to add a song.
 *  It will be managed by the transaction stack.
 * 
 * @author Jillian Unkenholz
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initIndex) {
        super();
        this.model = initModel;
        this.index = initIndex;
    }

    doTransaction() {
        this.model.addSong(this.index);
    }
    
    undoTransaction() {
        this.model.addSong(this.index);
    }
}