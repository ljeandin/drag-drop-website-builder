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
        <h1>Drag n' drop !</h1>
        <div>
            <button
                type="button"
                class="button"
                @click="onClickAddText"
            >
                Add text
            </button>
            <button
                type="button"
                class="button"
                @click="onClickAddImage"
            >
                Add image
            </button>
        </div>
    </header>
</template>
