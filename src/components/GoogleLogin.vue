<template>
    <button @click="loginToGoogle" type="button" name="button" class="google"><icon name="google"></icon>__("google")</button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';

export default {
    name: 'Google-Login-Button',
    mixins: [
        mixins
    ],
    methods: {
        ...mapActions([
            'loginUserWithGoogleToken'
        ]),
        loginToGoogle() {
            const that = this;

            const GoogleAuth = gapi.auth2.getAuthInstance();
            GoogleAuth.signIn().then( function( googleUser ) {
                console.log(GoogleAuth.currentUser.get());
                that.loginUserWithGoogleToken({ googleIdToken: googleUser.getAuthResponse().id_token, language: that.getCurrentLanguage().fullName.toUpperCase() });
            }, function( error ) {
                console.log( JSON.stringify( error, undefined, 2 ) );
            });
        },
        oneTapSignin() {
            if (window.googleYoLoaded) {
                const hintPromise = googleyolo.hint({
                    supportedAuthMethods: [
                        "https://accounts.google.com"
                    ],
                    supportedIdTokenProviders: [{
                        uri: "https://accounts.google.com",
                        clientId: process.env.GOOGLE_CLIENT_ID
                    }]
                });

                googleyolo.cancelLastOperation().then(() => {
                    // Credential selector closed.
                });

                const that = this;
                hintPromise.then((credential) => {
                    if (credential.idToken) {
                        // Send the token to your auth backend.
                        // useGoogleIdTokenForAuth(credential.idToken);
                        that.loginUserWithGoogleToken({ googleIdToken: credential.idToken, language: that.getCurrentLanguage().fullName.toUpperCase() });
                    }
                }, (error) => {
                    console.log(error);
                    switch (error.type) {
                    case "userCanceled":
                      // The user closed the hint selector. Depending on the desired UX,
                      // request manual sign up or do nothing.
                      break;
                    case "noCredentialsAvailable":
                      // No hint available for the session. Depending on the desired UX,
                      // request manual sign up or do nothing.
                      break;
                    case "requestFailed":
                      // The request failed, most likely because of a timeout.
                      // You can retry another time if necessary.
                      break;
                    case "operationCanceled":
                      // The operation was programmatically canceled, do nothing.
                      break;
                    case "illegalConcurrentRequest":
                      // Another operation is pending, this one was aborted.
                      break;
                    case "initializationError":
                      // Failed to initialize. Refer to error.message for debugging.
                      break;
                    case "configurationError":
                      // Configuration error. Refer to error.message for debugging.
                      break;
                    default:
                      // Unknown error, do nothing.
                    }
                });
            }
        }
    },
    components: {

    },
    created() {

        if (document.getElementById('google-client-jssdk')) {
            return;
        }

        // setTimeout(() => {
        //     this.oneTapSignin();
        // }, 3000);
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s);
            js.id = id;
            js.src = "//apis.google.com/js/api.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-client-jssdk'));
        document.getElementById('google-client-jssdk').onload = () => {
            gapi.load( 'auth2', () => {
                const googleClientId = process.env.GOOGLE_CLIENT_ID;
                gapi.auth2.init({
                    client_id: `${googleClientId}`,
                    cookiepolicy: 'single_host_origin',
                    ux_mode: 'popup',
                    prompt: 'select_account'
                });
            });
        }
    }
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
</style>
