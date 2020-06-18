<template>
  <div>
    <q-markdown
      
      :src="profile_data.profile.links.join('\n')"
      :no-abbreviation="false"
    >
    </q-markdown>
    <!-- <pre>{{profile_data.profile.links}}</pre> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  name: "profileLinks",
  props:{
    account:{
      type: String,
      default:""
    },
    profile_data: {
      type: Object,
      default:()=>{return {} }
    }
  },
  components: {
    
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getActiveGroup: "group/getActiveGroup",

      // getActiveGroupConfig: "group/getActiveGroupConfig",
      // getNumberCustodians: "group/getNumberCustodians"
    })
  }
}
</script>
