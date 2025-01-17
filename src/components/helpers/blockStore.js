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
});
