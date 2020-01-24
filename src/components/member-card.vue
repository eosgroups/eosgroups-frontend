<template lang="pug">
  div
    q-card.custodian-card
      // <pre>{{getImAliveStats}}</pre>
      q-item
        q-item-section(avatar='')
          profile-pic(:size='60')
        q-item-section
          q-item-label.text-weight-light.text-h6 {{custodian.account}}
          q-item-label(caption='') Custodian
        q-item-section(side='')
          imalive-btn(v-if='custodian.account == getAccountName')
      div(v-if='!minify')
        q-tabs.text-primary(v-model='active_tab' dense='' align='left')
          q-tab(label='Info' name='info')
            q-tab(label='Profile' name='profile')
        q-separator
          q-tab-panels(v-model='active_tab' animated='' style='height:215px')
            q-tab-panel.overflow-hidden(name='info')
              .row.q-col-gutter-xs
                q-item.col-xs-12
                  q-item-section.row.justify-center.items-center(avatar='')
                    q-circular-progress(show-value='' :value='getImAliveStats' size='35px' :thickness='0.2' color='primary' center-color='grey-2' track-color='grey-4')
                      q-icon(name='mdi-heart' size='20px' :color='`primary`' :style='`filter: grayscale(${100-getImAliveStats}%); margin-top:3px`')
                        q-tooltip(:delay='100' anchor='center right' self='center left' :offset='[10, 10]' content-class='bg-primary')
                          span
                            | Activity Level: 
                            b {{getImAliveStats.toFixed(0)}}%
                  q-item-section
                    q-item-label.text-weight-light Last Active
                    q-item-label(caption='')
                      span(v-if="!custodian.last_active.startsWith('1970')") {{custodian.last_active}}
                      span(v-else='') Not been Active Yet
                q-item.col-xs-12
                  q-item-section.row.justify-center.items-center(avatar='')
                    q-icon(name='mdi-account-plus' size='25px' color='primary')
                  q-item-section
                    q-item-label.text-weight-light Joined
                    q-item-label(caption='') {{custodian.joined}}
                q-item.col-xs-12
                  q-item-section.row.justify-center.items-center(avatar='')
                    q-icon(name='mdi-weight' size='22px' color='primary')
                  q-item-section
                    q-item-label.text-weight-light Weight
                    q-item-label(caption='') {{custodian.weight}}
                q-item.col-xs-12
                  q-item-section.row.justify-center.items-center(avatar='')
                    q-icon(name='mdi-shield-lock' size='25px' color='primary')
                  q-item-section
                    q-item-label.text-weight-light Permission
                    q-item-label(caption='') @{{custodian.authority}}
            q-tab-panel.overflow-hidden.no-padding(name='profile')
              q-scroll-area(:visible='true' :thumb-style='thumbStyle' style='height: 200px; width:100%')
                .q-px-md.q-pb-md.q-pt-xs(v-if='!profile_is_loading')
                  | {{profile_data}}
                .column.justify-center.items-center(v-else='' style='height:200px')
                  q-spinner(color='primary' size='40px')

</template>

<script>
import { mapGetters } from "vuex";

import {colors} from 'quasar';
const{getBrand} = colors;

import imaliveBtn from "components/imalive-btn";
import profilePic from "components/profile-pic"
export default {
  name: "custodianCard",
  components: {
    imaliveBtn,
    profilePic
  },
  props:{
    custodian:{
      type: Object,
      default: ()=>{return {};}
    },
    minify:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      profile_is_loading: false,
      profile_data: '',
      active_tab: "info",
      thumbStyle: {
        right: "0px",
        borderRadius: "5px",
        backgroundColor: getBrand('primary'),
        width: "5px",
        opacity: 0.75
      }
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getCoreConfig: "group/getCoreConfig"
    }),
    getImAliveStats(){
      if(this.getCoreConfig && this.getCoreConfig.conf.inactivate_cust_after_sec){
        let last_active = new Date(this.custodian.last_active+".000+00:00").getTime();
        let now = new Date().getTime();

        let imalive_period = this.getCoreConfig.conf.inactivate_cust_after_sec*1000;

        let inactive_for_ms = now - last_active;
        let perc = 100-(inactive_for_ms/imalive_period*100)
         return perc >=0 ? perc : 0;

      }

    }
  },
  methods: {
    async getProfile() {
      this.profile_is_loading =true;
      await new Promise(resolve=>{setTimeout(resolve,1000)})
      this.profile_data = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
      this.profile_is_loading = false;
    }
  },
  watch:{
    active_tab: function(newVal, oldVal){
      if(newVal == 'profile' && this.profile_data == ''){
        this.getProfile();
      }
    }
  }

};
</script>

<style >


</style>
