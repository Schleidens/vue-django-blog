<template>
    <div class="register">
        <div class="register__box">
            <form @submit.prevent="HandleRegister">
                <div class="row mb-2">
                    <div class="col">
                        <label for="first_name" class="form-label">First name</label>
                        <input type="text" v-model="data.first_name" id="first_name" class="form-control" aria-label="First name">
                    </div>
                    <div class="col">
                        <label for="last_name" class="form-label">Last name</label>
                        <input type="text" v-model="data.last_name" id="last_name" class="form-control" aria-label="Last name">
                    </div>
                </div>
                <div class="mb-2">
                    <label for="InputUsername" class="form-label">Username</label>
                    <input type="text" v-model="data.username" id="InputUsername" class="form-control">
                </div>
                <div class="mb-2">
                    <label for="InputEmail" class="form-label">Email address</label>
                    <input type="email" v-model="data.email" id="InputEmail" class="form-control">
                    <div class="form-text text-light">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-2">
                    <label for="InputPassword" class="form-label">Password</label>
                    <input type="password" v-model="data.password" class="form-control" id="InputPassword">
                </div>
                <div class="mb-2">
                    <label for="InputPasswordConfirm" class="form-label">Confirm password</label>
                    <input type="password" v-model="data.password_confirm" class="form-control" id="InputPasswordConfirm">
                </div>
                <div v-show="passwordError" class="mb-2 bg-danger">
                    <p class="p-1">
                        {{ passwordError }}
                    </p>
                </div>
                <div class="mt-2">
                    <button type="submit" class="btn btn-primary w-100" :disabled="validate">Register</button>
                </div>
            </form>
        </div>

        <div class="register__box">
            {{ validate }}
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const data = ref({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password_confirm: ""
});

const passwordError = ref("");

const validate = computed(() =>{
    if (data.value.first_name && data.value.last_name && data.value.username && data.value.email && data.value.password && data.value.password_confirm){
        return false
    } else{
        return true
    }
});

const HandleRegister = () => {
    if((data.value.password.length < 8) && (data.value.password_confirm.length < 8)){
        passwordError.value = "Password should be 8+ characters and contain numbers, letters"
    }else if(data.value.password != data.value.password_confirm){
        passwordError.value = "Password not match";
    }else{
        alert("we good")
    }
}

</script>

<style lang="scss" scoped>

.register{
    display: flex;

    min-height: 100vh;

    &__box{
        width: 50%;

        &:first-child{
            background-color: #2c4f8b;

            padding: 0 1em;

            display: flex;
            justify-content: center;
            align-items: center;

            color: #fff;
        }

        &:nth-child(2){
            background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
        }
    }
}


@media (max-width: 768px) {
.register{
    &__box{
        width: 100%;

        &:first-child{
            padding: 0 2em;
        }

        &:nth-child(2){
            display: none;
        }
    }
}
}
</style>