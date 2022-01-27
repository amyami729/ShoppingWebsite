import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  },
  // Front
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Front/Catalog.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Front/pages/Home.vue')
      },
      {
        // query: 路由直接設定為 /products 即可
        path: 'products',
        component: () => import('@/views/Front/pages/Products.vue')
      },
      {
        path: 'product-info/:id',
        component: () => import('@/views/Front/pages/ProductInfo.vue')
      },
      {
        path: 'discount',
        component: () => import('@/views/Front/pages/Discount.vue')
      },
      {
        path: '/cart',
        component: () => import('@/views/Front/pages/ShoppingCart.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Front/pages/Login.vue')
  },
  // Back
  {
    path: '/admin',
    redirect: '/admin/products',
    component: () => import('@/views/Back/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/Back/pages/BackProducts.vue'),
        meta: { requiresAuth: true }   // 新增驗證方法
      },
      {
        path: 'orders',
        component: () => import('@/views/Back/pages/Orders.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        component: () => import('@/views/Back/pages/Coupons.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior() {
    return { left: 0, top: 0 };
  }
});

export default router;
