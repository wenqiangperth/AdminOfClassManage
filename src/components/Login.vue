<template>
  <div :style="note" ref="homePage">
    <div style="min-width: 500px">
      <!--<p class="login-title">翻转课堂管理员登陆</p>-->
      <el-form class="layout" :model="form" :rules="rules">
        <el-form-item>
          <div class="head"><p class="login-title">翻转课堂管理员登陆</p></div>
        </el-form-item>
        <el-form-item prop="username">
          <el-input class="login" v-model="form.username" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="login" type="password" v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="click" type="success" class="loginBtn">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="manage">
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
  </div>
</template>

<script>
  export default {
    name: "Login",
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
        },
        note:{
          backgroundImage:"url("+require("../assets/back.jpg")+")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        },
        clientHeight:'',
      };
    },
    mounted(){
      this.clientHeight=`${document.documentElement.clientHeight}`
      window.onresize = function temp(){
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch:{
      clientHeight:function(){
        this.changeFixed(this.clientHeight);
      }
    },
    methods:{
      click(){
        let that=this;
        if(that.form.username===''||that.form.password===''){
          alert('用户名或密码不能为空！');
        }
        else {
          console.log(this.form.username);
          console.log(this.form.password);
          that.$axios({
            method: 'POST',
            url: '/user/login',
            data: {
              username: this.form.username,
              password: this.form.password
            },
            transformRequest: [function (data) {
              let ret = '';
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              console.log(ret);
              return ret
            }],
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(response=> {
              console.log(response);
              if (response.data === "{role=ROLE_ADMIN, isActive=0}") {
                window.localStorage['token']=response.headers.authorization;
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
      changeFixed(clientHeight){
        this.$refs.homePage.style.height=clientHeight+'px';
      }
    }
  }
</script>

<style scoped>
  .head{
    height: 50px;
    width: 100%;
    display: block;
    border-radius: 5px;
    margin-top: 0;
  }
  .login-title{
    font-family: 华文彩云;
    text-align: center;
    font-size: 40px;
    color: #fff;
    font-weight: bolder;
    margin-top: 0px;
  }
  .layout{
    margin: 0 auto;
    width:400px;

    padding-top: 20px;
    border-width:1px;
    border-style:  solid dashed;
    border-color: deepskyblue;
  }
  .login{
    width: 90%;
  }

  .loginBtn{
    width: 90%;
    font-size: 20px;
    font-weight: bold;
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
