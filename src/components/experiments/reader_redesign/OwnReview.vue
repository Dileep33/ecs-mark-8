<template>
    <li class="ownReview ownReviewv2">
        <div  v-if="authorId !== getUserDetails.authorId" class="comment-main-level">
            <div class="comment-box">
                <div class="already-rated"  v-if="userPratilipiData.reviewDateMillis != null && !editRatingMode">
                    <button class="btn more-options" type="button" id="ownReviewMoreOptions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="ownReviewMoreOptions">
                        <button type="button" class="btn options-btn" data-toggle="modal" @click="openReviewAndEditRating">
                            __("review_edit_review")
                        </button>
                        <button type="button" class="btn options-btn" data-toggle="modal" @click="checkAndDeleteReview" >
                            __("review_delete_review")
                        </button>
                    </div>
                    <div class="rating">
                        <i class="material-icons" v-for="index in Number(parseInt(userPratilipiData.rating))" :key="index + Math.random()">star</i>
                        <i class="material-icons" v-for="index in 5 - Number(parseInt(userPratilipiData.rating))" :key="index + Math.random()">star_border</i>
                    </div>
                    <!-- <span class="review-date">{{ userPratilipiData.reviewDateMillis | convertDate }}</span> -->
                    
                    <div class="comment-content" v-if="userPratilipiData.review">
                        “{{ userPratilipiData.review }}“
                    </div>
                    <div class="review-box">
                        <form>
                            <div class="form-group">
                               <!--  <textarea :value="newReview" @input="newReview = $event.target.value" class="form-control" rows="2" placeholder="__('review_write_a_review')"></textarea> -->
                                <TranslatingInputTextArea :value="newReview" :oninput="updatePrefilledValue" :enableSpeechToText=true screenLocation="RATEREV" placeholder="__('review_write_a_review')" class="modal-textarea"></TranslatingInputTextArea>
                            </div>
                            <button type="button" class="btn btn-primary" :disabled="newReview === '' || !newReview" @click="checkAndUpdateReview({ review: newReview, pratilipiId: userPratilipiData.pratilipiId, rating: userPratilipiData.rating})">__("save")</button>
                            <button type="button" @click="cancelReview" class="btn btn-light">__("cancel")</button>
                        </form>
                    </div>
                </div>
                <div class="rate-now" v-if="!userPratilipiData.reviewDateMillis || editRatingMode">
                    <fieldset class="rating" @click="openReview">
                        <input  type="radio" id="star5" name="rating" value="5" :checked="userPratilipiData.rating == 5" @change="changeRating"/><label class = "full star" for="star5"></label>
                        <input  type="radio" id="star4" name="rating" value="4" :checked="userPratilipiData.rating == 4" @change="changeRating"/><label class = "full star" for="star4"></label>
                        <input  type="radio" id="star3" name="rating" value="3" :checked="userPratilipiData.rating == 3" @change="changeRating"/><label class = "full star" for="star3"></label>
                        <input  type="radio" id="star2" name="rating" value="2" :checked="userPratilipiData.rating == 2" @change="changeRating"/><label class = "full star" for="star2"></label>
                        <input  type="radio" id="star1" name="rating" value="1" :checked="userPratilipiData.rating == 1" @change="changeRating"/><label class = "full star" for="star1"></label>
                    </fieldset>
                    <p class="rating-helper"></p>
                    <div class="review-box">
                        <form>
                            <div class="form-group">
                                <!-- <textarea :value="newReview" @input="newReview = $event.target.value" class="form-control" rows="2" placeholder="__('review_write_a_review')"></textarea> -->
                                <TranslatingInputTextArea :value="newReview" :oninput="updatePrefilledValue" :enableSpeechToText=true screenLocation="RATEREV" placeholder="__('review_write_a_review')" class="modal-textarea"></TranslatingInputTextArea>
                            </div>
                            <button type="button" @click="cancelReview" class="cancel-review">__("cancel")</button>
                            <button type="button" :disabled="!isSaveActive &&  (newReview === '' || !newReview)" class="btn btn-primary" @click="checkAndUpdateReview({ review: newReview, pratilipiId: userPratilipiData.pratilipiId, rating: userPratilipiData.rating })">__("save")</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import inViewport from 'vue-in-viewport-mixin';
import mixins from '@/mixins'
import Spinner from '@/components/Spinner.vue';
import TranslatingInputTextArea from '@/components/TranslatingInputTextArea.vue';


export default {
    mixins: [
        mixins,
        inViewport
    ],
    props: {
        userPratilipiData: {
            type: Object,
            required: true
        },
        authorId: {
            type: Number,
            required: true
        },
        'in-viewport-once': {
            default: true
        },
        'in-viewport-offset-top': {
            default: -200
        },
        screenName: {
            type: String,
            required: true
        },
        screenLocation: {
            type: String,
            required: true
        },
        experimentId: {
            type: String,
            required: true
        },
        pratilipiData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            newReview: '',
            editRatingMode: false,
            isSaveActive: false,
            ratingHelper: null,
            initialRating: null
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
           updatePrefilledValue(value) {
            this.newReview = value;
        },
        ...mapActions('reviews', [
            'setPratilipiRating',
            'saveOrUpdateReview',
            'deleteReview',
            'updateRatingInStore'
        ]),
        ...mapActions([
            'setAfterLoginAction',
            'setShareDetails'
        ]),
        changeRating(e) {
            // let action = this.userPratilipiData.rating ? 'EDITRATE' : 'RATE';
            let action = 'RATE';
            this.triggerAnanlyticsEvent(`${action}_${this.screenLocation}_${this.screenName}`, `${this.experimentId}`, {
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': e.target.value
            });

            // update rating here
            this.updateRatingInStore( { review : this.newReview, pratilipiId : this.userPratilipiData.pratilipiId, pageName : this.$route.meta.store, rating : parseInt(e.target.value)});
            this.isSaveActive = true;

            $(".rate-wrap").addClass("fullwidth");
            $(".share-wrap").hide();
        },
        checkAndUpdateReview(data) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            let action = this.userPratilipiData.review ? 'EDITREVIEW' : 'REVIEW';
            if (action === 'EDITREVIEW') {
                pratilipiAnalyticsData['ENTITY_STATE'] = 'UPDATE';
            }
            this.triggerAnanlyticsEvent(`${action}_${this.screenLocation}_${this.screenName}`, `${this.experimentId}`, {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': this.userPratilipiData.rating
            });
            this.editRatingMode = false;
            if (this.getUserDetails.isGuest) {
                data.pageName = this.$route.meta.store;
                // this.saveOrUpdateReview(data);
                this.setAfterLoginAction({ action: `reviews/saveOrUpdateReview`, data });
                this.openLoginModal(this.$route.meta.store, 'REVIEW', this.screenLocation);
                this.closeReview();
            } else {
                data.pageName = this.$route.meta.store;
                this.saveOrUpdateReview(data);
                this.closeReview();
                this.initialRating = data.rating;
                
                console.log("RATING: ", data.rating);
                
                if (data.rating > 3) {
                    this.setShareDetails({ data: this.pratilipiData, type: 'PRATILIPI', screen_name: this.screenName, screen_location: this.screenLocation })
                    setTimeout(() => {
                        $('#share_modal').modal('show');
                        this.triggerAnanlyticsEvent(`OPENSHRBOOK_${this.screenLocation}_${this.screenName}`, 'WSH001', {
                            ...pratilipiAnalyticsData,
                            'USER_ID': this.getUserDetails.userId
                        });
                    }, 1000);
                }
            }
        },
        checkAndDeleteReview(e) {
            this.deleteReview({ pratilipiId: this.userPratilipiData.pratilipiId, pageName: this.$route.meta.store });
            this.newReview = '';
        },
        openReviewAndEditRating() {
            this.openReview();
            setTimeout(() => {
                $(".write-review-btn").hide()
            }, 0);
            this.editRatingMode = true;
            $(".rate-wrap").addClass("fullwidth");
            $(".share-wrap").hide();
        },
        openReview() {
            $(".review-box").fadeIn();
        },
        cancelReview(e) {
            $(".review-box").hide();
            $('.rating input').prop('checked', false);
            this.editRatingMode = false;
            $(".rate-wrap").removeClass("fullwidth");
            $(".share-wrap").show();
            this.updateRatingInStore( { review : this.newReview, pratilipiId : this.userPratilipiData.pratilipiId, pageName : this.$route.meta.store, rating : parseInt(this.initialRating)});
        },
        closeReview(e) {
            $(".review-box").hide();
            $('.rating input').prop('checked', false);
            $(".rate-wrap").removeClass("fullwidth");
            $(".share-wrap").show();
            this.editRatingMode = false;
        },
        ratingHelperText() {
            $( ".star" ).hover(function () {
                let className = $(this).prop('for');

                switch (className) {
                    case "star1" :
                         $('.rating-helper').text('__("rating_hated_it")');
                        break;
                    case "star2" :
                        $('.rating-helper').text('__("rating_didnt_like_it")');
                        break;
                    case "star3" :
                        $('.rating-helper').text('__("rating_just_ok")');
                        break;
                    case "star4" :
                        $('.rating-helper').text('__("rating_liked_it")');
                        break;
                    case "star5" :
                        $('.rating-helper').text('__("rating_loved_it")');
                        break;
                    default:
                        $('.rating-helper').text('');
                        break;
                }
            });

            $( ".star" ).mouseout(function() {
                $('.rating-helper').text('');
            });
        }
    },
    created() {
        this.newReview = { ...this.userPratilipiData }.review;
        this.initialRating = { ...this.userPratilipiData }.rating;
    },
    mounted() {
        this.ratingHelperText();
    },
    watch: {
        'inViewport.now': function(visible) {
            if (visible) {

                if (this.screenLocation === 'BOOKEND' && this.screenName === 'READER') {
                    this.triggerAnanlyticsEvent(`LANDED_${this.screenLocation}_${this.screenName}`, `${this.experimentId}`, {
                        'USER_ID': this.getUserDetails.userId
                    });
                } else {
                    this.triggerAnanlyticsEvent(`VIEWED_${this.screenLocation}_${this.screenName}`, `${this.experimentId}`, {
                        'USER_ID': this.getUserDetails.userId
                    });
                }

            }
        },
        'editRatingMode'(editRatingMode) {
            if(editRatingMode) {
                setTimeout(()=> {
                    this.ratingHelperText();
                }, 500);
            }
        }
    },
     components: {
        TranslatingInputTextArea
    }
}

</script>

<style lang="scss" scoped>
li {
    list-style: none;
}
.rate-wrap {
    .already-rated .more-options {
        display: none;
    }
}
.comment-main-level {
    margin: 0;
    text-align: center;
    position: relative;
    font-size: 14px;
    .comment-box {
        padding: 0;
        color: #000;
        .already-rated {
            text-align: center;
            .more-options {
                position: absolute;
                right: 0;
                top: 0;
                background: none;
                i {
                    font-size: 18px;
                    color: #28a745;
                }
            }
            .dropdown-menu .options-btn {
                font-size: 12px;
                display: block;
                padding: 5px 10px;
                background: none;
                display: block;
                width: 100%;
                text-align: left;
            }
            .comment-meta {
                .comment-name {
                    margin: 0;
                    a {
                        font-size: 14px;
                        color: #2c3e50;
                    }
                }
                span {
                    font-size: 12px;
                    margin: 5px 0;
                    display: block;
                }
            }
            .rating {
                text-align: left;
                margin: 5px 0;
                i {
                    font-size: 30px;
                    color: #F5A623
                }
            }
            .comment-content {
                text-align: left;
            }
            .review-date {
                font-size: 12px;
                text-align: left;
                display: block;
                margin: 5px 0;
                color: #555;
            }
            .review-box {
                clear: both;
                margin: 4px 0;
                display: none;
                overflow: visible;
                label {
                    font-size: 14px;
                }
                button {
                    float: right;
                    font-size: 14px;
                    margin-left: 5px;
                    &.cancel-review {
                        font-size: 12px;
                        color: #d0021b;
                        position: absolute;
                        top: -20px;
                        right: 0;
                        background: none;
                        border: 0;
                    }
                    &.btn-primary {
                        background: #4E9862;
                        border: 0;
                        border-radius: 1px;
                    }
                }
            }
        }
        .rate-now {
            text-align: center;
            text-align: left;
            overflow: hidden;
            span.text {
                display: block;
                margin: 0;
                font-size: 14px;
            }
            .rating-helper{
                font-size: 13px;
                height: 20px;
                color: #000;
                margin: 0 0 0 5px;
                text-align: left;
                display: inline-block;
            }
            .rating {
                border: none;
                width: 150px;
                margin: 0;
                display: inline-block;
                vertical-align: middle;
                input {
                    display: none;
                }
                label:before {
                    margin: 0;
                    font-size: 30px;
                    font-family: 'Material Icons';
                    display: inline-block;
                    content: "\e83a";
                    color: #F5A623;
                }
                label {
                    color: #9e9e9e;
                    float: right;
                    margin: 0;
                }
                input:checked ~ label, &:not(:checked) > label:hover, &:not(:checked) > label:hover ~ label {
                    color: #d0021b;
                }
                input:checked ~ label:before {
                    content: "\e838";
                }
            }
            .review-box {
                clear: both;
                margin: 4px 5px;
                display: none;
                overflow: visible;
                label {
                    font-size: 14px;
                }
                button {
                    float: right;
                    font-size: 14px;
                    margin-left: 5px;
                    &.cancel-review {
                        font-size: 12px;
                        color: #d0021b;
                        position: absolute;
                        top: -20px;
                        right: 0;
                        background: none;
                        border: 0;
                    }
                    &.btn-primary {
                        background: #4E9862;
                        border: 0;
                        border-radius: 1px;
                    }
                }
            }
        }
    }
}
</style>
<style lang="scss">
.ownReview.ownReviewv2 {
    .form-control {
        border-radius: 0;
    }
}
</style>
