<script setup lang="ts">
import type { Forum } from '@/interfaces';

// const apiUrl = useRuntimeConfig().public.apiUrl;
import { useNuxtApp } from '#app';
const apiUrl = useNuxtApp().$apiClient();
const router = useRouter();

const apiParam: {
    title: string;
    content: string;
} = reactive(
    {
        title: "",
        content: ""
    }
);
const isApiPending = ref(false);
const isApiError = ref(false);

// 「投稿」ボタンを押したときの処理
const onSubmit = async (): Promise<void> => {
    isApiPending.value = true;
    isApiError.value = false;
    const asyncData = await useFetch<Forum>(
        `${apiUrl}/forums`,
        {
            method: "POST",
            body: apiParam
        }
    );
    isApiPending.value = false;
    // レスポンスが200以外の場合は、エラーメッセージを表示する。
    if (asyncData.error.value != null) {
        isApiError.value = true;
        return;
    }
    router.push({ name: "forums-id", params: { id: asyncData.data.value?.forum_id } });
    return;
};

</script>

<template>
    <div class="container">
        <div class="row justify-content-center" data-zanim-timeline="{}" data-zanim-trigger="scroll">
            <div class="col-lg-7">
                <ForumAddForm />
                <!-- <form v-on:submit.prevent="onSubmit">
                    <h2>掲示板作成</h2>
                    <div v-if="isApiError" class="alert alert-danger" role="alert">掲示板の作成に失敗しました。</div>
                    <div class="form-group mb-3">
                        <input class="form-control" type="text" placeholder="掲示板タイトル" maxlength="20"
                            v-model="apiParam.title" />
                    </div>
                    <div class="form-group mb-3">
                        <textarea class="form-control" rows="10" placeholder="掲示板の内容" maxlength="100" required
                            v-model="apiParam.content"></textarea>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-dark btn-block hvr-sweep-top">投稿</button>
                    </div>
                </form> -->
            </div>
        </div>
    </div>
</template>