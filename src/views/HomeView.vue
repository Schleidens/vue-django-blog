<script setup>
import { onMounted } from 'vue';
import { usePostStore } from '../stores/postStore'

const store = usePostStore()

onMounted(() => {
  store.fetchPosts()
})
</script>

<template>
  <div class="box">
    <div v-for="item in store.posts" :key="item.id">

        <div class="card mb-3">
            <img :src="item.cover" class="card-img-top cover" :alt="item.title">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <h6 class="card-title">{{ item.author.username }}</h6>
              <p class="card-text">
                {{ item.content }}
              </p>
              <p class="card-text">
                <small class="text-body-secondary">
                  Last updated {{ item.updated_date  }}
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
  width: auto;

  object-fit: cover;
}

@media (max-width: 768px) {
.box{
  margin: 4em 2em 0em 2em;
}
}
</style>
