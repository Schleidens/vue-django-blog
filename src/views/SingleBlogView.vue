<template>
    <div class="box">

        <div v-if="post" class="card mb-3">
            <img :src="post.cover" class="card-img-top cover" :alt="post.title">
            <div class="card-body">
                <h1 class="card-title fw-bold">{{  post.title }}</h1>
                <h6 v-if="post.author" class="card-title fw-bold">@{{ post.author.username }}</h6>
                <p class="card-text">
                    {{  post.content }}
                </p>
                <p class="card-text">
                    <small class="text-body-secondary">
                        Last updated {{ new Date(post.updated_date).toLocaleString() }}
                    </small>
                </p>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '../services/ApiService'

const router = useRoute()

const slug = router.params.slug

const post = ref({})

async function fetchSinglePost(){
        try {
            const response = await ApiService.get(`blogs/${slug}/`);
            post.value = response.data
        } catch (error) {
            console.log(error);
        }
    }

onMounted(() => {
    fetchSinglePost();
})
</script>

<style lang="scss" scoped>
.box{
  margin: 4em 10em 0em 10em;
}

.cover{
  height: 450px;
  width: auto;

  object-fit: cover;
}

@media (max-width: 768px) {
.box{
  margin: 4em 2em 0em 2em;
}
}
</style>