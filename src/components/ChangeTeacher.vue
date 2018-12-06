<template>
    <div class="right">
      <el-button type="text" class="right-title">修改教师信息</el-button>
      <div class="teacher">
      <el-form :label-position="labelPosition" label-width="100px" :model="teacher">
        <el-form-item class="teacher-item" label="教师姓名">
          <el-input v-model="teacher.name"></el-input>
        </el-form-item>
        <el-form-item class="teacher-item" label="教工号  ">
          <el-input v-model="teacher.account"></el-input>
        </el-form-item>
        <el-form-item class="teacher-item" label="电子邮箱">
          <el-input v-model="teacher.email"></el-input>
        </el-form-item>
      </el-form>
      </div>
      <div class="submit">
        <el-button @click="updateTeacher" class="submit-button" type="danger">修改</el-button>
        <el-button @click="cancel" class="submit-button" type="success">取消</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ChangeTeacher",
      data(){
          return{
            labelPosition:'left',
            oldTeacher:{
              name:'',
              account:'',
              email:''
            },
            teacher:{
              name:'',
              account:'',
              email:''
            }
          }
      },
      created() {
        this.teacher.name = this.$route.query.name;
        this.teacher.account = this.$route.query.account;
        this.teacher.email = this.$route.query.email;
        this.oldTeacher.name = this.$route.query.name;
        this.oldTeacher.account = this.$route.query.account;
        this.oldTeacher.email = this.$route.query.email;
      },
      methods:{
          updateTeacher(){
            console.log("aaa");
            console.log(this.oldTeacher);
            if(this.oldTeacher.account===this.teacher.account&&this.oldTeacher.name===this.teacher.name&&this.oldTeacher.email===this.teacher.email){
            console.log("进入")
              this.$message({
                message: '您未做任何修改！',
                type: 'warning'
              });
            }
            else {
              let that=this;
              that.$axios({
                method: 'put',
                url: '/admin/teacher',
                data: {
                  accountNumber: that.oldTeacher.account,
                  newAccountNumber:that.teacher.account,
                  name:that.teacher.name,
                  email:that.teacher.email
                }
              })
                .then(function (response) {
                  if (response.data === "更改成功") {
                    that.$message({
                      message: '您的修改已完成！',
                      type: 'success'
                    });
                  } else {
                    this.$message.error('修改失败！');
                  }
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
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
