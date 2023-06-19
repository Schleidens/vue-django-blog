<template>
    <div class="d-flex justify-content-center align-items-center h-100 gradient">
        <div class="px-3">
            <div class="text-center mb-2">
                <h1 class="fw-bold text-uppercase text-light">Login</h1>
            </div>
            <div class="mx-auto rounded p-3 glass" :class="isDisable ? 'disable' : ''">
                <form @submit="handleLogin">
                <div class="form-floating mb-3">
                    <input type="text" v-model="username" class="form-control" id="floatingInput" placeholder="Username">
                    <label for="floatingInput">Username</label>
                </div>

                <div class="form-floating">
                    <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>
                <button class="btn btn-primary w-100 mt-3" type="submit">Login In</button>
                </form>
            </div>
            <div class="bg-danger py-2 text-center text-light fw-medium error" v-show="error">
                {{ error }}
            </div>
        </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../services/auth';

import { useRouter } from 'vue-router';
const router = useRouter();

const username = ref('')
const password = ref('')

const error = ref('')

const isDisable =  ref(false)

const handleLogin = async (event) => {
    event.preventDefault();

    isDisable.value = true

    const success = await login(username.value, password.value)

    if (success) {
        router.push('/')
    } else {
        error.value = "We couldn’t find an account matching the username and password you entered. Please check your username and password and try again.";
    }

    isDisable.value = false
}
</script>

<style lang="scss" scoped>
.gradient{
    background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
}

.glass{
background: rgba(94, 141, 220, 0.32);
box-shadow: 0 4px 250px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(3px);
-webkit-backdrop-filter: blur(3px);

min-width: 350px;
}

.alert{
    width: inherit;
}

.error{
    position: fixed;
    top: 56px;
    right: 0;
    left: 0;

}
</style>