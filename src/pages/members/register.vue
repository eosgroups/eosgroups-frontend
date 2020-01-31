<template>
  <q-page padding class="constrain-page-width">
   <page-header title="Member Registration"/>
   <q-card>
     <q-card-section>
       <div class="row justify-end">
        <q-btn v-if="!getIsMember" label="register" color="primary" @click="regmember" />
        <q-btn v-else label="unregister" color="primary" @click="unregmember" />
       </div>
      <!-- <div>
      <q-checkbox v-model="agree_terms" label="I have read and I agree to the user terms." />
      </div> -->
     </q-card-section>
   </q-card>

  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

import pageHeader from "components/page-header";

export default {
  name: "vote",
  components: {
    pageHeader
  },
  data() {
    return {
      agree_terms: false
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getActiveGroup: "group/getActiveGroup",
      getIsMember: "user/getIsMember"
      // getActiveGroupConfig: "group/getActiveGroupConfig",
      // getNumberCustodians: "group/getNumberCustodians"
    })
  },
  methods: {
    async regmember(){
      let action = {
        account: this.getActiveGroup,
        name: "regmember",
        data: {
          actor: this.getAccountName
        }
      };

      let res = await this.$store.dispatch("ual/transact", { actions: [action] });
      if(res && res.transactionId && res.status == "executed"){
        this.$store.commit('user/setIsMember', true);
      }

    },
    async unregmember(){
      let action = {
        account: this.getActiveGroup,
        name: "unregmember",
        data: {
          actor: this.getAccountName
        }
      };

      let res = await this.$store.dispatch("ual/transact", { actions: [action] });
      if(res && res.transactionId && res.status == "executed"){
        this.$store.commit('user/setIsMember', false);
      }

    }
  }

};
</script>
