<template>
  <q-page padding class="constrain-page-width">
   <page-header title="Elections"/>
   <q-tabs v-model="selected_tab" class="bg-secondary text-white" align="left" indicator-color="primary">
      <q-tab label="Vote" name="vote" />
      <div v-if="getIsMember">
        <q-tab v-if="getIsCandidate" label="my candidacy" name="manage candidacy">
          <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" appear>
            <q-badge v-if="!getIsCandidate.is_active" color="primary" floating>paused</q-badge>
          </transition>
        </q-tab>
        <q-tab v-else label="register as candidate" name="register candidacy" />
      </div>

   </q-tabs>

   <q-tab-panels v-model="selected_tab" animated class="fit bg-transparent q-mt-md" transition-prev="fade" transition-next="fade">
     <q-tab-panel name="vote" class="fit overflow-hidden no-padding" style="min-height:300px" >
      <list-user-votes />
      <list-candidates />
     </q-tab-panel>


     <q-tab-panel name="register candidacy" class="fit overflow-hidden no-padding">
       <register-candidate class="q-ma-xs" @navigate="selected_tab = $event"/>
     </q-tab-panel>

     <q-tab-panel name="manage candidacy" class="fit overflow-hidden no-padding">
       <manage-candidacy class="q-ma-xs" @navigate="selected_tab = $event"/>
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
import manageCandidacy from "components/modules/elections/manage-candidacy";

export default {
  name: "vote",
  components: {
    pageHeader,
    listUserVotes,
    listCandidates,
    registerCandidate,
    manageCandidacy
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
      getIsCandidate: "elections/getIsCandidate",
      getIsMember: "user/getIsMember"
    })
  },
  methods: {

  },
  mounted(){

  },
  watch: {
    'getElectionsContract' () { this.$store.dispatch("elections/loadElectionsRoutine")}
  }

};
</script>
