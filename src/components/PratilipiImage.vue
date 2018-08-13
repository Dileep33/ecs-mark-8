<template>
    <div class="pratilipi-image">
        <img v-lazy="pratilipiImageObject" :alt="displayTitle">
    </div>
</template>

<script>
import mixins from '@/mixins';

export default {
    name: 'Pratilipi',
    props: {
        coverImageUrl: {
            type: String,
            required: true
        },
        displayTitle: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            pratilipiImageObject: {
                src: this.getHighResolutionImage(this.coverImageUrl),
                loading: this.getLowResolutionImage(this.coverImageUrl)
             },
        }
    },
    mixins: [
        mixins
    ],
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.pratilipi-image {
    margin: 5px;
    height: 150px;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    img[lazy=loading] {
        filter: blur(5px);
    }
}
</style>
