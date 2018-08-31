<template>
    <div>
        <span class="hidden-elem">.</span>
        <!-- Phone Modal -->
        <div class="modal fade phoneModal" id="phoneModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="form-group">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <i class="material-icons">close</i>
                            </button>
                            <h3>Enter your phone number below to get stories as SMS</h3>
                            <div class="mobile-number-wrap">
                                <p class="errors" v-if="errors.length" v-for="error in errors">{{ error }}</p>
                                <div class="mobile-number" :class="{error: (errors.length > 0)}">
                                    <span>+91</span>
                                    <input type="tel" v-model="mobileNumber" value="" placeholder="Mobile Number" autofocus required>
                                </div>
                                <button type="button" class="btn btn-submit" @click="submitPhoneNumber()">Ok</button> 
                            </div>
                            <p class="thank-you">Thank You</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            mobileNumber: '',
            errors: [],
            showMobileModal: this.getCookie( "mobileNumber_asked" ) == null || this.getCookie( "mobileNumber_asked" ) == "true"
        }
    },
    props: {
        'in-viewport-once': {
            default: true
        },
        'in-viewport-offset-top': {
            default: -200
        }
    },
    mixins: [
        mixins,
        inViewport
    ],
    methods: {
        submitPhoneNumber() {
            const strippedNumber = this.mobileNumber.replace(/\D/g, '');
            
            if (this.mobileNumber && strippedNumber.length === 10) {
                console.log("Mobile: " + strippedNumber);
                
                this.setCookie("mobileNumber_asked", 1, 30, "/");
                
                $(".thank-you").fadeIn();
                $(".mobile-number-wrap").hide();
                
                this.errors = [];
                setTimeout(() => {
                    $('#phoneModal').modal('hide');
                    
                }, 2000);
                return true;
            }
            this.errors = [];
            
            if (!this.mobileNumber) {
                this.errors.push('Mobile Number required!');
            }
            else if (strippedNumber.length !== 10) {
                this.errors.push('Not a valid number');
            }
        }
    },
    watch: {
        'inViewport.now'(visible) {
            if (visible && this.showMobileModal) {
                $('#phoneModal').modal('show');
                setTimeout(() => {
                    $('input').focus();
                }, 1000);
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.hidden-elem {
    color: #fff;
    font-size: 1px;
}
.phoneModal {
    text-align: left;
    max-width: 350px;
    margin: 150px auto;
    h3 {
        font-size: 15px;
        font-weight: normal;
        text-align: center;
        margin: 15px 0;
    }
    .close {
        position: absolute;
        top: 2px;
        right: 2px;
        padding: 5px;
    }
    .form-group {
        margin-bottom: 10px;
    }
    .mobile-number-wrap {
        margin: 15px auto 5px;
        width: 100%;
        max-width: 270px;
        overflow: hidden;
    }
    .errors {
        margin: 5px 0;
        color: red;
        font-size: 12px;
    }
    .thank-you {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin: 10px 0;
        display: none;
    }
    .mobile-number {
        border: 1px solid #e9e9e9;
        border-radius: 2px;
        margin: 0 auto;
        float: left;
        overflow: hidden;
        &.error {
            border-color: red;
        }
        span {
            color: #555;
            border-right: 1px solid #e9e9e9;
            padding: 7px 10px;
            font-size: 14px;
            display: block;
            float: left;
            background: #f8f9fa;
        }
        input {
            font-size: 14px;
            display: block;
            float: left;
            border: 0;
            outline: none;
            padding: 7px 10px;
        }
    }
    .btn-submit {
        background: #d0021b;
        color: #fff;
        border: 0;
        font-size: 14px;
        float: right;
        margin-left: 10px;
        padding: 8px 10px;
    }
}
</style>
