'use strict';

const _ = require('lodash');
const JsonStore = require('./json-tango-store');

const tangoPlaylistStore = {

  store: new JsonStore('./models/playlist-tango-store.json', { tangoPlaylistCollection: [] }),
  collection: 'tangoPlaylistCollection',

  getAllTangoPlaylists() {
    return this.store.findAll(this.collection);
  },

  getTangoPlaylist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addTangoPlaylist(tangoPlaylist) {
    this.store.add(this.collection, tangoPlaylist);
  },

  removeTangoPlaylist(id) {
    const tangoPlaylist = this.getTangoPlaylist(id);
    this.store.remove(this.collection, tangoPlaylist);
  },

  removeAllTangoPlaylists() {
    this.store.removeAll(this.collection);
  },

  addMelody(id, melody) {
    const tangoPlaylist = this.getTangoPlaylist(id);
    tangoPlaylist.melodys.push(melody);
  },

  removeMelody(id, melodyId) {
    const tangoPlaylist = this.getTangoPlaylist(id);
    const melodys = tangoPlaylist.melodys;
    _.remove(melodys, { id: melodyId});
  },
  
  editMelody(id, melodyId, updatedMelody) {
    const tangoPlaylist = this.getTangoPlaylist(id);
    const melodys = tangoPlaylist.melodys;
    const index = melodys.findIndex(melody => melody.id === melodyId);
    melodys[index].title = updatedMelody.title;
    melodys[index].artist = updatedMelody.artist;
    melodys[index].genre = updatedMelody.genre;
    melodys[index].duration = updatedMelody.duration;
  }
};

module.exports = tangoPlaylistStore;