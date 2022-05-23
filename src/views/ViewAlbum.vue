<template>
    <h2>Album View</h2>
    <h4>{{ message }}</h4>
    <h3> {{album.title}}</h3>
    <v-btn color="success" @click="goEditAlbum()"
    >Edit</v-btn>
     <v-btn color="success" @click="goAddArtist(id)"
    >Add Artist</v-btn>

     <v-row>
        <v-col  cols="8"
              sm="2">
            <span class="text-h6">Title</span>
        </v-col>
        <v-col  cols="8"
              sm="4">
            <span class="text-h6">Description</span>
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
      <ArtistDisplay
        v-for="artist in artists"
        :key="artist.id"
        :artist="artist"
        @deleteArtist="goDeleteArtist(artist)"
        @updateArtist="goEditArtist(artist)"
    />

   
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import ArtistDataService from "../services/ArtistDataService";
import ArtistDisplay from '@/components/ArtistDisplay.vue';
export default {
  name: "view-album",
  props: ['id'],
    components: {
        ArtistDisplay
    },
  data() {
    return {
      album: {},
      artists : [],
      message: "Add, Edit or Delete Artists"
    };
  },
  methods: {
    retrieveArtists() {
      AlbumDataService.get(this.id)
        .then(response => {
          this.album= response.data;
          ArtistDataService.getAllArtists(this.id)
            .then(response=> {
              this.artists = response.data})
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
    goEditArtist(artist) {
      this.$router.push({ name: 'editArtist', params: { albumId: this.id,artistId: artist.id} });
    },
    goAddArtist() {
      this.$router.push({ name: 'addArtist', params: { albumId: this.id } });
    },

    goDeleteArtist(artist) {
      ArtistDataService.deleteArtist(artist.albumId,artist.id)
        .then( () => {
          this.retrieveArtists()
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
    this.retrieveArtists();
  }
}
</script>

<style>
</style>