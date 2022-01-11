<template>
    <div class="">
      <div class="title">智能填写</div>
       <div class="card address_ipt">
         <textarea placeholder="智能填写粘贴文本" v-model="address"/>
         <span class="sibei" @click="parseAddress">识别</span>
       </div>
      <div class="card address_box">
        <ul>
          <li>
            寄件人信息
          </li>
          <li>
            <div class="people">
              <input placeholder="姓名" v-model="uname"/>
              <input placeholder="电话" v-model="phone"/>
            </div>
          </li>
          <li>
            <div class="city_box">
              <input placeholder="省市区" v-model="province"/>
            </div>
            <div class="address_info">
              <input placeholder="详细地址" v-model="address_info"/>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom_box">
        <span class="confirm_btn" @click="confirm">确定</span>
      </div>
    </div>
</template>

<script>
import local from '../utils/storage'
export default {
  name: 'WriteAddress',
  data () {
    return {
      address: '',
      uname: '',
      phone: '',
      province: '',
      address_info: '',
      flag: '',
      ads: ''
    }
  },
  created () {
    this.flag = this.$route.query.flag
    console.log(this.flag)
    if (this.flag === 'go') {
      this.ads = local.get('sendAddress')
    } else {
      this.ads = local.get('receiveAddress')
    }
    this.setData()
  },
  methods: {
    setData () {
      if (this.ads) {
        this.uname = this.ads['contact']
        this.phone = this.ads['mobile']
        this.province = this.ads['province'] + '/' + this.ads['city'] + '/' + this.ads['county'] + '/' + this.ads['town']
        this.address_info = this.ads['address']
      }
    },
    parseAddress () {
      this.$fetch('/jdserver2/ParseAddressByJd?address=' + decodeURI(this.address + '&linkName=yywl-袁宇进'), '')
        .then((res) => {
          console.log(res)
          this.ads = res['result']
          this.setData()
        })
    },
    confirm () {
      if (this.flag === 'go') {
        local.set('sendAddress', this.ads)
      } else {
        local.set('receiveAddress', this.ads)
      }
      this.$router.push({name: 'SendPost'})
    }
  }
}
</script>

<style scoped>
  .title {
    height: 40px;
    line-height: 40px;
    color: white;
    background-color: #317ee7;
    margin-bottom: 10px;
    text-align: center;
  }
  .card {
    background-color: white;
    border-radius: 0.275rem;
    padding: 10px;
    margin: 10px 10px;

  }
  .address_ipt {
   position: relative;
  }
  .address_ipt textarea {
    width: 100%;
    min-height: 80px;
    border: 0;
    outline: none;
  }
  .sibei {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: inline-block;
    width: 40px;
    height: 20px;
    font-size: 10px;
    line-height: 20px;
    border-radius: 30px;
    background-color: lightgray;
    color: white;
    text-align: center;
  }
  .people input:nth-child(n) {
    display: inline-block;
    min-width: 100px;
    margin: 10px 0;
  }
  input {
    border: 0;
    outline: #efeff4;
    background-color: white;
    font-size: .9rem;
  }
  .city_box,
  .address_info {
    margin: 0 0 10px;
  }
  .bottom_box {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
  }
  .confirm_btn {
    display: inline-block;
    width: 90%;
    height: 40px;
    line-height: 40px;
    color: white;
    background-color: red;
    margin: 0 5%;
    text-align: center;
    border-radius: 0.287rem;
  }
</style>
