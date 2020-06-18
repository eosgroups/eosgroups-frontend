<template>
  <div>
    
    <q-markdown
      
      :src="profile_data.profile.text"
      :no-abbreviation="false"
    >
    </q-markdown>


    
  </div>
</template>

<script>
export default {
  name: 'profileText',
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
  data () {
    return {
    };
  },

}
</script>
<style>
.q-markdown--link{
  color: var(--q-color-primary);
}
</style>