import { defineStore } from 'pinia';
import { ref } from 'vue';
import ApiService from '../services/ApiService';

export const usePostStore = defineStore('postStore', () => {
    const posts = ref({})
    async function fetchPosts(){
        try {
            const response = await ApiService.get('blogs/');
            posts.value = response.data
            console.log(posts);
        } catch (error) {
            console.log(error);
        }
    }
    return {
        posts, fetchPosts
    }
});
