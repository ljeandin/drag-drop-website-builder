import { reactive } from "vue";

export const blockStore = reactive({
    blocks: [],

    saveBlocks() {
        localStorage.setItem(
            "blockList",
            JSON.stringify(this.blocks)
        );
    },

    loadBlocks() {
        const storedblocks =
            localStorage.getItem("blockList");
        this.blocks = storedblocks
            ? JSON.parse(storedblocks)
            : [];
    },

    addBlock(block) {
        this.blocks.unshift(block);
        this.saveBlocks();
    },

    updateBlock(blockId, content) {
        const currentBlock = this.blocks.find(
            (block) => block.id === blockId
        );

        if (currentBlock) {
            currentBlock.content = content;
            this.saveBlocks();
        }
    },

    deleteBlock(blockId) {
        this.blocks = this.blocks.filter(
            (block) => blockId !== block.id
        );
        this.saveBlocks();
    },

    duplicateBlock(blockId) {
        const currentBlock = this.blocks.find(
            (block) => block.id === blockId
        );

        if (currentBlock) {
            const currentBlockIndex =
                this.blocks.indexOf(currentBlock);
            const newBlock = {
                id: Date.now(),
                type: currentBlock.type,
                content: currentBlock.content,
            };

            this.blocks.splice(
                currentBlockIndex + 1,
                0,
                newBlock
            );

            this.saveBlocks();
        }
    },

    reorderBlocks(blockId, nextBlockId) {
        const currentBlockIndex = this.blocks.findIndex(
            (block) => block.id === blockId
        );

        const nextBlockIndex = this.blocks.findIndex(
            (block) => block.id === nextBlockId
        );

        if (currentBlockIndex !== -1) {
            const [draggedBlock] = this.blocks.splice(
                currentBlockIndex,
                1
            );

            if (nextBlockIndex !== -1) {
                this.blocks.splice(
                    nextBlockIndex,
                    0,
                    draggedBlock
                );
            } else {
                this.blocks.push(draggedBlock);
            }
            this.saveBlocks();
        }
    },
});
