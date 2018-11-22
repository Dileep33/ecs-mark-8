<template>
    <div>
        <div class="cover__details">
            <div class="book-image-container">
                <div class="book-image">
                    <img :src="pratilipiData.coverImageUrl" :alt="pratilipiData.title">
                    <meta itemprop="image" v-bind:content="pratilipiData.coverImageUrl" />
                    <div class="progress-bar-read">
                        <div class="reader-progress" v-bind:style="{width: pratilipiData.userPratilipi.percentageRead  + '%'}"></div>
                    </div>
                    <button class="update-img" v-if="pratilipiData.hasAccessToUpdate" @click="uploadImage('pratilipi-image')">
                        <i class="material-icons">camera_alt</i>
                    </button>
                    <input type="file" hidden name="pratilipiimage" @change="triggerPratilipiImageUpload($event)" accept="image/*" id="pratilipiimage-uploader">
                    <div class="uploading" v-if="imageUploadLoadingState === 'LOADING'">
                        <Spinner></Spinner>
                    </div>
                </div>
            </div>

            <div class="cover__details-summary">
                <div class="book-title">
                    <h1 itemprop="name">{{ pratilipiData.title }}</h1> <button class="edit" @click="editPratilipiTitle" v-if="pratilipiData.hasAccessToUpdate"><i class="material-icons">mode_edit</i></button></div>
                <meta itemprop="inLanguage" v-bind:content="pratilipiData.language" />
                <meta itemprop="url" v-bind:content="currentPageUrl" />
                <meta v-for="tag in selectedTags" itemprop="genre" v-bind:content="tag.nameEn" />

                <router-link :to="pratilipiData.author.pageUrl" @click.native="triggerClickAuthorNameEvent" class="author-name">
                    <span itemprop="author" itemscope itemtype="http://schema.org/Person">
                        <span itemprop="name">{{ pratilipiData.author.name }}</span>
                    </span>
                </router-link>


                <div class="stats-container">
                    <div class="rating" v-if="pratilipiData.ratingCount">
                        <div class="icons"><i class="material-icons">star</i></div>
                        <span class="margin-right-10">{{ pratilipiData.averageRating | round(1) }}</span>
                    </div>
                    <div class="read-count">
                        <div class="icons"><i class="material-icons">remove_red_eye</i></div>
                        <span>{{ pratilipiData.readCount | round(1) }}</span>
                    </div>
                    <div class="read-time">
                        <i class="material-icons">access_time</i>
                        <span>
                            <time itemprop="timeRequired" v-bind:datetime="pratilipiData.readingTime | readingTimeSchemaOrgFormat">
                                {{ pratilipiData.readingTime | showInMinutesOrHours }}
                            </time>
                        </span>
                    </div>
                </div>

                <div class="tags">
                    <span v-for="each_tag in pratilipiData.tags" :key="each_tag.id">{{ each_tag.name}}</span>
                    <span v-for="(each_tag, index) in pratilipiData.suggestedTags" :key="index">{{ each_tag }}</span>
                </div>

                <p class="summary">{{ pratilipiData.summary || pratilipiData.clippedContent }}</p>
            </div>
        </div>

        <div class="main-actions" v-if="userPratilipiLoadingState === 'LOADING_SUCCESS'">
            <div class="book-edit-actions" v-if="pratilipiData.hasAccessToUpdate">
                <span v-if="pratilipiData.state === 'PUBLISHED'">
                        <button @click="askConfirmationAndUnpublishOrPublishBook({ bookState: 'DRAFTED' })">__("pratilipi_move_to_drafts")</button>
                    </span>
                <span>
                        <button v-if="isMobile()" @click="showAlertToGoToDesktop"><i class="material-icons">mode_edit</i> __("pratilipi_edit_content")</button>
                        <a v-else @click="triggerEditBookEvent" :href="pratilipiData.writePageUrl"><button><i class="material-icons">mode_edit</i> __("pratilipi_edit_content")</button></a>
                    </span>
                <span v-if="pratilipiData.state === 'DRAFTED'">
                        <button @click="triggerEventAndUnpublishOrPublishBook({ bookState: 'PUBLISHED' })">__("pratilipi_publish_it")</button>
                        <button @click="confirmAndDeletePratilipi"><i class="material-icons">delete</i> __("pratilipi_delete_content")</button>
                    </span>
            </div>
            <span v-if="!pratilipiData.hasAccessToUpdate">
                    <button v-if="!userPratilipiData.addedToLib" class="library-btn" @click="addPratilipiToLibrary(pratilipiData.pratilipiId)">
                        <span>
                            <i class="material-icons">bookmark_border</i>
                            <i class="material-icons stacked white">add</i>
                        </span>
            <span>__("library")</span>
            </button>

            <button v-if="userPratilipiData.addedToLib" class="library-btn" @click="removeFromLibraryAndTriggerAnalytics(pratilipiData.pratilipiId)">
                        <span>
                            <i class="material-icons added-to-lib">bookmark</i>
                            <i class="material-icons stacked grey">check</i>
                        </span>
                        <span>__("library")</span>
                    </button>
            </span>

            <router-link v-if="pratilipiData.hasAccessToUpdate && pratilipiData.state === 'DRAFTED'" :to="readPageUrl" class="read-btn">
                <span>__("writer_preview")</span>
            </router-link>
            <router-link v-else :to="readPageUrl" @click.native="logReadEvent" class="read-btn">
                <span v-if="pratilipiData.language === 'HINDI' || pratilipiData.language === 'GUJARATI' || pratilipiData.language === 'BENGALI' || pratilipiData.language === 'MARATHI' || pratilipiData.language === 'ENGLISH'">__("read_now")</span>
                <span v-else>__("read")</span>
            </router-link>
        </div>

        <ShareStrip :data="pratilipiData" :type="'PRATILIPI'" screenName="BOOK" screenLocation="BOOKM">
        </ShareStrip>
    </div>
</template>

<script>
import ShareStrip from '@/components/ShareStripSummaryCard.vue';
import mixins from '@/mixins';
export default {
    name: 'Summary-Card',
    props: {
        pratilipiData: {
            type: Object,
            required: true
        },
        userPratilipiData: {
            type: Object
        },
        selectedTags: {
            type: Array,
            required: true
        },
        currentPageUrl: {
            type: String
        },
        userPratilipiLoadingState: {
            type: String,
            required: true
        },
        imageUploadLoadingState: {
            type: String,
            required: true
        },
        readPageUrl: {
            type: String,
            required: true
        },
        triggerEventAndUnpublishOrPublishBook: {
            type: Function,
            required: true
        },
        askConfirmationAndUnpublishOrPublishBook: {
            type: Function,
            required: true
        },
        addPratilipiToLibrary: {
            type: Function,
            required: true
        },
        removeFromLibraryAndTriggerAnalytics: {
            type: Function,
            required: true
        },
        uploadImage: {
            type: Function,
            required: true
        },
        triggerPratilipiImageUpload: {
            type: Function,
            required: true
        },
        editPratilipiTitle: {
            type: Function,
            required: true
        },
        showAlertToGoToDesktop: {
            type: Function,
            required: true
        },
        triggerClickAuthorNameEvent: {
            type: Function,
            required: true
        }
    },
    mixins: [
        mixins
    ],
    components: {
        ShareStrip
    }
}
</script>

<style lang="scss" media="screen" scoped>
.cover__details {
    display: flex;
    margin: 10px;
    flex-direction: row;
    align-items: flex-start;

    @media screen and (max-height: 667px) {
        margin-bottom: 5px;
    }
}
.cover__details-summary {
    flex-grow: 2;
    margin: 0px 10px;
    margin-right: 0px;
    text-align: left;

    .stats-container {
        padding: 4px 0px;
        font-size: 13px;
        text-align: left;
        .icons {
            display: inline-block;
            vertical-align: middle;
            i {
                font-size: 13px;
            }
        }

        .read-time, .rating, .read-count {
            display: inline-block;
            padding-right: 10px;
            font-weight: bold;
            i {
                font-size: 13px;
                display: inline-block;
                vertical-align: middle;
            }
            span {
                vertical-align: middle;
            }
        }

        .read-time {
            @media screen and (max-width: 360px) {
                display: block;
            }
        }
    }

    p.summary {
        text-align: left;
        font-size: 13px;
        line-height: 20px;
        bottom: 0;
        margin: 3px 0 5px;
        height: 80px;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        color: #555;
    }

    .tags {
        text-align: left;
        span {
            display: inline-block;
            background: #e9e9e9;
            border-radius: 15px;
            color: #6c757d;
            margin: 0px 5px 10px 0px;
            padding: 2px 10px;
            font-size: 13px;
        }
    }
}
.book-image-container {
    display: flex;
    flex-grow: 1;
    // max-width: 55%;
    justify-content: center;
    // @media screen and (max-height: 823px) {
    //     max-width: 40%;
    // }
    .book-image {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        width: 160px;
        height: 256px;
        position: relative;
        @media screen and (max-width: 359px) {
            height: 192px;
            width: 120px;
        }
        @media screen and (min-width: 360px) and (max-width: 640px) {
            height: 220px;
            width: 137px;
        }
        @media screen and (min-width: 641px) and (max-width: 823px) {
            height: 230px;
            width: 143px;
        }
        img {
            object-fit: cover;
            width: 100%;
            height: 100%;

            // width: 200px;
            // height: 320px;
            // position: relative;
            // @media screen and (max-height: 640px) {
            //     height: 220px;
            //     width: 137.50;
            // }
            // @media screen and (min-height: 641px) and (max-height: 823px) {
            //     height: 230px;
            //     width: 143.75;
            // }
        }
        .progress-bar-read {
            height: 8px;
            position: absolute;
            bottom: 0;
            width: 100%;
            display: block;
        }
        .reader-progress {
            height: 8px;
            background-color: red;
        }
    }
}
.update-img {
    position: absolute;
    bottom: 0;
    left: 45%;
    background: rgba(255,255,255,0.4);
    border: 0;
    outline: none;
    cursor: pointer;
    padding: 5px 10px;
    text-align: center;
    i {
        vertical-align: middle;
        font-size: 18px;
    }
}
.uploading {
    background: rgba(0,0,0,0.7);
    height: 100%;
    z-index: 3;
    position: relative;
    .spinner {
        padding-top: 80px;
    }
}
.book-title {
    font-size: 18px;
    font-weight: bold;
    h1 {
        line-height: 1.5em;
        margin-bottom: 0px;
    }
}
.author-name {
    margin: 2px 0;
    display: inline-block;
    color: #d0021b;
    font-size: 15px;
}
.book-stats {
    font-size: 13px;
    margin: 2px 0;
    .avg-rating {
        background-color: #37be5f;
        color: #fff;
        margin: 0 5px 5px 0;
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
        &.stars-orange {
            background: #ffb500;
        }
        &.stars-red {
            background: #ff6d13;
        }
    }
    .review-count {
        font-size: 12px;
        margin-left: 5px;
        span {
            padding-left: 5px;
        }
    }
    .read-count {
        border-right: 1px solid;
        padding-right: 5px;
        margin: 0;
        line-height: 12px;
        display: inline-block;
    }
    .date {
        display: inline-block;
    }
}
.main-actions {
    width: 100%;
    background: #fff;
    .book-edit-actions {
        display: block;
        margin: 10px 0 0;
        button {
            background: #e9e9e9;
            color: #212121;
            border: 0;
            font-size: 12px;
            padding: 5px 10px;
            margin: 2px 5px;
            i {
                font-size: 16px;
                vertical-align: middle;
            }
        }
    }
    .library-btn,
    .read-btn {
        display: inline-block;
        width: 48%;
        height: 52px;
        line-height: 52px;
        font-size: 17px;
        text-align: center;
        background: #fff;
        color: #fff;
        font-weight: 700;
        border: 0;
        outline: none;
        padding: 0;
        margin: 5px 0 10px;
        cursor: pointer;
        .small-text {
            @media screen and (max-width: 360px) {
                font-size: 14px;
            }
        }

        @media screen and (max-height: 640px) {
            margin: 5px 0 5px;
            width: 38%;
            height: 40px;
            line-height: 40px;
        }
        &:hover {
            text-decoration: none;
            opacity: 0.8;
        }
    }
    .library-btn {
        background: #fff;
        color: #555;
        border: 1px solid #9e9e9e;
        &:hover {
            opacity: 1;
        }
        span {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
        }
        i {
            height: 40px;
            line-height: 40px;
            font-size: 30px;
            color: #555;
            vertical-align: middle;

            @media screen and (max-height: 640px) {
                width: 38%;
                height: 40px;
                line-height: 40px;
                font-size: 20px;
            }
            &.stacked {
                position: absolute;
                top: -1px;
                left: -1px;
                margin-left: 14px;
                font-size: 11px;
                color: #555;
                font-weight: bold;
                @media screen and (max-height: 640px) {
                    margin-left: 5px;
                    font-size: 7px;
                    top: -7px;
                }
                &.white {
                    color: #555;
                    margin-left: 10px;
                    margin-top: 7px;
                    left: 0;

                    @media screen and (max-height: 640px) {
                        margin-left: 7px;
                        left: 5px;
                    }
                }
                &.grey {
                    color: #9e9e9e;
                    margin-left: 9px;
                    margin-top: 8px;
                    left: 0;

                    @media screen and (max-height: 640px) {
                        margin-left: 6px;
                        left: 6px;
                    }
                }
            }
        }
    }
    .read-btn {
        background: #d0021b;
        border: 1px solid #d0021b;
    }
}
</style>
