import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import TeacherManage from "@/components/TeacherManage";
import ChangeTeacher from "@/components/ChangeTeacher";
import CreateTeacher from "@/components/CreateTeacher";
import StudentManage from "@/components/StudentManage";
import ChangeStudent from "@/components/ChangeStudent";
import CreateStudent from "@/components/CreateStudent";

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',component:Login},
    {path:'/teacher',component:TeacherManage},
    {path:'/changeTeacher',component:ChangeTeacher},
    {path:'/createTeacher',component:CreateTeacher},
    {path:'/student',component:StudentManage},
    {path:'/changeStudent',component:ChangeStudent},
    {path:'/createStudent',component:CreateStudent},
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
  ]
})
