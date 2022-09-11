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
    }

    doTransaction() {
        this.model.removeSong(this.index);
    }
    
    undoTransaction() {
        this.model.removeSong(this.index);
    }
}