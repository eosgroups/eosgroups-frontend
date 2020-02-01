<template lang="pug">
  div.q-ma-sm 
    .row
      .col(v-if="candiates")
        h6.no-margin Member Candidates
        .row.justify-between
          .col-auto
            p.no-margin Sort By:
            .row
              .col-auto
                q-tabs(:switch-indicator="false" shrink active-bg-color="primary" active-color="white" v-model="sortBy" align="left" indicator-color="transparent")
                  q-tab(label="Votes" name="total_votes")
                  //- q-tab(label="Registered" name="registeredMS")
                  q-tab(label="Reputation" name="rep")
              .col 
                q-btn.no-border-radius( style="height:100%" flat :icon="toggleOrderIcon" @click="toggleOrder()")
          .col-auto.gt-xs
            p.no-margin View Mode:
            q-tabs( style="width:110px;" active-bg-color="primary" active-color="white" v-model="viewMode" align="right" indicator-color="transparent")
              q-tab(icon="apps" name="grid" style="width:20px;")
              q-tab(icon="view_list" name="list" style="width:20px;") 
        div(style="flex-grow:1; height:55vh;")
          q-scroll-area(style="height:100%; flex-grow:1;")
            .row
              candidate(
                v-for="(candidate,index) of candiates" 
                :key="candidate.cand" 
                @click="highlightCandidate(candidate.cand)" 
                :candidate="candidate"
                :clickable="selectableMember(candidate.cand)" 
                :viewMode="viewMode"
                :class="{'col-12':viewMode === 'list','col-xs-12 col-sm-6':viewMode === 'grid'}")
        q-dialog(v-model="showInfoModal")
          candidateProfile
                
    //- q-page-sticky(:offset="[20,20]" )
    //-   q-btn(icon="mdi-vote" label="confirm Votes" color="green" size="lg")
    //- .row.justify-center
    //-   q-btn(size="xl" @click="issueVotes()") Update Votes
    //- .bg-blue candidates
    //-   div {{getCandidates}}
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import profilePic from "components/profile-pic"
import candidate from "components/modules/elections/candidate"
import candidateProfile from "components/modules/elections/candidate-profile"
export default {
  name: "listCandidates",
  components: { profilePic, candidate, candidateProfile },
  data() {
    return {
      viewMode:'list',
      sortBy:'rep',
      pendingUserVotes:null,
      highlightedCand:null,
      initialVotes:null,
      listOrder:false,
      showInfoModal:false
    };
  },
  computed: {
    toggleOrderIcon(){
      if (this.listOrder) return 'keyboard_arrow_up'
      else return 'keyboard_arrow_down'
    },
    ...mapGetters({
      getElectionsContract: "elections/getElectionsContract",
      getAccountName: "ual/getAccountName",
      getUserVotes: "elections/getUserVotes",
      getElectionsConfig: "elections/getElectionsConfig",
      getElectionsState: "elections/getElectionsState",
      getCandidates: "elections/getCandidates",
    }),
    candiates(){
      if (!this.getCandidates) return []
      return this.getCandidates.map(cand => { 
        this.$set(cand,'vote',false)
        if (this.getUserVotes) {
          const voting = this.getUserVotes.votes.find(el => cand.cand === el)
          if (voting) this.$set(cand,'vote',true)
        }
        this.$set(cand,'registeredPrint',new Date(cand.registered).toDateString())
        this.$set(cand,'registeredMS',Date.parse(cand.registered))
        if (cand.is_active === 1) this.$set(cand,'active',true)
        else this.$set(cand,'active',false)
        this.$set(cand,'rep',Math.floor(Math.random() * 100) + 1)
        this.$set(cand,'repColor',(()=>{
          if (cand.rep > 80) return 'green-4'
          if (cand.rep > 60) return 'light-green'
          if (cand.rep > 40) return 'amber-7'
          if (cand.rep > 20) return 'yellow-7'
          return 'red'
        })())
        return cand
      })
      .filter(cand => {
        return true
        // if (!this.getElectionsConfig) return true
        // if(this.getElectionsConfig.allow_self_vote === 0) {
        //   if (cand.cand === this.getAccountName) return false
        //   else return true
        // }
        // else return true
      }).sort((a, b) => {   
        if (this.listOrder) return (a[this.sortBy] - b[this.sortBy])
        else return (b[this.sortBy] - a[this.sortBy])   
      })
    }
  },
  methods: {
    DisableCustodian(){
      if (!this.getElectionsConfig) return true
      if(this.getElectionsConfig.allow_self_vote === 0) {
        if (cand.cand === this.getAccountName) return false
        else return true
      }
      else return true
    },
    displayCustodianInfo(custodian){

    },
    toggleOrder(){
      if (this.listOrder) this.listOrder = false
      else this.listOrder = true
    },
    reputationColor(val) {

    },
    selectableMember(cand){
      if (cand === this.highlightedCand) return false
      else return true
    },
    highlightCandidate(cand){
      this.highlightedCand = cand
    },
    async fetchcandidates(electioncontract){
      if(!this.getCandidates){
        this.$store.dispatch("elections/fetchCandidates", electioncontract);
      }
    }
  },
  watch: {
    showInfoModal(val){
      if (!val) this.highlightedCand = null
    },
    highlightedCand:{
      immediate:true,
      handler(newVal, oldVal) {
        if (!newVal) return this.showInfoModal = false
        else return this.showInfoModal = true
      }
    },
    getElectionsContract: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          if(newVal != oldVal){
            this.fetchcandidates(this.getElectionsContract);
          }
        }
      }
    }
  }

};
</script>

<style lang="sass">


</style>