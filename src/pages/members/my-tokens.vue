<template>
  <q-page padding class="constrain-page-width">
   <page-header title="My Tokens"/>

      <transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
        class="row q-col-gutter-md"
        tag="div"
      >
        <div
          v-for="token in myTokens" :key="token.symbol+token.contract"
          class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4"
        >
          <user-balance-card :token="token" />

        </div>
      </transition-group>
<!-- {{myTokens}}
{{getCoreConfig}} -->
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

import pageHeader from "components/page-header";
import userBalanceCard from "components/user-balance-card";

export default {
  name: "vote",
  components: {
    pageHeader,
    userBalanceCard
  },
  data() {
    return {
      myTokens: [],
      is_loading: false
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getActiveGroup: "group/getActiveGroup",
      getIsMember: "user/getIsMember",
      getCoreConfig: "group/getCoreConfig",
      // getNumberCustodians: "group/getNumberCustodians"
    })
  },
  methods: {
    async getTokens(){
      if(this.getAccountName){
        this.is_loading = true;
        this.myTokens = await this.$store.dispatch('group/fetchTokensOwnedByScope', {groupname: this.getActiveGroup, scope: this.getAccountName});
        this.is_loading = false;
      }

    },

  },
  watch: {
    getAccountName: {
      immediate: true,
      handler(newVal, oldVal) {
        if(newVal && newVal != oldVal){
          this.getTokens()
        }
      }
    }

  }

};
</script>
