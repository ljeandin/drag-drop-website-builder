<script setup>
    defineProps({
        blockType: { type: String, required: true },
        blockContent: { type: String, required: true },
    });
</script>

<template>
    <div class="page-block">
        <div class="page-block__header">
            <button
                class="page-block__header-button button button--with-border"
            >
                Edit
            </button>
            <button
                class="page-block__header-button button button--with-border"
            >
                Duplicate
            </button>
            <button
                class="page-block__header-button button button--with-border"
            >
                Delete
            </button>
        </div>

        <div class="page-block__content">
            <p
                v-if="blockType === 'text'"
                class="page-block__content-text"
                contenteditable="true"
            >
                {{ blockContent }}
            </p>
            <img
                v-if="blockType === 'image'"
                :src="blockContent"
                alt=""
                class="page-block__content-image"
            />
        </div>
    </div>
</template>
