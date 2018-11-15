<template>
	<div class="section">
		<div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h2 class="section-title" :class="{'partnership-title': partnership}">
                        <router-link v-if="listPageUrl" :to="listPageUrl" @click.native="triggerListLink">
                           <span> {{title}} </span>
                        </router-link>
                        <span v-else>{{title}}</span>
                    </h2>
                    <h2 class="section-title-see-more" v-if="!isMobile()">
                        <router-link v-if="listPageUrl" :to="listPageUrl" @click.native="triggerMoreListLink">
                            <span>__("view_more")</span>
                        </router-link>
                    </h2>
                    <h2 class="section-title-see-more icon-only" v-else>
                        <router-link v-if="listPageUrl" :to="listPageUrl" @click.native="triggerMoreListLink">
                            <i class="material-icons">keyboard_arrow_right</i>
                        </router-link>
                    </h2>
                    <div class="sponsored" v-if="partnership">
                        <a :href="partnership[0].link" target="_blank">
                            <span>{{ partnership[0].caption }}</span>
                            <img :src="partnership[0].imageUrl" :alt="partnership[0].name">
                        </a>
                    </div>
                </div>
            </div>
	        <div class="pratilipi-list" v-if="pratilipiList.length > 0">
	            <slick ref="slick" :options="slickOptions" @beforeChange="handleBeforeChange" class="slick-pratilipis">
	                <PratilipiComponent
	                v-for="(eachPratilipi, index) in pratilipiList"
	                v-bind:key="eachPratilipi.pratilipiId + index"
	                :pratilipiData="eachPratilipi"
                    :addToLibrary="addToLibrary"
                    :removeFromLibrary="removeFromLibrary"
                    :redirectToReader="redirectToReader"
                    :screenName="screenName"
                	:screenLocation="screenLocation"
                    :index="index"
                    :position="position"
                    ></PratilipiComponent>
					<router-link :to="listPageUrl" v-if="listPageUrl" class="view_more">
						<div class="view_more_card">
							<i class="material-icons">keyboard_arrow_right</i>
							<span>__("view_more")</span>
						</div>
					</router-link>
	            </slick>
	        </div>
		</div>
	</div>
</template>

<script type="text/javascript">
import PratilipiComponent from '@/components/experiments/home_v2/Pratilipi.vue'
import Slick from 'vue-slick'
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    name: 'PratilipiList',
    props: {
    	pratilipiList: {
    		type: Array,
    		required: true
    	},
        position: {
            type: Number
        },
        title: {
            type: String,
            require: true
        },
        listPageUrl: {
            type: String
        },
        addToLibrary: {
            type: Function
        },
        removeFromLibrary: {
            type: Function
        },
        redirectToReader: {
            type: Boolean
        },
        'in-viewport-once': {
            default: true
        },
        'in-viewport-offset-top': {
            default: -350
        },
        screenName: {
            type: String,
            required: true
        },
        screenLocation: {
            type: String,
            required: true
        },
        partnership: {
            type: Array
        }
    },
    mixins: [
        mixins,
        inViewport
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ]),
    },
    data() {
        return {
            slickOptions: {
                infinite: false,
                adaptiveHeight: false,
                variableWidth: true,
                draggable: true,
                edgeFriction: 0.30,
                slidesToScroll: 2,
                swipe: true,
                rows: 0,
                prevArrow: '<div class="back"><i class="material-icons" aria-hidden="true">keyboard_arrow_left</i></div>',
                nextArrow: '<div class="forward"><i class="material-icons" aria-hidden="true">keyboard_arrow_right</i></div>'
            }
        }
    },
    methods: {
        next() {
            this.$refs.slick.next()
        },
        prev() {
            this.$refs.slick.prev()
        },
        handleBeforeChange() {
            if (this.$route.meta.store === 'homepage') {
                this.triggerAnanlyticsEvent(`SWIPE_COLLECTIONS_HOME`, 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'PARENT_ID': this.listPageUrl
                });
            }
        },
        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            // console.log(this.listPageUrl);
            this.$refs.slick.reSlick();
        },
        triggerListLink() {
            this.triggerAnanlyticsEvent(`CLICKCOLLECTION_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.listPageUrl,
                'POSITION': this.position
            });
        },
        triggerMoreListLink() {
            this.triggerAnanlyticsEvent(`CLICKMORECOLLECTION_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.listPageUrl,
                'POSITION': this.position
            });
        },
        showSignupModalHome() {
            return this.getCookie( "HOMESIGNUP_MODAL_VIEWED" ) == null || this.getCookie( "HOMESIGNUP_MODAL_VIEWED" ) == "true"
        }
    },
    mounted() {
        const that = this;
    	if (this.pratilipiList.length > 0) {
    		this.reInit();
    	}
        $(this.$el).find('.slick-pratilipis').on('beforeChange', function(event, slick, currentSlide, nextSlide){
          if (nextSlide == '4' && that.getUserDetails.isGuest && that.getCookie('bucket_id') >= 25 && that.getCookie('bucket_id') <= 49 && that.showSignupModalHome()) {
              that.openLoginModal(that.$route.meta.store, 'SWIPE', 'COLLECTIONS');
          }
        });
    },
    components: {
        PratilipiComponent,
        Slick
    },
    watch: {
        'inViewport.now': function(visible) {
            if (visible) {
                if (this.position == '2' && this.getUserDetails.isGuest && this.getCookie('bucket_id') >= 25 && this.getCookie('bucket_id') <= 49 && this.showSignupModalHome()) {
                    this.openLoginModal(this.$route.meta.store, 'SWIPE', 'COLLECTIONS');
                }
                if (this.screenName === 'HOME') {
                    this.triggerAnanlyticsEvent(`VIEWED_COLLECTIONS_HOME`, 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId,
                        'PARENT_ID': this.listPageUrl,
                        'POSITION': this.position
                    });
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .section {
        background: #fff;
		border-top: 6px solid #e9e9e9;
		margin-left: -10px;
		.section-title {
            padding: 0;
			font-size: 22px;
            font-weight: bold;
			margin: 10px 0 5px 15px;
			text-align: left;
			border-left: 3px solid #d0021b;
			line-height: 24px;
            max-width: 85%;;
            float: left;
            a {
                color: #212121;
                padding: 5px 0 5px 10px;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
			@media screen and (max-width: 576px ) {
                font-size: 18px;
				margin-bottom: 0;
                width: calc(100% - 30px;)
            }
            &.partnership-title {
                @media screen and (max-width: 576px ) {
                    width: calc(100% - 160px);
                    max-width: 60%;
                }
            }
        }
        
        .sponsored {
            float: right;
            margin: 7px 10px 0 0;
            text-align: right;
            @media screen and (max-width: 576px ) {
                margin: 7px 0 0 0;
            }
            a {
                text-decoration: none;
                span {
                    font-size: 12px;
                    color: #444;
                    display: block;
                    @media screen and (max-width: 576px ) {
                        font-size: 9px;
                    }
                }
                img {
                    max-width: 100px;
                    display: block;
                }
            }
        }

        .section-title-see-more {
            margin: 5px 0 0;
            padding: 0;
            font-size: 22px;
            text-align: right;
            line-height: 24px;
            width: auto;
            float: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a {
                color: #212121;
                padding: 10px 5px 5px 10px;
                display: block;
            }
            @media screen and (max-width: 576px ) {
                font-size: 17px;
                margin-bottom: 0;
            }
            &.icon-only {
                width: 30px;
            }
        }
    }
	.recommendation .section {
		.container-fluid {
			padding: 0;
			text-align: center;
			.section-title {
				text-align: left;
				font-weight: bold;
				font-size: 16px;
				border-left: 3px solid #d0021b;
				padding-left: 10px;
				margin: 10px 0;
			}
			.pratilipi-list {
				padding: 5px 10px;
			}
		}
        .section-title a {
            padding: 0;
        }
	}
    .pratilipi-list {
        position: relative;
        padding: 2px 5px;
		a.view_more {
			position: relative;
			.view_more_card {
				width: 150px;
                @media screen and (max-width: 768px ) {
                    width: 150px;
                }
				background: #fff;
				border: 1px solid #e9e9e9;
				height: 310px;
				margin: 10px;
				color: #d0021b;
				i {
					height: 219px;
					line-height: 210px;
					width: 100%;
					font-size: 50px;
					border-bottom: 1px solid #e9e9e9;
				}
				span {
					height: 88px;
					line-height: 88px;
					display: block;
                    font-size: 14px;
				}
			}
			&:hover {
				text-decoration: none;
			}
		}
    }
</style>
<style lang="scss">
	.back, .forward {
		position: absolute;
		top: 45%;
		z-index: 2;
		background-color: #fff;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		color: #000;
		border: 1px solid #e9e9e9;
		cursor: pointer;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-o-user-select: none;
		transition: all .3s, visibility 0s;
		-ms-transition: all .3s, visibility 0s;
		-webkit-transition: all .3s, visibility 0s;
		-moz-transition: all .3s, visibility 0s;
		i {
			height: 40px;
			line-height: 40px;
			font-size: 26px;
		}
		@media screen and (min-width: 768px ) {
			&:hover {
				background: #9E9E9E;
				border-color: #9E9E9E;
				box-shadow: 0 0px 2px rgba(0,0,0,0.2);
				color: #fff;
			}
		}
		&.slick-disabled {
			i {
				opacity: 0.2;
			}
            &:hover {
                background: #fff;
                border-color: #fff;
                i {
                    color: #212121;
                }
            }
		}
	}
	.back {
		margin-left: -5px;
	}
	.forward {
		right: -15px;
	}
    .recommendation .section {
        .back, .forward {
            top: 33%;
        }
    }
</style>
<style lang="scss">
    @import '../../../../node_modules/slick-carousel/slick/slick.css';
</style>
