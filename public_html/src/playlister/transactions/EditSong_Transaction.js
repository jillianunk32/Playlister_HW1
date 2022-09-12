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
    constructor(initModel, initIndex, initSong, initOrg) {
        super();
        this.model = initModel;
        this.index = initIndex;
        this.song = initSong;
        this.orgSong = initOrg;
    }

    doTransaction() {
        this.model.editSong(this.index, this.song);
    }
    
    undoTransaction() {
        this.model.currentList.songs[this.index]=this.orgSong;
        this.model.view.refreshPlaylist(this.model.currentList);
        this.model.view.controller.registerItemHandlers();
    }
}