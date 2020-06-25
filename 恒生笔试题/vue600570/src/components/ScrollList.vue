<template>
  <div class="listWrapper">
    <div class="list">
      <div class="cell" :style="cellStyle(item)" v-for="item in listDom" :key="item">{{item}}</div>
    </div>
  </div>
</template>
<script >
import data from '../mock/scrollList'
export default {
  name: 'ScrollList',
  data () {
    return {
      cellStyle: item => ({ top: item * (50 + 10) + 10 + 'px' }),
      listData: data,
      listDom: [1, 2, 3, 4, 5]
    }
  },
  created () {
    console.log(this.listData)
  },
  methods: {}
}
</script>

<style scoped>
.listWrapper {
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  position: relative;
}
.list {
  /* width:100%; */
  display: flex;
  justify-content: center;
}
.cell {
  width: 95%;
  position: absolute;
  height: 50px;
  line-height: 50px;
  border: solid 1px #f2f2f2;
  background-color: #f2f2f2;
}
.cell:hover {
  background-color: rgba(255, 111, 0, 0.06);
  color: #ff6f00;
}
.loading {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #ff6f00;
  position: relative;
}
</style>
