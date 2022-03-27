// mount和shallowMount的區別？
// mount僅僅掛載當前組件實例；而shallowMount掛載當前組件實例以外，還會掛載子組件
import { mount, shallowMount, createLocalVue, createWrapper } from '@vue/test-utils';
import products from '@/views/Front/pages/Products.vue';
import axios from 'axios';

// 參考 main.js
const localVue = createLocalVue();
localVue.use(VueRouter);

// text1
test('Check the result of 5 + 2', () => {
  expect(5 + 2).toBe(7)
});

// text2
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
  expect(wrapper.findAll('.product-category').length).toEqual(1)
});