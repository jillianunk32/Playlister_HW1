/**
 * PlaylistController.js
 * 
 * This class provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author Jillian Unkenholz
 */
export default class PlaylisterController {
    constructor() { }

    /*
        setModel 

        We are using an MVC-type approach, so this controller class
        will respond by updating the application data, which is managed
        by the model class. So, this function registers the model 
        object with this controller.
    */
    setModel(initModel) {
        this.model = initModel;
        this.initHandlers();
    }

    /*
        initHandlers

        This function defines the event handlers that will respond to interactions
        with all the static user interface controls, meaning the controls that
        exist in the original Web page. Note that additional handlers will need
        to be initialized for the dynamically loaded content, like for controls
        that are built as the user interface is interacted with.
    */
    initHandlers() {
        // SETUP THE TOOLBAR BUTTON HANDLERS
        this.initEditToolbarHandlers();

        // SETUP THE MODAL HANDLERS
        this.initModalHandlers();
    }

    /*
        initEditToolbarHandlers

        Specifies event handlers for buttons in the toolbar.
    */
    initEditToolbarHandlers() {
        // HANDLER FOR ADDING A NEW LIST BUTTON
        document.getElementById("add-list-button").onmousedown = (event) => {
            let newList = this.model.addNewList("Untitled", []);
            this.model.loadList(newList.id);
            this.model.saveLists();
        }
        // HANDLER FOR UNDO BUTTON
        document.getElementById("undo-button").onmousedown = (event) => {
            this.model.undo();
            this.model.view.updateToolbarButtons(this.model);
        }
        // HANDLER FOR REDO BUTTON
        document.getElementById("redo-button").onmousedown = (event) => {
            this.model.redo();
            this.model.view.updateToolbarButtons(this.model);
        }
        // HANDLER FOR CLOSE LIST BUTTON
        document.getElementById("close-button").onmousedown = (event) => {
            this.model.unselectAll();
            this.model.unselectCurrentList();
        }
        document.getElementById("add-song-button").onmousedown = (event) => {
            let newSong = {"title" : "Untitled", "artist" : "Unknown", "youTubeId" :"dQw4w9WgXcQ"};
            this.model.addAddSongTransaction(newSong);
            this.model.view.refreshPlaylist(this.model.currentList);
            this.model.view.updateToolbarButtons(this.model);
            this.model.saveLists();
        }
    }

    /*
        initModalHandlers

        Specifies  event handlers for when confirm and cancel buttons
        are pressed in the three modals.
    */
    initModalHandlers() {
        // RESPOND TO THE USER CONFIRMING TO DELETE A PLAYLIST
        let deleteListConfirmButton = document.getElementById("delete-list-confirm-button");
        deleteListConfirmButton.onclick = (event) => {
            // NOTE THAT WE SET THE ID OF THE LIST TO REMOVE
            // IN THE MODEL OBJECT AT THE TIME THE ORIGINAL
            // BUTTON PRESS EVENT HAPPENED
            let deleteListId = this.model.getDeleteListId();

            // DELETE THE LIST, THIS IS NOT UNDOABLE
            this.model.deleteList(deleteListId);

            // ALLOW OTHER INTERACTIONS
            this.model.toggleConfirmDialogOpen();

            // CLOSE THE MODAL
            let deleteListModal = document.getElementById("delete-list-modal");
            deleteListModal.classList.remove("is-visible");
        }

        // RESPOND TO THE USER CLOSING THE DELETE PLAYLIST MODAL
        let deleteListCancelButton = document.getElementById("delete-list-cancel-button");
        deleteListCancelButton.onclick = (event) => {
            // ALLOW OTHER INTERACTIONS
            this.model.toggleConfirmDialogOpen();
            
            // CLOSE THE MODAL
            let deleteListModal = document.getElementById("delete-list-modal");
            deleteListModal.classList.remove("is-visible");
        }


        let editSongConfirmButton = document.getElementById("edit-song-confirm-button");
        editSongConfirmButton.onclick = (event) => {
                let index1 = document.getElementsByClassName("list-card selected-list-card")[0].id;
                let indexNum1 = index1.split('-')[2]-1;
                let mySong = this.model.currentList.songs[indexNum1];
                let editTitleText = document.getElementById("edit-song-title-text").value;
                let editArtistText = document.getElementById("edit-song-artist-text").value;
                let editYoutubeText = document.getElementById("edit-song-youtubeId-text").value;
                let newSong = {"title": editTitleText , "artist": editArtistText, "youTubeId": editYoutubeText};
                let index = document.getElementsByClassName("list-card selected-list-card")[0].id;
                let indexNum = index.split('-')[2]-1;
                this.model.addEditSongTransaction(indexNum, newSong, mySong);
                this.model.view.refreshPlaylist(this.model.currentList);
            // CLOSE THE MODAL
            let song = document.getElementById("playlist-card-"+(indexNum+1));
            song.setAttribute("class", "list-card unselected-list-card");
            this.model.view.updateToolbarButtons(this.model);
            this.model.toggleConfirmDialogOpen();
            let editSongModal = document.getElementById("edit-playlist-card-modal");
            editSongModal.classList.remove("is-visible");
            
        }

        let editSongCancelButton = document.getElementById("edit-song-cancel-button");
        editSongCancelButton.onclick = (event) => {
                
                let index = document.getElementsByClassName("list-card selected-list-card")[0].id;
                let indexNum = index.split('-')[2]-1;
                let song = document.getElementById("playlist-card-"+(indexNum+1));
                song.setAttribute("class", "list-card unselected-list-card");
            // CLOSE THE MODAL
            this.model.toggleConfirmDialogOpen();
            let editSongModal = document.getElementById("edit-playlist-card-modal");
            editSongModal.classList.remove("is-visible");
        }

        let removeSongConfirmButton = document.getElementById("delete-song-confirm-button");
        removeSongConfirmButton.onclick = (event) => {
                
                let index = document.getElementsByClassName("list-card selected-list-card")[0].id;
                let indexNum = index.split('-')[2]-1;
                let song = document.getElementById("playlist-card-"+(indexNum+1));
                song.setAttribute("class", "list-card unselected-list-card");
                this.model.addRemoveSongTransaction(indexNum);
                this.model.view.refreshPlaylist(this.model.currentList);
            // CLOSE THE MODAL
            this.model.toggleConfirmDialogOpen();
            let removeSongModal = document.getElementById("delete-song-modal");
            removeSongModal.classList.remove("is-visible");
        }

        let removeSongCancelButton = document.getElementById("delete-song-cancel-button");
        removeSongCancelButton.onclick = (event) => {
                //this.model.toggleConfirmDialogOpen();

            // CLOSE THE MODAL
            let index = document.getElementsByClassName("list-card selected-list-card")[0].id;
            let indexNum = index.split('-')[2]-1;
            let song = document.getElementById("playlist-card-"+(indexNum+1));
            song.setAttribute("class", "list-card unselected-list-card");
            this.model.toggleConfirmDialogOpen();
            let removeSongModal = document.getElementById("delete-song-modal");
            removeSongModal.classList.remove("is-visible");
        }

        }

    /*
        registerListSelectHandlers

        This function specifies event handling for interactions with a
        list selection controls in the left toolbar. Note that we say these
        are for dynamic controls because the items in the playlists list is
        not known, it can be any number of items. It's as many items as there
        are playlists, and users can add new playlists and delete playlists.
        Note that the id provided must be the id of the playlist for which
        to register event handling.
    */
    registerListSelectHandlers(id) {
        // HANDLES SELECTING A PLAYLIST
        document.getElementById("playlist-" + id).onmousedown = (event) => {
            // MAKE SURE NOTHING OLD IS SELECTED
            this.model.unselectAll();

            // GET THE SELECTED LIST
            this.model.loadList(id);
        }
        // HANDLES DELETING A PLAYLIST
        document.getElementById("delete-list-" + id).onmousedown = (event) => {
            // DON'T PROPOGATE THIS INTERACTION TO LOWER-LEVEL CONTROLS
            this.ignoreParentClick(event);

            // RECORD THE ID OF THE LIST THE USER WISHES TO DELETE
            // SO THAT THE MODAL KNOWS WHICH ONE IT IS
            this.model.setDeleteListId(id);

            // VERIFY THAT THE USER REALLY WANTS TO DELETE THE PLAYLIST
            // THE CODE BELOW OPENS UP THE LIST DELETE VERIFICATION DIALOG
            this.listToDeleteIndex = this.model.getListIndex(id);
            let listName = this.model.getList(this.listToDeleteIndex).getName();
            let deleteSpan = document.getElementById("delete-list-span");
            deleteSpan.innerHTML = "";
            deleteSpan.appendChild(document.createTextNode(listName));
            let deleteListModal = document.getElementById("delete-list-modal");

            // OPEN UP THE DIALOG
            deleteListModal.classList.add("is-visible");
            this.model.toggleConfirmDialogOpen();
        }
        // FOR RENAMING THE LIST NAME
        document.getElementById("list-card-text-" + id).ondblclick = (event) => {
            let text = document.getElementById("list-card-text-" + id)
            // CLEAR THE TEXT
            text.innerHTML = "";

            // ADD A TEXT FIELD
            let textInput = document.createElement("input");
            textInput.setAttribute("type", "text");
            textInput.setAttribute("id", "list-card-text-input-" + id);
            textInput.setAttribute("value", this.model.currentList.getName());
            textInput.style.width = "100%"

            // CHANGE THE CONTROL TO AN EDITABLE TEXT FIELD
            text.appendChild(textInput);
            this.model.refreshToolbar();

            // SPECIFY HANDLERS FOR THE TEXT FIELD
            textInput.ondblclick = (event) => {
                this.ignoreParentClick(event);
            }
            textInput.onkeydown = (event) => {
                if (event.key === 'Enter') {
                    this.model.renameCurrentList(event.target.value, id);
                    this.model.refreshToolbar();
                }
            }
            textInput.onblur = (event) => {
                this.model.renameCurrentList(event.target.value, id);
                this.model.refreshToolbar();
            }
            textInput.focus();
            let temp = textInput.value;
            textInput.value = "";
            textInput.value = temp;
        }
    }

    /*
        registerItemHandlers

        This function specifies event handling for interactions with the
        playlist song items, i.e. cards. Note that we say these
        are for dynamic controls because the cards in the playlist are
        not known, it can be any number of songs. It's as many cards as there
        are songs in the playlist, and users can add and remove songs.
    */
    registerItemHandlers() {
        // SETUP THE HANDLERS FOR ALL SONG CARDS, WHICH ALL GET DONE
        // AT ONCE EVERY TIME DATA CHANGES, SINCE IT GETS REBUILT EACH TIME
        for (let i = 0; i < this.model.getPlaylistSize(); i++) {
            // GET THE CARD
            let card = document.getElementById("playlist-card-" + (i + 1));
            
            // NOW SETUP ALL CARD DRAGGING HANDLERS AS THE USER MAY WISH TO CHANGE
            // THE ORDER OF SONGS IN THE PLAYLIST

            // MAKE EACH CARD DRAGGABLE
            card.setAttribute('draggable', 'true')

            // WHEN DRAGGING STARTS RECORD THE INDEX
            card.ondragstart = (event) => {
                card.classList.add("is-dragging");
                event.dataTransfer.setData("from-id", i);
            }

            // WE ONLY WANT OUR CODE, NO DEFAULT BEHAVIOR FOR DRAGGING
            card.ondragover = (event) => {
                event.preventDefault();
            }

            // STOP THE DRAGGING LOOK WHEN IT'S NOT DRAGGING
            card.ondragend = (event) => {
                card.classList.remove("is-dragging");
            }

            // WHEN AN ITEM IS RELEASED WE NEED TO MOVE THE CARD
            card.ondrop = (event) => {
                event.preventDefault();
                // GET THE INDICES OF WHERE THE CARD IS BRING DRAGGED FROM AND TO
                let fromIndex = Number.parseInt(event.dataTransfer.getData("from-id"));
                let toIndex = Number.parseInt(event.target.id.split("-")[2]) - 1;

                // ONLY ADD A TRANSACTION IF THEY ARE NOT THE SAME
                // AND BOTH INDICES ARE VALID
                if ((fromIndex !== toIndex)
                    && !isNaN(fromIndex) 
                    && !isNaN(toIndex)) {
                    this.model.addMoveSongTransaction(fromIndex, toIndex);
                }
            }

            card.ondblclick = (event) => {
                this.ignoreParentClick(event);
                card.setAttribute("class", "list-card selected-list-card");
                document.getElementById("edit-song-title-text").value = (this.model.currentList.songs[i].title);
                let editCardModal = document.getElementById("edit-playlist-card-modal");
                document.getElementById("edit-song-artist-text").value=  (this.model.currentList.songs[i].artist);
                document.getElementById("edit-song-youtubeId-text").value= (this.model.currentList.songs[i].youTubeId);
                // OPEN UP THE DIALOG
                this.model.toggleConfirmDialogOpen();
                this.model.view.updateToolbarButtons(this.model);
                editCardModal.classList.add("is-visible");
            }

            let cardDeleteButton = document.getElementById("delete-card-" + (i+1));
            cardDeleteButton.onclick = (event) => {
                this.ignoreParentClick(event);
                card.setAttribute("class", "list-card selected-list-card");
                console.log(this.model.confirmDialogOpen);
                this.model.toggleConfirmDialogOpen();
                console.log(this.model.confirmDialogOpen);
                this.model.view.updateToolbarButtons(this.model);
                // VERIFY THAT THE USER REALLY WANTS TO DELETE THE PLAYLIST
                // THE CODE BELOW OPENS UP THE LIST DELETE VERIFICATION DIALOG
                let deleteSpan = document.getElementById("delete-song-span");
                deleteSpan.innerHTML = "";
                let cardName = card.getElementsByTagName('a')[0].innerHTML;
                deleteSpan.appendChild(document.createTextNode(cardName));
                let removeCardModal = document.getElementById("delete-song-modal");

                // OPEN UP THE DIALOG
                removeCardModal.classList.add("is-visible");
            }
        }
    }

    /*
        ignoreParentClick

        This function makes sure the event doesn't get propogated
        to other controls.
    */
    ignoreParentClick(event) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
    }
}