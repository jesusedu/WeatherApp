<template>
  <q-page class="flex column" :class="bgClass">
    <div class="col q-pt-lg q-px-md">
      <q-input
        v-model="search"
        placeholder="Search"
        dark
        borderless
        @keypress.enter="getWeatherByName()"
      >
        <template v-slot:before>
          <q-icon @click="getLocation()" name="my_location" />
        </template>
        <template v-slot:append>
          <q-btn @click="getWeatherByName()" round dense flat icon="search" />
        </template>
      </q-input>
    </div>

    <template v-if="weatherData">
      <div class="col text-white text-center">
        <div class="text-h4 text-weight-light">
          {{ weatherData.name }}
        </div>
        <div class="text-h6 text-weight-light">
          {{ weatherData.weather[0].main }}
        </div>
        <div class="text-h1 text-weight-thin q-my-lg relative-position">
          <span
            >{{ Math.round(weatherData.main.temp) + String.fromCharCode(176)
            }}<sup>c</sup>
          </span>
        </div>
      </div>
      <div class="col text-center">
        <img
          :src="
            `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
          "
        />
      </div>
    </template>

    <template v-else>
      <div class="col column text-center text-white">
        <div class="col text-h2 text-weight-thin">
          Weather App
        </div>
        <q-btn class="col" flat @click="getLocation()">
          <q-icon left size="3em" name="my_location" />
          <div>Find my location</div>
        </q-btn>
      </div>
    </template>

    <div class="col skyline" />
  </q-page>
</template>

<script>
export default {
  name: "Index",
  data: () => ({
    search: "",
    weatherData: false,
    lat: null,
    lon: null
  }),
  computed: {
    bgClass() {
      if (this.weatherData) {
        if (this.weatherData.weather[0].icon.endsWith("n")) {
          return "bg-night";
        } else {
          return "bg-day";
        }
      }
    }
  },
  methods: {
    getLocation() {
      this.name = "";
      navigator.geolocation.getCurrentPosition(pos => {
        this.$q.loading.show();
        this.lat = pos.coords.latitude;
        this.lon = pos.coords.longitude;
        this.$axios
          .get(
            `${this.$store.state.Url}?lat=${this.lat}&lon=${this.lon}&appid=${this.$store.state.apiKey}&units=metric`
          )
          .then(res => {
            this.$q.loading.hide();
            this.weatherData = res.data;
          })
          .catch(error => {
            this.$q.loading.hide();
            console.error(error);
            Swal.fire("warning", "city not found", "warning");
          });
      });
    },
    getWeatherByName() {
      this.$q.loading.show();
      this.$axios
        .get(
          `${this.$store.state.Url}?q=${this.search}&appid=${this.$store.state.apiKey}&units=metric`
        )
        .then(res => {
          this.$q.loading.hide();
          this.weatherData = res.data;
        })
        .catch(error => {
          this.$q.loading.hide();
          console.error(error);
          Swal.fire("warning", "city not found", "warning");
        });
    }
  }
};
</script>

<style lang="sass">
.q-page
    background: linear-gradient(to bottom, #136a8a, #267871)
    &.bg-night
        background: linear-gradient(to bottom, #232526, #414345)
    &.bg-day
        background: linear-gradient(to bottom, #00b4db, #0083b0)
.degree
    top: -44px
.skyline
    flex: 0 0 200px
    background: url(../statics/img/skyline.png)
    background-size: contain
    background-position: center bottom
</style>
