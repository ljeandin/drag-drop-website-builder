<script setup>
    defineProps({
        blockType: String,
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
            <p v-if="blockType === 'text'">
                Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>
            <img
                v-if="blockType === 'image'"
                src="https://picsum.photos/320/400"
                alt=""
                class="page-block__content-image"
            />
        </div>
    </div>
</template>
