import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works to add a song.
 *  It will be managed by the transaction stack.
 * 
 * @author Jillian Unkenholz
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initNewIndex) {
        super();
        this.model = initModel;
        this.newIndex = initNewIndex;
    }

    doTransaction() {
        this.model.addSong(this.newIndex);
    }
    
    undoTransaction() {
        this.model.addSong(this.newIndex);
    }
}