<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <MainContainer />
    <button @click="getData">Click here</button>
    {{info}}
    <hr />
    <div id="app">
      <hr />
      <h1>Bitcoin Price Index</h1>
      <div v-for="currency in info" class="currency">
        {{ currency.description }}:
        <span class="lighten">
          <span v-html="currency.symbol"></span>
          {{ currency.rate_float | currencydecimal }}
        </span>
      </div>
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
  data() {
    return {
      info: null
    };
  },
  methods: {
    getData() {
      axios
        .get("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(response => (this.info = response.data.bpi));
    }
  },
  mounted() {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(response => {
        this.info = response.data.bpi;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};

////Key: 824262B54AC9C7A3086050AC3DA3EF8C
//Domain Name: gnomypets.com
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
