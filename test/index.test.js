import { shallowMount } from '@vue/test-utils';
import products from '@/views/Front/pages/Products.vue';
import axios from 'axios';

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