<script setup>
    import { ref } from "vue";
    import ImagePicker from "@/components/organisms/image-picker/ImagePicker.vue";

    defineProps({
        blockId: { type: Number, required: true },
        blockType: { type: String, required: true },
        blockContent: { type: String, required: true },
    });

    const isImagePickerOpen = ref(false);

    const toggleImagePicker = () => {
        isImagePickerOpen.value = !isImagePickerOpen.value;
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
            <p
                v-if="blockType === 'text'"
                class="page-block__content-text"
                contenteditable="true"
            >
                {{ blockContent }}
            </p>
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
