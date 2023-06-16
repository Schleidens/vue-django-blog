<template>
    <div class="box">
            <div :class="isDisable ? 'disable' : '' ">
                <div class="mb-3">
                    <label for="formFile" class="form-label">Add a cover image</label>
                    <input @change="getFileInputValue" class="form-control" type="file" id="formFile">
                </div>

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
                    <textarea v-model="data.content" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="form-check mb-3">
                    <input v-model="data.draft" class="form-check-input" type="checkbox" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Set to draft
                    </label>
                </div>
                <div @click="createNewPost" class="col-auto">
                    <button type="submit" class="btn btn-primary mb-3 w-100">Publish</button>
                </div>
            </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ApiService from '../services/ApiService'

const router =  useRouter();

const isDisable = ref(false);

const fileInput = ref(null);

const getFileInputValue = (event) => {
    const file = event.target.files;
    fileInput.value = file[0] 
}

const data = ref({
    cover: fileInput,
    title: "",
    content: "",
    draft: false

})

const createNewPost = async () => {
    try {
        isDisable.value = true

        await ApiService.post('blogs/', data.value, {
            headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        isDisable.value =false

        router.push('/')
    } catch (error) {
        console.log(error);
    }
}

</script>

<style lang="scss" scoped>
.box{
  margin: 8em 10em 0em 10em;
}

@media (max-width: 768px) {
.box{
  margin: 6em 2em 0em 2em;
}
}
.disable{
    pointer-events: none;
  opacity: 0.5;
  /* Additional styling to indicate disabled appearance */
  background-color: lightgray;
  color: gray;
}
</style>