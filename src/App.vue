<template>
  <div id="q-app">
    <ual :appName= "appName" :chains="chains" :authenticators="authenticators" ref="ual-component"/>
    <router-view />
  </div>
</template>

<script>
import ual from "components/ual/ual";
import { Scatter } from 'ual-scatter';
import { Ledger } from 'ual-ledger';
import { Lynx } from 'ual-lynx';
import { TokenPocket } from 'ual-token-pocket';
import { EOSIOAuth } from 'ual-eosio-reference-authenticator';



const appName = 'daclify';
// const chains = [{
//     chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
//     rpcEndpoints: [{
//         protocol: 'https',
//         host: 'api.eostitan.com',
//         port: '443',
//     }]
// }];
const chains = [{
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    rpcEndpoints: [{
        protocol: 'https',
        host: 'jungle2.cryptolions.io',
        port: 443,
    }]
}];

import { mapGetters } from "vuex";
import {notifyError, notifySuccess} from './imports/notifications.js';
export default {
  name: 'App',
  components:{ual},
  data () {
    return {
      appName: appName,
      authenticators:[
        new Scatter(chains, {appName: appName}),
        new Ledger(chains),
        new Lynx(chains, { appName: appName }),
        new TokenPocket(chains),
        new EOSIOAuth(chains, { appName, protocol: 'eosio' })
      ],
      chains: chains
    }
  },
  computed: {
    ...mapGetters({
      getActiveGroup: "group/getActiveGroup",
      getAccountName: "ual/getAccountName",
      getIsDark: "user/getIsDark"
    })
  },
  mounted(){
    this.$store.dispatch('app/initRoutine');

  },
  created(){
    this.$messaging.onMessage((payload) =>{
      //messsage handling when app focused
      console.log( payload);
      if(payload.data.type ="propose" && !payload.notification.body.includes(this.getAccountName)){
        this.$store.dispatch('group/fetchProposals', {groupname: this.getActiveGroup, scope: this.getActiveGroup});
        notifySuccess({message:`${payload.notification.body}`});
      }
      // ...
    });
  },


  watch: {
    getAccountName: {
      immediate: true,
      handler(newVal, oldVal) {
        if(newVal){
          console.log(`call logged in routine for ${newVal}`);
          this.$store.dispatch('user/loggedInRoutine', {accountname: this.getAccountName});
        }
        else{
          this.$store.dispatch('user/loggedOutRoutine');
        }
      }
    },
    getIsDark: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log('night mode', this.getIsDark)
        if(newVal!==undefined && newVal != oldVal){
          this.$q.dark.set(newVal);
        }
      }
    },
  }

}
</script>

<style>
</style>
