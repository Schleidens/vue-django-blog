<template>
    <div class="box">
        <h1 class="fw-bold">
            Dashboard
        </h1>

        <div class="mt-3">
            <div v-for="post in posts" :key="post.id" class="card mb-3">
                <div class="card-body">
                    <RouterLink :to="`blog/${post.slug}`" class="text-decoration-none text-reset">
                        <h3 class="card-title fw-semibold">
                            {{ post.title }}
                        </h3>
                    </RouterLink>
                    <p class="card-text">
                        <small class="text-body-secondary me-2">
                            Created {{ new Date(post.created_date).toLocaleDateString() }}
                        </small>
                        <small class="text-body-secondary">
                            Updated {{ new Date(post.updated_date).toLocaleDateString() }}
                        </small>
                    </p>
                </div>
                <div class="card-footer">
                    <RouterLink :to="`blog/${post.slug}/edit`" type="button" class="btn btn-primary me-3">
                        Edit
                    </RouterLink>
                    <button @click="setDraft(post.slug)" type="button" class="btn btn-warning me-3">
                        {{ post.draft ? 'Publish' : 'Set to draft' }}
                    </button>
                    <!-- Button trigger modal -->
                    <button @click=deletePost(post.slug) type="button" class="btn btn-danger">
                        Delete
                    </button>

                </div>
            </div>

            <div v-show="showOnPostDelete" class="fixed-bottom end-0 alert alert-success alert-dismissible fade show" role="alert">
                <strong>Post successfully deleted!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import ApiService from '../services/ApiService';

const posts = ref({})

const showOnPostDelete = ref(false)

const fetchPost = async () => {
    try {
        const response = await ApiService.get('user-blogs/');
        posts.value = response.data
        console.log(posts);
    } catch (error) {
        console.log(error);
    }
}

const setDraft = async (slug) => {
    try {
        await ApiService.put(`user-blogs/${slug}/set_draft/`)
        fetchPost();
    } catch (error) {
        console.log(error);
    }
}

const deletePost = async (slug) => {
    try {
        const response = await ApiService.delete(`user-blogs/${slug}/`);
        fetchPost();
        if(response.status == 204){
            showOnPostDelete.value = true;
        }
        setTimeout(() => {
            showOnPostDelete.value = false;
        }, 5000);
    } catch (error) {
        error
    }
}

onMounted(() => {
    fetchPost();
})
</script>

<style lang="scss" scoped>
.box{
  margin: 4em 10em 0em 10em;
}

.alert{
    max-width: 600px;
    right: 3px;
}

@media (max-width: 768px) {
.box{
  margin: 4em 2em 0em 2em;
}

.alert{
    margin: 0 1em 1em 1em;
}
}
</style>