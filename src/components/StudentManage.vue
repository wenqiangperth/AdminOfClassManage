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
    <div class="right" v-show="studentPage">
      <el-button type="text" class="right-title">学生信息管理</el-button>
      <div class="search">
        <el-input class="search-input" placeholder="输入学号/姓名" v-model="student">
          <el-button @click="searchTeacher" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-pagination class="search-page"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       :page-sizes="[1, 2, 3, 4]"
                       :page-size="pageSize"
                       layout="sizes, prev, pager, next"
                       :total="total ">
        </el-pagination>
      </div>
      <div class="right-table-title">
        <span>学生列表</span>
        <el-button class="right-create" type="primary" size="medium" @click="newMember" plain icon="el-icon-circle-plus-outline">新建账号</el-button>
      </div>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="account"
            label="学号"
            width="160">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            width="100">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="email"
            label="电子邮箱">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button icon="iconfont icon-xieyingping" circle type="success"
                         size="mini"
                         @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button
                size="mini" icon="iconfont icon-zhongzhi" circle type="primary"
                @click="handleReset(scope.$index, scope.row)"></el-button>
              <el-button
                size="mini" icon="iconfont icon-shanchu" circle type="danger"
                @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StudentManage",
    data(){
      return{
        studentPage:true,
        student:'',
        currentPage:1,
        pageSize:2,
        total:100,
        students:[
          {
            account:24320162202920,
            name:"张三",
            gender:"男",
            phone:"13950064936",
            email:"212454584@163.com"
          },
          {
            account:24320152200297,
            name:"李四",
            gender:"女",
            phone:"10036",
            email:"299666112@163.com"
          }
        ],
        tableData:[]
      };
    },
    created(){
      let that=this;
      that.total=that.students.length;
      that.tableData=that.students.slice((that.currentPage-1)*that.pageSize,that.currentPage*that.pageSize);
      /*
      let that=this
      that.$axios({
        method: 'get',
        url: '/admin/teachers',
      })
        .then(function (response) {
          that.teachers=response.data;
          that.total=that.teachers.length;
          that.tableData=that.teachers.slice((that.currentPage-1)*that.pageSize,that.currentPage*that.pageSize);
        })
        .catch(function (error) {
          console.log(error)
        })*/
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
      changeFixed(clientHeight){
        this.$refs.homePage.style.height=clientHeight+'px';
      },
      searchTeacher(){
        let that=this;
        let j=0;
        that.tableData=[];
        for(let i in that.students){
          if(that.students[i].account===that.student||that.students[i].name===that.student){
            that.tableData[j++]=that.students[i];
          }
        }
        if(that.student===''){
          that.tableData=that.students.slice((that.currentPage-1)*that.pageSize,that.currentPage*that.pageSize);
        }
      },
      handleSizeChange(val) {
        this.pageSize=val;
        this.currentPage=1;
        this.tableData=this.students.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.tableData=this.students.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      },
      handleEdit(index,row){
        this.$router.push({path: '/changeStudent',query:{name:row.name,account:row.account,email:row.email}});
      },
      handleReset(index,row){
        this.$prompt('请输入新密码', '修改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let that=this;
          that.$message({
            type: 'success',
            message: ' 您已修改该账户密码为： ' + value
          })
          /*
          that.$axios({
            method: 'put',
            url: '/admin/teacher/password',
            data:{
              accountNumber:row.account,
              password:value
            }
          })
            .then(function (response) {
              if(response.data==="更改成功"){
                that.$message({
                  type: 'success',
                  message: ' 您已修改该账户密码为： ' + value
                })}
              else{
                that.$message({
                  type: 'warning',
                  message: '密码修改失败'
                });
              }
            })
            .catch(function (error) {
              console.log(error)
            });*/
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
        });
      },
      handleDelete(index,row){
        let that=this;
        that.$confirm('此操作将永久删除该文件, 是否继续?', '删除账户', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.students.splice((that.currentPage-1)*that.pageSize+index,1);
          that.tableData=that.students.slice((that.currentPage-1)*that.pageSize,that.currentPage*that.pageSize);
          that.$message({
            type: 'success',
            message: ' 您已成功删除该账户 '
          })
          /*
          that.$axios({
            method: 'delete',
            url: '/admin/teacher',
            params:{
              accountNumber: row.account
            }
          })
            .then(function (response) {
              if(response.data==="删除成功"){
                that.teachers.splice((that.currentPage-1)*that.pageSize+index,1);
                that.tableData=that.teachers.slice((that.currentPage-1)*that.pageSize,that.currentPage*that.pageSize);
                that.$message({
                  type: 'success',
                  message: ' 您已成功删除该账户 '
                })}
              else{
                that.$message({
                  type: 'warning',
                  message: '账户删除失败'
                });
              }
            })
            .catch(function (error) {
              console.log(error)
            });*/
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      newMember(){
        this.$router.push({path: '/createStudent'});
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
    height:500px;
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
  .search{
    width: 100%;
    height: 100px;
    border-radius: 6px;
    margin-top: 30px;
    background: lightgray;


  }
  .search-input{
    width: 200px;
    float: left;
    margin-left: 40px;
    margin-top: 30px;
  }
  .search-page{
    padding-top: 35px;
  }
  .right-table-title{
    line-height: 50px;
    text-align: left;
    height: 50px;
    border-bottom-style:solid;
  }
  .right-create{
    float: right;
    margin-top: 8px;
    margin-right: 20px;
  }
</style>
