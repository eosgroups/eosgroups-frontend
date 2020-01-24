<template>
  <div>
    <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <q-btn v-if="!notifications_granted" @click="enableNotifications" label="enable notifications" color="primary"/>
      
    </transition>
    <q-btn  @click="getInstanceIdToken" label="getToken" color="primary"/>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      notifications_granted: false
    }
  },
  computed:{

  },
  methods:{
    enableNotifications() {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        console.log("This browser does not support notification");
      }
      else if (Notification.permission === "granted") {
        var notification = new Notification("Notifications enabled");
      }
      else if (Notification.permission !== 'denied' || Notification.permission === "default") {
        Notification.requestPermission( (permission)=> {
          if (permission === "granted") {
            setTimeout(()=>{this.notifications_granted = true}, 600);
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            this.getInstanceIdToken();
            var notification = new Notification("Notifications enabled");
          }
        });
      }
    },

    getInstanceIdToken() {
      this.$messaging
        .getToken()
        .then(currentToken => {
          if (currentToken) {
            console.log(currentToken);
            // sendTokenToServer(currentToken);
            // updateUIForPushEnabled(currentToken);
          } else {
            // Show permission request.
            console.log(
              "No Instance ID token available. Request permission to generate one."
            );
            // Show permission UI.
            // updateUIForPushPermissionRequired();
            // setTokenSentToServer(false);
          }
        })
        .catch(err => {
          console.log("An error occurred while retrieving token. ", err);
          // showToken('Error retrieving Instance ID token. ', err);
          // setTokenSentToServer(false);
        });
    }

  },
  mounted(){
    if(Notification.permission === "granted"){
      this.notifications_granted = true;
    }
  }
}
</script>
