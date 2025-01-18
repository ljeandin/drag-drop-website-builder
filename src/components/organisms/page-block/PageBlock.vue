<script setup>
    import { ref, onMounted, defineEmits } from "vue";
    import { blockStore } from "@/components/helpers/blockStore";
    import ImagePicker from "@/components/organisms/image-picker/ImagePicker.vue";

    const props = defineProps({
        blockId: { type: Number, required: true },
        blockType: { type: String, required: true },
        blockContent: { type: String, required: true },
    });

    const emit = defineEmits([
        "moveBlock",
        "stopMovingBlock",
    ]);

    const resizeTextArea = (textarea) => {
        textarea.style.height =
            textarea.scrollHeight + "px";
    };

    if (props.blockType === "text") {
        onMounted(() => {
            resizeTextArea(
                document.querySelector(
                    ".js-textarea-" + props.blockId
                )
            );
        });
    }

    const isImagePickerOpen = ref(false);

    const toggleImagePicker = () => {
        isImagePickerOpen.value = !isImagePickerOpen.value;
    };

    const isDragging = ref(false);

    const onDragEvent = (blockElement) => {
        isDragging.value = !isDragging.value;

        if (isDragging.value === true) {
            emit("moveBlock", blockElement);
        } else {
            emit("stopMovingBlock");
        }
    };

    const onEditText = (blockId, content, textarea) => {
        blockStore.updateBlock(blockId, content);
        resizeTextArea(textarea);
    };

    const onDuplicateBlock = (blockId) => {
        blockStore.duplicateBlock(blockId);
    };

    const onDeleteBlock = (blockId) => {
        blockStore.deleteBlock(blockId);
    };
</script>

<template>
    <div
        class="page-block js-page-block"
        :class="{
            'js-page-block-dragging page-block--dragging':
                isDragging,
        }"
        :data-block-id="blockId"
        draggable="true"
        @dragstart="onDragEvent($event.target)"
        @dragend="onDragEvent()"
    >
        <div class="page-block__header">
            <button
                type="button"
                v-if="blockType === 'image'"
                class="page-block__header-button button button--dark-bg"
                @click="toggleImagePicker()"
            >
                Change image
            </button>
            <button
                type="button"
                class="page-block__header-button button button--dark-bg"
                @click="onDuplicateBlock(blockId)"
            >
                Duplicate
            </button>
            <button
                type="button"
                class="page-block__header-button button button--dark-bg"
                @click="onDeleteBlock(blockId)"
            >
                Delete
            </button>
        </div>

        <div class="page-block__content">
            <textarea
                v-if="blockType === 'text'"
                class="page-block__content-text"
                :class="'js-textarea-' + blockId"
                :value="blockContent"
                @input="
                    onEditText(
                        blockId,
                        $event.target.value,
                        $event.target
                    )
                "
                rows="1"
            ></textarea>
            <img
                v-if="blockType === 'image'"
                :src="blockContent"
                alt=""
                class="page-block__content-image"
            />
        </div>
    </div>

    <ImagePicker
        v-if="isImagePickerOpen"
        :blockId="blockId"
        @closeImagePicker="toggleImagePicker"
    />
</template>
