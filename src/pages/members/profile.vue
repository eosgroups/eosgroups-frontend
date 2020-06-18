<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <profile-pic
              :size="140"
              iconColor="white"
              iconBackground="bg-primary"
              :account="account"
              :tooltip="false"
              :icon="account == getAccountName ? 'mdi-plus' : ''"
              @iconClick="edit_avatar=!edit_avatar"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-light text-h4">{{
              account
            }}</q-item-label>
            <q-item-label v-if="getIsCustodian(account)" caption
              >Custodian</q-item-label
            >
          </q-item-section>
          <!-- <q-item-section side>
            <imalive-btn v-if="custodian.account == getAccountName" />
          </q-item-section> -->
        </q-item>
        <transition appear enter-active-class="animated fadeInDown" leave-active-class="animated fadeOut">
          <update-profile-pic v-if="edit_avatar" @updated="edit_avatar=false" />
        </transition>
      </q-card-section>
      <profile-data :account="account" />
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import profilePic from "components/profile-pic";
import updateProfilePic from "components/update-profile-pic";
import profileData from "components/profile-data";
export default {
  name: "profile",
  components: {
    profilePic,
    updateProfilePic,
    profileData
  },
  data() {
    return {
      account: null,
      edit_avatar: false,

    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getActiveGroup: "group/getActiveGroup",
      getIsCustodian: "group/getIsCustodian"
      // getActiveGroupConfig: "group/getActiveGroupConfig",
      // getCoreConfig: "group/getCoreConfig"
    })
  },
  mounted(){
    
  },
  watch: {
    "$route.params.accountname": {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.account = newVal;
          
        } else {
          //this.$store.dispatch('user/loggedOutRoutine');
        }
      }
    }
  }
};
</script>
