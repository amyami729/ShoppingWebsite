import { shallowMount } from '@vue/test-utils';
import products from '@/views/Front/pages/Products.vue';
import axios from 'axios';

test('Check the result of 5 + 2', () => {
  expect(5 + 2).toBe(7)
});


test('get category length', () => {
  const mockRoute = {
    query: {
      id: 1
    }
  }
  const mockRouter = {
    push: jest.fn()
  }
  const wrapper = shallowMount(products, {
    global: {
      mocks: {
        '$http': axios,
        '$route': mockRoute,
        '$router': mockRouter
      }
    }
  });
  expect(wrapper.findAll('.product-category').length).toEqual(2)
});

// target: 
// 1.Vue.use(router)是否可以正確注入$router/$route到prototype
// 2.注入的$router/$route是否可以成功掛載到組件實例
// 3.$router/$route是否可以正常獲取參數($route.query)和push($router.push)