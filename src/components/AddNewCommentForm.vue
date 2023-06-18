<template>
    <div>
        <div class="mb-3">
            <textarea v-model="comment" :placeholder="isUserAuthenticated ? 'Add a new comment' : 'Please login to add comment' " class="form-control" id="exampleFormControlTextarea1" rows="3" :disabled="!isUserAuthenticated"></textarea>
        </div>

        <div @click="addNewComment" class="mb-3">
            <button v-show="commentNotNone" type="submit" class="btn btn-primary mb-3">Publish</button>
         </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { computed, ref } from 'vue';
import { isAuthenticated } from '../services/auth';
import ApiService from '../services/ApiService';

const isUserAuthenticated = isAuthenticated();

const comment = ref('');

const commentNotNone = computed(() => {
    return !!comment.value
});

const props = defineProps({
    route: String,
});

const addNewComment = async () => {
    try {
        await ApiService.post(`comments/${props.route}/`, {content : comment.value});
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

</script>

<style lang="scss" scoped>

</style>