<script setup>
    import { defineEmits } from "vue";
    import { blockStore } from "@/components/helpers/blockStore";

    defineProps({
        blockId: { type: Number, required: true },
    });

    const predefinedImages = [
        {
            id: 1,
            src: "https://picsum.photos/id/33/1920/1080",
        },
        {
            id: 2,
            src: "https://picsum.photos/id/78/1920/1080",
        },
        {
            id: 3,
            src: "https://picsum.photos/id/93/1920/1080",
        },
        {
            id: 4,
            src: "https://picsum.photos/id/127/1920/1080",
        },
    ];

    const emit = defineEmits(["closeImagePicker"]);

    const onClickImageButton = (blockId, imageSrc) => {
        blockStore.updateBlock(blockId, imageSrc);

        emit("closeImagePicker");
    };
</script>

<template>
    <div class="image-picker">
        <div class="image-picker__header">
            <p>Choose a new image</p>
            <button
                type="button"
                class="button button--dark-bg"
                @click="$emit('closeImagePicker')"
            >
                X
            </button>
        </div>
        <div class="image-picker__content-wrapper">
            <div class="image-picker-list">
                <button
                    type="button"
                    v-for="image in predefinedImages"
                    :key="image.id"
                    class="image-picker-list__button"
                    @click="
                        onClickImageButton(
                            blockId,
                            image.src
                        )
                    "
                >
                    <img
                        :src="image.src"
                        alt=""
                        class="image-picker-list__button-image"
                    />
                </button>
            </div>
        </div>
    </div>
</template>
