<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <profile-pic
              :size="110"
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
    </q-card>
    <q-card v-if="profile_data">
      <q-card-section class="q-mt-md"  >
        <!-- {{profile_data}} -->
      <q-tabs  v-model="active_tab" class="text-primary" dense align="left">
        <q-tab v-if="account == getAccountName" label="(Edit)" name="textedit"  />
        <q-tab :label="`Profile`" name="profiletext"  />
        <q-tab :label="`Links (${profile_data.profile.links.length})`" name="profilelinks" />
        <q-tab :label="`Gallery (${profile_data.profile.photos.length})`" name="profilephotos" />
        <q-tab :label="`Files (${profile_data.profile.files.length})`" name="profilefiles" />
        
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="active_tab" animated transition-prev="fade" transition-next="fade">
        <q-tab-panel name="textedit" class="overflow-hidden">
          <text-edit :account="account" :profile_data="profile_data" />
        </q-tab-panel>
        <q-tab-panel name="profiletext" class="overflow-hidden">
          <profile-text :account="account" :profile_data="profile_data" />
        </q-tab-panel>
        <q-tab-panel name="profilelinks" class="overflow-hidden">
          <profile-links :account="account" :profile_data="profile_data" />
        </q-tab-panel>
        <q-tab-panel name="profilefiles" class="overflow-hidden">
          <profile-files :account="account" :profile_data="profile_data" />
        </q-tab-panel>
        <q-tab-panel name="profilephotos" class="overflow-hidden">
          <profile-photos :account="account" :profile_data="profile_data" />
        </q-tab-panel>
      </q-tab-panels>
      
      <div class="row justify-between items-center">
        <div v-if="profile_data" class="text-caption text-grey">
          <date-string prepend="Updated" :date="profile_data.last_update" />
        </div>
        <div v-if="profile_data" class="text-caption">
            <q-btn label="update" color="primary" />
        </div>
      </div>
      <!-- {{profile_data}} -->
      </q-card-section>
    </q-card> 
    <external-component  src="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"/>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import profilePic from "components/profile-pic";
import updateProfilePic from "components/update-profile-pic";
import profileText from "components/profile_data/profile-text";
import profileLinks from "components/profile_data/profile-links";
import profileFiles from "components/profile_data/profile-files";
import profilePhotos from "components/profile_data/profile-photos";
import textEdit from "components/profile_data/text-edit";
import dateString from "components/date-string";
//window.httpVueLoader('http://localhost:8080/statics/test_component.vue')
export default {
  name: "profile",
  components: {
    profilePic,
    updateProfilePic,
    profileText,
    profileLinks,
    profileFiles,
    profilePhotos,
    textEdit,
    dateString,
    externalComponent: window.httpVueLoader("https://raw.githubusercontent.com/eosgroups/eosgroups-frontend/master/src/components/external-component.vue")
    // externalComponent: window.httpVueLoader("https://raw.githack.com/eosgroups/eosgroups-frontend/master/src/components/external-component.vue")
  
  },
  data() {
    return {
      profile_data: null,
      account: null,
      edit_avatar: false,
      active_tab:"profiletext"

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
      async handler(newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.account = newVal;
          this.profile_data = await this.$store.dispatch("group/fetchProfile", this.account);
          //console.log(this.profile_data)

          
        } else {
          //this.$store.dispatch('user/loggedOutRoutine');
        }
      }
    }
  }
};
</script>
