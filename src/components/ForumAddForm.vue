<script setup lang="ts">
import type { Forum, ForumAdd } from '@/interfaces';

// 画面で使用する変数の定義
const isApiPending = ref(false);
const isApiError = ref(false);
const apiParam = ref<ForumAdd>({ title: "", content: "" });

// 掲示板作成関数の定義
const apiUrl = useNuxtApp().$apiClient();
const onCreateForum = async (): Promise<void> => {
    // 画面で使用する変数の初期化
    isApiError.value = false;
    isApiPending.value = true;

    // 掲示板作成APIの実行
    const asyncData = await useFetch<Forum>(
        `${apiUrl}/forums`,
        {
            method: "POST",
            body: apiParam
        }
    );
    isApiPending.value = false;

    // API実行に失敗した場合は、エラーメッセージを表示する。
    if (asyncData.error.value != null) {
        isApiError.value = true;
        return;
    }

    // 掲示板作成に成功した場合は、掲示板詳細画面に遷移する。
    router.push({ name: "forums-id", params: { id: asyncData.data.value?.forum_id } });
    return;
};
</script>

<template>
    <form v-on:submit.prevent="onCreateForum">
        <h3>掲示板作成</h3>
        <div class="form-group mb-3">
            <input class="form-control" type="text" placeholder="掲示板タイトル" maxlength="20" v-model="apiParam.title"
                v-bind:disabled="isApiError || isApiPending" />
        </div>
        <div class="form-group mb-3">
            <textarea class="form-control" rows="10" placeholder="掲示板の内容" maxlength="100" required
                v-model="apiParam.content" v-bind:disabled="isApiError || isApiPending"></textarea>
        </div>
        <div class="d-grid">
            <button type="submit" class="btn btn-dark" v-bind:disabled="isApiError || isApiPending">
                <span v-if="isApiPending" class="loader"></span>
                <span v-else>作成</span>
            </button>
        </div>
        <div v-if="isApiError" class="alert alert-danger mt-1" role="alert">掲示板の作成に失敗しました。</div>
    </form>
</template>

<style scoped>
.loader {
    font-weight: bold;
    font-family: sans-serif;
    font-size: 13px;
    animation: l1 1s linear infinite alternate;
}

.loader:before {
    content: "作成中..."
}

@keyframes l1 {
    to {
        opacity: 0
    }
}
</style>