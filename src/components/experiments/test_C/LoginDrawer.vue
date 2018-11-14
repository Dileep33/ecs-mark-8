<template>
    <div class="login-drawer">
        <div class="head">
            <div class="login-container">
                <span>__("user_sign_up_with_facebook")</span>
                <button type="button" class="drawer-close" @click="closeLoginDrawer">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
        <div class="login-button">
            <FacebookLogin :continueWith="true"></FacebookLogin>
        </div>
    </div>
</template>

<script>
import FacebookLogin from '@/components/FacebookLogin'
import mixins from '@/mixins';

export default {
    name: 'Login-Drawer',
    mixins: [
        mixins
    ],
    data() {
        return {
            showSignupDrawer: this.getCookie( "SIGNUP_DRAWER_VIEWED" ) == null || this.getCookie( "SIGNUP_DRAWER_VIEWED" ) == "true",
            cross_count: this.getCookie( "SIGNUP_DRAWER_CROSSED" ) == null ? 0 : parseInt( this.getCookie( "SIGNUP_DRAWER_CROSSED" ) || 0 )
        }
    },
    components: {
        FacebookLogin
    },
    methods: {
        closeLoginDrawer() {
            this.hideDrawerFromView();
            this.cross_count++;
            this.triggerAnanlyticsEvent(`CLOSED_SIGNUP_BOOK`, 'TESTC2', {});
        },
        hideDrawerFromView() {
            $(".login-drawer").slideUp();
        },
        execNewCookieLogic() {
            if( this.cross_count == 1 )
                this.setCookie( "SIGNUP_DRAWER_VIEWED", 'false', 3, "/" );
            if( this.cross_count == 2 )
                this.setCookie( "SIGNUP_DRAWER_VIEWED", 'false', 7, "/" );
            if( this.cross_count == 3 )
                this.setCookie( "SIGNUP_DRAWER_VIEWED", 'false', 30, "/" );
            if( this.cross_count >= 4 )
                this.setCookie( "SIGNUP_DRAWER_VIEWED", 'false', 365, "/" );
                
            this.setCookie( "SIGNUP_DRAWER_CROSSED", this.cross_count, 365, "/" );
        }
    },
    mounted() {
        if (this.showSignupDrawer) {
            setTimeout(() => {
                $(".login-drawer").slideDown();
                FB.XFBML.parse();
            }, 1000)
        }
    },
    watch: {
        'cross_count': function() {
            this.execNewCookieLogic();
        }
    }
}
</script>

<style lang="scss" scoped>
    .login-drawer {
        display: none;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 20;
        background: #f3f3f3;
        padding: 5px 0 10px;
        box-shadow: 0 -1px 2px rgba(0,0,0,0.3);
        .login-container {
            max-width: 400px;
            margin: 0 auto;
        }
        .head {
            border-bottom: 1px solid #ced4da;
            margin-bottom: 10px;
            padding: 0 10px 5px;
            text-align: center;
            position: relative;
            font-size: 13px;
            .drawer-close {
                float: right;
                font-size: 20px;
                margin: 0;
                line-height: 16px;
                border: none;
                background: none;
                span {
                    color: #969696;
                }
            }
        }
        .login-button {
            
        }
    }
</style>
