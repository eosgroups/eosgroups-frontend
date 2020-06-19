<template>
  <div>
    <q-btn label="test" color="primary" @click="getUserBalance()" :loading="is_loading"></q-btn>
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

  async getUserBalance() {
    this.is_loading = true;
    let symbol = this.token.symbol;
    let query = {
      json: true,
      code: this.token.contract,
      scope: this.account,
      table: "accounts",
      limit: 1,
    };
    let r = (await this.$eos.rpc.get_table_rows(query)).rows[0];
    if (!r) {
      r = {
        balance: `0 ${symbol}`,
        amount: 0,
        symbol: symbol,
        precision: 4,
        contract: this.token.contract,
      };
    } else {
      r.amount = parseFloat(r.balance.split(" ")[0]);
      r.symbol = symbol;
      r.precision = 4;
      r.contract = this.token.contract;

    }
    this.res = r;
    this.is_loading = false;
  }


  },
  async mounted(){

  }
}
</script>
