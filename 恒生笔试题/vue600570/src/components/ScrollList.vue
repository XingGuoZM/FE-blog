<template>
  <div class="listWrapper" id='list'>
    <div class="list" :style="{height:listHeight+'px'}">
      <div class="cell" :style="handleCellStyle(item)" v-for="item in listDom" :key="item">{{item}}</div>
    </div>
  </div>
</template>
<script >
export default {
  name: 'ScrollList',
  data () {
    return {
      listData: [],
      listDom: [],
      fetchHeight: 580,
      listHeight: 500,
      currPage: 1,
      pageSize: 20,
      currData: [],
      preDistance: 0,

      currSelected: -1
    }
  },
  created () {
    this.getDom()
    this.getData()
  },
  mounted () {
    document.getElementById('list').addEventListener('scroll', this.handleScroll)
  },
  methods: {
    getDom () {
      let arr = []
      for (let i = 0; i < this.pageSize; i++) { arr.push(i) }
      this.listDom = arr
    },
    getData () {
      let data = []
      let all = JSON.parse(JSON.stringify(this.listData))
      for (let i = 0; i < this.pageSize; i++) {
        let count = i + (this.currPage - 1) * this.pageSize
        let item = '第 ' + count + ' 条数据'
        data.push(item)
      }
      all.push(data)
      this.currData = data
      this.listData = all
    },
    handleCellStyle (item) {
      return ({ top: item * (50 + 10) + 10 + (this.currPage - 1) * this.fetchHeight + 'px' })
    },
    handleScroll (e) {
      const distance = e.target.scrollTop
      // 滚动方向
      const scrollDirection = distance - this.preDistance
      this.preDistance = distance
      if (distance >= this.fetchHeight * this.currPage && scrollDirection > 0) {
        this.currPage += 1
        let listHeight = this.listHeight + 1000
        let currData = this.listData[this.currPage - 2]
        this.listHeight = listHeight
        this.currData = currData
        this.getData()
      }
      // 向下滚动
      if (distance <= this.fetchHeight * (this.currPage - 1) && scrollDirection < 0) {
        this.currPage = (this.currPage - 1 < 1) ? 1 : (this.currPage - 1)
        let currData = this.listData[this.currPage - 1]
        this.currData = currData
      }
    }
  }
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
