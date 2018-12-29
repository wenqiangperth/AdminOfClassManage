<template>
  <div>
    <div>
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
    <div class="right" v-show="teacherPage">
      <el-button type="text" class="right-title">教师信息管理</el-button>
      <div class="search">
        <el-input class="search-input" placeholder="输入教工号/姓名" v-model="teacher"> <!--<i slot="prefix" class="iconfont icon-search" ></i>-->
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
        <span>教师列表</span>
        <el-button class="right-create" type="primary" size="medium" @click="newMember" plain icon="el-icon-circle-plus-outline">新建账号</el-button>
      </div>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="account"
            label="教工号"
            width="160">
          </el-table-column>
          <el-table-column
            prop="teacherName"
            label="姓名"
            width="150">
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="gender"-->
            <!--label="性别"-->
            <!--width="100">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="phone"-->
            <!--label="手机号">-->
          <!--</el-table-column>-->
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
    name: "TeacherManage",
    data(){
      return{
        teacherPage:true,
        teacher:'',
        currentPage:1,
        pageSize:2,
        total:100,
        teachers:[],
        tableData:[
          {

          }
        ]
      };
    },
    created(){
      let that=this
      that.$axios({
        method: 'GET',
        url: '/teacher',
        params:{
          pageNum:that.currentPage,
          pageSize:that.pageSize
        },
        headers:{
          'Authorization':window.localStorage['token']
        }
      })
        .then(function (response) {
          console.log(response);
          that.tableData=response.data;
          //that.tableData=that.teachers.slice((that.currentPage-1)*that.pageSize,that.currentPage*that.pageSize);
        })
        .catch(function (error) {
          console.log(error)
        })

      that.$axios({
        method: 'GET',
        url: '/teacher/number',
        headers:{
          'Authorization':window.localStorage['token']
        }
      })
        .then(function (response) {
          if(response.status===200) {
            console.log("perth"+response.data);
            that.total = response.data;
          }
        })
        .catch(function (error) {
          console.log(error)
        })

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
        // let that=this;
        // let j=0;
        // that.tableData=[];
        // for(let i in that.teachers){
        //   if(that.teachers[i].account===that.teacher||that.teachers[i].name===that.teacher){
        //     that.tableData[j++]=that.teachers[i];
        //   }
        // }
        // if(that.teacher===''){
        //   that.tableData=that.teachers.slice((that.currentPage-1)*that.pageSize,that.currentPage*that.pageSize);
        // }
      },
      handleSizeChange(val) {
        let that=this;
        that.pageSize=val;
        console.log(that.total+"aaaa")
        that.$axios({
          method: 'GET',
          url: '/teacher',
          params:{
            pageNum:that.currentPage,
            pageSize:that.pageSize
          },
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(function (response) {
            console.log(response);
            that.tableData=response.data;
            //that.total=that.tableData.length;
            //that.tableData=that.teachers.slice((that.currentPage-1)*that.pageSize,that.currentPage*that.pageSize);
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      handleCurrentChange(val) {
        let that=this;
        this.currentPage=val;
        this.$axios({
          method: 'GET',
          url: '/teacher',
          params:{
            pageNum:that.currentPage,
            pageSize:that.pageSize
          },
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(function (response) {
            console.log(response);
            that.tableData=response.data;
           // that.total=that.tableData.length;
            // that.total=that.teachers.length;
            //that.tableData=that.teachers.slice((that.currentPage-1)*that.pageSize,that.currentPage*that.pageSize);
          })
          .catch(function (error) {
            console.log(error)
          })
        //this.tableData=this.teachers.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      },
      handleEdit(index,row){
        this.$router.push({path: '/changeTeacher',query:{name:row.name,account:row.account,email:row.email}});
      },
      handleReset(index,row){
        this.$prompt('请输入新密码', '修改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let that=this;
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
            });
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
            });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      newMember(){
        this.$router.push({path: '/createTeacher'});
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
