<template>
  <section class="g-login">
    <div class="g-login-box">
      <div class="lt"></div>
      <div class="rt">
        <div class="logo" :class="{active:off.register}"><b>学校社团招新</b></div>
        <div class="m-login-form">
          <div class="row">
            <div class="label">账户</div>
            <div class="input">
              <input type="text" v-model="formLogin.userName" maxlength="11" placeholder="请输入账户">
              <div class="fake">
                <b></b>
              </div>
            </div>
            <div class="text red f-fs-12" :class="{active:message.userName}"><b>{{ message.userName }}</b></div>
          </div>
          <div class="row">
            <div class="label">密码</div>
            <div class="input">
              <input type="password" @keydown="keyEnter" v-model="formLogin.password" maxlength="8" placeholder="请输入密码">
              <div class="fake">
                <b></b>
              </div>
            </div>
            <div class="text red f-fs-12" :class="{active:message.password}"><b>{{ message.password }}</b></div>
          </div>
          <div class="row" v-if="off.register">
            <div class="label">确认密码</div>
            <div class="input">
              <input type="password" @keydown="keyEnter" v-model="formLogin.password2" maxlength="8" placeholder="请再次输入密码">
              <div class="fake">
                <b></b>
              </div>
            </div>
            <div class="text red f-fs-12" :class="{active:message.password2}"><b>{{ message.password2 }}</b></div>
          </div>
        </div>
        <div class="button f-tar">
          <Button class="f-shading-grey" type="primary" size="large" :loading="load.login" @click="submitHandle()">{{ off.register ? '注册' : '登录' }}</Button>
        </div>
        <div class="f-fs-12 f-tar f-mr-10">
          <template v-if="!off.register">
            <span class="grey">还没有账户？</span><router-link to="/login?register=true">立即注册</router-link>
          </template>
          <template v-else>
            <span class="grey">已有账户？</span><router-link to="/login">立即登录</router-link>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/javascript">
import { setStore } from '@/utils/utils';
import hexMD5 from '@/utils/md5';
import api from '@/api/user';

export default {
  name: 'login-index',
  data () {
    return {
      off:{
        register:false
      },
      message:{
          userName: '',
          password: '',
          password2: '',
      },
      formLogin: {
          userName: '',
          password: '',
          password2: '',
      },
      load:{
        login:false
      }
    }
  },
  watch:{
    '$route':'routeChange'
  },
  components: {
    
  },
  mounted:function(){
    this.routeChange();
  },
  methods:{
    routeChange(){
      if(this.$route.query.register){
        this.off.register = true;
      }else {
        this.off.register = false;
      }
    },
    submitHandle() {
      const vm = this;
      
      let json = {
        userName:vm.formLogin.userName,
        password:vm.formLogin.password,
      }, errorMsg = '';
      if(!json.userName){
        errorMsg = '账户不能为空';
        vm.message.userName = errorMsg;
      }else if(/\W+/.test(json.userName)){
        errorMsg = '只能包含数字、字母和下划线组合';
        vm.message.userName = errorMsg;
      }else if(!json.password){
        errorMsg = '密码不能为空';
        vm.message.password = errorMsg;
      }else if(json.password.length < 6){
        errorMsg = '密码最少为6位';
        vm.message.password = errorMsg;
      }else if(vm.off.register){//如果是注册
        json.password2 = vm.formLogin.password2;
        if(!json.password2){
          errorMsg = '密码不能为空';
          vm.message.password2 = errorMsg;
        }else if(json.password2.length < 6){
          errorMsg = '密码最少为6位';
          vm.message.password2 = errorMsg;
        }else if(json.password !== json.password2){
          errorMsg = '密码输入不一致';
          vm.message.password2 = errorMsg;
        }else if(/\W+/.test(json.password2)){
          errorMsg = '只能包含数字、字母和下划线组合';
          vm.message.password2 = errorMsg;
        }
      }

      if (!errorMsg) {
        if(vm.load.login)return;
        vm.load.login = true;
        json.password = hexMD5(json.password);
        delete json.password2;

        if(vm.off.register){
          vm.register(json);
        }else{
          vm.login(json);
        }
        
      } else {
        vm.clearMessage();
      }
    },
    login(json){
      const vm = this;

      api.loginHandle(json).then(function(res){
        vm.load.login = false;
        if(res){
          setStore("USER_INFO", {
            userName: res.data.userName,
            nickname: res.data.nickname || '',
            phone: res.data.phone || '',
            userType: res.data.userType,
          });
          setStore("USER_TOKEN", {
            userId: res.data.userId,
            adminMoId: res.data.adminMoId
          });

          vm.$router.push({path:'/'});
        }
      }).catch(error=>{
        vm.load.login = false;
      });
    },
    register(json){
      const vm = this;

      api.registerHandle(json).then(function(res){
        vm.load.login = false;
        if(res){
          vm.$Notice.success({
              title: '用户操作',
              desc: `恭喜您注册成功！`
          });

          setTimeout(()=>{
            vm.$router.replace({path:'/login'});
            vm.formLogin = {
                userName: '',
                password: '',
                password2: '',
            }
          }, 2000)
        }
      }).catch(error=>{
        vm.load.login = false;
      });
    },
    keyEnter:function(e){
      if(e.keyCode==13 || e == 1){
        this.submitHandle();
      }
    },
    clearMessage:function(){
      setTimeout(() => {
        this.message = {
          userName: '',
          password: '',
          password2: ''
        }
      },1500);
    }
  }
}
</script>

<style lang="scss" scoped>
.g-login{
  background-size: contain;
  background-position: center top;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.g-login-box{
  box-shadow:0px 15px 20px rgba(243,177,101,0.12);
  border-radius:7px;
  display: flex;
  width: 10rem;
  background-color: #ffffff;
  >.lt{
    flex: 1.8;
    height: 5rem;
    border-radius: 7px 0 0 7px;
    background-image: url(../../assets/images/login-bg.jpg);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  >.rt{
    flex: 1;
    padding: 0 0.4rem 0 0.4rem;
    >.logo{
      // color: #49D292;
      font-size: 0.24rem;
      margin: 0.5rem 0;
    }
    >.active{
      margin: 0.3rem 0;
    }
    >.button{
      margin: 0.1rem 0.1rem 0.2rem 0;
      >button{
        padding: 10px 30px;
        border-radius: 25px;
        font-size: 0.15rem;
      }
    }
  }
}
.m-login-form{
  font-size: 0.14rem;
  >.row{
    
    >.label{
      margin-bottom: 5px;
      font-size: 0.15rem;
    }
    >.input{
      position: relative;
      background-color: #f7f7f7;
      border-radius: 7px;
      padding: 0 0.15rem;
      overflow: hidden;
      >input{
        background-color: #f7f7f7;
        height: 0.4rem;
        line-height: 0.4rem;
        width: 100%;
        
        // border-bottom: 1px solid #bcbcbc;

        &:hover + .fake>b{
          left: 0;
          width: 100%;
        }
        &:focus + .fake>b{
          left: 0;
          width: 100%;
        }
      }
      >.fake{
        text-align: center;
        >b{
          display: inline-block;
          position: absolute;
          bottom: 0;
          z-index: 2;
          left: 50%;
          width: 0%;
          height: 1px;
          background-color: #49D292;
          transition-duration: .4s;
        }
      }
    }
    >.text{
      height: 0.2rem;
      line-height: 0.2rem;
    }
    >.text.active{
      animation-name: shake;
      animation-duration: .5s;
      animation-fill-mode: both;
    }
  }
}

@keyframes shake {
  from, to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%, 50%,90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  30%, 70% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}
</style>
