<template>
    <MainLayout>
        <div class="author-dashboard-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>All time stats</h2>
                        <div class="all-stats">
                            <div class="stat-item reads">
                                <span class="stat-name">Total Reads</span>
                                <span class="stat-count">10,587</span>
                                <icon name="book" scale="1.8"></icon>
                            </div>
                            <div class="stat-item ratings">
                                <span class="stat-name">Average Rating</span>
                                <span class="stat-count">4.7</span>
                                <i class="material-icons">stars</i>
                            </div>
                            <div class="stat-item reviews">
                                <span class="stat-name">Total Reviews</span>
                                <span class="stat-count">69</span>
                                <i class="material-icons">rate_review</i>
                            </div>
                            <div class="stat-item followers">
                                <span class="stat-name">Total Followers</span>
                                <span class="stat-count">247</span>
                                <i class="material-icons">person_add</i>
                            </div>
                        </div>
                        <h2>Most Read Contents</h2>
                        <div class="most-read">
                            <div class="book-item">
                                <div class="book-image"><img src="https://1.ptlp.co/pratilipi/cover?pratilipiId=4859263777243136&version=1478633651792" alt="book name"></div>
                                <div class="book-name">Book Name</div>
                                <div class="read-count">
                                    <i class="material-icons">remove_red_eye</i>
                                    <span>2234</span>
                                </div>
                            </div>
                            <div class="book-item">
                                <div class="book-image"><img src="https://1.ptlp.co/pratilipi/cover?pratilipiId=4859263777243136&version=1478633651792" alt="book name"></div>
                                <div class="book-name">Book Name</div>
                                <div class="read-count">
                                    <i class="material-icons">remove_red_eye</i>
                                    <span>2234</span>
                                </div>
                            </div>
                            <div class="book-item">
                                <div class="book-image"><img src="https://1.ptlp.co/pratilipi/cover?pratilipiId=4859263777243136&version=1478633651792" alt="book name"></div>
                                <div class="book-name">Book Name</div>
                                <div class="read-count">
                                    <i class="material-icons">remove_red_eye</i>
                                    <span>2234</span>
                                </div>
                            </div>
                        </div>
                        <h2>Contents with Highest Engagement</h2>
                        <div class="most-engagement">
                            <div class="book-item">
                                <div class="book-image"><img src="https://1.ptlp.co/pratilipi/cover?pratilipiId=4859263777243136&version=1478633651792" alt="book name"></div>
                                <div class="book-name">Book Name</div>
                                <div class="read-count">
                                    <i class="material-icons">rate_review</i>
                                    <span>2234</span>
                                </div>
                            </div>
                        </div>
                        <h2>Today's Stats</h2>
                        <div class="stats-today">
                            <div class="stat-item">
                                <span class="stat-name">Contents Published</span>
                                <span class="stat-count">1</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-name">Read Count</span>
                                <span class="stat-count">587</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-name">New Followers</span>
                                <span class="stat-count">87</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-name">New Ratings</span>
                                <span class="stat-count">17</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-name">New Reviews</span>
                                <span class="stat-count">3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    methods: {

    },
    watch: {

    },
    created() {
        console.log(this.$route)
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
        margin: 15px 0 10px;
        @media screen and (max-width: 992px ) {
            font-size: 17px;
        }
    }
    .all-stats {
        margin: 10px 0 15px;
        .stat-item {
            width: 47.5%;
            max-width: 200px;
            display: inline-block;
            border-radius: 4px;
            background: #e9ecef;
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
                top: 12px;
                right: 10px;
                font-size: 30px;
                color: #444;
            }
            &.reads {
                border-left: 3px solid #17a2b8;
                .fa-icon, .stat-count {
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
    }
    .most-read, .most-engagement {
        .book-item {
            margin: 5px 3px;
            width: 100px;
            display: inline-block;
            .book-image {
                height: 150px;
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
            .book-name {
                font-size: 12px;
                font-weight: bold;
                margin: 4px 0 0;
            }
            .read-count {
                margin: 0;
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
}
</style>
