<template>
  <div >
    <q-card>
      <q-card-section>
        <div class="row items-center">

          <q-item class="">
            <q-item-section>
              <q-item-label>Candidate since</q-item-label>
              <q-item-label caption>{{getIsCandidate.registered}}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="">
            <q-item-section>
              <q-item-label>My stake</q-item-label>
              <q-item-label caption v-if="getUserCandidateStake">{{getUserCandidateStake.quantity}}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="">
            <q-item-section>
              <q-item-label>My votes</q-item-label>
              <q-item-label caption >{{getIsCandidate.total_votes}}</q-item-label>
            </q-item-section>
          </q-item>

        </div>

        <div class="row justify-end q-mt-md q-pb-xs">
          <q-btn :label="getIsCandidate.is_active ? 'pause campaign' : 'start campaign'" color="primary" @click="pauseCampaign" />
          <q-btn label="unregister" color="primary" @click="unregCand" class="q-ml-md"/>
        </div>
        
      </q-card-section>
    </q-card>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "manageCandidacy",
  components: {

  },
  data() {
    return {
      quantity: ""
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getIsCandidate: "elections/getIsCandidate",
      getUserStakes: "elections/getUserStakes",
      getElectionsContract: "elections/getElectionsContract",
      getcandidateStakeConfig: "elections/getcandidateStakeConfig",
      getIsCandidate: "elections/getIsCandidate",
      getUserCandidateStake: "elections/getUserCandidateStake"

    })
  },
  methods: {
    async unregCand(){
      let unreg = {
        account: this.getElectionsContract,
        name: "unregcand",
        data:{
          candidate: this.getAccountName
        }
      }
      let actions = [unreg];
      let res = await this.$store.dispatch("ual/transact", { actions: actions, disable_signing_overlay: true });
      if(res && res.transactionId && res.status == "executed"){
        this.$store.commit("elections/removeCandidate", this.getAccountName);
        this.$emit("navigate", "register candidacy");
      }
    },
    async pauseCampaign(){
      let new_is_active = !!!this.getIsCandidate.is_active
      let pausecampaig = {
        account: this.getElectionsContract,
        name: "pausecampaig",
        data:{
          candidate: this.getAccountName,
          is_active: new_is_active
        }
      }

      let actions = [pausecampaig];
      let res = await this.$store.dispatch("ual/transact", { actions: actions, disable_signing_overlay: true });
      if(res && res.transactionId && res.status == "executed"){
        this.$store.commit("elections/togglePauseCampaign", this.getAccountName);
      }
    },
    async fetchUserStakes(){
      if(!this.getUserStakes && this.getAccountName){
        await this.$store.dispatch("elections/fetchUserStakes",{});
      }
    }
  },
  mounted(){

  },
  watch: {
    getAccountName: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          if(newVal != oldVal){
            this.fetchUserStakes();
          }
        }
        else{
          this.$store.commit("elections/setUserStakes", false);
        }
      }
    },

  }

};
</script>