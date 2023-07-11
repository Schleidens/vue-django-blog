import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import SingleBlogView from '../views/SingleBlogView.vue'
import AddNewPostView from '../views/AddNewPostView.vue'
import NotFoundPageView from '../views/NotFoundPageView.vue'
import DashboardView from '../views/DashboardView.vue'
import EditPostView from '../views/EditPostView.vue'
import DashboardBlogView from '../views/DashboardBlogView.vue'

import { isAuthenticated } from '../services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/blog/:slug',
      name: 'blog',
      component: SingleBlogView
    },
    {
      path: '/create/blog',
      name: 'new-blog',
      component: AddNewPostView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/blog/:slug/edit',
      name: 'edit-blog',
      component: EditPostView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard/blog/:slug',
      name: 'dashboardBlog',
      component: DashboardBlogView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter (to, from, next) {
        const isUserAuthenticated = isAuthenticated();
        if (isUserAuthenticated) {
          next({ name : 'home'})
        } else {
          next();
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter (to, from, next) {
        const isUserAuthenticated = isAuthenticated();
        if (isUserAuthenticated) {
          next({ name : 'home'})
        } else {
          next();
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundPageView,
    },
  ]
});

router.beforeEach((to, from, next) => {
  const isUserAuthenticated = isAuthenticated();
  if(to.meta.requiresAuth && !isUserAuthenticated){
    next({ name: 'login'});
  } else{
    next();
  }
});

export default router
