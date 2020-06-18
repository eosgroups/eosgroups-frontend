<template>
  <div>
    {{profile_data.profile}}
    {{profile_data.last_update}}
    
  </div>
</template>

<script>
export default {
  name: 'profileData',
  props:{
    account:{
      type: String,
      default:""
    }
  },
  data () {
    return {
      profile_data: null
    }
  },
  watch: {
    "account": {
      immediate: true,
      async handler(newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.profile_data = await this.$store.dispatch("group/fetchProfile", this.account);
          
        } else {
          //this.$store.dispatch('user/loggedOutRoutine');
        }
      }
    }
  }
}
</script>
