<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      navigation
      padding
      arrows
      height="350px"
    >
      <q-carousel-slide
        v-for="(photo, i) in profile_data.profile.photos"
        :key="i"
        :name="i"
        class="column no-wrap"
      >
        <q-video
          v-if="isYouTubeUrl(photo.url)===true"
          class="absolute-full"
          :src="photo.url"
        />
        <q-img
          v-else
          class="rounded-borders col-6 full-height"
          contain
          :src="photo.url"
        >
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ photo.caption }}
          </div>
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              Cannot load image
            </div>
          </template>
        </q-img>

        <!-- </div> -->
      </q-carousel-slide>
    </q-carousel>

    <!-- <pre>{{profile_data.profile.links}}</pre> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {isYouTubeUrl} from "../../imports/validators"
export default {
  // name: 'ComponentName',
  name: "profilePhotos",
  props: {
    account: {
      type: String,
      default: ""
    },
    profile_data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {},
  data() {
    return {
      slide: 0
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getActiveGroup: "group/getActiveGroup"

      // getActiveGroupConfig: "group/getActiveGroupConfig",
      // getNumberCustodians: "group/getNumberCustodians"
    })
  },
  methods:{
    isYouTubeUrl
  }
};
</script>
