<template>
    <h1>Add Artist</h1>
    <h4>{{ message }}</h4>
    <h4>Album : {{albumId}}</h4>
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
  name: "add-artist",
  props: ['albumId'],
  data() {
    return {
      artist: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: "Enter data and click save"
    };
  },
  methods: {
    saveArtist() {
      var data = {
        title: this.artist.title,
        description: this.artist.description,
        albumId : this.albumId
      };
      ArtistDataService.createArtist(this.albumId, data)
        .then(response => {
          this.artist.id = response.data.id;
        
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