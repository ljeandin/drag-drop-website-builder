<script setup>
    import PageBlock from "@/components/organisms/page-block/PageBlock.vue";
    import { blockStore } from "@/components/helpers/blockStore";
    blockStore.loadBlocks();
</script>

<template>
    <main class="builder-canvas">
        <PageBlock
            v-for="block in blockStore.blocks"
            :key="block.id"
            :blockType="block.type"
            :blockContent="block.content"
        />
    </main>
</template>
