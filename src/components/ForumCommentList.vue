<script setup lang="ts">
import type { Forum, Comment, Comments } from '@/interfaces';

// Propsの定義
interface Props {
    forumId: string;
}
const props = defineProps<Props>();

// APIから掲示板と掲示板コメントを取得
const apiUrl = useNuxtApp().$apiClient();
const asyncDataForum = useLazyFetch<Forum>(`${apiUrl}/forums/${props.forumId}`);
const asyncDataComments = useLazyFetch<Comments>(`${apiUrl}/forums/${props.forumId}/comments`);

// 画面で使用する変数の定義
const isApiError = computed((): boolean => asyncDataForum.error.value != null || asyncDataComments.error.value != null);
const isApiPending = computed((): boolean => asyncDataForum.status.value == "pending" || asyncDataComments.status.value == "pending");
const forum = computed((): Forum => asyncDataForum.data.value);
const comments = computed((): Comments => asyncDataComments.data.value.comments);

// APIから再取得する関数を定義
const reload = (): void => {
    asyncDataForum.refresh();
    asyncDataComments.refresh();
};
defineExpose({ reload });
</script>

<template>
    <div v-if="isApiError" class="alert alert-danger mt-1" role="alert">掲示板の情報取得に失敗しました。</div>
    <div v-else-if="isApiPending" class="loader"></div>
    <div v-else>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ forum.title }}</h5>
                <p class="card-text">{{ forum.content }}</p>
                <small class="d-block text-end">最終更新: {{ forum.updated_at }}</small>
            </div>
        </div>
        <div v-for="comment in comments" class="card">
            <div class="card-body">
                <span class="badge bg-light text-dark">No.{{ comment.comment_id }}</span>
                <p class="card-text">{{ comment.comment }}</p>
                <small class="d-block text-end">最終更新: {{ comment.updated_at }}</small>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loader {
    font-weight: bold;
    font-family: sans-serif;
    font-size: 30px;
    animation: l1 1s linear infinite alternate;
}

.loader:before {
    content: "Loading..."
}

@keyframes l1 {
    to {
        opacity: 0
    }
}
</style>