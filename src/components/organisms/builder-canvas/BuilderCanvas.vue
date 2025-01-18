<script setup>
    import { ref, onMounted } from "vue";
    import { blockStore } from "@/components/helpers/blockStore";
    import PageBlock from "@/components/organisms/page-block/PageBlock.vue";

    blockStore.loadBlocks();

    let draggedBlockId = ref(null);

    let nextSiblingElement = ref(null);

    const onDragStart = (blockElement) => {
        draggedBlockId.value = parseInt(
            blockElement.dataset.blockId
        );

        const siblingBlocks = [
            ...document.querySelectorAll(
                ".js-page-block:not(.js-page-block-dragging)"
            ),
        ];

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
            // finds the first sibling block where the mouse pointer
            // is positioned in the top half or above that block
            nextSiblingElement = siblingBlocks.find(
                (sibling) => {
                    return (
                        event.clientY <=
                        sibling.offsetTop +
                            sibling.offsetHeight / 2
                    );
                }
            );

            const draggingBlock = document.querySelector(
                ".js-page-block-dragging"
            );

            document
                .querySelector(".js-builder-canvas")
                .insertBefore(
                    draggingBlock,
                    nextSiblingElement
                );
        });
    };

    const onDragEnd = () => {
        const nextSiblingId = parseInt(
            nextSiblingElement?.dataset?.blockId
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
