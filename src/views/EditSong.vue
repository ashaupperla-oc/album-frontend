<template>
    <h1>Edit Song</h1>
    <h4>{{ message }}</h4>
    <h4>Album : {{albumId}} Song : {{songId}}</h4>

    <v-form>
       <v-text-field
            label="Title"
            v-model="song.title"
        />
        <v-text-field
            label="Genre"
            v-model="song.genre"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveSong()"
                    >Save</v-btn
                >
            </v-col>
            <v-col col="2">
                <v-btn color="info" @click="cancel()">Cancel</v-btn>
            </v-col>
            <v-col col="2"> </v-col>
        </v-row>
    </v-form>
</template>
<script>
import SongDataService from "../services/SongDataService";
export default {
  name: "edit-song",
  props: {albumId : String,songId:String},
  data() {
    return {
      song: Object,
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveSong() {
      SongDataService.getSong(this.albumId,this.songId)
        .then(response => {
          this.song= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },
    saveSong() {
      var data = {
        title: this.song.title,
        genre: this.song.genre,
        albumId : this.song.albumId
      };
      SongDataService.updateSong(this.song.albumId,this.song.id, data)
        .then(response => {
          this.song.id = response.data.id;
        
         this.$router.push({ name: 'view' , params: { id: this.song.albumId }} );
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'view' , params: { id: this.song.albumId }} );
    }
  },
    mounted() {
      this.retrieveSong();
  }
}

</script>
<style>

</style>