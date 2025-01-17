<script setup>
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

    const onClickCloseButton = () => {
        console.log("close");
    };
</script>

<template>
    <div class="image-picker">
        <div class="image-picker__header">
            <p>Choose a new image</p>
            <button
                class="button button--with-border"
                @click="onClickCloseButton()"
            >
                X
            </button>
        </div>
        <div class="image-picker__content-wrapper">
            <div class="image-picker-list">
                <button
                    v-for="image in predefinedImages"
                    :key="image.id"
                    class="image-picker-list__button"
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
