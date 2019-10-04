import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Projects from './views/Projects.vue'
import ProjectsList from './views/ProjectsList.vue'
import ProjectCreate from './views/ProjectCreate.vue'
import TasksCreate from './views/TasksCreate.vue'
import StaffmembersCreate from './views/StaffMembersCreate.vue'
import StaffMembers from './views/StaffMembers.vue'

import ListofAllProjects from "./views/ListofAllProjects";
import ListofAllTasks from "./views/ListofAllTasks";
import Project from "./views/Project"
import StaffMember from "./views/StaffMember";
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/projects/:id',
      props: true,
      name: 'project',
      component: Project
    },
    {
      path: '/projectsList',
      name: 'projectsList',
      component: ProjectsList
    },
    { path: '/staffMembersCreate',
      name: 'Staffmemberscreate',
      component: StaffmembersCreate
    },
    {
      path: '/staffMembers',
      name: 'StaffMembers',
      component: StaffMembers
    },
    {
    path: '/projects',
  name: 'projects',
  component: ListofAllProjects
},
    {
      path: '/projects/:id/tasks',
      props: true,
      name: 'tasksCreate',
      component: TasksCreate
    },
    {
      path: '/projects/:id/taskList',
      props: true,
      name: 'tasksList',
      component: ListofAllTasks
    },
    {
      path: '/projectCreate',
      name: 'projectCreate',
      component: ProjectCreate
    },
    {
      path: '/staffMembers/:id',
      name: 'StaffMember',
      component: StaffMember
    }

  ]
})
