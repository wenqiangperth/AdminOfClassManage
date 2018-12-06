<template>
  <div class="right">
    <el-button type="text" class="right-title">创建教师用户</el-button>
    <div class="teacher">
      <el-form :label-position="labelPosition" label-width="100px" :model="teacher">
        <el-form-item class="teacher-item" label="教师姓名">
          <el-input v-model="teacher.name" placeholder="请输入教师姓名"></el-input>
        </el-form-item>
        <el-form-item class="teacher-item" label="教工号  ">
          <el-input v-model="teacher.account" placeholder="请输入教工号"></el-input>
        </el-form-item>
        <el-form-item class="teacher-item" label="电子邮箱">
          <el-input v-model="teacher.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item class="teacher-item" label="初始密码">
          <el-input v-model="teacher.password" placeholder="请输入初始密码"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="submit">
      <el-button @click="addTeacher" class="submit-button" type="danger">确认</el-button>
      <el-button @click="cancel" class="submit-button" type="success">取消</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "CreateTeacher",
      data(){
          return{
            labelPosition:'left',
            teacher:{
              name:'',
              account:'',
              email:'',
              password:''
            }
          }
      },
      methods:{
          addTeacher(){
            let that=this;
            that.$axios({
              method: 'post',
              url: '/admin/teacher',
              data: {
                accountNumber: that.teacher.account,
                name:that.teacher.name,
                email:that.teacher.email,
                password: that.teacher.password
              }
            })
              .then(function (response) {
                if (response.data === "插入成功") {
                  that.$message({
                    message: '您已成功创建该账户',
                    type: 'success'
                  });
                } else {
                  that.$message.error('创建失败！');
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          },
        cancel(){
          this.$router.push({path: '/teacher'});
        }
      }
    }
</script>

<style scoped>
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
    margin-top: 0px;
    height: 0px;
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
