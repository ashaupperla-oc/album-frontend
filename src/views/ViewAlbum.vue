<template>
    <h2>Album View</h2>
    <h4>{{ message }}</h4>
    <h3> {{album.title}}</h3>
    <v-btn color="success" @click="goEditAlbum()"
    >Edit</v-btn>
     <v-btn color="success" @click="goAddSong(id)"
    >Add Song</v-btn>

     <v-row>
        <v-col  cols="8"
              sm="2">
            <span class="text-h6">Title</span>
        </v-col>
        <v-col  cols="8"
              sm="4">
            <span class="text-h6">Artist</span>
        </v-col>
        <v-col  cols="8"
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="8"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      <SongDisplay
        v-for="song in songs"
        :key="song.id"
        :song="song"
        @deleteSong="goDeleteSong(song)"
        @updateSong="goEditSong(song)"
    />

   
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import SongDataService from "../services/SongDataService";
import SongDisplay from '@/components/SongDisplay.vue';
export default {
  name: "view-album",
  props: ['id'],
    components: {
        SongDisplay
    },
  data() {
    return {
      album: {},
      songs : [],
      message: "Add, Edit or Delete Songs"
    };
  },
  methods: {
    retrieveSongs() {
      AlbumDataService.get(this.id)
        .then(response => {
          this.album= response.data;
          SongDataService.getAllSongs(this.id)
            .then(response=> {
              this.songs = response.data})
            .catch(e => {
                this.message = e.response.data.message;
              });
            })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
     goEditAlbum() {
      this.$router.push({ name: 'edit', params: { id: this.id } });
    },
    goEditSong(song) {
      this.$router.push({ name: 'editSong', params: { albumId: this.id,songId: song.id} });
    },
    goAddSong() {
      this.$router.push({ name: 'addSong', params: { albumId: this.id } });
    },

    goDeleteSong(song) {
      SongDataService.deleteSong(song.albumId,song.id)
        .then( () => {
          this.retrieveSongs()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'albums' });
    }
  },
    mounted() {
    this.retrieveSongs();
  }
}
</script>

<style>
</style>