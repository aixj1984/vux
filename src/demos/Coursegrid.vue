<template>
  <div>
    <div v-for="course in Courses">
      <group-title>{{course.Name}}</group-title>
      <grid>
        <grid-item :link="'/courselist/'+course.Id+'/0'" :label="$t('Go to Zhenti Xuexi')">
          <img slot="icon" src="../assets/grid_icon.png">
        </grid-item>
        <grid-item :link="'/courselist/'+course.Id+'/1'" :label="$t('Go to Zhenti Kaoshi')">
          <img slot="icon" src="../assets/grid_icon.png">
        </grid-item>
        <grid-item :link="'/courselist/'+course.Id+'/2'" >
          <img slot="icon" src="../assets/grid_icon.png">
          <span slot="label">{{ $t('Go to Moni Ceshi') }}</span>
        </grid-item>
        <grid-item :link="'/customer/collect/'+course.Id">
          <img slot="icon" src="../assets/grid_icon.png">
          <span slot="label">{{ $t('Go to Cuoti') }}</span>
        </grid-item>
      </grid>
    </div>
    <div v-if="Courses.length == 0">
      <card :header="{title: '课程提醒'}" :footer="{title: '点击设置',link:'/customer/course/buy'}">
        <p slot="content" class="card-padding">{{ $t('Shop content') }}</p>
      </card>
    </div>
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
  zh-CN: 海量题库
Go to Moni Ceshi:
  zh-CN: 模拟考试 
Go to Cuoti:
  zh-CN: 收藏题目

Product details:
  zh-CN: 商品详情

Shop content:
  zh-CN: 没配置显示的课程，点击下面的连接前往设置!

Shop Detail:
  zh-CN: 点击设置

Custom col:
  zh-CN: 自定义列

</i18n>

<script>
import { Grid, GridItem, GroupTitle, Card } from 'vux'

import { getCourseList} from '../api/product/course';

export default {
  components: {
    Grid,
    GridItem,
    GroupTitle,
    Card
  },
  data () {
    return {
      title:"abc",
      Courses: [],
    }
  },
  created(){
      this.getCustomerCourse()
  },
  methods: {
      onItemClick () {
        console.log('on item click')
      },
      getCustomerCourse() {
          let para = {
            page: 1,
            limit:500,
            customerid:1,
          };
          
          getCourseList(para).then((res) => {
            console.log(res)
            if (res.data.code != 0){
              console.log("请求错误:"+ res.data.msg)
            }else{
                this.Courses = []
                let _this = this
                res.data.data.forEach(function(value){
                  if (value.Status > 0 && value.IsDisplay == 1 ){
                    _this.Courses.push(value)
                  }
                })
            }
          }).catch(function(error){
					  console.log(error);
          });
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
.card-padding {
  padding: 15px;
}
</style>
