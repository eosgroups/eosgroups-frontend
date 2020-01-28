<template>
      <q-list class="primary-hover-list" :class="$q.dark.isActive? `bg-dark`:`bg-grey-3`"  :separator="!$q.dark.isActive">

        <q-item clickable :to="`/members/${getActiveGroup}/dashboard`">
          <q-item-section avatar>
            <q-icon name="mdi-view-dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable :to="`/members/${getActiveGroup}/register`">
          <q-item-section avatar>
            <q-icon name="mdi-account-plus" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Register</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="getChildByModuleName('elections')" clickable :to="`/members/${getActiveGroup}/elections`">
          <q-item-section avatar>
            <q-icon name="mdi-vote" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Elections</q-item-label>
            <!-- <q-item-label caption>mining stats</q-item-label> -->
          </q-item-section>
        </q-item>

    
      </q-list>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'managementmenu',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      getActiveGroup: "group/getActiveGroup",
      getChildByModuleName: "group/getChildByModuleName",
    })
  },

}
</script>
