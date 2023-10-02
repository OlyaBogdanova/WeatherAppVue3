<script setup>
import Highlights from "@/components/Highlights.vue";
import WeatherSummary from "@/components/WeatherSummary.vue";
import Coords from "@/components/Coords.vue";
import Humidity from "@/components/Humidity.vue";
import { BASE_URL, API_KEY } from "@/const/index";
import { ref, onMounted, computed } from "vue";
import { capitalizeFirstLetter } from "@/utils";
const city = ref("Paris");
const weatherInfo = ref(null);
async function getWeather() {
  const res = await fetch(
    `${BASE_URL}?q=${city.value}&units=metric&appid=${API_KEY}`
  );
  const data = await res.json();
  weatherInfo.value = data;
}
const isError = computed(() => {
  return weatherInfo.value?.cod !== 200;
});
onMounted(getWeather);
</script>

<template>
  <div class="page">
    <main class="main">
      <div class="container">
        <div class="laptop">
          <div class="sections">
            <section :class="['section', 'section-left', {'section-error':isError}]">
              <div class="info">
                <div class="city-inner">
                  <input
                    type="text"
                    class="search"
                    v-model="city"
                    @keyup.enter="getWeather"
                  />
                </div>
                <weather-summary v-if="!isError" :info="weatherInfo" />
                <div v-else class="error">
                  <div class="error-title">Ooooops!Something went wrong!</div>
                  <div v-if="weatherInfo?.message" class="error-message">{{capitalizeFirstLetter(weatherInfo?.message)}}</div>
                </div>
              </div>
            </section>
            <section v-if="!isError" class="section section-right">
              <highlights :info="weatherInfo" />
            </section>
          </div>
          <div class="sections" v-if="!isError">
            <section class="section-bottom">
              <coords :coord="weatherInfo.coord" />
            </section>
            <section class="section-bottom">
              <humidity :humidity="weatherInfo.main.humidity" />
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";
.page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px 0;
  background-color: #59585d;
}
.laptop {
  width: 100%;
  padding: 20px;
  background-color: #0e100f;
  border-radius: 25px;
}
.sections {
  display: flex;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
  }
}
.section-left {
  width: 30%;
  padding-right: 10px;
  &.section-error{
    min-width: 235px;
    width: auto;
    padding-right: 0;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding-right: 0;
  }
}
.section-right {
  width: 70%;
  padding-left: 10px;

  @media (max-width: 767px) {
    width: 100%;
    margin-top: 16px;
    padding-left: 0;
  }
}
.city-inner {
  position: relative;
  display: inline-block;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 10px;
    width: 25px;
    height: 25px;
    background: url("./assets/img/search.svg") no-repeat 50% 50%;
    background-size: contain;
    transform: translateY(50%);
    cursor: pointer;
  }
}
.info {
  height: 100%;
  padding: 16px;
  background: url("./assets/img/gradient-1.jpg") no-repeat 50% 50%;
  background-size: cover;
  border-radius: 25px;
}
.search {
  width: 100%;
  padding: 16px;
  font-family: "Inter", Arial, sans-serif;
  color: $white;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 16px;
  border: none;
  outline: none;
  cursor: pointer;
}
.section-bottom {
  width: 50%;
  margin-top: 16px;

  @media (max-width: 767px) {
    width: 100%;
  }
}

.error{
  padding-top: 20px;
  &-title{
    font-size: 18px;
    font-weight: bold;

  }
  &-message{
    padding-top: 10px;
    font-size: 14px;
  }
}
</style>
