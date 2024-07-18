<script setup lang="ts">
import type { CommentAdd, Comments } from '@/interfaces';

// Propsの定義
interface Props {
    forumId: string;
}
const props = defineProps<Props>();

// Emitsの定義
type Emits = {
    commentAdded: [];
};
const emit = defineEmits<Emits>();

// 画面で使用する変数の定義
const isApiPending = ref(false);
const isApiError = ref(false);
const apiParam = ref<CommentAdd>({ comment: "" });

// コメント作成関数の定義
const apiUrl: string = useNuxtApp().$apiClient();
const onCreateComment = async (): Promise<void> => {
    // 画面で使用する変数の初期化
    isApiError.value = false;
    isApiPending.value = true;

    try {
        // 掲示板コメント作成APIの実行
        await $fetch<Comments>(
            `${apiUrl}/forums/${props.forumId}/comments`,
            {
                method: "POST",
                body: apiParam.value
            }
        );
        // コメント作成に成功した場合は、コメント作成イベントを実行する。
        emit("commentAdded");
        // コメント作成に成功した場合は、コメントフォームをリセットする。
        apiParam.value = { comment: "" };
    } catch (error) {
        // API実行に失敗した場合は、エラーメッセージを表示する。
        isApiError.value = true;
    } finally {
        isApiPending.value = false;
    }
    return;
};
</script>

<template>
    <div>
        <h3>コメント作成</h3>
        <form v-on:submit.prevent="onCreateComment">
            <div>
                <textarea class="form-control" rows="5" placeholder="コメントの内容" maxlength="100" v-model="apiParam.comment"
                    v-bind:disabled="isApiError || isApiPending"></textarea>
            </div>
            <div class="d-grid mt-2">
                <button type="submit" class="btn btn-dark" v-bind:disabled="isApiError || isApiPending">
                    <span v-if="isApiPending" class="loader"></span>
                    <span v-else>作成</span>
                </button>
            </div>
            <div v-if="isApiError" class="alert alert-danger mt-1" role="alert">コメントの作成に失敗しました。</div>
        </form>
    </div>
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