<template>
  <div>
    <router-link class="text-link" :to="constructlink">
      {{account}}
      <q-tooltip content-class="bg-primary">
        Visit profile
      </q-tooltip>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'profileLink',
  props:{
    account:{
      type: String,
      default:""
    }
  },
  computed:{
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getActiveGroup: "group/getActiveGroup"
      // getActiveGroupConfig: "group/getActiveGroupConfig",
      // getCoreConfig: "group/getCoreConfig"
    }),
    constructlink(){
      if(this.account){
        return `/members/${this.getActiveGroup}/profile/${this.account}`;
      }
      else{ 
        return "";
      }
    }
  },
  data () {
    return {}
  }
}
</script>
