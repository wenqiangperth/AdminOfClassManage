<template>
  <div>
    <!--
  <div class="header">
    <p class="title">翻转课堂管理平台</p>
  </div>
  <div class="left">
    <el-menu @select="handSelect">
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
  -->
  <div class="right">
    <div v-if="choose==1">
      <el-button type="text" class="right-title">教师信息管理</el-button>
      <div class="search">
        <el-input class="search-input" placeholder="输入教工号/姓名" v-model="teacher"> <!--<i slot="prefix" class="iconfont icon-search" ></i>-->
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-pagination class="search-page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
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
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="account"
            label="教工号"
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
    <div v-if="choose==2">
      <el-button>4444</el-button>
    </div>
  </div>
  </div>

</template>

<script>
    export default {
        name: "Manage",
      data(){
          return{
            choose:2,
            teacher:'',
            currentPage:10,
            total:100,
            tableData:[
              {
                account:24320162202920,
                name:"张三",
                gender:"男",
                phone:"13950064936",
                email:"212454584@163.com"
              },
              {
                account:222,
                name:"李四",
                gender:"男",
                phone:"13950064936",
                email:"212454584@163.com"
              }
            ]
      };
      },
      methods:{
          handSelect(index,indexpath){
            if(index=="1-1") {
              this.choose = 1;
            }
            else {
              this.choose=2;
            }
          },
        handleSizeChange(val) {
            this.currentPage=val;
          console.log(this.currentPage);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
          handClick(){
            this.$router.push({path: '/hello'});
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
  .title{
    width: 100%;
    font-family: 楷体;
    font-size: 50px;
    text-align: left;
    color: aqua;
    margin-top: 0px;
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
