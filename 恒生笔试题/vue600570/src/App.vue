<template>
  <div id="app">
    <section class="listParent" @scroll="handleScroll">
      <div class="list">
        <div class="cell" v-for="item in data" :key="item.id">{{item.id}}</div>
        <img v-if="isLoading" src="./assets/loading.gif" class="loading"/>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      data: [],
      currPage: 1,
      timer: null,
      isLoading: false
    }
  },
  created () {
    this.data = this.getData()
  },
  methods: {
    getData () {
      let data = []
      for (let i = (this.currPage - 1) * 10; i < this.currPage * 10; i++) {
        data.push({id: i})
      }
      return data
    },
    handleScroll (e) {
      if (!this.timer) return
      let distance = e.target.scrollTop
      console.log(distance, this.currPage * 499)
      if (distance > this.currPage * 499) {
        this.isLoading = true
        this.currPage = this.currPage + 1
        let data = this.data
        let fetchData = this.getData()
        data = data.concat(fetchData)
        // console.log(fetchData)
        this.data = data
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.listParent{
  width:100%;
  height:500px;
  border:solid 1px #ff4747;
  display:flex;
  justify-content: center;
  overflow:auto;
  position:relative;
}
.list{
  width:80%;
  height:1000px;
  position: absolute;
}
.cell{
  width:100%;
  height:50px;
  border:solid 1px blue;
}
.loading{
  width:100px;
  height:25px;
}
</style>
