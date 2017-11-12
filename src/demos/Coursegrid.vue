<template>
  <div>
    <group-title>轮机基础</group-title>
    <grid>
      <grid-item link="/courselist/1/1" :label="$t('Go to Zhenti Xuexi')">
        <img slot="icon" src="../assets/grid_icon.png">
      </grid-item>
      <grid-item :link="{ path: '/courselist/1/2'}" :label="$t('Go to Zhenti Kaoshi')">
        <img slot="icon" src="../assets/grid_icon.png">
      </grid-item>
      <grid-item link="/courselist/1/3" @on-item-click="onItemClick">
        <img slot="icon" src="../assets/grid_icon.png">
        <span slot="label">{{ $t('Go to Moni Ceshi') }}</span>
      </grid-item>
      <grid-item link="/courselist/1/4" @on-item-click="onItemClick">
        <img slot="icon" src="../assets/grid_icon.png">
        <span slot="label">{{ $t('Go to Cuoti') }}</span>
      </grid-item>
    </grid>

    <group-title>机舱管理</group-title>
    <grid>
      <grid-item link="/courselist/2/1" :label="$t('Go to Zhenti Xuexi')">
        <img slot="icon" src="../assets/grid_icon.png">
      </grid-item>
      <grid-item :link="{ path: '/courselist/2/2'}" :label="$t('Go to Zhenti Kaoshi')">
        <img slot="icon" src="../assets/grid_icon.png">
      </grid-item>
      <grid-item link="/courselist/2/3" @on-item-click="onItemClick">
        <img slot="icon" src="../assets/grid_icon.png">
        <span slot="label">{{ $t('Go to Moni Ceshi') }}</span>
      </grid-item>
      <grid-item link="/courselist/2/4" @on-item-click="onItemClick">
        <img slot="icon" src="../assets/grid_icon.png">
        <span slot="label">{{ $t('Go to Cuoti') }}</span>
      </grid-item>
    </grid>

    <group-title>轮机管理</group-title>
    <grid>
      <grid-item link="/courselist/3/1" :label="$t('Go to Zhenti Xuexi')">
        <img slot="icon" src="../assets/grid_icon.png">
      </grid-item>
      <grid-item :link="{ path: '/courselist/3/2'}" :label="$t('Go to Zhenti Kaoshi')">
        <img slot="icon" src="../assets/grid_icon.png">
      </grid-item>
      <grid-item link="/courselist/3/3" @on-item-click="onItemClick">
        <img slot="icon" src="../assets/grid_icon.png">
        <span slot="label">{{ $t('Go to Moni Ceshi') }}</span>
      </grid-item>
      <grid-item link="/courselist/3/4" @on-item-click="onItemClick">
        <img slot="icon" src="../assets/grid_icon.png">
        <span slot="label">{{ $t('Go to Cuoti') }}</span>
      </grid-item>
    </grid>

    <group-title>避碰与信号</group-title>
    <grid>
      <grid-item link="/courselist/4/1" :label="$t('Go to Zhenti Xuexi')">
        <img slot="icon" src="../assets/grid_icon.png">
      </grid-item>
      <grid-item :link="{ path: '/courselist/4/2'}" :label="$t('Go to Zhenti Kaoshi')">
        <img slot="icon" src="../assets/grid_icon.png">
      </grid-item>
      <grid-item link="/courselist/4/3" @on-item-click="onItemClick">
        <img slot="icon" src="../assets/grid_icon.png">
        <span slot="label">{{ $t('Go to Moni Ceshi') }}</span>
      </grid-item>
      <grid-item link="/courselist/4/4" @on-item-click="onItemClick">
        <img slot="icon" src="../assets/grid_icon.png">
        <span slot="label">{{ $t('Go to Cuoti') }}</span>
      </grid-item>
    </grid>
    
  </div>
</template>

<i18n>
Grid:
  zh-CN: 九宫格
Go to Cell:
  zh-CN: 跳转到Cell
Go to Zhenti Xuexi:
  zh-CN: 历年真题
Go to Zhenti Kaoshi:
  zh-CN: 顺序刷题
Go to Moni Ceshi:
  zh-CN: 模拟考试 
Go to Cuoti:
  zh-CN: 收藏题目


Custom content:
  zh-CN: 自定义内容
Custom col:
  zh-CN: 自定义列

</i18n>



<script>
import { Grid, GridItem, GroupTitle } from 'vux'

export default {
  components: {
    Grid,
    GridItem,
    GroupTitle
  },
  methods: {
    onItemClick () {
      console.log('on item click')
    }
  }
}
</script>

<style scoped>
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
</style>
