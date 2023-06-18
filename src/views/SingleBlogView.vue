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

    <div class="comment-box">
        <h3 class="fw-bold mb-3">Comment</h3>

        <AddNewCommentForm :route="slug" />

        <div v-if="comments" class="comment">
            <div v-for="item in comments" :key="item.id" class="card mt-2">
                <div v-if="item.author" class="card-header fw-medium">
                    @{{ item.author.username }}
                </div>

                <div class="card-body py-2">
                    <p class="m-0">{{ item.content }}</p>
                </div>
            </div>
        </div>
        <div v-if="noComment" class="no-comment">
            This blog have no comment
        </div>
    </div>


    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '../services/ApiService'
import AddNewCommentForm from '../components/AddNewCommentForm.vue';

const router = useRoute()

const slug = router.params.slug

const post = ref({})

const comments = ref({})

const noComment = ref(false)

async function fetchSinglePost(){
        try {
            const response = await ApiService.get(`blogs/${slug}/`);
            post.value = response.data
        } catch (error) {
            console.log(error);
        }
}

async function fetchComment(){
    try {
        const response =  await ApiService.get(`comments/${slug}/`);
        
        if (response.data.length != 0) {
            comments.value = response.data
        } else {
            noComment.value = true
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    fetchSinglePost();
    fetchComment();
})
</script>

<style lang="scss" scoped>
.box{
  margin: 4em 10em 4em 10em;
}

.cover{
  height: 450px;
  width: auto;

  object-fit: cover;
}

@media (max-width: 768px) {
.box{
  margin: 4em 2em 4em 2em;
}
}

.comment-box{
    border-top: 1px solid rgb(104, 98, 98);
    padding-top: 1em;
}
</style>