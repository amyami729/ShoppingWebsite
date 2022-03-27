import { defineRule } from 'vee-validate';

defineRule('required', value => {
  if (!value || !value.length) {
    return '*請填寫此欄位';
  }
  return true;
});

defineRule('email', value => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }
  // Check if email
  if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(value)) {
    return '*此欄位需為電子郵件';
  }
  return true;
});

defineRule('min', (value, [limit]) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return `*此欄位至少 ${limit} 個字元`;
  }
  return true;
});