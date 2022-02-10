<template>
  <div class="login">
    <button @click="login">登陆</button>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: "login",
  methods: {
    login() {
      api.test.text1({ a: '1' }).then((res) => {
        console.log(111, res)
      }, (err) => {
        console.log(err)
      })
      api.test.text2({ a: '1' }).then((res) => {
        console.log(222, res)
      }, (err) => {
        console.log(err)
      })
      api.test.text3({ a: '1' }).then((res) => {
        console.log(333, res)
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
  .login{}
</style>
