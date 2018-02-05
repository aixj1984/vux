<template>
  <div>
    <panel :header="CourseTestTitle" :footer="footer" :list="TestList" :type="type" @on-img-error="onImgError"></panel>
    <div v-if="TestList.length==0">
      <msg title="非常抱歉" description="试题正在紧张的开发中，敬请期待。"  :icon="icon"></msg>
    </div>
  </div>
</template>

<i18n>
List of content with Title:
  zh-CN: 轮机基础列表

Yeah! You make it:
  zh-CN: 非常抱歉

Msg description:
  zh-CN: 试题正在紧张的开发中，敬请期待。

More:
  zh-CN: 查看更多
</i18n>

<script>
import { Panel, Group, Radio,Msg } from 'vux'

import { getCourseTestList} from '../api/product/coursetest';

var CourseMap = {
	"1":  "轮机基础",
	"2":  "轮机管理",
	"3":  "船舶辅机与电气",
	"4":  "船舶动力装置",
	"5":  "避碰与信号",
	"6":  "船舶管理",
	"7":  "航道与引航",
	"8":  "船舶操纵",
	"9":  "机舱管理",
	"10": "主推进动力装置",
	"11": "船舶驾驶与管理",
}

var TestMap = {
	"0":  "历年真题",
	"1":  "海量题库",
	"2":  "模拟测试",
}

export default {
  components: {
    Panel,
    Group,
    Radio,
    Msg
  },
  data () {
    return {
      type: '3',
      CourseId:0,
      TestType:0,
      icon:'info',
      CourseTestTitle:'轮机基础列表',
      TestList: [ 1 ],
      footer: {
        title: this.$t('more'),
        url: 'http://vux.li'
      }
    }
  },
  created () {
    console.log("test-----", this.$route.params.courseid)
    console.log("testtype-----", this.$route.params.testtype)
    this.CourseId = this.$route.params.courseid
    this.TestType =  this.$route.params.testtype
    this.CourseTestTitle = CourseMap[this.CourseId]+" / "+TestMap[this.TestType]

    this.getCourseTest()
  },
  methods: {
    onImgError (item, $event) {
      console.log(item, $event)
    },
    getCourseTest() {
        let para = {
          page: 1,
          limit:500,
          courseid:this.CourseId,
          testtype:this.TestType,
        };
        getCourseTestList(para).then((res) => {
          console.log(res)
          if (res.data.code != 0){
            console.log("请求错误:"+ res.data.msg)
          }else{
              this.TestList = []
              let _this = this
              res.data.data.forEach(function(value){
                let test= {
                  src: './static/image/list_60.jpg',
                  title: value.Title,
                  desc: value.Abstract,
                  url: _this.TestType == 2 ? '/course/test/'+_this.CourseId+"/"+value.Id : '/course/study/'+_this.CourseId+"/"+value.Id
                }
                _this.TestList.push(test)
              })
          }
        }).catch(function(error){
          console.log(error);
        });
      }
  }
}
</script>
