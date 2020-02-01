<template lang="pug">
  div.relative-position.q-pl-sm
    h6.no-margin My Votes
    .row(v-if="getVoting" style="min-height:110px;")
      .col
        transition-group.row(appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut")
          q-card.col-auto.q-ma-sm.q-pa-sm(selectable v-for="(candidate,index) of getVoting" :key="candidate.cand" :class="{pending:pendingVote(candidate.cand)}")
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
        div
          q-btn(color="info" size="md" label="update votes" :disable="!votesPending" icon="mdi-vote" stack @click="issueVotes()")
          q-tooltip(v-if="!votesPending")
            h6.no-margin add or remove votes first
          .row
            q-btn.full-width(color="red" flat size="sm" label="reset" :disable="!votesPending" icon="refresh"  @click="resetVotes()")

</template>

<style lang="scss">
  .pending{
    box-shadow: 0px 0px 10px 3px $info;
  }
</style>

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
    },
    votesPending(){
      if(!this.getUserVotes) return false
      if (this.pendingVotes.length > 0) return true
      if (this.getVoting.length != this.getUserVotes.votes.length) return true
      return false
    },
    pendingVotes(){
      if(!this.getUserVotes) return []
      let currentVotes = this.getVoting.map(el => el.cand)
      let chainVotes = this.getUserVotes.votes
      let difference = currentVotes.filter(x => !chainVotes.includes(x))
      if (difference) return difference
      else return []
    }
  },
  methods: {
    resetVotes(){
      this.getCandidates.map(cand => {
        if (this.getUserVotes.votes.some(el => el === cand.cand)) cand.vote = true
        else cand.vote = false
        return cand
      })
    },
    pendingVote(name){
      return this.pendingVotes.some(el => el === name)
    },
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