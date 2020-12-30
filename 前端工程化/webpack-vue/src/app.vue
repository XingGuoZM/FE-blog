<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  },
  template: '<div>hello Vue</div>',
    created:function(){
      alert('created')
      // alert(1)
    },
    mounted:function(){
      console.log(document.querySelector('#root'))
      // alert('mounted')
    }
}
</script>

<style>
.example {
  color: red;
}
</style>