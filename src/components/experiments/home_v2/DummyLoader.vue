<template>
    <div class="dummy-content-loader" :class="className">
        <div class="dummy-section" v-for="i in sectionCount || 2" :key="i">
            <div class="background-masker dummy-title"></div>
            <div class="dummy-item" v-for="j in 10" :key="j">
                <div class="background-masker dummy-image"></div>
                <div class="background-masker dummy-name"></div>
                <div class="background-masker dummy-name"></div>
                <div class="background-masker dummy-author"></div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Dummy-Loader',
    props: {
        sectionCount: {
            type: Number
        },
        className: {
            type: Object
        }
    }
}
</script>
<style  lang="scss" scoped>
.dummy-content-loader {
    background: #fff;
    border-radius: 3px;
    padding: 12px;
    margin: 0 auto;
    min-height: 200px;
    text-align: left;
    @keyframes placeHolderShimmer {
        0%{
            background-position: -468px 0
        }
        100%{
            background-position: 468px 0
        }
    }
    .dummy-section {
        background: #fff;
        position: relative;
        overflow-x: scroll;
        width: 100%;
        white-space: nowrap;
        margin-bottom: 30px;
    }
    .background-masker {
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background: #f6f7f8;
        background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        background-size: 800px 104px;
        min-height: 10px;
        position: relative;
    }
    .dummy-title {
        height: 34px;
        margin-bottom: 10px;
    }
    .dummy-item {
        width: 150px;
        height: 310px;
        display: inline-block;
        margin-right: 20px;
    }
    .dummy-image {
        margin: 5px 0;
        height: 219px;
    }
    .dummy-name {
        height: 25px;
        margin-bottom: 4px;
    }
    .dummy-author {
        height: 15px;
        margin-bottom: 4px;
    }
    .dummy-stats {
        .stats {
            width: 32%;
            height: 40px;
            display: inline-block;
            &.stats-2 {
                margin: 0 2px;
            }
        }
    }
}
.dummy-content-loader.list {
    padding: 3px 5px;
}
.dummy-content-loader.list .dummy-section {
    overflow: auto;
    white-space: normal;
    text-align: left;
    @media screen and (max-width: 992px) {
        text-align: center;
    }
    .dummy-title {
        display: none;
    }
    .dummy-item {
        margin: 0 5px 10px;
    }
}
</style>
