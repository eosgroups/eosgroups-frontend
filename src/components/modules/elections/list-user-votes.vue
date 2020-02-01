<template lang="pug">
  div.overflow-hidden.relative-position.q-pl-sm
    h6.no-margin My Votes
    .row(v-if="getVoting" style="min-height:110px;")
      .col
        transition-group.row(
          appear 
          enter-active-class="animated zoomIn" 
          leave-active-class="animated zoomOut"
        )
          q-card.col-auto.q-ma-sm.q-pa-sm(selectable v-for="candidate of getVoting" :key="candidate.cand")
            .absolute-top-right(style="right:-5px; top:-5px;")
              q-btn(size="xs" color="red-4" round @click="candidate.vote = false")
                q-icon(name="close" size="xs")
            .row.justify-center
              q-avatar(size="xl")
                img(:src="'https://i.pravatar.cc/100/?u=' + candidate.cand")
            p.q-pt-sm.no-margin {{candidate.cand}}
      .col-auto.q-mr-sm.pulse
        .row.justify-center
          h6.no-margin.q-pb-sm(v-if="getElectionsConfig") {{getVoting.length}}/{{getElectionsConfig.max_votes}}
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
      this.$store.dispatch("elections/fetchUserVotes",{voter:this.getAccountName});
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