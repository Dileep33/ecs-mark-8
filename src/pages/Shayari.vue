<template>
    <MainLayout>
        <div class="shayari">
            <div class="shayari-item card" v-for="(shayari, index) in shayariList" v-if="shayari.id == $route.query.postId && shouldShowModal && shayariList.length !== 0">
                <ShayariDetails :shayari="shayari"></ShayariDetails>
                
            </div>
            <div class="shayari-item card" v-for="(shayari, index) in shayariList" v-if="shayari.active && shayari.id != $route.query.postId && shayariList.length !== 0">
                <ShayariDetails :shayari="shayari" :index="index"></ShayariDetails>
            </div>
        </div>
        <!-- <div class="shayari-shadow shayari-modal" v-for="(shayari, index) in shayariList" v-if="shayari.id == $route.query.postId && shouldShowModal && shayariList.length !== 0">
            <p class="close" @click="resetModal(shayari.id)"><b>X</b></p>
            <ShayariDetails :shayari="shayari"></ShayariDetails>
        </div>
        <div class="modal-backdrop" v-if="shouldShowModal"></div> -->
    </MainLayout>
</template>
<script>
import mixins from '@/mixins';
import constants from '@/constants';
import WebPushUtil from '@/utils/WebPushUtil';
import MainLayout from '@/layout/main-layout.vue';
import ShayariDetails from '@/components/ShayariDetails.vue';
import 'vue-awesome/icons/whatsapp'
import 'vue-awesome/icons/thumbs-o-up'
import * as firebase from "firebase";
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    mixins: [
        mixins
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
    components: {
        MainLayout,
        ShayariDetails
    },
    methods: {
        // resetModal(postId) {
        //     this.shouldShowModal = false;
        //     this.triggerAnanlyticsEvent(`CLOSE_VAPSISHAYARI_SHAYARI`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, "POST_ID": postId});
        // },
        fetchShayariList() {
            const that = this;
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
                const shayariPreferenceNode = firebase.database().ref("EXPERIMENT").child("SHAYARI").child(that.language);
                shayariPreferenceNode.on('value', (snapshot) => {
                    let shayariPreferencess = snapshot.val();
                    let shayariPreferences = [];
                    let postId = this.$route.query.postId;
                    for(var i = 0; i < shayariPreferencess.length; i++) {
                        if(postId && shayariPreferences[i].id == postId && shayariPreferences[i].active == false) {
                            shayariPreferences.push(shayariPreferencess[i]);
                        }
                        if(shayariPreferencess[i].active) {
                            shayariPreferences.push(shayariPreferencess[i]);
                        }
                    }
                    var shayariListRandom;
                    if(that.shuffled == false){
                        for(var i = 0; i < shayariPreferences.length; i++) {
                            that.shuffledIndex.push(i) 
                        }
                        shayariListRandom = that.shuffle(JSON.parse(JSON.stringify(shayariPreferences)));
                        that.setPageOgTags()
                    }
                    else
                        shayariListRandom = that.arrange(JSON.parse(JSON.stringify(shayariPreferences)))
                    that.shayariList = shayariListRandom;
                });
            });
        },
        shuffle(array) {
          var currentIndex = array.length, temporaryValue, randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.shuffledIndex[currentIndex];
            this.shuffledIndex[currentIndex] = this.shuffledIndex[randomIndex]; 
            this.shuffledIndex[randomIndex] = temporaryValue;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
          this.shuffled = true;
          return array;
        },
        arrange(array) {
          let arrayCopy = JSON.parse(JSON.stringify(array));
          // While there remain elements to shuffle...
          for (var i = 0; i < array.length; i++) {

            // And swap it with the current element.
            array[i] = arrayCopy[this.shuffledIndex[i]];
          }
          return array;
        },
        setPageOgTags() {
            var flag = false;
            for( var i = 0; i < this.shayariList.length; i++ ) {
                if(this.$route.query.postId && this.$route.query.postId == this.shayariList[i].id) {
                    document.head.querySelector('meta[property="og:image"]').content = this.shayariList[i].image;
                    flag = true;
                    break;
                }
            }
            if(flag == false) {
               for( var i = 0; i < this.shayariList.length; i++ ) {
                    if(this.shayariList[i].active) {
                        document.head.querySelector('meta[property="og:image"]').content = this.shayariList[i].image;
                        flag = true;
                        break;
                    }
                } 
            }
        }
    },
    mounted() {
        this.fetchShayariList();
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
