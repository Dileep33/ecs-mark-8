<template>
    <div class="webpush-confirmation" id="webPushModal">
        <div class="logo"></div>
        <div class="text">{{message}}</div>
        <div class="buttons">
            <div class="button disallow" v-if="includeDisableButton" @click="disableWebPush()">__("web_push_cancel")</div>
            <div class="button allow" @click="enableWebPush()">__("web_push_allow")</div>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins'
import { mapGetters } from 'vuex'
import WebPushUtil from '@/utils/WebPushUtil'

export default {
    mixins: [
        mixins
    ],
    data() {
        return {
            action: null
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        screenName: {
            type: String,
            required: true
        },
        includeDisableButton: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        enableWebPush() {
            this.action = "ENABLED"
            $('#webPushModal').slideUp()
            WebPushUtil.enabledOnCustomPrompt(this.$route.meta.store)
            this.triggerAnanlyticsEvent(`ENABLED_WEBPUSHPOPUP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, 'ACTION_COUNT': WebPushUtil.getNthActionCount()})
        },
        disableWebPush() {
            this.action = "DISABLED"
            $('#webPushModal').slideUp()
            WebPushUtil.disabledOnCustomPrompt(this.$route.meta.store)
            this.triggerAnanlyticsEvent(`DISABLED_WEBPUSHPOPUP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, 'ACTION_COUNT': WebPushUtil.getNthActionCount()})
        }
    },
    mounted() {
        $('#webPushModal').on('shown.bs.modal', (e) => {
            this.triggerAnanlyticsEvent(`VIEWED_WEBPUSHPOPUP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId})
        })
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    }
}
</script>

<style lang="scss" scoped>
    @mixin css-prefix($property, $value) {
    -webkit-#{$property}: #{$value};
    -khtml-#{$property}: #{$value};
        -moz-#{$property}: #{$value};
        -ms-#{$property}: #{$value};
        -o-#{$property}: #{$value};
            #{$property}: #{$value};
    }
    .webpush-confirmation {
        background: #fff;
        max-width: 500px;
        width: 95%;
        margin: 0 0 5px;
        padding: 10px;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        z-index: 1050;
        box-shadow: 0 0 2px rgba(0,0,0,0.2), 0 -2px 4px rgba(0,0,0,0.1);
        display: none;
        .logo {
            background: url(../../../assets/pratilipi_logo.png) no-repeat center;
            background-size: contain;
            width: 70px;
            height: 70px;
            margin: 5px auto;
            float: left;
        }
        .text {
            font-size: 14px;
            margin: 5px 10px;
            float: left;
            width: calc(100% - 90px);
            text-align: left;
        }
        .buttons {
            clear: both;
            text-align: right;
            .button {
                display: inline-block;
                font-size: 14px;
                padding: 10px 15px;
                margin: 0 10px;
                font-weight: bold;
                cursor: pointer;
                &.disallow {
                    color: #1c6aed;
                }
                &.allow {
                    background: #1c6aed;
                    color: #fff;
                    border-radius: 2px;
                    min-width: 110px;
                    text-align: center;
                    box-shadow: 0 2px 2px rgba(0,0,0,0.2);
                    margin-right: 5px;
                }
            }
        }
    }
</style>
