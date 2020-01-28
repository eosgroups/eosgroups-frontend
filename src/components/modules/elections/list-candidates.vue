<template>
  <div class="bg-blue">
    candidates
    <div v-if="true">
      {{getCandidates}}
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "listCandidates",
  components: {

  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      getElectionsContract: "elections/getElectionsContract",
      getAccountName: "ual/getAccountName",
      // getElectionsConfig: "elections/getElectionsConfig",
      // getElectionsState: "elections/getElectionsState",
      getCandidates: "elections/getCandidates",
    })
  },
  methods: {
    async fetchcandidates(electioncontract){
      if(!this.getCandidates){
        this.$store.dispatch("elections/fetchCandidates", electioncontract);
      }
    }

  },

  watch: {
    getElectionsContract: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          if(newVal != oldVal){
            this.fetchcandidates(this.getElectionsContract);
          }
        }
      }
    },
  }

};
</script>