import { shallowMount } from '@vue/test-utils';
import products from '@/views/Front/pages/Products.vue';
import axios from 'axios'


test('Check the result of 5 + 2', () => {
  expect(5 + 2).toBe(7)
});


test('props', () => {
  // const wrapper = mount(products);
  const wrapper = shallowMount(products, {
    global: {
      mocks: {
        '$http': axios
      }
    }
  });

  expect(wrapper.findAll('[categoryItem]')).toHaveLength(1)
});
