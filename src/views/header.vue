<template>
  <header class="g-header">
    <div class="top f-fs-12 grey-deep">
      <div class="location">
        <i class="u-icon-location f-mr-10"></i>
        <span>四川农业大学-雅安校区</span>
      </div>
      <div class="m-user f-tar">
        <i class="u-icon-user"></i>
        <span class="user">{{ userInfo.nickname || userInfo.userName }}</span>
        <span @click="signoutHandle" class="btn f-fs-12">退出</span>
      </div>
    </div>
    <div class="nav">
      <div class="m-logo">
        <i class="u-icon-logo"></i>
        <b class="name f-fs-16">校园社团ONLINE</b>
      </div>
      <ul class="m-nav">
        <router-link tag="li" to="/home">
          <div>首页</div>
        </router-link>
        <router-link tag="li" to="/mo">
          <div>社团</div>
        </router-link>
        <router-link tag="li" to="/activity">
          <div>活动</div>
        </router-link>
        <router-link tag="li" to="/person">
          <div>个人中心</div>
        </router-link>
      </ul>
    </div>
  </header>
</template>
<script type="text/javascript">
import { removeStore, getStore } from '@/utils/utils';

export default {
  name: 'headerView',
  data () {
    return {
      userInfo:{
        userName:'',
        nickname:''
      },
    }
  },
  components:{
    
  },
  watch:{
    
  },
  mounted:function(){
    let userInfo = getStore("USER_INFO")
    if(userInfo){
      this.userInfo = userInfo;
    }
    
  },
  methods:{
    signoutHandle(){
      removeStore('USER_INFO');
      removeStore('USER_TOKEN');
      this.$router.replace({path:'/login'})
    },
  }
}
</script>

<style lang="scss" scoped>
.g-header{
  max-width: 12rem;
  margin: auto;
  width: 100%;
  >.top{
    border-bottom: 1px solid #f2f2f2;
    padding: 0.1rem;
    display: flex;
    align-items: center;
    >.location{
      flex: 1;
      >.u-icon-location{
        width: 0.15rem;
        height: 0.15rem;
        background-image: url(../assets/images/location.png);
        background-repeat: no-repeat;
        background-size: 0.15rem;
        background-position: center;
        position: relative;
        margin-top: -2px;
      }
    }
  }
  >.nav{
    display: flex;
    align-items: center;
  }
}
.m-user{

  .u-icon-user{
    width: 0.15rem;
    height: 0.15rem;
    background-image: url(../assets/images/user.png);
    background-repeat: no-repeat;
    background-size: 0.15rem;
    background-position: center;
    position: relative;
    margin: -2px 0 0 0;
  }
  >.user{
    margin: 0 5px;
  }
  >.btn{
    cursor: pointer;
    &:hover{
      color: #6a41ed;
    }
  }
}
.m-logo{
  height: 0.8rem;
  line-height: 0.8rem;
  >.u-icon-logo{
    width: 0.4rem;
    height: 0.4rem;
    background-image: url(../assets/images/hat.png);
    background-repeat: no-repeat;
    background-size: 0.4rem;
    background-position: center;
    position: relative;
    margin: -5px 0.1rem 0 0.1rem;
  }
  >.name{

  }
}
.m-nav{
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  padding-right: 0.2rem;
  >li{
    font-size: 0.15rem;
    margin: 0 0.15rem;
    cursor: pointer;
    &:hover{
      color: #49D292;
    }
  }
  >.router-link-active{
    color: #49D292;
  }
}
@media screen and (max-width: 1500px) {
  .g-header{
    max-width: 10rem;
  }
}
</style>
