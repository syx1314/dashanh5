<template>
   <div id='app'>
     <div class='title'>
       <span>{{title}}寄快递</span>
     </div>
     <div class='card'>
       <div class='send'>
            <div class="icon_box">
              <img src='https://cdn.kuaidi100.com/images/m/dispatch/ico_send.png'>
            </div>
            <div class='address_info' @click='selSendAddress'>
              <div v-if="sendName">{{sendName}} {{sendPhone}}</div>
              <div v-else>新建寄件人</div>
              <div>{{goAddress ? goAddress : '请输入寄件地址'}}</div>
            </div>
          </div>
       <div class='receive'>
          <div class="icon_box">
            <img src='https://cdn.kuaidi100.com/images/m/dispatch/ico_shou.png'>
          </div>
         <div class='address_info' @click='selReceiveAddress'>
           <div v-if="receiveName">{{receiveName}} {{receivePhone}}}</div>
           <div v-else>新建收件人</div>
         <div>{{toAddress ? toAddress : '请输入收件地址'}}</div>
         </div>
       </div>
     </div>
     <div class='card goods_info_box'>
       <div class="sub_title">商品信息</div>
       <van-radio-group v-model="shopName" direction="horizontal" class="shopNameRg">
         <van-radio name="猫粮">猫粮</van-radio>
         <van-radio name="衣服">衣服</van-radio>
         <van-radio name="鞋子">鞋子</van-radio>
         <van-radio name="其它">其它</van-radio>
         <van-field v-model="shopName"  placeholder="请输入物品信息" class="shopName"/>
       </van-radio-group>

       <div class="weight_box">
         <span>预估重量</span>
         <van-stepper v-model="wight" class="numPicker"/>
       </div>
     </div>
     <div class='card goods_info_box'>
       <div class="sub_title">保价(未保价物品最告赔6倍运费)</div>
       <div class="weight_box">
         <span>自定义货物价值</span>
         <van-field v-model="baojiaPrice"  placeholder="输入保价金额" class="baojiaPrice"/>
       </div>
       <span class="baojiaRule">与官网价格一致，请按实际重量填写，系统才能匹配最低价渠道 （拒收，原价，长超150cm,长宽高超250cm,需20元加长费）特别声明：德邦2KG-4KG，有的地方4-3KG比2kg便宜，一切以德邦官网价格为准，抛比8000</span>
     </div>
     <div class='card goods_info_box'>
       <div class="sub_title">运费详情</div>
       <div class="price_box">
         <div>首重</div>
         <div>￥6.5</div>
       </div>
       <div class="price_box">
         <div>续重</div>
         <div>￥2.5</div>
       </div>
     </div>
     <div class='bottom'>
       <div class='price'>
         <div class='max_price'>￥{{maxPrice}}</div>
         <span>{{ priceObj }}</span>
       </div>
       <div class='createOrder' @click="createOrder" v-show="show">京东下单</div>
       <div class='createOrder createOrderEnable' v-show="!show">京东下单</div>
     </div>
   </div>
</template>

<script>
import local from '../utils/storage'
export default {
  name: 'SendPost',
  data () {
    return {
      title: '',
      goAddress: '',
      toAddress: '',
      sendName: '',
      sendPhone: '',
      sendAddress: '',
      receiveName: '',
      receivePhone: '',
      receiveAddres: '',
      priceObj: '',
      shopName: '',
      wight: 5,
      maxPrice: 0,
      channel: '',
      myPrice: '',
      show: false,
      baojiaPrice: ''
    }
  },
  created () {
    if (this.$route.query.type) {
      console.log('类型' + this.$route.query.type)
    }
    this.sendAddress = local.get('sendAddress')
    if (this.sendAddress) {
      this.sendName = this.sendAddress['contact']
      this.sendPhone = this.sendAddress['mobile']
      this.goAddress = this.sendAddress['province'] + '/' + this.sendAddress['city'] + '/' + this.sendAddress['county'] + '/' + this.sendAddress['town'] + '/' + this.sendAddress['address']
    }
    this.receiveAddres = local.get('receiveAddress')
    if (this.receiveAddres) {
      this.receiveName = this.receiveAddres['contact']
      this.receivePhone = this.receiveAddres['mobile']
      this.toAddress = this.receiveAddres['province'] + '/' + this.receiveAddres['city'] + '/' + this.receiveAddres['county'] + '/' + this.receiveAddres['town'] + '/' + this.receiveAddres['address']
    }
    // if (this.sendAddress && this.receiveAddres) {
    //   this.checkMatchChannel()
    // }
  },
  methods: {
    selSendAddress () {
      this.$router.push({name: 'WriteAddress', query: { flag: 'go' }})
    },
    selReceiveAddress () {
      this.$router.push({name: 'WriteAddress', query: { flag: 'to' }})
    },
    checkMatchChannel () {
      let requestData = {
        'senderProvince': this.sendAddress['province'],
        'senderCity': this.sendAddress['city'],
        'senderCounty': this.sendAddress['county'],
        'senderTown': this.sendAddress['town'],
        'receiveProvince': this.receiveAddres['province'],
        'receiveCity': this.receiveAddres['city'],
        'receiveTown': this.receiveAddres['town'],
        'receiveCounty': this.receiveAddres['county'],
        'packageCount': 1, // 包裹数
        'weight': this.wight, // 重量 kg
        'tempReceiveAddress': this.toAddress, //
        'tempSendAddress': this.sendAddress, //
        'customerFreightType': '微信', //
        'linkName': 'yywl-袁宇进' //
      }
      this.$post('/jdserver2/checkMatchChannel', requestData)
        .then((res) => {
          console.log(res)
          let re = res['result']
          if (re && res['code'] === '1') {
            let priceObj = re['price']
            this.maxPrice = re['freight']
            this.priceObj = '首重' + priceObj['priceOne'] + '  2KG:' + priceObj['priceTwo'] + '  3KG:' + priceObj['priceThree'] + '\n4KG:' + priceObj['priceFour'] +
              '  5KG:' + priceObj['priceFive'] + '  续重:' + priceObj['priceMore']
            this.show = true
          } else {
            this.show = false
            alert(re)
          }
        })
    },
    createOrder () {
      if (!this.shopName || !this.wight) {
        alert('请输入商品名字 或者重量')
        return
      }
      if (!this.myPrice) {
        alert('请输入运费')
        return
      }
      this.show = false
      let order = {
        'shopbill': null,
        'user': null,
        'sender': this.sendAddress['contact'], // 发见人
        'senderCompany': null,
        'senderMobile': this.sendAddress['mobile'],
        'senderTel': null,
        'senderProvince': this.sendAddress['province'],
        'senderCity': this.sendAddress['city'],
        'senderCounty': this.sendAddress['county'],
        'senderTown': this.sendAddress['town'],
        'senderLocation': this.sendAddress['address'],
        'senderAddress': this.sendAddress['province'] + this.sendAddress['city'] + this.sendAddress['county'] + (this.sendAddress['town'] ? this.sendAddress['town'] : '') + this.sendAddress['address'],
        'warehouseCode': null,
        'receiver': this.receiveAddres['contact'],
        'receiveCompany': null,
        'receiverMobile': this.receiveAddres['mobile'],
        'receiveTel': null,
        'receiveProvince': this.receiveAddres['province'],
        'receiveCity': this.receiveAddres['city'],
        'receiveTown': this.receiveAddres['town'],
        'receiveCounty': this.receiveAddres['county'],
        'receiveLocation': this.receiveAddres['address'],
        'receiveAddress': this.receiveAddres['province'] + this.receiveAddres['city'] + this.receiveAddres['county'] + (this.receiveAddres['town'] ? this.receiveAddres['town'] : '') + this.receiveAddres['address'],
        'packageCount': 1, // 包裹数量
        'payType': true,
        'promiseTimeType': true,
        'itemName': this.shopName,
        'goodsCount': null,
        'vloumLong': null,
        'vloumWidth': null,
        'vloumHeight': null,
        'weight': this.wight,
        'baoxian': true,
        'billRemark': null,
        'insuredValue': false,
        'insured': null,
        'collectionValue': false,
        'collectionMoney': null,
        'tempReceiveAddress': this.receiveAddres['province'] + this.receiveAddres['city'] + this.receiveAddres['county'] + this.receiveAddres['address'] + this.receiveAddres['contact'] + this.receiveAddres['mobile'],
        'tempSendAddress': this.sendAddress['province'] + this.sendAddress['city'] + this.sendAddress['county'] + this.sendAddress['address'] + this.sendAddress['contact'] + this.sendAddress['mobile'],
        'customerFreight': this.myPrice,
        'customerFreightType': this.channel,
        'linkName': 'yywl-袁宇进'
      }
      this.$post('/jdserver2/addBill', order).then((res) => {
        this.show = true
        let re = res['result']
        if (re) {
          let waybill = re['waybill'] // 物流单号
          console.log(waybill)
        }
      })
    }
  },
  watch: {

  }
}
</script>

<style scoped lang="less">
  #app {
    background-color: #efeff4;
  }
  .title {
    color: white;
    background-color: #317ee7;
    font-size: 18px;
    padding: 15px;
    span {
      display: block;
      width: 100px;
      margin: auto;
    }
  }
  .sub_title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .card {
    background-color: white;
    border-radius: 0.275rem;
    padding: 0 15px;
    margin: 10px 10px 0;
  }
   .send,
   .receive {
     overflow: hidden;
     padding: 15px 0;
     border-bottom: 1px solid #cccccc;

     .icon_box {
       float: left;
       vertical-align: center;
       img {
         display: block;
         width: 25px;
         height: 25px;
         margin-top: 10px;
       }
     }
     .address_info {
       float: left;
       display: inline;
       width: 80%;
       margin-left: 10px;
       font-size: 16px;
       div:nth-child(2) {
         margin-top: 10px;
       }
     }
   }

  .weight_box {
    margin-top: 15px;
    margin-bottom: 10px;
    overflow: hidden;
    line-height: inherit;
    .numPicker {
      float: right;
    }
  }
  .goods_info_box {
    padding: 15px;
    overflow: hidden;
    .shopNameRg {
      padding-top: 10px;
      margin-bottom: 10px;
      .van-radio {
        width: 30%;
        margin-top: 10px;
      }
    }
    .shopName {
      display: block;
      width: 60%;
      margin-top: 15px;
      border: 1px solid #cccccc;
      border-radius: 3px;
    }
    .baojiaPrice {
      width: 150px;
      float: right;
      height: 40px;
      line-height: 20px;
      border: 1px solid #cccccc;
    }
    .baojiaRule {
      font-size: 14px;
      color: #ff0000;
      margin-top: 5px;
    }
  }
  .price_box {
    overflow: hidden;
    div:nth-child(1) {
      display: inline;
      float: left;
      color: #cccccc;
    }
    div:nth-child(2) {
      display: inline;
      float: right;
      color: red;
    }
  }
  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: white;
    .price {
      float: left;
      white-space: pre-wrap;
      margin-left: 10px;
      font-size: 18px;
      .max_price {
        color: #f00;
        font-size: 28px;
      }
    }
    .createOrder {
      float: right;
      background-color: #317ee7;
      height: 40px;
      line-height: 40px;
      width: 100px;
      border-radius: 40px;
      margin-top: 4px;
      margin-right: 10px;
      color: white;
      text-align: center;
    }
    .createOrderEnable {
      background-color: #cccccc;
    }
  }
</style>
