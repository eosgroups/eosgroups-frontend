<template lang="pug">
  q-card(style="min-height:100px;")
    .row(v-if="getUserVotes").items-center
      .col
        .row
          q-card.col-auto.q-ma-sm.q-pa-sm(selectable v-for="candidate of getVoting" :key="candidate.cand")
              .row.justify-center
                q-avatar(size="xl")
                  img(:src="'https://i.pravatar.cc/100/?u=' + candidate.cand")
              p.q-pt-sm {{candidate.cand}}
      .col-auto.q-ma-sm.pulse
        .row.justify-center
          h6.no-margin {{getVoting.length}}/{{getElectionsConfig.max_votes}}
        q-btn(color="green" size="md" label="update vote" icon="mdi-vote" stack @click="issueVotes()")
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
      getCandidates: "elections/getCandidates",
    }),
    getVoting(){
      if (!this.getCandidates) return []
      return this.getCandidates.filter(el => el.vote)
    }
  },
  methods: {
    voteList(){
      return this.getVoting.map(el => el.cand).sort()
    },
    async issueVotes(){
      let action = {
        account: this.getElectionsContract,
        name: "vote",
        data: {
          voter: this.getAccountName,
          new_votes:this.voteList()
        }
      };

      let res = await this.$store.dispatch("ual/transact", { actions: [action] });
      if(res && res.transactionId && res.status == "executed"){
        this.$store.commit('user/setIsMember', true);
      }
    },
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