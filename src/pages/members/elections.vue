<template>
  <q-page padding class="constrain-page-width">
   <page-header title="Elections"/>

   <q-tabs v-model="selected_tab" class="bg-secondary text-white" align="left">
      <q-tab label="Vote" name="vote" />
      <q-tab label="my candidacy" name="manage candidacy" />
   </q-tabs>

   <q-tab-panels v-model="selected_tab" animated class="fit bg-transparent q-mt-md" transition-prev="fade" transition-next="fade">
     <q-tab-panel name="vote" class="fit overflow-hidden no-padding" style="min-height:300px" >
      <list-user-votes />
      <list-candidates />
     </q-tab-panel>


     <q-tab-panel name="manage candidacy" class="fit overflow-hidden no-padding">
       <register-candidate />
     </q-tab-panel>
   </q-tab-panels>

   



  <pre>{{getElectionsConfig}}</pre>
  <pre>{{getElectionsState}}</pre>

   
   
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

import pageHeader from "components/page-header";
import listUserVotes from "components/modules/elections/list-user-votes";
import listCandidates from "components/modules/elections/list-candidates";
import registerCandidate from "components/modules/elections/register-candidate";

export default {
  name: "vote",
  components: {
    pageHeader,
    listUserVotes,
    listCandidates,
    registerCandidate
  },
  data() {
    return {
      selected_tab: "vote"
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getElectionsContract: "elections/getElectionsContract",
      getElectionsConfig: "elections/getElectionsConfig",
      getElectionsState: "elections/getElectionsState",
    })
  },
  methods: {

  },
  mounted(){
    this.$store.dispatch("elections/loadElectionsRoutine");
  },
  // watch: {
  // }

};
</script>
