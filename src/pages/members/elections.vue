<template lang="pug">
 q-page.text-black.constrain-page-width(padding='')
  page-header(title='Elections')
  div
    small Vote for Custodian Candidates
    .row(syle="height:200px;")
      .col
        .row
          .col-auto
            p.no-margin My Votes {{votedCandidates.length}} / 3
          .col-auto.on-right
            p.no-margin My Vote Weight: 10
        .row
          .col-4(v-for="voted of votedCandidates" :key="voted.account")
            q-card.q-pa-sm.q-ma-sm.rounded-borders
              .row.items-center
                .col-auto
                  q-avatar.no-margin
                    img(:src="'https://i.pravatar.cc/100/?u=' + voted.account" style="width:30px; height:auto;")
                .col-6.ellipsis
                  small.no-margin {{voted.account}}
                .col
                  q-btn(round size="xs" flat color="red")
                    q-icon(name="close" @click="removeVote(voted)")
                
      .col-3
        p.no-margin Skill Distribution
        .row.justify-center
          .col-12
            .row(v-for="(skill,index) of skills" :key="skill")
              p.no-margin {{skill}}
              q-linear-progress(:value="voteChartData[index]").full-width

    .row(style="height:500px;")
      .col.relative-position
        p.no-margin Member Candidates
        div(style="height:100ph; bottom:0px;").absolute-position
          q-scroll-area(style="height:400px;" :visible="true").full-width
            q-list
              q-item(:clickable="selectableMember(index)" 
              :class="{selected:!selectableMember(index)}" 
              v-ripple v-for="(candidate,index) of candidates" 
              :key="candidate.account" @click="highlightCandidate(index)")
                q-item-section(avatar)
                  q-avatar(size="lg")
                    img(:src="'https://i.pravatar.cc/100/?u=' + candidate.account")
                q-item-section
                  q-item-label(overline) {{candidate.profile.name}} {{candidate.profile.surname}}
                  q-item-label.text-grey-7 {{candidate.account}}
                  q-img()
                q-item-section(side)
                  q-checkbox(size="lg" v-model="candidate.vote") 
      .col
        p.no-margin Member Details
        q-card.my-card(flat bordered v-if="activeMember")
          q-scroll-area(style="height:400px;" :visible="true").full-width
            .row.justify-center
              .col-auto
                q-avatar(size="100px")
                  img(:src="'https://i.pravatar.cc/100/?u=' + activeMember.account")
            .row.justify-center
              h5.no-margin {{activeMember.profile.name}} {{activeMember.profile.surname}}
            .row
              .col
                strong.no-margin.q-pl-md Introduction
                div.q-ma-md
                  p.no-margin {{lorem}}
              .col-4
                strong.no-margin Member Skills
                .row.justify-center
                  .col-12
                    .row(v-for="(skill,index) of activeMember.skills" :key="index")
                      p.no-margin {{skills[index]}}
                      q-linear-progress(:value="normalize(skill,10,0)").full-width
            .row.justify-center
              .col-auto
                h6.no-margin Recent Activity
            .row
              q-list(dense)
                .row(v-for="(activity,index) of activities" :key="index" style="height:auto overflow:auto;").items-center
                  .col-auto.q-pa-md
                    q-icon(name="check" size="md")
                  .col.q-pa-md
                    p.no-margin {{activity.description}}
                    a(:href="activity.details") details


          //- q-item
          //-   q-item-section(avatar='')
          //-                 q-item-section
          //-     q-item-label {{activeMember.profile.name}} {{activeMember.profile.surname}}
          //-     q-item-label(caption)
          //-       | {{activeMember.account}}

</template>

<style lang="sass">
  .text-overline {font-size: .95rem;}
  .selected {background-color: #7DC6EC;}
</style>

<script>
import { mapGetters } from "vuex";
import pageHeader from "components/page-header"
import { isValidAccountName, isExistingAccountName } from "../../imports/validators";
import {candidates,lorem} from "../../store/fakeData"

const normalize = function(val, max, min) { return (val - min) / (max - min); }


export default {
  // name: 'LayoutName',
  components: {
    pageHeader,
  },
  data() {
    return {
      lorem,
      candidates,
      highlightedIndex:0,
      activities:[
        {
          skill:0,
          icon:"check",
          description:"amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
          details:""
        },{
          skill:0,
          icon:"check",
          description:"amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
          details:""
        },
        {
          skill:0,
          icon:"check",
          description:"amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
          details:""
        }
      ],
      skills:[
        'Governance',
        'Marketing',
        'Developement',
        'Management',
        'Leadership',
        'Reputation'
      ]
    }
  },
  computed: {
    voteChartData(){
      if (this.votedCandidates.length <=0) return [0,0,0,0,0]
      return this.skills.map((el,i) => {
        return normalize(this.votedCandidates.reduce((acc,cand) => acc += cand.skills[i],0),100,0)
      })
    },
    activeMember(){
      return this.candidates[this.highlightedIndex]
    },
    votedCandidates(){
      return candidates.filter(el => el.vote)
    }
  },
  methods: {
    normalize,
    removeVote(member){
      member.vote = false
    },
    selectableMember(index) {
      if (index === this.highlightedIndex) return false
      else return true
    },
    highlightCandidate(index) {
      this.highlightedIndex = index
    }
  }
   
}
</script>