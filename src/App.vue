<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <MainContainer />
    <button @click="send">Get Aapi</button>
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
    <hr />
    <div v-if="returnData">
      <h1>Hay respuesta</h1>
      {{returnData}}
    </div>
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
      loading: false,
      APIKEY: "27C734799B2BBD0050946BE5B289E79B",
      appid: "570",
      returnData: []
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
    },
    send() {
      axios
        .get(
          `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=${this.appid}&key=${this.APIKEY}&steamid=76561198269391482&format=json`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
        )
        .then(response => {
          console.log(response);
          console.log(response.data);
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
