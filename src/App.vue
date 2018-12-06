<template>
  <div id="app">
    <div v-if="$route.path=='/'" style="min-width: 500px">
      <p class="login-title">翻转课堂管理员登陆</p>
      <el-form class="layout" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input class="login" v-model="form.username" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="login" type="password" v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="click" class="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="manage||$route.path=='/teacher'">
      <div class="header">
        <p class="title">翻转课堂管理平台</p>
      </div>
      <div class="left">
        <el-menu @select="handSelect" default-active="1-1">
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-wenjian2"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">教师信息管理</el-menu-item>
              <el-menu-item index="1-2">学生信息管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>

    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      manage:false,
      form:{
        username:'',
        password:''
      },
      rules:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'}
        ]
      }
    };
  },
  methods:{
    click(){
      let that=this;
      if(that.form.username===''||that.form.password===''){
        alert('用户名或密码不能为空！');
      }
      else {
        that.$axios({
          method: 'post',
          url: '/admin/login',
          data: {
            accountNumber: this.form.username,
            password: this.form.password
          }
        })
          .then(function (response) {
            if (response.data === "登陆成功") {
              that.manage=true;
              that.$router.push({path: '/teacher'});
            } else alert(response.data);
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    handSelect(index,indexpath){
      if(index=="1-1") {
        this.$router.push({path: '/teacher'});
      }
      else {
        this.$router.push({path: '/student'});
      }
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.login-title{
  width: 100%;
  font-family: 楷体;
  font-size: 50px;
  text-align: left;
  color: aqua;
  background-color: grey;
  opacity: 0.5;
  margin-top: 0px;
}
.layout{
  margin: 0 auto;
  width:400px;
  margin-top:130px;
  padding-top: 20px;
  border-width:1px;
  border-style:  solid dashed;
  border-color: deepskyblue;
}
.login{
  width: 90%;
}
.el-form-item{/*修改默认样式*/
  margin-bottom: 80px;
}
.header{
  min-width: 1020px;
  width: 100%;
  height: 70px;
  background-color: grey;
  opacity: 0.3;
  padding-bottom: 20px;
}
.left{
  width:200px;
  float:left;
  height: 500px;
}
.title{
  width: 100%;
  font-family: 楷体;
  font-size: 50px;
  text-align: left;
  color: aqua;
  margin-top: 0px;
}
</style>
