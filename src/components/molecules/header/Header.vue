<script setup>
    import { blockStore } from "@/components/helpers/blockStore";

    const onClickAddText = () => {
        const newBlock = {
            id: Date.now(),
            type: "text",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        };

        blockStore.addBlock(newBlock);
    };
    const onClickAddImage = () => {
        const newBlock = {
            id: Date.now(),
            type: "image",
            content:
                "https://picsum.photos/id/33/5000/3333",
        };

        blockStore.addBlock(newBlock);
    };
</script>

<template>
    <header class="header">
        <button
            class="button button--without-border"
            @click="onClickAddText"
        >
            Add text
        </button>
        <button
            class="button button--without-border"
            @click="onClickAddImage"
        >
            Add image
        </button>
    </header>
</template>
