<template>
  <q-page padding class="text-black">
    <!-- content -->
    <div class="center-page-content">
      <div>
        <q-input
          placeholder="Find Group"
          outlined
          v-model.trim="searchfilter"
        >
          <template v-slot:prepend>
            <q-icon name="search" class="cursor-pointer" />
          </template>
          <template v-slot:append>
            <transition-group
              appear
              enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOutRight"
              tag="div"
            >
              <q-icon
                v-if="searchfilter.length"
                name="close"
                key="has_filter"
                @click="searchfilter = ''"
                class="cursor-pointer"
              />
              <q-icon
                v-else
                key="no_filter"
                :name="menu_visible ? 'menu_open' : 'menu'"
                class="cursor-pointer"
              >
                <q-menu
                v-if="false"
                  fit
                  @before-show="menu_visible = true"
                  @hide="menu_visible = false"
                >
                  <q-list style="min-width: 100px" class="primary-hover-list">
                    <q-item clickable @click="" v-close-popup>
                      <q-item-section>New Custodian</q-item-section>
                    </q-item>
                    <q-item clickable @click="" v-close-popup>
                      <q-item-section>Remove Custodian</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </transition-group>
          </template>
        </q-input>
        <div class="q-mb-md">
          <q-tabs
            v-model="tabfilter"
            dense
            class=" text-primary"
            align="left"
            no-caps
            inline-label
          >
            <q-tab label="All" name="all" />
            <q-tab
              :label="`Favourites (${getFavouriteGroups.length})`"
              name="favourites"
              icon="star"
            />
          </q-tabs>
          <q-separator />
        </div>
      </div>

      <transition
        appear
        enter-active-class="animated fadeInDown"
        class="column q-gutter-md "
        tag="div"
      >
        <span
          class="row items-center text-grey-7"
          v-if="!getGroupsWithFilter.length"
        >
          <q-icon name="error_outline" size="24px" class="q-mr-sm" />
          No Groups found...
        </span>
      </transition>



      <transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
        class="row q-col-gutter-md"
        tag="div"
      >
        <div
          v-for="group in getGroupsWithFilter"
          :key="group.groupname"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"
        >
          <q-card
            v-if="group.state"
            class="full-height"
            :style="{ backgroundColor: group.ui.hexcolor }"
          >
            <q-card-section style="max-height:70px" class="  ">

                <q-img
                  :src="group.ui.logo"
                  style="max-width:200px; filter: brightness(0) invert(1);"
                />

     
            </q-card-section>
            <q-card-section>
              <div
                class="row text-uppercase justify-center text-white text-weight-light"
              >
                {{ group.groupname }}
              </div>
            </q-card-section>

            <q-card-section>
              <div class="row justify-between items-center">
                <q-btn
                  round
                  :color="group.is_fav ? 'yellow' : 'white'"
                  flat
                  icon="star"
                  size="lg"
                  @click="
                    $store.commit('user/setFavouriteGroups', group.groupname);
                    group.is_fav = !group.is_fav;
                  "
                />
                <q-btn
                  label="Visit Group"
                  :to="`./manage/${group.groupname}`"
                  flat
                  text-color="white"
                  :style="{ backgroundColor: group.ui.hexcolor }"
                />
              </div>
            </q-card-section>
            <!-- {{group}} -->
          </q-card>
        </div>
      </transition-group>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // name: 'LayoutName',
  components: {},
  data() {
    return {
      searchfilter: "",
      menu_visible: false,
      tabfilter: "favourites",
      location_hash: ""
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getGroups: "app/getGroups",
      getFavouriteGroups: "user/getFavouriteGroups"
    }),
    getGroupsWithFilter() {
      let res = this.getGroups;
      if (!res) return [];
      if (this.tabfilter == "all") {
        // return res;
      } else if (this.tabfilter == "favourites") {
        res = res.filter(g => g.is_fav);
      }

      if (this.searchfilter) {
        return res.filter(
          g =>
            g.groupname.includes(this.searchfilter) ||
            g.meta.about.includes(this.searchfilter)
        );
      } else {
        return res;
      }
    }
  },
  methods: {},
  mounted() {
    let hash = window.location.hash;
    if (hash) {
      this.location_hash = window.location.hash;
    } else {
      this.location_hash = window.location.hash = "#all";
    }

    console.log(this.location_hash);
    if (!this.getGroups || !this.getGroups.length) {
      this.$store.dispatch("app/fetchGroups");
    }
  },
  watch: {
    location_hash: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.tabfilter = newVal.substr(1);
        }
      }
    },
    tabfilter: {
      immediate: false,
      handler(newVal, oldVal) {
        if (newVal != oldVal && newVal) {
          window.location.hash = `#${newVal}`;
        }
      }
    }
  }
};
</script>
