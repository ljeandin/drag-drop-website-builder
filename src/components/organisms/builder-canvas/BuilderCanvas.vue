<script setup>
    import { ref, watch } from "vue";
    import { blockStore } from "@/components/helpers/blockStore";
    import PageBlock from "@/components/organisms/page-block/PageBlock.vue";

    blockStore.loadBlocks();

    let draggedBlockId = ref(null);

    let siblingBlocks = ref(null);

    let nextSiblingElement = ref(null);

    const onDragStart = (blockElement) => {
        const blockId = blockElement.dataset.blockId;
        draggedBlockId.value = parseInt(blockId);

        siblingBlocks.value = [
            ...document.querySelectorAll(".js-page-block"),
        ].filter(
            (sibling) => sibling.dataset.blockId !== blockId
        );

        const builderCanvas = blockElement.closest(
            ".js-builder-canvas"
        );

        builderCanvas.removeEventListener(
            "dragover",
            builderCanvas
        );

        builderCanvas.removeEventListener(
            "drop",
            builderCanvas
        );

        builderCanvas.addEventListener("dragover", () => {
            nextSiblingElement.value =
                siblingBlocks.value.find((sibling) => {
                    return (
                        event.clientY <=
                        sibling.offsetTop +
                            sibling.offsetHeight / 2
                    );
                });

            const draggingBlock = document.querySelector(
                ".js-page-block-dragging"
            );

            document
                .querySelector(".js-builder-canvas")
                .insertBefore(
                    draggingBlock,
                    nextSiblingElement.value
                );
        });
    };

    const onDragEnd = () => {
        const nextSiblingId = parseInt(
            nextSiblingElement.value?.dataset?.blockId
        );

        if (draggedBlockId.value) {
            blockStore.reorderBlocks(
                draggedBlockId.value,
                nextSiblingId
            );
        }

        draggedBlockId.value = null;
    };
</script>

<template>
    <main
        class="builder-canvas js-builder-canvas"
        @dragover.prevent
        @drop.prevent
    >
        <PageBlock
            v-for="block in blockStore.blocks"
            :key="block.id"
            :blockId="block.id"
            :blockType="block.type"
            :blockContent="block.content"
            @moveBlock="onDragStart"
            @stopMovingBlock="onDragEnd"
        />
    </main>
</template>
