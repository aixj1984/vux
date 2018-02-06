<template>
  <div>
    <div>
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>测试日期</th>
            <th>测试科目</th>
            <th>测试结果</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in testData" :key="i">
            <td>{{item.AddTime.substring(0,10)}}</td>
            <td>{{item.Name}}</td>
            <td>{{item.RightNum}}/{{item.QuestionNum}}={{item.RightNum*100/item.QuestionNum}}</td>
          </tr>
        </tbody>
      </x-table>
      <div style="text-align: center;  margin-top: 40px; color: #656597;" v-if="testData.length == 0">
        <p>你还没有测试记录，赶紧去试试自己的能力吧！</p>
      </div>
    </div> 
  </div>
</template>

<script>
import { XTable, LoadMore } from 'vux'

import { getTestResultList} from '../api/product/test';


export default {
  components: {
    XTable,
    LoadMore
  },
  data () {
    return {
      drawerVisibility: false, 
      testData:[],     
    }
  },
  created(){
      this.getTestResult()
  },
  methods: {
    getTestResult(index, page){
      let para = {
					page: 1,
					limit:200,
				};
        let _this = this
        this.testData = []
				getTestResultList(para).then((res) => {
          //console.log(res)
          if (res.data && res.data.code == 0){
            _this.testData = res.data.data
          }
        })
    },
  }
}
</script>