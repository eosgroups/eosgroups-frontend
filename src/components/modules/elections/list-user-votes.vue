<template>
  <div class="bg-red">
    user votes
    <div>
      {{getUserVotes}}
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "listUserVotes",
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
      getElectionsConfig: "elections/getElectionsConfig",
      getElectionsState: "elections/getElectionsState",
      getUserVotes: "elections/getUserVotes",
    })
  },
  methods: {
    async fetchUserVotes(){
      if(!this.getUserVotes && this.getAccountName && this.getElectionsContract){
        await this.$store.dispatch("elections/fetchUserVotes",{voter:this.getAccountName});
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
            this.fetchUserVotes();
          }
        }
        else{
          this.$store.commit("elections/setUserVotes", false);
        }
      }
    },

  }

};
</script>