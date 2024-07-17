<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const forumId: string = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const forumCommentListRef = ref(null);
const onCommentAdded = () => {
    if (forumCommentListRef.value) {
        forumCommentListRef.value.reload();
        scrollToBottom();
    }
    return;
}

const scrollToBottom = () => {
    const bottomElement = document.getElementById('bottom');
    if (bottomElement) {
        bottomElement.scrollIntoView({ behavior: 'smooth' });
    }
}
</script>


<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-lg-7">
                <div class="mb-3">
                    <NuxtLink v-bind:to="{ name: 'forums' }">掲示板一覧</NuxtLink>
                    <span class="mx-2 text-700">></span>
                    <a class="text-700">掲示板</a>
                </div>
                <ForumCommentList v-bind:forumId="forumId" ref="forumCommentListRef" />
            </div>
        </div>
        <div class="row justify-content-center mt-5" data-zanim-timeline="{}" data-zanim-trigger="scroll">
            <div class="col-lg-7">
                <ForumCommentAddForm v-bind:forumId="forumId" v-on:commentAdded="onCommentAdded" />
            </div>
            <div id="bottom"></div>
        </div>
    </div>
</template>