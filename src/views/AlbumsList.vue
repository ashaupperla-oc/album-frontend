<template>

    <h1>Album List</h1>
    <h4>{{ message }}</h4>
  
      <v-row >
        <v-col  cols="12"
        sm="2">
          <v-btn color = "success"
            @click="searchTitle"
          >
            Search
          </v-btn>
        </v-col>
        <v-col col="12" sm="10">
            <v-text-field density="compact" clearable
              v-model="title"/>
        </v-col> 
      </v-row>
      <v-row>
        <v-col  cols="9"
              sm="2">
            <span class="text-h6">Title</span>
        </v-col>
        <v-col  cols="9"
              sm="4">
            <span class="text-h6">Description</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">View</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      <AlbumDisplay
        v-for="album in albums"
        :key="album.id"
        :album="album"
        @deleteAlbum="goDelete(album)"
        @updateAlbum="goEdit(album)"
        @viewAlbum="goView(album)"
    />
 
  <v-btn  @click="removeAllAlbums">
    Remove All
  </v-btn>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import AlbumDisplay from '@/components/AlbumDisplay.vue';
export default {
  name: "albums-list",
  data() {
    return {
      albums: [],
      currentAlbum: null,
      currentIndex: -1,
      title: "",
      message : "Search, Edit or Delete Albums"
    };
  },
  components: {
        AlbumDisplay
    },
  methods: {
    goEdit(album) {
      this.$router.push({ name: 'edit', params: { id: album.id } });
    },
    goView(album) {
      this.$router.push({ name: 'view', params: { id: album.id } });
    },
    goDelete(album) {
      AlbumDataService.delete(album.id)
        .then( () => {
    
          this.retrieveAlbums()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    retrieveAlbums() {
      AlbumDataService.getAll()
        .then(response => {
          this.albums = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveAlbums();
      this.currentAlbum = null;
      this.currentIndex = -1;
    },
    setActiveAlbum(album, index) {
      this.currentAlbum = album;
      this.currentIndex = album ? index : -1;
    },
    removeAllAlbums() {
      AlbumDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    searchTitle() {
      AlbumDataService.findByTitle(this.title)
        .then(response => {
          this.albums = response.data;
          this.setActiveAlbum(null);
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveAlbums();
  }
};
</script>
<style>

</style>