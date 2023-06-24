import { defineStore } from 'pinia';
import { ref } from 'vue';
import ApiService from '../services/ApiService';

export const usePostStore = defineStore('postStore', () => {
    const posts = ref({})
    async function fetchPosts(){
        try {
            const response = await ApiService.get('blogs/');
            posts.value = response.data
        } catch (error) {
            if(error && error.response.status == 401){
                window.alert("You've been logged out from the server");
                window.location.reload();
            }
        }
    }
    return {
        posts, fetchPosts
    }
});
