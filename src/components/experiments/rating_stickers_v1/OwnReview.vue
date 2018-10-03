<template>
    <Review
        v-if="screenName=='BOOK' && userReview && userReview.review!=null && userReview.review!='' && !editRatingMode"
        :loadCommentsOfReview="loadCommentsOfReview"
        :likeOrDislikeReview="likeOrDislikeReview"
        :userPratilipiData="userPratilipiData"
        :eachReview="userReview" :key="userReview.userPratilipiId"
        :authorId="authorId"
        :createComment="createComment"
        :deleteComment="deleteComment"
        :likeOrDislikeComment="likeOrDislikeComment"
        :updateComment="updateComment"
        :openReviewAndEditRating="openReviewAndEditRating"
        :checkAndDeleteReview="checkAndDeleteReview"
        :screenName="screenName"
        :screenLocation="'REVIEWS'"
        :pratilipiData="pratilipiData"
        ></Review>
    <li class="ownReview" v-else>
        <div  v-if="authorId !== getUserDetails.authorId" class="comment-main-level">
            <div class="selected-rating">
                <img v-if="userPratilipiData.rating == 1" class="rating-stickers" src="../../../../static/rating_stickers/1.png" >
                <img v-if="userPratilipiData.rating == 2" class="rating-stickers" src="../../../../static/rating_stickers/2.png" >
                <img v-if="userPratilipiData.rating == 3" class="rating-stickers" src="../../../../static/rating_stickers/3.png" >
                <img v-if="userPratilipiData.rating == 4" class="rating-stickers" src="../../../../static/rating_stickers/4.png" >
                <img v-if="userPratilipiData.rating == 5" class="rating-stickers" src="../../../../static/rating_stickers/5.png" >
            </div>
            <div class="comment-box">
                <div class="already-rated"  v-if="(userPratilipiData.reviewDateMillis != null && !editRatingMode) || !shouldShowRatingSelection">
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
                    <div class="comment-meta">
                        <h6 class="comment-name"><router-link :to="userPratilipiData.userProfilePageUrl">{{ userPratilipiData.userName }}</router-link></h6>
                        <span>{{ userPratilipiData.reviewDateMillis | convertDate }}</span>
                    </div>
                    <div class="rating" v-if="userPratilipiData.rating">
                        <i class="material-icons" v-for="index in Number(parseInt(userPratilipiData.rating))" :key="index + Math.random()">star</i>
                        <i class="material-icons" v-for="index in 5 - Number(parseInt(userPratilipiData.rating))" :key="index + Math.random()">star_border</i>
                    </div>
                    <div class="comment-content">
                        {{ userPratilipiData.review }}
                    </div>
                    <button class="btn btn-primary write-review-btn" v-if="(userPratilipiData.review === '' || !userPratilipiData.review) && !editRatingMode" @click="openReview" >__("review_write_a_review")</button>
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
                <div class="rate-now" v-if="( !userPratilipiData.reviewDateMillis || editRatingMode ) && shouldShowRatingSelection">
                    <fieldset class="rating" @click="openReview" v-if="shouldShowRatingSelection">
                        <img @click="changeRating(1)" class="rating-stickers" :class="{ 'selected': userPratilipiData.rating === 1 }" src="../../../../static/rating_stickers/1.png" />
                        <img @click="changeRating(2)" class="rating-stickers" :class="{ 'selected': userPratilipiData.rating === 2 }" src="../../../../static/rating_stickers/2.png" />
                        <img @click="changeRating(3)" class="rating-stickers" :class="{ 'selected': userPratilipiData.rating === 3 }" src="../../../../static/rating_stickers/3.png" />
                        <img @click="changeRating(4)" class="rating-stickers" :class="{ 'selected': userPratilipiData.rating === 4 }" src="../../../../static/rating_stickers/4.png" />
                        <img @click="changeRating(5)" class="rating-stickers" :class="{ 'selected': userPratilipiData.rating === 5 }" src="../../../../static/rating_stickers/5.png" />
                        <span class="text">__("rating_your_rating")</span>
                    </fieldset>

                    <p class="rating-helper"></p>
                    <button class="btn btn-primary write-review-btn" v-if="!userPratilipiData.review || userPratilipiData.review === ''" @click="openReview">__("review_write_a_review")</button>
                    <button class="btn btn-primary write-review-btn" @click="openReview" v-else>__("review_edit_review")</button>
                    <div class="review-box">
                        <form>
                            <div class="form-group">
                                <!-- <textarea :value="newReview" @input="newReview = $event.target.value" class="form-control" rows="2" placeholder="__('review_write_a_review')"></textarea> -->
                                <TranslatingInputTextArea :value="newReview" :oninput="updatePrefilledValue" :enableSpeechToText=true screenLocation="RATEREV" placeholder="__('review_write_a_review')" class="modal-textarea"></TranslatingInputTextArea>
                            </div>
                            <button type="button" :disabled="!isSaveActive &&  (newReview === '' || !newReview)" class="btn btn-primary" @click="checkAndUpdateReview({ review: newReview, pratilipiId: userPratilipiData.pratilipiId, rating: userPratilipiData.rating })">__("save")</button>
                            <button type="button" @click="cancelReview" class="btn btn-light">__("cancel")</button>
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
import mixins from '@/mixins';
import Review from '@/components/Review.vue';
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
        pratilipiData: {
            type: Object,
            required: true
        },
        userReview: {
            type: Object,
            required: false
        },
        likeOrDislikeReview: {
            type: Function,
            required: true
        },
        likeOrDislikeComment: {
            type: Function,
            required: true
        },
        loadCommentsOfReview: {
            type: Function,
            required: true
        },
        createComment: {
            type: Function,
            required: true
        },
        updateComment: {
            type: Function,
            required: true
        },
        deleteComment: {
            type: Function,
            required: true
        },
    },
    data() {
        return {
            newReview: '',
            editRatingMode: false,
            isSaveActive: false,
            ratingHelper: null,
            initialRating: null,
            shouldShowRatingSelection: true
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
            'setAfterLoginAction'
        ]),
        changeRating(ratingValue) {
            // let action = this.userPratilipiData.rating ? 'EDITRATE' : 'RATE';
            let action = 'RATE';
            this.triggerAnanlyticsEvent(`${action}_${this.screenLocation}_${this.screenName}`, 'WRAT001', {
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': ratingValue
            });

            // update rating here
            this.updateRatingInStore( { review : this.newReview, pratilipiId : this.userPratilipiData.pratilipiId, pageName : this.$route.meta.store, rating : parseInt(ratingValue)});
            this.isSaveActive = true;
            this.shouldShowRatingSelection = false;
            this.editRatingMode = true;

            if (this.getUserDetails.isGuest) {
                // $('#star1').prop('checked', false);
                // $('#star2').prop('checked', false);
                // $('#star3').prop('checked', false);
                // $('#star4').prop('checked', false);
                // $('#star5').prop('checked', false);
                this.setAfterLoginAction({ action: `reviews/setPratilipiRating`, data: {
                    rating: ratingValue,
                    pratilipiId: this.userPratilipiData.pratilipiId,
                    pageName: this.$route.meta.store
                } });
                this.openLoginModal(this.$route.meta.store, 'RATE', this.screenLocation);
            } else {
                this.setPratilipiRating({
                    rating: ratingValue,
                    pratilipiId: this.userPratilipiData.pratilipiId,
                    pageName: this.$route.meta.store
                });
            }
        },
        checkAndUpdateReview(data) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            let action = this.userPratilipiData.review ? 'EDITREVIEW' : 'REVIEW';
            if (action === 'EDITREVIEW') {
                pratilipiAnalyticsData['ENTITY_STATE'] = 'UPDATE';
            }
            this.triggerAnanlyticsEvent(`${action}_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
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
            }
        },
        checkAndDeleteReview(e) {
            this.deleteReview({ pratilipiId: this.userPratilipiData.pratilipiId, pageName: this.$route.meta.store });
            this.shouldShowRatingSelection = true;
            this.newReview = '';
        },
        openReviewAndEditRating() {
            this.openReview();
            setTimeout(() => {
                $(".write-review-btn").hide()
            }, 0);
            this.shouldShowRatingSelection = true;
            this.editRatingMode = true;
        },
        openReview() {
            $(".review-box").fadeIn();
            $(".write-review-btn").hide();
            if(this.screenName === 'READER') {
                setTimeout(() => {
                    $('.translatingTextArea').focus();
                }, 0);
            }
            else {
                setTimeout(() => {
                    $('#translatingTextArea').focus();
                }, 0);
            }
        },
        cancelReview(e) {
            $(".review-box").hide();
            $(".write-review-btn").fadeIn();
            $('.rating input').prop('checked', false);
            this.editRatingMode = false;
            this.updateRatingInStore( { review : this.newReview, pratilipiId : this.userPratilipiData.pratilipiId, pageName : this.$route.meta.store, rating : this.userPratilipiData.rating});
        },
        closeReview(e) {
            $(".review-box").hide();
            $(".write-review-btn").fadeIn();
            $('.rating input').prop('checked', false);
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
                    this.triggerAnanlyticsEvent(`LANDED_${this.screenLocation}_${this.screenName}`, 'WRAT001', {
                        'USER_ID': this.getUserDetails.userId
                    });
                    
                    let bucketId = parseInt(this.getCookie('bucket_id')) || 0;
                    if (bucketId > 11 && bucketId <= 40 && this.getUserDetails.isGuest) {
                        this.openLoginModal(this.$route.meta.store, 'SIGNUPPOPUP', 'BOOKEND');
                    }
                } else {
                    this.triggerAnanlyticsEvent(`VIEWED_${this.screenLocation}_${this.screenName}`, 'WRAT001', {
                        'USER_ID': this.getUserDetails.userId
                    });
                }

            }
        },
        'editRatingMode'(editRatingMode) {
            if(editRatingMode) {
                setTimeout(()=> {
                    this.ratingHelperText();
                    this.openReview();
                }, 200);
            }
        }
    },
     components: {
        Review,
        TranslatingInputTextArea
    }
}

</script>

<style lang="scss" scoped>
li {
    list-style: none;
}
.comment-main-level {
    margin: 0 5px 10px;
    text-align: center;
    position: relative;
    font-size: 14px;

    .selected-rating {
        margin-bottom: 10px;
        img {
            width: 150px;
        }
    }
    .comment-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        position: relative;
        z-index: 1;
        border: 3px solid #FFF;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        overflow: hidden;
        margin: 0 auto 20px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .comment-box {
        padding: 40px 5px 10px;
        .write-review-btn {
            background: #d0021b;
            border: 0;
            font-size: 14px;
            margin: 5px 0;
            &:focus {
                outline: none;
                box-shadow: none;
            }
            &:focus, &:active {
                background: #d0021b;
                outline: none;
                box-shadow: none !important;
            }
        }
        .already-rated {
            text-align: center;
            .more-options {
                position: absolute;
                right: 0;
                top: 30px;
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
                i {
                    font-size: 18px;
                    color: #6c757d
                }
            }
            .review-box {
                clear: both;
                margin: 4px 10px;
                display: none;
                overflow: visible;
                label {
                    font-size: 14px;
                }
                button {
                    float: right;
                    font-size: 14px;
                    margin-left: 5px;
                    &.btn-primary {
                        background: #d0021b;
                        border: 0;
                    }
                }
            }
        }
        .rate-now {
            text-align: center;
            span.text {
                display: block;
                margin: 0;
                margin-top: 10px;
                font-size: 18px;
            }
            .rating-helper{
                font-size: 18px;
                height: 20px;
            }
            .rating {
                border: none;
                margin: 0 auto;

                img.rating-stickers {
                    width: 100px;
                    padding: 5px;
                    border: 2px solid rgb(248, 248, 248);
                    border-radius: 50%;

                    &.selected {
                        border: 2px solid #d0021b;
                    }
                }

                input {
                    display: none;
                }
                label:before {
                    margin: 2px 5px 0 0;
                    font-size: 40px;
                    font-family: 'Material Icons';
                    display: inline-block;
                    content: "\e83a";
                    color: #28a745;
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
                margin: 4px 10px;
                display: none;
                overflow: visible;
                label {
                    font-size: 14px;
                }
                button {
                    float: right;
                    font-size: 14px;
                    margin-left: 5px;
                    &.btn-primary {
                        background: #d0021b;
                        border: 0;
                    }
                }
            }
        }
    }
}
</style>
