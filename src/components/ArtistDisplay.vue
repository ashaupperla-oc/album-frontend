<template>
<v-row>
  <v-col  cols="8"
        sm="2">
      <span >{{ artist.title }}</span>
  </v-col>
  <v-col  cols="8"
        sm="4">
      <span> {{ artist.description }}</span>
  </v-col>
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateArtist"/>
  </v-col>
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteArtist"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    artist: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteArtist() {
      this.$emit("deleteAlbum");
    },
    updateArtist() {
      this.$emit("updateAlbum");
    }
  }
};
</script>

<style></style>
