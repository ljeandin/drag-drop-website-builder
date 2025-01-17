import { reactive } from "vue";

export const blockStore = reactive({
    blocks: [],

    loadBlocks() {
        const storedblocks =
            localStorage.getItem("blockList");
        this.blocks = storedblocks
            ? JSON.parse(storedblocks)
            : [];
    },

    addBlock(block) {
        this.blocks.push(block);
        localStorage.setItem(
            "blockList",
            JSON.stringify(this.blocks)
        );
    },

    updateBlock(blockId, content) {
        const currentblock = this.blocks.find(
            (block) => block.id === blockId
        );

        if (currentblock) {
            currentblock.content = content;
            localStorage.setItem(
                "blockList",
                JSON.stringify(this.blocks)
            );
        }
    },

    deleteBlock(blockId) {
        this.blocks = this.blocks.filter(
            (block) => blockId !== block.id
        );
        localStorage.setItem(
            "blockList",
            JSON.stringify(this.blocks)
        );
    },

    duplicateBlock(blockId) {
        const currentblock = this.blocks.find(
            (block) => block.id === blockId
        );

        const newBlock = {
            id: Date.now(),
            type: currentblock.type,
            content: currentblock.content,
        };

        this.blocks.push(newBlock);
        localStorage.setItem(
            "blockList",
            JSON.stringify(this.blocks)
        );
    },
});
