<template>
   <div class="bb">
     <div class="title">我的订单</div>
     <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
       <van-list
         v-model="loading"
         :finished="finished"
         finished-text="没有更多了"
         @load="onLoad"
       >
         <div class="order_item van-clearfix" v-for="(order,index) in list" :key="index" :title="index" >
           <span>运单号码：{{order.waybill}}</span>
           <span>寄件人：{{order.sender }} {{order.senderMobile}}</span>
           <span>寄件人地址：{{order.senderAddress}}}</span>
           <span>收件人：{{order.receiver}}  {{order.receiverMobile}}</span>
           <span>收件人地址：{{order.receiveAddress}}</span>
           <span>下单重量:{{order.weight}}kg   计费重量{{order.realWeight}}kg</span>
           <div>
             <span>运费明细</span>
             <span>快递费{{order.freightSub}}  保价费{{order.freightInsured}} 耗材费{{freightHaocai}}</span>
           </div>
           <div>
             <span>收取明细</span>
             <span>总费{{order.customerFreight}}  下单费({{order.customerFreightType}})</span>
           </div>
         </div>
       </van-list>
     </van-pull-refresh>
   </div>
</template>

<script>

export default {
  name: 'Order',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    onLoad () {
      this.$fetch('/jdserver2/api/v1/order/getLinkOrderListPage/1/30?billType=' + encodeURI('billType=全部&senderProvince=&senderMobile=&receiveProvince=&receiverMobile=&senderCity=&receiveCity=&sender=&receiver=&weight=&printStatus=all&id=&linkName=yywl-袁宇进&waybills=&shipbill=&startDate=2021-07-06&endDate=2021-07-14&pageIndex=1&pageSize=30'), '')
        .then((res) => {
          let re = res['result']
          if (re && re['list']['records']) {
            let recordList = re['list']['records']
            for (let i = 0; i < recordList.length; i++) {
              this.list.push(recordList[i])
            }
          }
          console.dir(this.list)
          this.loading = false
          this.refreshing = false
        })
    },
    onRefresh () {
      console.log('率先你')
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style scoped>
  .bb {
    height: 100vh;
  }
  .title {
    height: 3rem;
    line-height: 3rem;
    color: white;
    background-color: #317ee7;
    margin-bottom: 10px;
    text-align: center;
  }

  .order_item {
    background-color: white;
    margin: 1rem 1rem 0;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  .order_item span {
    display: block;
    margin-bottom: 0.2rem;
  }
</style>
