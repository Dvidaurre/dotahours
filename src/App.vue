<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <MainContainer />
    <button @click="getData">Click here</button>
    {{info}}
    <hr />
    <p v-if="loading">Cargando información...</p>
    <h3 v-else>
      <div :key="p" v-for="(player,p) in players">
        <h1>
          <a :href="player.profileurl">{% raw %}{{ player.personaname }}{% endraw %}</a>
        </h1>
        <p>
          steamID64:
          <b>{% raw %}{{ player.steamid }}{% endraw %}</b>
        </p>
        <img :src="player.avatarfull" />
      </div>
    </h3>
  </div>
</template>
<script>
import axios from "axios";
import MainContainer from "./components/MainContainer.vue";

export default {
  name: "app",
  components: {
    MainContainer
  },
  created() {
    this.getAPIdata();
    this.loading = true;
  },

  data() {
    return {
      players: [],
      loading: false
    };
  },

  methods: {
    getAPIdata() {
      var url =
        "/api/ISteamUser/GetPlayerSummaries/v2/?key={API_KEY}&steamids={STEAM_ID}";
      axios
        .get(url)
        .then(response => {
          console.log(response);
          this.players = response.data.response.players;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

////Key: 27C734799B2BBD0050946BE5B289E79B
//Domain Name: https://stupefied-poincare-350dd5.netlify.com/
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
