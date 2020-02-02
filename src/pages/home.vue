<template>
  <q-page class=" bg-dark full-height">
    <!-- <div class="diagonal"></div> -->
    <div class="header_box relative-position">
      <!-- https://svg-clipart.com/blue/P9e4bp8-crowd-clipart -->
      <!-- ./statics/images/bg.jpg -->
      <q-parallax src="statics/images/bg.jpg" :height="500">
        <div class="text-center text-primary" style="">
          <div
            style="background:#272822F2"
            class=" text-h3  text-white text-uppercase text-weight-light"
          >
            eosio Group accounts
          </div>
          <div class=" bg-primary text-secondary text-weight-bold" style="font-size:17px">
            Start As Group - Proceed As DAC
          </div>

          <split-btn />
        </div>
      </q-parallax>
    </div>

    <div class="center-page-content q-pa-md">
      <div class="row justify-center">
        <img src="~assets/daclify-d-transparent.svg" style="width:300px" />
      </div>
      <!-- <comparison-table /> -->
    </div>



  </q-page>
</template>

<style></style>

<script>
import { mapGetters } from "vuex";
import splitBtn from "components/split-btn";
import comparisonTable from "components/home/comparison-table";

export default {
  name: "PageIndex",
  components: {
    splitBtn,
    comparisonTable
    
  },
  data() {
    return {
      showYouTubeVideo: false,
      video_is_loaded: false
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",

    })
  },
  methods: {
    dologin() {}
  }
};
</script>

<style>
.diagonal {
  height: 400px;
  background-image: url("../statics/images/diagonal.svg");
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: -30px;
}
.bottom-info-box {
  width: 304px;
  height: 177px;
  border: 1px solid var(--q-color-secondary);
  border-radius: 8px;
  box-sizing: border-box;
}
.header_box {
  border-bottom: 5px solid var(--q-color-primary);
}
</style>
