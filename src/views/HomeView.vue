<script setup>
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import { usePostStore } from '../stores/postStore';
import AddNewPostButtonVue from '../components/AddNewPostButton.vue';

const store = usePostStore()

onMounted(() => {
  store.fetchPosts()
})
</script>

<template>
  <div class="box">

    <!-- create new blog button -->
    <AddNewPostButtonVue />

    <div v-for="item in store.posts" :key="item.id">

        <div class="card mb-3">
            <RouterLink :to="`blog/${item.slug}`">
              <img :src="item.cover" class="card-img-top cover" :alt="item.title">
            </RouterLink>
            <div class="card-body">
              <h3 class="card-title fw-bold mb-3">{{ item.title }}</h3>
              <h6 class="card-title">@{{ item.author.username }}</h6>
              <p class="card-text">
                <small class="text-body-secondary">
                  Last updated {{ new Date(item.updated_date).toLocaleString()  }}
                </small>
              </p>
            </div>
        </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.box{
  margin: 4em 10em 0em 10em;
}

.cover{
  height: 300px;
  width: 100%;

  object-fit: cover;
}

@media (max-width: 768px) {
.box{
  margin: 4em 2em 0em 2em;
}
}
</style>
