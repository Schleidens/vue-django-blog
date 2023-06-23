<template>
    <div class="box">
            <div v-if="data.title" :class="isDisable ? 'disable' : '' ">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                        New blog title here....
                    </label>
                    <input v-model="data.title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Blog title">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">
                        Write your blog content here....
                    </label>
                    <textarea v-model="data.content" class="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
                </div>
                <div @click="updatePost" class="col-auto">
                    <button type="submit" class="btn btn-primary mb-3 w-100">Save changes</button>
                </div>
            </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ApiService from '../services/ApiService'

const router =  useRouter();
const route = useRoute();

const isDisable = ref(false);

const slug = route.params.slug;

const data = ref({
    title: "",
    content: "",
})

const fetchPostForValue = async () => {
    try {
        const response = await ApiService.get(`user-blogs/${slug}/`);
        data.value.title = response.data.title
        data.value.content = response.data.content
    } catch (error) {
        if(error.response.status == 404){
            router.push('/');
        }
    }
}

const updatePost = async () => {
    try {
        isDisable.value = true

        const response = await ApiService.put(`user-blogs/${slug}/`, data.value);

        if(response.status == 200){
            router.push(`/blog/${slug}`)
        }
        
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    fetchPostForValue();
})
</script>

<style lang="scss" scoped>
.box{
  margin: 6em 8em 0em 8em;
  padding: 2em 2em 2em 2em;
}

@media (max-width: 768px) {
.box{
  margin: 4em 1em 0em 1em;
  padding: 2em 1em 2em 1em;
}
}
</style>