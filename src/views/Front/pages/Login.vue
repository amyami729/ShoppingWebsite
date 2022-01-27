<template>
  <div class="container">
    <div class="row justify-content-center align-items-center mh-wrapper">
      <div class="col-md-6 my-3 rounded">
        <h3 class="h3 mb-3 font-weight-normal">登入</h3>
        <Form @submit="signin">
          <div class="form-floating mb-3">
            <Field name="email" type="email" id="username" class="form-control" rules="required|email" v-model="user.username" placeholder="Email"/>
            <label for="username">Email</label>
            <ErrorMessage class="error-message" name="email" />
          </div>
          <div class="form-floating">
            <Field name="password" type="password" id="password" class="form-control" rules="required|min:8" v-model="user.password" placeholder="密碼"/>
            <label for="password">密碼</label>
            <ErrorMessage class="error-message" name="password" />
          </div>
          <div class="pt-3 d-grid">
            <button type="submit" class="btn btn-major mb-2 orange">登入</button>
          </div>
        </Form>
          <router-link to="/" class="return-mall container">go shopping</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Field,
    Form,
    ErrorMessage
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          const { token, expired } = response.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          this.$router.push('/admin/products');
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.error-message{
  color: red;
  font-size: 13px;
}

.orange{
  background: orange;

  &:hover{
    opacity: 0.9;
  }
}

.return-mall{
  color: black;
  text-decoration: none;
  background: #ececea;

  &:hover{
    opacity: 0.8;
  }
}
</style>