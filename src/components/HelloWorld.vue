<template>
  <div class="hello">

    <div class="login_box">
         <span class="title">物流登录系统</span>
         <div>
           <input placeholder="请输入账号"  v-model="account">
         </div>
         <div>
           <input placeholder="请输入密码"  v-model="pwd">
         </div>
         <button @click="aa" class="loginBtn">登录</button>
    </div>
  </div>
</template>

<script>
import local from '../utils/storage'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      account: '',
      pwd: ''
    }
  },
  methods: {
    aa () {
      console.log('你的密码式' + this.account + '=========' + this.pwd)
      if (!this.account || !this.pwd) {
        alert('账号或者密码不能空')
        return
      }
      this.$post('jdserver2/api/v1/applet/passport/login-pc?account=' + encodeURI(this.account) + '&password=' + this.pwd, '111').then((res) => {
        alert(res['message'])
        if (res['result']) {
          local.set('user', res['result'])
          let user = local.get('user')
          console.dir(user)
          console.error(user)
          console.error(user['token'])
          this.$router.push({name: 'SendPost'})
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello {
      width: 100%;
      height: 100%;
      padding-top: 30%;
      background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1fb8347b861c5a8f94a0288558e38d19c24a9e7826d25-rkvX2A_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628419076&t=bbf6e85238f9c1eaf117518daf474486");
      background-repeat: no-repeat;

    }
    .title {
      font-size: 1.5rem;
    }
   .login_box {
     width: 80%;
     text-align: center;
     padding: 5rem 0;
     background-color: #ffffff;
     margin: auto;
     border-radius: 2rem;
     opacity: 0.5;

   }
   input {
     width: 70%;
     height: 3rem;
     margin-top: 15px;
     padding-left: 1rem;
     border: 0;
     outline: none;
     border-bottom: 0.1rem solid gainsboro;
   }
   .loginBtn {
     width: 70%;
     height: 3rem;
     margin-top: 2rem;
     border: 0;
     background-color: #317ee7;
     border-radius: 3rem;
     color: white;
     font-size: 1rem;
   }
</style>
