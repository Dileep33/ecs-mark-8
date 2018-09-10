<template>
    <div class="next-pratilipi-strip">
        <div class="next-pratilipi-image" v-if="showImage">
            <img :src="this.pratilipi.coverImageUrl" alt="">
        </div>
        <div class="next-pratilipi-text" :class="{'fullwidth': !showImage}">
            <p class="next-pratilipi-text-head">__("read_next_pratilipi_here")</p>
            <p class="next-pratilipi-text-title">{{ this.pratilipi.title }}</p>
        </div>
    </div>
</template>
<script>

    import mixins from '@/mixins';

    export default {
        name: "NextPratilipiStrip",
        props: {
            pratilipi: {
                type: Object,
                required: true
            },
            showImage: {
                type: Boolean,
                required: true
            }
        },
        mixins: [
            mixins
        ],
        data() {
            return {
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .next-pratilipi-strip {
        background: #e9e9e9;
        padding: 10px;
        margin: 10px;
        text-align: left;
        .next-pratilipi-image {
            width: 65px;
            height: 80px;
            display: inline-block;
            margin-right: 10px;
            img {
                width: 100%;
                height: 100% !important;
                object-fit: cover;
            }

        }
        .next-pratilipi-text {
            color: #000;
            width: calc(100% - 80px);
            display: inline-block;
            vertical-align: middle;
            &.fullwidth {
                width: 100%;
            }
            .next-pratilipi-text-head {
                font-size: 12px;
            }
            .next-pratilipi-text-title {
                font-size: 18px;
            }
            p {
                margin: 0;
            }
        }
    }
</style>
