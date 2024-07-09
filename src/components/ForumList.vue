<script setup lang="ts">
import type { Forum, Forums } from '@/interfaces';

// APIから掲示板のリストを取得
const apiUrl = useNuxtApp().$apiClient();
const asyncData = useLazyFetch<Forums>(`${apiUrl}/forums`);

// 画面で使用する変数の定義
const forums = computed((): Forum[] => asyncData.data.value.forums);
const isForumEmpty = computed((): boolean => forums.value.length == 0);
const isApiError = computed((): boolean => asyncData.error.value != null);
const isApiPending = computed((): boolean => asyncData.status.value == "pending");
</script>

<template>
    <h3>掲示板一覧</h3>
    <div v-if="isApiError" class="alert alert-danger mt-1" role="alert">掲示板の取得に失敗しました。</div>
    <div v-else-if="isApiPending" class="loader"></div>
    <div v-else-if="isForumEmpty">掲示板が存在しません。</div>
    <ul v-else class="list-group">
        <li class="list-group-item" v-for="forum in forums" :key="forum.forum_id">
            <NuxtLink :to="{ name: 'forums-id', params: { id: forum.forum_id } }"
                class="d-flex w-100 justify-content-between">
                {{ forum.title }}
                <small class="align-self-end">最終更新: {{ forum.updated_at }}</small>
            </NuxtLink>
        </li>
    </ul>
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