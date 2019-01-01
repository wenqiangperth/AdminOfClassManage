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
      <el-button type="text" class="right-title">修改学生信息</el-button>
      <div class="teacher">
        <el-form :label-position="labelPosition" label-width="100px" :model="student">
          <el-form-item class="teacher-item" label="学生姓名">
            <el-input v-model="student.name"></el-input>
          </el-form-item>
          <el-form-item class="teacher-item" label="学号  ">
            <el-input v-model="student.account"></el-input>
          </el-form-item>
          <el-form-item class="teacher-item" label="电子邮箱">
            <el-input v-model="student.email"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button @click="updateStudent" class="submit-button" type="danger">修改</el-button>
        <el-button @click="cancel" class="submit-button" type="success">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChangeTeacher",
    data(){
      return{
        labelPosition:'left',
        oldStudent:{
          name:'',
          account:'',
          email:''
        },
        student:{
          id:'',
          name:'',
          account:'',
          email:''
        }
      }
    },
    created() {
      this.student.id=this.$route.query.id;
      this.student.name = this.$route.query.name;
      this.student.account = this.$route.query.account;
      this.student.email = this.$route.query.email;
      this.oldStudent.name = this.$route.query.name;
      this.oldStudent.account = this.$route.query.account;
      this.oldStudent.email = this.$route.query.email;
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
      updateStudent(){
        console.log("aaa");
        console.log(this.oldStudent);
        if(this.oldStudent.account===this.student.account&&this.oldStudent.name===this.student.name&&this.oldStudent.email===this.student.email){
          console.log("进入")
          this.$message({
            message: '您未做任何修改！',
            type: 'warning'
          });
        }
        else {
          let that=this;
          console.log('lalal'+that.student.id)
          that.$axios({
            method: 'put',
            url: '/student/'+that.student.id+'/information',
            data: {
              account: that.student.account,
              studentName:that.student.name,
              email:that.student.email
            },
            headers:{
              'Authorization':window.localStorage['token']
            }
          })
            .then(function (response) {
              if(response.status===200){
                window.localStorage['token']=response.headers.authorization;
                that.$message({
                  message: '您的修改已完成！',
                  type: 'success'
                });
                setTimeout(function () {
                  that.$router.push({
                    path:'/student'
                  })
                },1500)
              }
              else {
                that.$message.error('修改失败！');
              }
            })
            .catch(function (error) {
              console.log(error)
            })

        }
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
