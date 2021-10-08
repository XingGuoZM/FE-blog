<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello world!",
    };
  },
  created: function () {
    console.log("create");
  },
  mounted: function () {
    console.log("mounted");
  },
};
</script>