<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top" aria-label="Third navbar example">
    <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">DV-Blog</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav me-auto mb-2 mb-sm-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </li>
        </ul>
        <!-- Example single danger button -->
        <div class="dropdown-center" v-if="isUserAuthenticated">
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                More
            </button>
            <ul class="dropdown-menu dropdown-menu-lg-end p-0">
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li class="mt-1">
                    <RouterLink class="nav-link" to="/login">
                        <button type="button" class="btn btn-warning w-100">
                            Logout
                        </button>
                    </RouterLink>
                </li>
            </ul>
        </div>
        <div v-else>
            <RouterLink class="nav-link" to="/login">
                <button type="button" class="btn btn-primary">
                    Login
                </button>
            </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import { isAuthenticated } from '../../services/auth';

const isUserAuthenticated = isAuthenticated()
</script>

<style lang="scss" scoped>
</style>