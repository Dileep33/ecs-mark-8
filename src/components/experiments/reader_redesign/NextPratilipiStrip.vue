<template>
    <div class="next-pratilipi-strip">
        <div class="next-pratilipi-text">
            <p class="next-pratilipi-text-title">__("read_next_pratilipi_here")</p>
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
        .next-pratilipi-text {
            color: #000;
            font-size: 15px;
            .next-pratilipi-text-title {
                font-size: 14px;
            }
            p {
                margin: 0;
            }
        }
    }
</style>
