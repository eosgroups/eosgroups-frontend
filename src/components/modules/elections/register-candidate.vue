<template>
  <div >
    <q-card>
    candidate {{getIsCandidate}}
    stakes: {{getUserStakes}}
    xx
    </q-card>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "registerCandidate",
  components: {

  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getIsCandidate: "elections/getIsCandidate",
      getUserStakes: "elections/getUserStakes",
      getElectionsContract: "elections/getElectionsContract"

    })
  },
  methods: {
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