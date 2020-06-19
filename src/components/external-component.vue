<template>
  <div>
    <q-btn label="test" color="primary" @click="fetchBalance()"></q-btn>
    
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
      res: "no"
    }
  },
  methods:{
    async fetchBalance(){
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
      
    }

  },
  async mounted(){

  }
}
</script>
