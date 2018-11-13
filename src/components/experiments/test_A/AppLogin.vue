<template>
    <div>
        <form class="forms" id="signup" v-if="currentStep === 'LANDED_LOGIN'">
            <div class="pratilipi-logo">
                <img src="../../../assets/pratilipi_logo.png" />
            </div>
            <div class="social-login">
                <FacebookLogin></FacebookLogin>
                <GoogleLogin></GoogleLogin>
            </div>
            <div class="or">__("or")</div>
            <p class="validation_error" v-if="(getLoginError && getLoginError.message)">
                <i class="material-icons">error</i>
                <span v-if="(getLoginError && getLoginError.message)">{{ getLoginError.message | getTranslatedLoginErrorMessage }}</span>
            </p>
            <div class="form-group">
                <p class="validation_error" v-if="emailIsInvalid || (getLoginError && getLoginError.email)">
                    <i class="material-icons">error</i>
                    <span v-if="(getLoginError && getLoginError.email)">{{ getLoginError.email }}</span>
                    <span v-else>__("email_entered_incorrectly")</span>
                </p>
                <input type="email" @keydown.enter="checkEmailAndGoToSecondStep" :class="{error: emailIsInvalid || (getLoginError && getLoginError.email) }" v-model="email" class="form-control" placeholder="__('email')">
                <input type="password" hidden="true">
                <button type="button" @click="checkEmailAndGoToSecondStep">
                    <span>__("user_sign_in")</span>
                    <i class="material-icons">keyboard_arrow_right</i>
                </button>
                <a v-if="!openForgotPasswordInTab" @click="triggerEventAndOpenForgotPasswordModal" href="#" class="forgot-pass">__("user_forgot_password")</a>
            </div>
        </form>

        <div class="forms" id="signup-form" v-if="currentStep === 'REGISTRATION'">

            <p class="validation_error" v-if="(getLoginError && getLoginError.message)">
                <i class="material-icons">error</i>
                <span v-if="(getLoginError && getLoginError.message)">{{ getLoginError.message | getTranslatedLoginErrorMessage }}</span>
            </p>
            <div class="form-group">
                <p class="validation_error" v-if="nameIsInvalid || (getLoginError && getLoginError.name)">
                    <i class="material-icons">error</i>
                    <span v-if="(getLoginError && getLoginError.name)">{{ getLoginError.name }}</span>
                    <span v-else>__("name_required")</span>
                </p>
                <input type="text" ref="name" @keyup.enter="verifyAndSignupUser({ name, email, password, language: getCurrentLanguage().fullName.toUpperCase() })" :class="{error: nameIsInvalid || (getLoginError && getLoginError.name) }" v-model="name" class="form-control" placeholder="__('user_full_name')">
            </div>
            <div class="form-group">
                <p class="validation_error" v-if="emailIsInvalid || (getLoginError && getLoginError.email)">
                    <i class="material-icons">error</i>
                    <span v-if="(getLoginError && getLoginError.email)">{{ getLoginError.email }}</span>
                    <span v-else>__("email_entered_incorrectly")</span>
                </p>
                <input type="email" @keyup.enter="verifyAndSignupUser({ name, email, password, language: getCurrentLanguage().fullName.toUpperCase() })" :class="{error: emailIsInvalid || (getLoginError && getLoginError.email) }" v-model="email" class="form-control" placeholder="__('email')">
            </div>
            <div class="form-group">
                <p class="validation_error" v-if="passwordIsInvalid || (getLoginError && getLoginError.password)">
                    <i class="material-icons">error</i>
                    <span v-if="(getLoginError && getLoginError.password)">{{ getLoginError.password }}</span>
                    <span v-else>__("password_minimum")</span>
                </p>
                <input autocomplete="new-password" @keyup.enter="verifyAndSignupUser({ name, email, password, language: getCurrentLanguage().fullName.toUpperCase() })" :class="{error: passwordIsInvalid || (getLoginError && getLoginError.password) }" v-model="password" type="password" class="form-control" placeholder="__('user_password')">
            </div>


            <button type="button" @click="verifyAndSignupUser({ name, email, password, language: getCurrentLanguage().fullName.toUpperCase() })" class="btn sign-in">__("user_sign_up")</button>
            <div class="or">__("or")</div>
            <button type="button" @click="goToSignin()" class="btn sign-up">__("user_sign_in")</button>

            <span class="terms-section">__("register_part_1") <a href="/privacy-policy" target="_blank">__("footer_privacy_policy")</a> __("register_part_2") <a href="/terms-of-service" target="_blank">__("footer_terms_of_service")</a> __("register_part_3")</span>
            <!-- <div class="terms-section">
                <span>__("user_is_registered")</span>
                <a href="#" v-on:click="tabsignin" data-tab="signin">__("user_to_sign_in")</a>
            </div> -->
        </div>

        <div class="forms" id="signin-form" v-if="currentStep === 'LOGIN'">
            <form id="formToSubmit">
                <p class="validation_error" v-if="(getLoginError && getLoginError.message)">
                    <i class="material-icons">error</i>
                    <span v-if="(getLoginError && getLoginError.message)">{{ getLoginError.message | getTranslatedLoginErrorMessage }}</span>
                </p>
                <div class="form-group">
                    <p class="validation_error" v-if="emailIsInvalid || (getLoginError && getLoginError.email)">
                        <i class="material-icons">error</i>
                        <span v-if="(getLoginError && getLoginError.email)">{{ getLoginError.email }}</span>
                        <span v-else>__("email_entered_incorrectly")</span>
                    </p>
                    <input type="email" @keyup.enter="validateAndLoginUser({email, password})" :class="{error: emailIsInvalid || (getLoginError && getLoginError.email) }" class="form-control" v-model="email" placeholder="__('email')">
                </div>
                <div class="form-group">
                    <p class="validation_error" v-if="passwordIsInvalid || (getLoginError && getLoginError.password)">
                        <i class="material-icons">error</i>
                        <span v-if="(getLoginError && getLoginError.password)">{{ getLoginError.password }}</span>
                        <span v-else>__("password_minimum")</span>
                    </p>
                    <input type="password" ref="password" @keyup.enter="validateAndLoginUser({email, password})" :class="{error: passwordIsInvalid || (getLoginError && getLoginError.password) }" class="form-control" v-model="password" placeholder="__('user_password')">
                    <a v-if="!openForgotPasswordInTab" @click="triggerEventAndOpenForgotPasswordModal" href="#" class="forgot-pass">__("user_forgot_password")</a>
                    <router-link v-else :to="'/login#forgot-pass'" target="_blank" class="forgot-pass">__("user_forgot_password")</router-link>
                </div>

                <button type="button" @click="validateAndLoginUser({email, password})" class="btn sign-in">__("user_sign_in")</button>
                <div class="or">__("or")</div>
                <button type="button" @click="goToSignup()" class="btn sign-up">__("user_sign_up")</button>
                <!-- <div class="terms-section">
                    <span>__("user_is_new")</span>
                    <a href="#" v-on:click="tabsignup" data-tab="signup">__("user_sign_up_for_pratilipi")</a>
                </div> -->
            </form>
        </div>

        <ForgetPassword :isLoginPage="isLoginPage" :email="email"></ForgetPassword>
        <div class="spinner-overlay" v-if="getLoginLoadingState === 'LOADING'">
            <Spinner></Spinner>
        </div>
        <div class="signup-footer" v-if="getPostLoginAction.pratilipiData">
            <span class="login-text" v-if="getPostLoginAction.action && getPostLoginAction.action.indexOf('addToLibrary') > -1">__('login_popup_story_added_to_library')</span>
            <span class="login-text" v-else-if="getPostLoginAction.action && getPostLoginAction.action.indexOf('setPratilipiRating') > -1">__("login_popup_read_and_rate_stories")</span>
            <span class="login-text" v-else>__("login_popup_default")</span>
            
            <div class="pratilipi-info">
                <div class="pratilipi-image"><img :src="getPostLoginAction.pratilipiData.coverImageUrl" :alt="getPostLoginAction.pratilipiData.title"></div>
                <div class="pratilipi-data">
                    <div class="title">{{ getPostLoginAction.pratilipiData.title }}</div>
                    <div class="author">{{ getPostLoginAction.pratilipiData.author.name }}</div>
                    <div class="book-stats">
                        <span class="avg-rating stars-green" ><span class="rating-text">{{ getPostLoginAction.pratilipiData.averageRating | round(1) }}</span> <i class="material-icons">star_rate</i></span>
                        <span class="review-count"> <span>{{ getPostLoginAction.pratilipiData.ratingCount }}</span> __("rating_ratings")</span>
                    </div>
                    <div class="book-stats">
                        <span class="read-count">__("pratilipi_count_reads"): {{ getPostLoginAction.pratilipiData.readCount | showThousandsInCommas() }} </span>
                        <span class="date">__("pratilipi_listing_date"): {{ getPostLoginAction.pratilipiData.listingDateMillis | convertDate }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import GoogleLogin from '@/components/GoogleLogin';
import FacebookLogin from '@/components/FacebookLogin';
import Spinner from '@/components/Spinner.vue';
import ForgetPassword from '@/components/ForgetPasswordModal';
import mixins from '@/mixins';

export default {
    name: 'Registration-Form',
    mixins: [
        mixins
    ],
    data() {
        return {
            email: '',
            password: '',
            name: '',
            emailIsInvalid: false,
            passwordIsInvalid: false,
            nameIsInvalid: false
        }
    },
    props: {
        isLoginPage: {
            type: Boolean,
            required: false
        },
        openForgotPasswordInTab: {
            type: Boolean,
            required: false,
            default: false
        },
        currentStep: {
            required: true,
            type: String
        },
        changeCurrentStep: {
            required: true,
            type: Function
        },
        shouldRemoveError: {
            type: Boolean
        },
        resetShouldRemoveError: {
            type: Function
        }
    },
    methods: {
        ...mapActions([
            'signupUser',
            'loginUser',
            'checkIfUserValid',
            'resetLoginError'
        ]),
        goToSignup() {
            this.changeCurrentStep('REGISTRATION');
        },
        goToSignin() {
            this.changeCurrentStep('LOGIN');
        },
        checkEmailAndGoToSecondStep() {
            this.emailIsInvalid = !this.validateEmail(this.email);

            if (this.emailIsInvalid) {
                return;
            }

            this.checkIfUserValid(this.email);
        },
        verifyAndSignupUser(data) {
            const { name, email, password } = data;

            this.nameIsInvalid = !this.validateUsername(name);
            this.emailIsInvalid = !this.validateEmail(email);
            this.passwordIsInvalid = !this.validatePassword(password);

            if (!this.emailIsInvalid && !this.passwordIsInvalid && !this.nameIsInvalid) {
                this.signupUser(data);
            }
        },
        validateAndLoginUser({ email, password }) {


            this.emailIsInvalid = !this.validateEmail(email);
            this.passwordIsInvalid = !this.validatePassword(password);
            if (!this.emailIsInvalid && !this.passwordIsInvalid) {
                this.loginUser({ email, password });
            }
        },
        tabsignin(event) {
            event.preventDefault();
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".login-menu a").removeClass("active");
            $(".signin").addClass("active");
            $(".forms").hide();
            $("#" + tab_id).show();
        },
        triggerEventAndOpenForgotPasswordModal() {
            this.openForgotPasswordModal();
            setTimeout(() => {
                $(".email-input-for-forget").focus();
            }, 500);
            this.triggerAnanlyticsEvent('LANDED_FORGOTPM_FORGOTP', 'CONTROL', {});
        }
    },
    watch: {
        'currentStep'() {
            this.nameIsInvalid = false;
            this.emailIsInvalid = false;
            this.passwordIsInvalid = false;
            this.resetLoginError();
        },

        'getEmailCheckingStatus.loading_state'(loadingState) {
            if (loadingState === 'LOADING_SUCCESS' && this.getEmailCheckingStatus.is_valid) {
                this.changeCurrentStep('LOGIN');
                setTimeout(() => {
                    this.$refs.password.focus();
                }, 500);
            } else if(loadingState === 'LOADING_SUCCESS' && !this.getEmailCheckingStatus.is_valid) {
                this.changeCurrentStep('REGISTRATION');
                setTimeout(() => {
                    this.$refs.name.focus();
                }, 500);
            } else if(loadingState === 'LOADING_ERROR') {
                this.emailIsInvalid = true;
            }
        },
        'shouldRemoveError'(shouldRemoveError) {
            if (shouldRemoveError) {
                this.nameIsInvalid = false;
                this.emailIsInvalid = false;
                this.passwordIsInvalid = false;
                this.resetLoginError();
                this.resetShouldRemoveError();
            }
        }
    },
    computed: {
        ...mapGetters([
            'getLoginError',
            'getLoginLoadingState',
            'getEmailCheckingStatus',
            'getPostLoginAction'
        ])
    },
    components: {
        GoogleLogin,
        FacebookLogin,
        Spinner,
        ForgetPassword
    },
    created() {
    }
}
</script>

<style  lang="scss" scoped>
.forms {
    margin: 5px 10px;
    text-align: left;
    display: none;
    &#signup {
        display: block;
    }
    &#signup-form {
        display: block;
        .btn {
            width: 100%;
        }
        .btn.sign-up {
            width: 100%;
            background-color: #eee;
        }
    }
    &#signin-form {
        display: block;

        .btn.sign-in {
            margin-top: 10px;
            width: 100%;
        }

        .btn.sign-up {
            width: 100%;
            background-color: #eee;
        }
    }

    .pratilipi-logo {
        text-align: center;
        img {
            display: inline-block;
            height: 21%;
            width: 21%;
            padding-bottom: 10px;
        }

        p.subtitle {
            text-align: center;
            font-size: 12px;
            padding: 10px 0 10px 10px;
            margin-bottom: 5px;
        }
    }
    .or {
        display: flex;
        flex: 1;
        width: 100%;
        margin: 20px auto;
        line-height: 1em;
        font-size: 12px;
    }
    .or::before, .or::after {
        content: '';
        flex-grow: 1;
        margin: 0px 10px;
        background: linear-gradient(to right, #e9e9e9, #e9e9e9);
        background-size: 100% 1px;
        background-position: 0% 50%;
        background-repeat: repeat-x;
    }
    .or::before {
        margin-left: 0;
    }
    .or::after {
        margin-right: 0;
    }

    .form-group {
        position: relative;
        i {
            display: inline-block;
            vertical-align: middle;
        }

        input {
            padding-right: 30%;
        }
        button {
            vertical-align: middle;
            display: inline-block;
            position: absolute;
            right: 0;
            bottom: 0;
            color: #d00b12;
            padding: 5px;
            background: none;
            border: none;

            span {
                font-size: 14px;
            }
        }
    }
    .forgot-pass, .footlink {
        font-size: 12px;
        color: #212529;
    }
    .forgot-pass {
        float: right;
        padding-top: 5px;
    }
    .footlink {
        display: inline-block;
        margin: 10px 0;
    }
    .terms-section {
        font-size: 12px;
        display: block;
        margin: 10px 0;
        color: #212529;
    }
}
.sign-in {
    background: #d00b12;
    color: #fff;
    margin-right: 10px;
    &:hover {
        opacity: 0.9;
    }
}
#forgotPassModal {
    text-align: left;
    margin-top: 150px;
}
.social-login {
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
}
.validation_error {
    margin: 5px 5px 5px 0;
    font-size: 12px;
    color: #d00b12;
    i {
        font-size: 16px;
        vertical-align: middle;
    }
    span {
        vertical-align: middle;
    }
}
.form-control.error {
    border-color: #d00b12;
}
.spinner-overlay {
    position: absolute;
    top: 0;
    background: rgba(255,255,255,0.8);
    width: 100%;
    height: 100%;
    .spinner {
        top: 42%;
        position: absolute;
    }
}

.signup-footer {
    background: #e9e9e9;
    overflow: hidden;
    margin-bottom: 10px;
    .login-text {
        font-size: 14px;
        margin: 10px 5px;
        display: block;
    }
    .pratilipi-info {
        margin: 5px 0;
        overflow: hidden;
        .pratilipi-image {
            width: 80px;
            height: 120px;
            margin: 5px 10px;
            float: left;
            border: 2px solid #fff;
            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }
        .pratilipi-data {
            float: left;
            text-align: left;
            width: calc(100% - 110px);
            font-size: 14px;
            margin: 5px 0;
            .title {
                font-weight: bold;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .author {
                font-size: 12px;
                margin: 5px 0;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .book-stats {
                font-size: 13px;
                margin: 5px 0;
                .avg-rating {
                    background-color: #37be5f;
                    color: #fff;
                    margin: 0 5px 0 0;
                    padding: 3px 7px;
                    border-radius: 2px;
                    display: inline-block;
                    font-size: 12px;
                    vertical-align: middle;
                    .rating-text {
                        vertical-align: middle;
                    }
                    .material-icons {
                        font-size: 12px;
                        width: 16px;
                        padding-left: 5px;
                        vertical-align: middle;
                    }
                    &.stars-green {
                        background: #37be5f;
                    }
                }
                .review-count {
                    font-size: 12px;
                    text-align: left;
                    span {
                        padding-left: 5px;
                    }
                }
                .read-count {
                    margin: 0;
                    display: block;
                }
                .date {
                    display: block;
                }
            }
        }
    }
}
</style>
