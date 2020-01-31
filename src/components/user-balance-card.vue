<template>
      <q-card>
        <q-item>
          <q-item-section avatar>
          <q-img
            contain
            :src="token.logo"
            spinner-color="white"
            style="height: 60px; width: 60px"
          />
          </q-item-section>
          <q-item-section>
            {{token.quantity}}
          </q-item-section>
          <q-item-section side>
            <q-btn label="widthdraw" @click="" color="primary" :disabled="!!getCoreConfig.withdrawals" />
          </q-item-section>
        </q-item>
      </q-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  props:{
    token:{
      default: ()=>{return {};},
      type: Object
    }
  },
  data () {
    return {}
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
}
</script>
