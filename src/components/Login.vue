<template>
  <!--
    <div>
      <p class="title">翻转课堂管理员登陆</p>
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
    </div>-->
</template>

<script>
    export default {
        name: "Login",
    /*  data(){
          return {
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
                  id: this.form.username,
                  password: this.form.password
                }
              })
                .then(function (response) {
                  if (response.data === "登陆成功") {
                    that.$router.push({path: '/hello'});
                  } else alert(response.data);
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
          }
      }
*/
    }
</script>

<style scoped>
  /*
.title{
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
  .el-form-item{
    margin-bottom: 80px;
  }*/
</style>
