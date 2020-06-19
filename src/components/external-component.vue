<template>
  <div>
    <q-btn label="test" color="primary"></q-btn>
    {{src}}
  </div>
</template>

<script>

module.exports = {
  name: 'externalComponent',
  props:{
    src:{
      type: String,
      default: "hello"
    }
  },
  data () {
    return {

    }
  },
  methods:{

  },
  async mounted(){

  }
}
</script>
