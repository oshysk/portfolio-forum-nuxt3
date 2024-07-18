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
                <div class="mb-3">
                    <NuxtLink v-bind:to="{ name: 'forums' }">掲示板一覧</NuxtLink>
                    <span class="mx-2 text-700">></span>
                    <span class="text-700">掲示板作成</span>
                </div>
                <ForumAddForm />
            </div>
        </div>
    </div>
</template>