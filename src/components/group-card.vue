<template>
  <div>
    <q-card
      v-if="group.state"
      class="full-height"
      :style="{ backgroundColor: group.ui.hexcolor }"
    >
      
      <q-tab-panels v-model="view_mode"/>
      <q-tab-panel name="main" class="no-padding full-height">
      <div class="column justify-between full-height overflow-hidden">
        <div
          class="row text-uppercase justify-center items-center text-white text-weight-light"
          style="min-height:115px"
        >
          <q-img
            contain
            v-if="group.ui.logo"
            :src="group.ui.logo"
            style=" max-width:70%; filter: brightness(0) invert(1); max-height:70px"
            spinner-color="white"
          >
            <q-tooltip content-class="bg-secondary" :delay="500">
              account: {{ group.groupname }}
            </q-tooltip>
          </q-img>

          <div v-else>{{ group.groupname }}</div>
        </div>
        <group-tags :tags="group.tags" class="text-white q-mb-xs" />

        <div
          style="background: rgba(0,0,0,0.1); height:60px"
          class="full-width row justify-between items-center"
        >
          <div>
            <q-btn
              round
              :color="group.is_fav ? 'yellow' : 'white'"
              flat
              icon="star"
              size="md"
              @click="
                $store.commit('user/setFavouriteGroups', group.groupname);
                group.is_fav = !group.is_fav;
              "
            />
          </div>
          <div>
            <q-btn
              v-if="getUiUrl.startsWith('.')"
              label="Visit Group"
              :to="getUiUrl"
              flat
              size="sm"
              text-color="white"
              :style="{ backgroundColor: group.ui.hexcolor }"
            />
            <q-btn
              v-else
              label="Visit Group"
              @click="openURL(getUiUrl)"
              icon="link"
              flat
              size="sm"
              text-color="white"
              :style="{ backgroundColor: group.ui.hexcolor }"
            >
            <q-tooltip content-class="bg-secondary" :delay="500" anchor="center left" self="center right" :offset="[10, 10]">
              {{getUiUrl}}
            </q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
      </q-tab-panel>


      <!-- {{group}} -->
    </q-card>
  </div>
</template>

<script>
import { openURL } from "quasar";
import { isValidUrl } from "../imports/validators.js";
import groupTags from "components/group-tags";
export default {
  // name: 'ComponentName',
  components: {
    groupTags
  },
  props: {
    group: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      view_mode: 'main'
    };
  },
  computed:{
    getUiUrl(){
      let res = `./manage/${this.group.groupname}`;
      if(this.group.ui.custom_ui_url){
        if(isValidUrl(this.group.ui.custom_ui_url)){
          res = this.group.ui.custom_ui_url;
        }
      }
      return res;
    }
  },
  methods:{
    openURL
  }
};
</script>
