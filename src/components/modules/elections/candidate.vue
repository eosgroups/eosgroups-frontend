<template lang="pug">
  div(@click="$emit('click')")
    q-item(:clickable="clickable" :disabled="!candidate.active"
    :class="{selected:!clickable}" :v-ripple="candidate.active")
      q-item-section(avatar)
        q-avatar(size="xl")
          img(:src="'https://i.pravatar.cc/100/?u=' + candidate.cand")
      q-tooltip(v-if="!candidate.active")
        h5.no-margin Candidate is inactive
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
        q-checkbox(size="lg" v-model="candidate.vote" :disable="!candidate.active") 
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
    'candidate','viewMode','clickable'
  ],
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      getElectionsState: "elections/getElectionsState",
      getAccountName: "ual/getAccountName"
    })  
  },
  methods: {

  },
  watch: {

  }

};
</script>

<style lang="sass">
.text-overline {font-size: .95rem}
.selected { background-color: $light-green-2;}
.selected.q-item-label { color: white !important;}

</style>