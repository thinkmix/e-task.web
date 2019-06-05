<template>
  <section class="g-index bg-white">
    <Header />
    <router-view class="router-view"></router-view>
    <!--路由加载层-->
    <div id="routerLoading" v-show="loadingGlobal">
      <Spin size="large" fix></Spin>
    </div>
    <Footer />
  </section>
</template>
<script type="text/javascript">
import Header from './header';
import Footer from './footer';
import { setStore } from '@/utils/utils';
import { mapState } from 'vuex';

export default {
  name: 'indexView',
  data () {
    return {

    }
  },
  components:{
    Header,
    Footer
  },
  mounted:function(){
    
  },
  computed: {
    ...mapState({
      loadingGlobal: state => state.loadingGlobal
    })
  },
  methods:{
    getSpecList(){
      const vm = this;

      apiSpec.getList({}).then((res)=>{

          if(res){
            
              let specBase = {};
              if(res.data.specBase.length){
                res.data.specBase.forEach((item) => {
                  specBase[item.specId] = item;
                })
              }

              let specArray = {};
              if(res.data.specArray.length){
                res.data.specArray.forEach((item) => {
                  item.isSpecArray = true;
                  specArray[item.specId] = item;
                })
              }

              setStore('SPEC',{
                specBase,
                specArray
              })
              
          }
          
      }).catch((error)=>{
          
      });

    },
  }
}
</script>

<style lang="scss" scoped>
.g-index{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  >.router-view{
    flex: 1;
    background-color: #ffffff;
    padding: 0 0 2rem 0;
  }
}

/*路由加载层*/
#routerLoading{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 997;
}
.g-index{
  max-width: 15rem;
  margin: auto;
}
@media screen and (max-width: 1500px) {
  .g-index{
    max-width: 12rem;
  }
}
</style>
