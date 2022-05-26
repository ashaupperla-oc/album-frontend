<template>
    <h1>Add Song</h1>
    <h4>{{ message }}</h4>
    <h4>Album : {{albumId}}</h4>
    <v-form>
       <v-text-field
            label="Title"
            v-model="song.title"
        />
        <v-text-field
            label="Description"
            v-model="song.description"
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
  name: "add-song",
  props: ['albumId'],
  data() {
    return {
      song: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: "Enter data and click save"
    };
  },
  methods: {
    saveSong() {
      var data = {
        title: this.song.title,
        description: this.song.description,
        albumId : this.albumId
      };
      SongDataService.createSong(this.albumId, data)
        .then(response => {
          this.song.id = response.data.id;
        
          this.$router.push({ name: 'view' , params: { id: this.albumId }} );
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'view' , params: { id: this.albumId }} );
    }
  }
}


</script>
<style>

</style>