<template>
    <MainLayout>
        <div class="author-dashboard-page page-wrap" v-if="getAuthorDashboardLoadingState == 'LOADING_SUCCESS'">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("author_dashboard_all_time_stats")</h2>
                        <div class="all-stats">
                            <div class="stat-item reads">
                                <span class="stat-name">__("author_dashboard_total_readers")</span>
                                <span class="stat-count">{{ getAuthorDashboardData.total.readCount | showThousandsInK(1) }}</span>
                                <i class="material-icons">remove_red_eye</i>
                            </div>
                            <div class="stat-item ratings">
                                <span class="stat-name">__("author_dashboard_avg_rating")</span>
                                <span class="stat-count">{{ getAuthorDashboardData.total.highestRating }}</span>
                                <i class="material-icons">stars</i>
                            </div>
                            <div class="stat-item reviews">
                                <span class="stat-name">__("author_dashboard_total_reviews")</span>
                                <span class="stat-count">{{ getAuthorDashboardData.total.reviewCount | showThousandsInK(1) }}</span>
                                <i class="material-icons">rate_review</i>
                            </div>
                            <div class="stat-item followers">
                                <span class="stat-name">__("author_dashboard_total_followers")</span>
                                <span class="stat-count">{{ getAuthorDashboardData.total.follower | showThousandsInK(1) }}</span>
                                <i class="material-icons">person_add</i>
                            </div>
                        </div>
                        <div v-if="getAuthorDashboardData.highestReadCountPratilipi.length !== 0">
                            <h2>__("author_dashboard_most_read_contents")</h2>
                            <div class="most-read">
                                <router-link :to="eachBook.pageUrl" v-for="(eachBook, index) in getAuthorDashboardData.highestReadCountPratilipi" v-bind:key="index">
                                    <div class="book-item">
                                        <div class="book-image"><img :src="eachBook.coverImageUrl" :alt="eachBook.displayTitle"></div>
                                        <div class="book-name">{{ eachBook.displayTitle }}</div>
                                        <div class="read-count">
                                            <i class="material-icons">remove_red_eye</i>
                                            <span>{{ eachBook.readCount }}</span>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <div v-if="getAuthorDashboardData.highestReviewedPratilipi.length !== 0">
                            <h2>__("author_dashboard_contents_with_highest_engagement")</h2>
                            <div class="most-engagement">
                                <router-link :to="eachBook.pageUrl" v-for="(eachBook, index) in getAuthorDashboardData.highestReviewedPratilipi" v-bind:key="index">
                                    <div class="book-item">
                                        <div class="book-image"><img :src="eachBook.coverImageUrl" :alt="eachBook.displayTitle"></div>
                                        <div class="book-name">{{ eachBook.displayTitle }}</div>
                                        <div class="read-count">
                                            <i class="material-icons">remove_red_eye</i>
                                            <span>{{ eachBook.readCount }}</span>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <h2>__("author_dashboard_todays_stat")</h2>
                        <div class="stats-today">
                            <div class="stat-item publish">
                                <span class="stat-name">__("author_dashboard_contents_published")</span>
                                <span class="stat-count">{{ getAuthorDashboardData.todays.contentPublished }}</span>
                                <icon name="book" scale="1.8"></icon>
                            </div>
                            <!-- <div class="stat-item">
                                <span class="stat-name">Read Count</span>
                                <span class="stat-count">{{ getAuthorDashboardData.todays.readCount }}</span>
                            </div> -->
                            <div class="stat-item followers">
                                <span class="stat-name">__("author_dashboard_new_followers")</span>
                                <span class="stat-count">{{ getAuthorDashboardData.todays.follower }}</span>
                                <i class="material-icons">person_add</i>
                            </div>
                            <div class="stat-item ratings">
                                <span class="stat-name">__("author_dashboard_new_ratings")</span>
                                <span class="stat-count">{{ getAuthorDashboardData.todays.ratingCount }}</span>
                                <i class="material-icons">stars</i>
                            </div>
                            <div class="stat-item reviews">
                                <span class="stat-name">__("author_dashboard_new_reviews")</span>
                                <span class="stat-count">{{ getAuthorDashboardData.todays.reviewCount }}</span>
                                <i class="material-icons">rate_review</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Spinner v-if="getAuthorDashboardLoadingState == 'LOADING'"></Spinner>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import 'vue-awesome/icons/book'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner
    },
    computed: {
        ...mapGetters('authordashboard', [
            'getAuthorDashboardData',
            'getAuthorDashboardLoadingState'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('authordashboard', [
            'fetchAuthorDashboardData'
        ])
    },
    watch: {
        'getUserDetails.isGuest'(isGuest) {
            if (isGuest) {
                this.$router.push('/login');
                return;
            }
            else {
                this.fetchAuthorDashboardData(this.getUserDetails.author.authorId);
                // this.fetchAuthorDashboardData(5758392207409152);
            }
        }
    },
    created() {
        if (this.getUserDetails.isGuest) {
            this.$router.push('/login');
            return;
        }
        if (this.getUserDetails.author) {
            this.fetchAuthorDashboardData(this.getUserDetails.author.authorId);
            // this.fetchAuthorDashboardData(5758392207409152);
        }
        
    }
}
</script>

<style lang="scss" scoped>
.author-dashboard-page {
    margin-top: 85px;
    text-align: left;
    min-height: 600px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 20px 0 5px;
        @media screen and (max-width: 992px ) {
            font-size: 17px;
        }
    }
    .all-stats {
        margin: 5px 0 15px;
    }
    .stat-item {
        width: 47.5%;
        max-width: 200px;
        display: inline-block;
        border-radius: 4px;
        background: #f1f1f1;
        margin: 4px 2px;
        padding: 10px;
        position: relative;
        .stat-name {
            display: block;
            font-size: 12px;
            font-weight: bold;
            color: #495057;
        }
        .stat-count {
            display: block;
            font-size: 22px;
        }
        i.material-icons, .fa-icon {
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 30px;
            color: #444;
        }
        &.publish {
            border-left: 3px solid #9C27B0;
            .fa-icon, .stat-count {
                color: #9C27B0;
            }
        }
        &.reads {
            border-left: 3px solid #17a2b8;
            i, .fa-icon, .stat-count {
                color: #17a2b8;
            }
        }
        &.ratings {
            border-left: 3px solid #fdbf00;
            i, .stat-count {
                color: #fdbf00;
            }
        }
        &.reviews {
            border-left: 3px solid #fd7e14;
            i, .stat-count {
                color: #fd7e14;
            }
        }
        &.followers {
            border-left: 3px solid #8BC34A;
            i, .stat-count {
                color: #8BC34A;
            }
        }
    }
    .most-read, .most-engagement {
        a {
            text-decoration: none;
            color: #555;
        }
        .book-item {
            margin: 5px 3px;
            width: 31%;
            max-width: 140px;
            display: inline-block;
            border: 1px solid #e9e9e9;
            border-radius: 3px;
            .book-image {
                height: 150px;
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    border-top-left-radius: 3px;
                    border-top-right-radius: 3px;
                }
            }
            .book-name {
                font-size: 12px;
                font-weight: bold;
                margin: 4px 0 0;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                height: 37px;
                max-width: 100%;
                padding: 0 5px;
            }
            .read-count {
                margin: 0;
                padding: 0 5px;
                i {
                    vertical-align: middle;
                    font-size: 16px;
                }
                span {
                    vertical-align: middle;
                    font-size: 12px;
                }
            }
        }
    }
    .stats-today {
        overflow: hidden;
        margin: 10px 0 15px;
    }
}
</style>
