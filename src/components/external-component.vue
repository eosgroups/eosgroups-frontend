<template>
  <div>
    {{src}}
  </div>
</template>

<script>

module.exports = {
  // name: 'externalComponent',
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
