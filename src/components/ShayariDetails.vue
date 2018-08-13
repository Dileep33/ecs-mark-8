<template>
	<div>
		<div class="shayari-details">
	        <img :src="shayari.image" />
	    </div>
	    <div class="social-icons">
	        <div class="like-button social-button" @click="triggerLikeShareAnalytics(shayari.id)">
	            <icon name="thumbs-o-up" scale="1.5"></icon>
	            <span>{{shayari.likeCount | showThousandsInK(1)}}</span>
	        </div>
	        <div class="share-button social-button" @click="triggerWhatsappShareAnalytics(shayari.id)">
	            <icon name="whatsapp" scale="1.5"></icon>
	            <span>{{shayari.shareCount | showThousandsInK(1)}}</span>
	        </div>
	    </div>
	</div>
</template>


<script>
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import constants from '@/constants';
import 'vue-awesome/icons/whatsapp'
import 'vue-awesome/icons/thumbs-o-up'
import * as firebase from "firebase";
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
	props: {
        shayari: {
            type: Object,
            required: true
        },
        index: {
        	type: Number,
        	required: true
        },
        'in-viewport-once': {
            default: true
        },
        'in-viewport-offset-top': {
            default: -300
        }
    },
    mixins: [
        mixins,
        inViewport
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    data() {
        return {
            shouldShowModal: this.$route.query.postId ? true : false,
            language: constants.LANGUAGES.filter((eachLanguage) => eachLanguage.shortName === process.env.LANGUAGE)[0].fullName.toUpperCase(),
            shayariList: [],
            shuffled: false,
            shuffledIndex: []
        }
    },
    methods: {
        triggerLikeShareAnalytics(postId) {
            const that = this;
            if(!this.getCookie("shayari_hindi_like_"+postId)) {
                import('firebase').then((firebase) => {
                    if (firebase.apps.length === 0) {
                        const config = {
                            apiKey: process.env.FIREBASE_API_KEY,
                            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                            databaseURL: process.env.FIREBASE_DATABASE_URL,
                            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
                        };
                        firebase.initializeApp(config);
                    }
                    var node = firebase.database().ref("EXPERIMENT").child("SHAYARI").child(that.language);
                    node.once('value', (snapshot) => {
                        let shayariList = snapshot.val();
                        for( var i = 0; i < shayariList.length; i++ ) {
                            if(postId == shayariList[i].id) {
                                shayariList[i].likeCount = shayariList[i].likeCount == undefined ? 1 : shayariList[i].likeCount + 1;
                                shayariList[i].lastUpdated = firebase.database.ServerValue.TIMESTAMP
                                node = node.child(i)
                                node.update({
                                    "likeCount": shayariList[i].likeCount,
                                    "lastUpdated": shayariList[i].lastUpdated
                                });
                                this.setCookie("shayari_hindi_like_"+postId, 1, 30, "/")
                                break;
                            }
                        }
                    });
                });
                this.triggerAnanlyticsEvent(`LIKE_VAPSISHAYARI_SHAYARI`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, "POST_ID": postId});
            }
        },
        triggerWhatsappShareAnalytics(postId) {
            const that = this;
            if(!this.getCookie("shayari_hindi_share_"+postId)) {
                import('firebase').then((firebase) => {
                    if (firebase.apps.length === 0) {
                        const config = {
                            apiKey: process.env.FIREBASE_API_KEY,
                            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                            databaseURL: process.env.FIREBASE_DATABASE_URL,
                            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
                        };
                        firebase.initializeApp(config);
                    }
                    var node = firebase.database().ref("EXPERIMENT").child("SHAYARI").child(that.language);
                    node.once('value', (snapshot) => {
                        let shayariList = snapshot.val();
                        for( var i = 0; i < shayariList.length; i++ ) {
                            if(postId == shayariList[i].id) {
                                shayariList[i].shareCount = shayariList[i].shareCount == undefined ? 1 : shayariList[i].shareCount + 1;
                                shayariList[i].lastUpdated = firebase.database.ServerValue.TIMESTAMP
                                node = node.child(i)
                                node.update({
                                    "shareCount": shayariList[i].shareCount,
                                    "lastUpdated": shayariList[i].lastUpdated
                                });
                                this.setCookie("shayari_hindi_share_"+postId, 1, 30, "/")
                                break;
                            }
                        }
                    });
                });
                this.triggerAnanlyticsEvent(`SHAREWA_VAPSISHAYARI_SHAYARI`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, "POST_ID": postId});
            }
            const textToShare = `https://${window.location.host}${window.location.pathname}${encodeURIComponent(`?postId=${postId}&utm_source=whatsapp&utm_medium=social&utm_campaign=shayari`)}`;
            window.open(`https://api.whatsapp.com/send?text=${textToShare}`);
        }
    },
    watch: {
        'inViewport.now'(visible) {
            if (visible) {
                this.triggerAnanlyticsEvent(`VIEWED_VAPSISHAYARI_SHAYARI`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, "POST_ID": this.shayari.id, "INDEX": this.index});
            }
        }
    }
}
</script>

<style lang="scss">
.shayari {
    background: #f8f8f8;
    margin-top: 85px;
    min-height: 700px;
    max-width: 600px;
    margin: 0 auto;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
}

.shayari-item {
    margin: 10px;
}

.shayari-details {
    margin: 5px 5px 0;
    img {
        max-width: 100%;
        min-height: 300px;
    }
}

.social-icons {
    .social-button {
        display: inline-block;
        width: 49%;
        padding: 10px 0;
        span, i, .fa-icon {
            vertical-align: middle;
        }
        &.share-button {
            .fa-icon {
                color: #48c631;
            }
        }
        &.like-button {
            .fa-icon {
                color: #3b5998;
            }
        }
        span {
            font-size: 14px;
            margin-left: 5px;
        }
    }
}

.shayari-image {
    flex: 1;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
    }
}

.shayari-text {
    flex: 2;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
        text-align: center;
    }
}

.shayari-shadow {
    -webkit-box-shadow: 0px 15px 54px -5px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 15px 54px -5px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 15px 54px -5px rgba(0, 0, 0, 0.75);
}

.shayari-heading {
    font-weight: bold;
    font-size: 14px;
    text-align: left;
    padding-top: 5%;
    padding-left: 3%;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
        text-align: center;
        padding-top: 1%;
    }
}

.shayari-button {
    margin: 1px;
    text-align: center;
    font-weight: 200;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
        text-align: center;
    }
}

.shayari-button:hover {
    background-color: #F99BA7;
}

.modal-backdrop {
    background: rgba(0,0,0,0.5);
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
.shayari-modal {
    position: fixed;
    z-index: 2;
    top: 20%;
    background-color: white;
    width: 90%;
    max-width: 500px;
    left: 50%;
    transform: translate(-50%,0);
}

.close {
    display: flex;
    align-items: right;
    margin: 10px;
    font-size: 16px;
    cursor: pointer;
}

.close:hover {
    font-weight: bold;
}

.span-image {
    position: absolute;
    right: 18%;
}
</style>