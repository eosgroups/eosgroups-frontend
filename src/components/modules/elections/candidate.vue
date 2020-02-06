<template>
  <div class="q-mt-md">
    <q-card class="candidate" :class="{'candidate-selected': candidate.vote}">
      <q-expansion-item class="primary-hover-list">
        <template v-slot:header>
          <q-item-section avatar>
            <profile-pic :size="60" :account="candidate.cand" :icon="getIsCustodian(candidate.cand) ? 'mdi-star' : ''"/>
          </q-item-section>

          <q-item-section>
            <div class="row justify-between">
              <q-item class="no-padding">
                <q-item-section side></q-item-section>
                <q-item-section>
                  <q-item-label class="text-capitalize text-h6 text-weight-light">{{ candidate.cand }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section side>
                  <q-icon name="mdi-vote" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Votes</q-item-label>
                  <q-item-label caption>{{ candidate.total_votes }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-item-section>

          <q-item-section side>
            <div class="row items-center">
              <q-checkbox :class="{'invisible': !(getElectionsConfig.allow_self_vote || getAccountName != candidate.cand)}" :value="candidate.vote" @input="updateVote" />
            </div>
          </q-item-section>
        </template>
          <q-separator />
          <q-card-section>
            {{candidate}}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            {{candidate.registered}}
          </q-card-section>

      <!-- {{getElectionsConfig}} -->
      </q-expansion-item>

    </q-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import profilePic from "components/profile-pic";
import {notifyError, notifySuccess} from '../../../imports/notifications.js';
export default {
  name: "listCandidates",
  components: {
    profilePic
  },
  props: {
    candidate: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getElectionsState: "elections/getElectionsState",
      getElectionsConfig: "elections/getElectionsConfig",
      getCandidates: "elections/getCandidates",
      getIsCustodian: "group/getIsCustodian"
    })
  },
  methods: {
    updateVote(e){
      console.log(e)
      if(e && this.getCandidates.filter(c => c.vote).length == this.getElectionsConfig.max_votes){
        notifyError({message:'Maximum number of votes is '+this.getElectionsConfig.max_votes});
        return;
      }
      else{
        this.candidate.vote = e;
      }
      
      // console.log(e)
    }
  },
  watch: {}
};
</script>

<style>
.candidate-selected{
  border: 2px solid var(--q-color-primary) !important;
}
.candidate{
  border: 2px solid transparent;
  transition : border 500ms ease-out;
}
</style>
