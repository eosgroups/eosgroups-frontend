<template>
  <div>
    <q-item>
      <q-item-section side>
        <q-btn color="primary" round @click="openClapModal">
          <!-- <q-icon name="img:statics/vectors/clap.svg" size="30px"/> -->
          <q-icon name="mdi-thumb-up" class="hover-rotate" />
        </q-btn>
      </q-item-section>
      <q-item-section>
        <q-item-label>Clap For Group</q-item-label>
        <q-item-label caption>{{getActiveGroupConfig.claps}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-dialog v-model="clap_modal">
      <q-card class="overflow-hidden" style="min-width:350px; ">
        <q-card-section>
            <page-header :title="`Clap for group`"/>
            <q-btn icon="close" flat round dense v-close-popup class="q-ma-md absolute-top-right"/>
            <div class="q-mt-md">
                <div class="row items-center">
                  <q-icon name="mdi-thumb-up" class="q-mr-sm" />
                  +{{clap_amount}}
                </div>
                <q-slider
                  v-model="clap_amount"
                  :min="1"
                  :max="100000"
                  :label-always="false"
                  :label="false"
                  label-color="primary"
                  :label-value="clap_amount/10000 +' EOS'"
                  color="primary"
                />
                <q-input :value="clap_amount/10000" outlined dense readonly>
                  <template v-slot:append>
                    EOS
                  </template>
                </q-input>
                <q-btn label="clap" class="q-mt-md full-width" color="primary" @click="transferClaps" :loading="getIsTransacting"/>
           
            </div>

        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "components/page-header";
export default {
  // name: 'ComponentName',
  components:{
    pageHeader
  },
  data() {
    return {
      clap_modal: false,
      clap_amount: 5000
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getActiveGroup: "group/getActiveGroup",
      getActiveGroupConfig: "group/getActiveGroupConfig",
      getIsDark: "user/getIsDark",
      getAppConfig: "app/getAppConfig",
      getIsTransacting: "ual/getIsTransacting"
    })
  },
  methods:{
    openClapModal(){
      if(this.getAccountName){
        this.clap_modal=true;
      }
    },
    async transferClaps(){
      let action = {
        account: "eosio.token",
        name: "transfer",
        data:{
          from: this.getAccountName,
          to: this.getAppConfig.groups_contract,
          quantity: `${(this.clap_amount/10000).toFixed(4)} EOS`,
          memo: `clap for group: ${this.getActiveGroup}`
        }
      };
      let res = await this.$store.dispatch("ual/transact", { actions: [action], disable_signing_overlay: true });
      if(res && res.transactionId && res.status == "executed"){
        this.clap_modal = false;
        this.clap_amount = 5000;
        this.$store.commit('group/setClaps', this.getActiveGroupConfig.claps+this.clap_amount);
      }
      else{
        return false;
      }
    }
  }
};
</script>
