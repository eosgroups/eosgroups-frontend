<template>
          <q-avatar :size="`${size}px`" round class="bg-grey-3">
            <q-img v-if="account" class="fit" src="~assets/test_avatar.jpg" spinner-color="primary" :spinner-size="`${size*0.8}px`" />
            <q-icon v-else name="person" color="primary" :size="`${size*0.8}px`"/>
            <q-icon
              v-if="icon"
              :name="icon"
              :color="iconColor"
              class="absolute-bottom-right bg-secondary round"
              :size="`${size*0.4}px`"
            />

            <!-- <q-badge floating color="negative">inactive</q-badge> -->
          </q-avatar>
</template>

<script>
export default {
  name: 'profilePic',
  props:{
    size:{
      type: Number,
      default: 20
    },
    icon:{
      type: String,
      default: ''
    },
    iconColor:{
      type: String,
      default: 'blue'
    },
    account:{
      type: String,
      default: ""
    }
  },
  data () {
    return {}
  }
}
</script>
<style>

</style>
