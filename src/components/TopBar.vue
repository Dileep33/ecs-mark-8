<template>
    <div class="container top-bar">
        <div class="install-btn" @click="installApp()">Install</div>
        <div class="pratilipi-brand">
            <span class="logo"></span>
            <span class="brand-text">__("pratilipi")</span>
        </div>
        <div class="signin-btn" @click="openSignInModal()">__("user_sign_in")</div>
    </div>
</template>

<script>
import mixins from '@/mixins'

export default {
    name: 'top-bar',
    mixins: [
        mixins
    ],
    methods: {
        installApp() {
            this.triggerAnanlyticsEvent(`INSTALL_BOOKM_TOPBAR`, 'TESTC1', {});
            this.openInNewTab(this.getAndroidIntentUri({
                'utm_source': 'pratilipi_main_web',
                'utm_medium': 'web_bottom_strip',
                'utm_campaign': 'app_download'
            }));
        },
        openSignInModal() {
            this.openLoginModal(this.$route.meta.store, 'SIGNIN', 'TOPBAR', 'TESTC1');
        }
    }
}
</script>

<style lang="scss" scoped>
    .top-bar {
        position: relative;
        margin: 0 auto;
        .install-btn, .pratilipi-brand, .signin-btn {
            display: inline-block;
            vertical-align: middle;
        }
        .install-btn {
            float: left;
            background: #d0021b;
            color: #fff;
            border-radius: 3px;
            padding: 5px 15px;
            font-size: 12px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        .pratilipi-brand {
            .logo {
                background: url(../assets/pratilipi_logo.png) no-repeat left center;
                background-size: contain;
                height: 30px;
                width: 30px;
                display: inline-block;
                vertical-align: middle;
            }
            .brand-text {
                font-size: 14px;
                line-height: 14px;
                vertical-align: middle;
                font-weight: bold;
            }
        }
        .signin-btn {
            float: right;
            color: #d0021b;
            font-size: 13px;
            font-weight: bold;
            padding: 5px;
        }
    }
</style>
