<template>
    <div class="my-2">
        <RouterLink to="/create/blog" role="button" class="btn btn-outline-primary w-100" :disabled="!isUserAuthenticated">
            {{ isUserAuthenticated ? 'Create a new blog' : 'Please login to create a new blog' }}
        </RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { isAuthenticated } from '../services/auth';

const isUserAuthenticated = isAuthenticated();

</script>

<style lang="scss" scoped>
</style>