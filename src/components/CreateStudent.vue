<template>
  <div>
    <div>
      <div class="header">
        <p class="title">翻转课堂管理平台</p>
      </div>
      <div class="left">
        <el-menu @select="handSelect" default-active="1-2">
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

    <div class="right">
      <el-button type="text" class="right-title">创建学生用户</el-button>
      <div class="teacher">
        <el-form :label-position="labelPosition" label-width="100px" :model="student">
          <el-form-item class="teacher-item" label="学生姓名">
            <el-input v-model="student.name" placeholder="请输入学生姓名"></el-input>
          </el-form-item>
          <el-form-item class="teacher-item" label="教工号  ">
            <el-input v-model="student.account" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item class="teacher-item" label="电子邮箱">
            <el-input v-model="student.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item class="teacher-item" label="初始密码">
            <el-input v-model="student.password" placeholder="请输入初始密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button @click="addStudent" class="submit-button" type="danger">确认</el-button>
        <el-button @click="cancel" class="submit-button" type="success">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CreateStudent",
    data(){
      return{
        labelPosition:'left',
        student:{
          name:'',
          account:'',
          email:'',
          password:''
        }
      }
    },
    methods:{
      handSelect(index,indexpath){
        if(index=="1-1") {
          this.$router.push({path: '/teacher'});
        }
        else {
          this.$router.push({path: '/student'});
        }
      },
      addStudent(){
        let that=this;
        that.$axios({
          method: 'POST',
          url: '/admin/student',
          headers:{
            'Authorization':window.localStorage['token']
          },
          data: {
            account: that.student.account,
            studentName:that.student.name,
            email:that.student.email,
            password: that.student.password
          }
        })
          .then(function (response) {
            console.log(response);
            if (response.status === 200) {
              window.localStorage['token']=response.headers.authorization;
              that.$message({
                message: '您已成功创建该账户',
                type: 'success'
              });
              setTimeout(function () {
                that.$router.push({
                  path:'/student'
                })
              },2000)

            } else {
              that.$message.error('创建失败！');
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      cancel(){
        this.$router.push({path: '/student'});
      }
    }
  }
</script>

<style scoped>
  .header{
    min-width: 1020px;
    width: 100%;
    height: 70px;
    background-color: grey;
    opacity: 0.3;
    padding-bottom: 20px;
  }
  .title{
    width: 100%;
    font-family: 楷体;
    font-size: 50px;
    text-align: left;
    color: aqua;
    margin-top: 0px;
  }

  .left{
    width:200px;
    float:left;
    height: 500px;
  }
  .right{
    min-width: 800px;
    margin-left: 220px;
    margin-top: 10px;
  }
  .right-title{
    font-family: 楷体;
    font-size: 35px;
    text-align: left;
    opacity: 0.5;
    width: 100%;
    color: blue;
    margin-top: 10px;
    border: 1px solid gray;
  }
  .teacher{
    width: 100%;
    margin-top: 30px;
    padding-top: 20px;
    border: 1px solid lightgray;
    border-radius: 4px;
  }
  .teacher-item{
    margin-top: 20px;
    height: 50px;
    width: 300px;
    margin-left: 35px;
  }
  .submit{
    margin-top: 20px;
  }
  .submit-button{
    width: 130px;
    margin-left: 50px;
    margin-right: 30px;
  }
</style>
