<template lang="pug">
  div(:class="{disable:disable}")
    q-item(:clickable="clickable && !disable"
    :class="{selected:!clickable,disable:disable}" :v-ripple="clickable && !disable" @click="$emit('click')")
      q-item-section(avatar)
        q-avatar(size="xl")
          img(:src="'https://i.pravatar.cc/100/?u=' + candidate.cand")
      q-tooltip(v-if="disable")
        h6.no-margin {{tooltipText}}
      q-item-section()
        .row.items-center
          .col-auto.on-left(style="min-width:150px;")
            q-item-label()
              h6.no-margin {{candidate.cand}}
          .col-auto
            .row.justify-center.full-width.relative-position
              .col
                h5.no-margin.text-center {{candidate.rep}}
                  q-circular-progress.q-ma-xs(:value="candidate.rep" size="35px" :thickness=".5" :color="candidate.repColor" track-color="grey" center-color="white")
            .row.justify-center.full-width
              .small Reputation
      q-item-section(side)
        .row.items-center
          q-icon(name="mdi-vote" size="40px")
          h5.no-margin {{candidate.total_votes}}
        .row.justify-center.full-width
          .small Votes
      q-item-section(side)
        q-checkbox(size="lg" v-model="candidate.vote" :disable="!candidate.active || disable || (voteMax && !candidate.vote)") 
        q-tooltip(v-if="(voteMax && !candidate.vote)")
          h6.no-margin You have reached the maximum number of votes for this group.
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import profilePic from "components/profile-pic"
export default {
  name: "listCandidates",
  components: {
    profilePic
  },
  props:[
    'candidate','viewMode','clickable','voteMax'
  ],
  data() {
    return {
      tooltipText:null
    };
  },
  computed: {
    ...mapGetters({
      getElectionsState: "elections/getElectionsState",
      getAccountName: "ual/getAccountName",
      getElectionsConfig: "elections/getElectionsConfig"
    }),
    disable(){
      if (!this.getElectionsConfig || !this.candidate) return false
      if(this.getElectionsConfig.allow_self_vote === 0) {
        if (this.candidate.cand === this.getAccountName) {
          this.tooltipText = "You can't vote for yourself"
          return true
        }
        else return false
      }
      else return false
    }
  },
  methods: {

  },
  watch: {

  }

};
</script>

<style lang="scss" scoped>
.text-overline {font-size: .95rem}
.selected { background-color: $light-green-2;}
.selected.q-item-label { color: white !important;}
.disable { background-color:$grey-5;}
</style>