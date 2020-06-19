<template>
  <div>
    <q-btn label="test" color="primary" @click="fetchBalance()" :loading="is_loading"></q-btn>
    <pre>{{res}}</pre>
    
  </div>
</template>

<script>

module.exports = {
  name: 'externalComponent',
  props:{
    token:{
      type: Object,
      default: ()=>{return {contract:"eosio.token",symbol:"EOS"}}
    },
    account:{
      type: String,
      default: ""
    }
  },
  data () {
    return {
      res: "no",
      is_loading: false,
    }
  },
  methods:{
    async fetchBalance(){
      this.is_loading = true;
      let res = await this.$eos.rpc.get_table_rows({
        json: true,
        code: this.token.contract,
        scope: this.account,
        table: "accounts",
        lower_bound: this.account,
        upper_bound: this.account,
        limit: 1
      }).catch(e => false);
      if(res){
        this.res = res
      }
      else{
        return [];
      }
      this.is_loading = false;
      
    }

  },
  async mounted(){

  }
}
</script>
