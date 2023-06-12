<template>
    <nav class="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark fixed-top" data-bs-theme="dark">
    <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">DV-Blog</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
            <RouterLink class="nav-link" to="/about">About</RouterLink>
        </div>
        </div>
    </div>
    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
</style>