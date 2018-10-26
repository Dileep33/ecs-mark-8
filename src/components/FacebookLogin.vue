<template>
    <button v-if="directBtn" :class="{direct: directBtn}" @click="loginToFacebookDirect" type="button" name="button" class="fb"><icon name="facebook-f"></icon>__("user_sign_up_with_facebook")</button>
    <button v-else @click="loginToFacebook" type="button" name="button" class="fb"><icon name="facebook-f"></icon>__("facebook")</button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import inViewport from 'vue-in-viewport-mixin';
import mixins from '@/mixins';

export default {
    name: 'Facebook-Login-Button',
    mixins: [
        mixins,
        inViewport
    ],
    props: {
        directBtn: {
            type: Boolean
        },
        'in-viewport-once': {
            default: true
        },
        'in-viewport-offset-top': {
            default: -90
        }
    },
    methods: {
        ...mapActions([
            'loginUserWithFacebookAccessToken'
        ]),
        loginToFacebookDirect() {
            localStorage.setItem('login_modal_refer_details', JSON.stringify({
                REFER_SCREEN: "BOOK",
                REFER_ACTION: "CLICKED",
                REFER_LOCATION: "FACEBOOK"

            }));
            this.triggerAnanlyticsEvent(`CLICKED_FACEBOOK_BOOK`, 'CONTROL', {
                
            });
            this.loginToFacebook();
        },
        loginToFacebook() {
            const that = this;
            FB.login( function( fbResponse ) {
                if( fbResponse == null || fbResponse.authResponse == null ) {
                    return;
                }
                that.loginUserWithFacebookAccessToken({ facebookAccessToken: fbResponse.authResponse.accessToken, language: that.getCurrentLanguage().fullName.toUpperCase() });
            }, { scope: 'public_profile,email,user_birthday' } );
        }
    },
    watch: {
        'inViewport.now'(visible) {
            if (visible && this.directBtn) {
                this.triggerAnanlyticsEvent(`VIEWED_FACEBOOK_BOOK`, 'CONTROL', {
                    
                });

            }
        }
    },
}
</script>

<style  lang="scss" scoped>
button.fb, button.google {
    background: #3b5998;
    color: #fff;
    display: block;
    width: 100%;
    height: 45px;
    max-width: 400px;
    margin: 10px auto;
    border-radius: 3px;
    border: 0;
    outline: none;
    text-align: left;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
    .fa-icon {
        vertical-align: middle;
        margin: 0 15px;
    }
}
button.google {
    background: #DD4B39;
}
button.fb.direct {
    max-width: 96%;
    margin: 0 auto;
    text-align: center;
    .fa-icon {
        margin: 0 15px 0 0;
    }
}
</style>
