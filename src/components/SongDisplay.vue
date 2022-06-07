<template>
<v-row>
  <v-col  cols="8"
        sm="2">
      <span >{{ song.title }}</span>
  </v-col>
  <v-col  cols="8"
        sm="4">
      <span> {{ song.genre }}</span>
  </v-col>
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateSong"/>
  </v-col>
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteSong"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    song: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteSong() {
      this.$emit("deleteSong");
    },
    updateSong() {
      this.$emit("updateSong");
    }
  }
};
</script>

<style></style>
