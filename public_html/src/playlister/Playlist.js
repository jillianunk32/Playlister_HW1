/**
 * Playlist.js
 * 
 * This class represents our playlist.
 * 
 * @author McKilla Gorilla
 * @author Jillian Unkenholz
 */
export default class Playlist {
    constructor(initId) {
        this.id = initId;
    }

    getName() {
        return this.name;
    }

    setName(initName) {
        this.name = initName;
    }

    getSongAt(index) {
        return this.songs[index];
    }

    setSongAt(index, song) {
        this.songs[index] = song;
    }

    setSongs(initSongs) {
        this.songs = initSongs;
    }

    moveSong(oldIndex, newIndex) {
        this.songs.splice(newIndex, 0, this.songs.splice(oldIndex, 1)[0]);
    }

    addSong(song){
        this.songs.push(song);
    }

    editSong(index, song, song2){
        this.songs[index]=song;
        this.song2=song2;
    }

    removeSong(index){
        this.songs.splice(index, 1);
    }
}