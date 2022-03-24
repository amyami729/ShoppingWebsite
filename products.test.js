import { mount } from '@vue/test-utils';
import products from '@/views/Front/pages/Products.vue';

test('Check the result of 5 + 2', () => {
  expect(5 + 2).toBe(7)
});

test('props', () => {
  const wrapper = mount(products);
  expect(wrapper.findAll('[categoryItem]')).toHaveLength(1)
});