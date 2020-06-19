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

  async getUserBalance() {
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
        precision: this.tokens.get(symbol).precision,
        contract: tokencontract,
      };
    } else {
      r.amount = parseFloat(r.balance.split(" ")[0]);
      r.symbol = symbol;
      r.precision = this.tokens.get(symbol).precision;
      r.contract = tokencontract;

    }
    this.res = r;
  }


  },
  async mounted(){

  }
}
</script>
