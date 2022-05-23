<template>
    <h1>Edit Artist</h1>
    <h4>{{ message }}</h4>
    <h4>Album : {{albumId}} Artist : {{artistId}}</h4>

    <v-form>
       <v-text-field
            label="Title"
            v-model="artist.title"
        />
        <v-text-field
            label="Description"
            v-model="artist.description"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveArtist()"
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
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "edit-artist",
  props: {albumId : String,artistId:String},
  data() {
    return {
      artist: Object,
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveArtist() {
      ArtistDataService.getArtist(this.albumId,this.artistId)
        .then(response => {
          this.artist= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },
    saveArtist() {
      var data = {
        title: this.artist.title,
        description: this.artist.description,
        albumId : this.artist.albumId
      };
      ArtistDataService.updateArtist(this.artist.albumId,this.artist.id, data)
        .then(response => {
          this.artist.id = response.data.id;
        
         this.$router.push({ name: 'view' , params: { id: this.artist.albumId }} );
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'view' , params: { id: this.artist.albumId }} );
    }
  },
    mounted() {
      this.retrieveArtist();
  }
}

</script>
<style>

</style>