<template>
  <div>
    <div>
      <!--<load-more tip="cell-bordered=false" :show-loading="false" background-color="#fbf9fe"></load-more>-->
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>测试日期</th>
            <th>测试科目</th>
            <th>测试结果</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2017-12-05</td>
            <td>船舶驾驶与管理</td>
            <td>58/160=98</td>
          </tr>
          <tr>
            <td>Banana</td>
            <td>$1.20</td>
            <td> x 2</td>
          </tr>
        </tbody>
      </x-table>
    </div> 
  </div>
</template>

<script>
import { XTable, LoadMore } from 'vux'

export default {
  components: {
    XTable,
    LoadMore
  }
}
</script>