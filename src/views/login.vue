<template>
  <div class="login">
    <div class="left">
      <h1>欢迎管理</h1>
    </div>
    <div class="right">
      <h2>欢迎回来</h2>
      <p>账号密码登录</p>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item prop="username">
          <el-input
            class="input"
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            prefix-icon="Search"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="input"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            prefix-icon="Search"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="button"
            @click="submitForm(ruleFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { POSTlogin } from '../utils/api.js'
import { ElMessage } from 'element-plus'

import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {
  ref,
  reactive,
  computed,
  defineProps,
  defineEmits,
  defineExpose
} from 'vue'

// 引入路由
const router = useRouter()
// 路由对象
const route = useRoute()
// 引入仓库
const store = useStore()

const ruleFormRef = ref()

// 声明响应式数据
const ruleForm = reactive({
  username: 'admin',
  password: 'admin'
})

const rules = reactive({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (ruleForm.username != 'admin' || ruleForm.password != 'admin') {
        ElMessage({
          message: 'Warning, this is a warning message.',
          type: 'warning'
        })
        return
      } else {
        console.log(1)
        POSTlogin(ruleForm).then((res) => {
          console.log(res.data.data.token)
          ElMessage({
            message: 'Congrats, this is a success message.',
            type: 'success'
          })
          localStorage.setItem('token', res.data.data.token)
          router.push('/')
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 父传子
const props = defineProps({})

// 子传父
const emit = defineEmits({})
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  .left {
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #626aef;
    color: #fff;
  }
  .right {
    width: 30%;
    text-align: center;
    padding-top: 16%;
    p {
      margin: 20px 0;
      color: #ddd;
    }
    .input {
      width: 300px;
    }
    .button {
      width: 300px;
      border-radius: 20px;
      background-color: #626aef;
    }
  }
}
</style>
