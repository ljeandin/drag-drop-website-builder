<script setup>
    import { ref, onMounted } from "vue";
    import { blockStore } from "@/components/helpers/blockStore";
    import ImagePicker from "@/components/organisms/image-picker/ImagePicker.vue";

    const props = defineProps({
        blockId: { type: Number, required: true },
        blockType: { type: String, required: true },
        blockContent: { type: String, required: true },
    });

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

    const onEditText = (blockId, content, textarea) => {
        blockStore.updateBlock(blockId, content);
        resizeTextArea(textarea);
    };
</script>

<template>
    <div class="page-block">
        <div class="page-block__header">
            <button
                v-if="blockType === 'image'"
                class="page-block__header-button button button--with-border"
                @click="toggleImagePicker()"
            >
                Change image
            </button>
            <button
                class="page-block__header-button button button--with-border"
            >
                Duplicate
            </button>
            <button
                class="page-block__header-button button button--with-border"
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
