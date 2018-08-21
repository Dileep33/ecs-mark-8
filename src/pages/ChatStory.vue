<template>
    <MainLayout>
        <div class="chatstory-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>{{ chatStoryData.title }}</h2>
                        <div class="btn-next-story" @click="nextStory()">Next Story</div>
                    </div>
                    <div id="chatStoryBody" class="chat-body" :class="chatStoryData.storyType">
                        <div id="all-messages" class="all-messages">
                            <div class="chat-item" v-for="eachMessage in liveMessages" :class="{'sender': eachMessage.sender_name === sender, 'self': eachMessage.sender_name !== sender }">
                                <span class="name">{{ eachMessage.sender_name }}</span>
                                <div class="chat-story">
                                    <span class="story-text">{{ eachMessage.message }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="typing-wrap" v-show="!chatHasEnded">
                            <div class="typing">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div class="extras" v-if="chatHasEnded">
                            <div class="social-btn share-btn" @click="shareWhatsApp">
                                <icon name="whatsapp" scale="1.5"></icon>
                                <span>__("share")</span>
                            </div>
                            <div class="btn-next-story" @click="nextStory()">Next Story</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="end-of-stories">
            <i class="material-icons">check_circle_outline</i>
            <h3>You have read all the stories!!!</h3>
            <p>Come back tomorrow for more new stories.</p>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import chatStories from '@/constants/chat-stories.json';
import 'vue-awesome/icons/whatsapp'
import 'vue-awesome/icons/thumbs-o-up'

export default {
    components: {
        MainLayout,
        Spinner
    },
    data() {
        return {
            chatStoryData: null,
            sender: null,
            liveMessages: [],
            chatHasEnded: false
        }
    },
    methods: {
        loadStories() {
            const that = this;
            const { chatSlug } = this.$route.params;
            const chatStoryData = chatStories[chatSlug];
            
            this.chatStoryData = chatStoryData;
            this.sender = chatStoryData.messages[0].sender_name;
            
            let timePassed = 0;
            this.chatStoryData.messages.forEach((eachMessage, index) => {
                const lengthOfMessage = eachMessage.message.split(' ').length;
                const timeToTypeInSec = lengthOfMessage * 1.25;
                timePassed += timeToTypeInSec;
                setTimeout(() => {
                    that.liveMessages.push(eachMessage);
                    console.log(eachMessage.message);
                    $("#chatStoryBody").animate({ scrollTop: $("#chatStoryBody")[0].scrollHeight}, 1000);
                }, timePassed * 500);
            });
        },
        nextStory() {
          const chatStorySlugs = Object.keys(chatStories);
          const { chatSlug } = this.$route.params;
          const storyNumber = chatStorySlugs.length;
          
          const currentIndex = chatStorySlugs.indexOf(chatSlug);
          const nextStorySlug = chatStorySlugs[currentIndex + 1];
          
          if ((currentIndex + 1) < storyNumber) {
              this.$router.push('/chat-story/' + nextStorySlug);
              this.$data.chatStoryData = null;
              this.$data.sender = null;
              this.$data.liveMessages = [];
              this.$data.chatHasEnded = false;
              this.loadStories();
          }
          else {
              $(".chatstory-page").hide();
              $(".end-of-stories").fadeIn();
          }
      },
      shareWhatsApp() {
          const textToShare = `https://${window.location.host}${window.location.pathname}${encodeURIComponent(`?utm_source=whatsapp&utm_medium=social&utm_campaign=chatStories`)}`;
          window.open(`https://api.whatsapp.com/send?text=${textToShare}`);
      }
    },
    watch: {
        'liveMessages'(liveMessages) {
            if (liveMessages.length === this.chatStoryData.messages.length) {
                this.chatHasEnded = true;
                setTimeout(() => {
                    $("#chatStoryBody").animate({ scrollTop: $("#chatStoryBody")[0].scrollHeight}, 1000);
                }, 1000)
            }
        }
    },
    created() {
        this.loadStories();
    }
}
</script>

<style lang="scss" scoped>
.chatstory-page {
    margin-top: 85px;
    text-align: left;
    background: #f8f8f8;
    @media screen and (max-width: 992px ) {
        text-align: center;
        margin-top: 65px;
    }
    h2 {
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        position: relative;
        z-index: 1;
        float: left;
    }
    .chat-body {
        text-align: center;
        overflow-y: auto;
        background: #f9f9f9;
        width: 100%;
        height: calc(100vh - 170px);
        margin-top: 10px;
        position: relative;
        background-color: #f0e7df;
        background-repeat: repeat;
        &.love {
            background-image: url(https://i.pinimg.com/originals/16/70/6f/16706f756004ee44b3a67f655a193232.jpg);
        }
        &.horror {
            background-image: url();
        }
        .chat-date {
            text-align: center;
            margin: 7px 0;
            clear: both;
            display: inline-block;
            width: 100%;
            span {
                font-size: 13px;
                color: #686868;
                padding: 3px 5px;
                background: #D4EAF4;
                box-shadow: 0 1px 1px 0 rgba(164, 152, 135, 0.32), 0 0 1px 0 #A39F98;
                border-radius: 4px;
            }
        }
        .all-messages {
            overflow: hidden;
            margin-bottom: 10px;
        }
        .typing-wrap {
            background-color: #fff;
            width: 50px;
            line-height: 16px;
            display: block;
            border-radius: 5px;
            padding: 5px;
            text-align: left;
            box-shadow: 0 1px 1px 0 rgba(164, 152, 135, 0.32), 0 0 1px 0 #A39F98;
            margin: 5px 20px 10px;
            position: relative;
            .typing {
                text-align: center;
                span {
                    display: inline-block;
                    background-color: #9e9e9e;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    margin-right: 0px;
                    vertical-align: middle;
                    animation: typeSwing 1s infinite;

                    &:nth-child(2) {
                        animation-delay: 0.15s;
                    }
                    &:nth-child(3) {
                        animation-delay: 0.3s;
                        margin-right: 0;
                    }
                }
            }
            @keyframes typeSwing {
                10% {
                    transform: translateY(-10px);
                    background-color: #9E9DA2;
                }
                50% {
                    transform: translateY(0);
                    background-color: #B6B5BA;
                }
            }
            &:before {
                background-color: #fff;
                content: "\A0";
                display: block;
                height: 16px;
                position: absolute;
                top: -1px;
                transform: rotate(45deg) skew(-45deg);
                -moz-transform: rotate(45deg) skew(-45deg);
                -ms-transform: rotate(45deg) skew(-45deg);
                -o-transform: rotate(45deg) skew(-45deg);
                -webkit-transform: rotate(45deg) skew(-45deg);
                width: 20px;
                box-shadow: -1px 1px 1px 0 rgba(164, 152, 135, 0.32);
                left: -5px;
            }
        }
        .chat-wrap {
            overflow: hidden;
        }
        .chat-item {
            width: 100%;
            &.sender {
                float: left;
                margin: 5px 45px 5px 20px;
                .chat-story {
                    float: left;
                }
            }
            &.self {
                float: right;
                margin: 5px 20px 5px 45px;
                .chat-story {
                    background-color: #FFBAC2;
                    float: right;
                }
                .name {
                    text-align: right;
                }
            }
            &.sender .chat-story::before {
                box-shadow: -1px 1px 1px 0 rgba(164, 152, 135, 0.32);
                left: -5px;
            }
            
            &.self .chat-story::before {
                background-color: #FFBAC2;
                box-shadow: 1px -1px 1px 0 rgba(164, 152, 135, 0.32);
                right: -5px;
                transform: rotate(1deg) skew(-45deg);
                -moz-transform: rotate(1deg) skew(-45deg);
                -ms-transform: rotate(1deg) skew(-45deg);
                -o-transform: rotate(1deg) skew(-45deg);
                -webkit-transform: rotate(1deg) skew(-45deg);
                top: 0;
            }
            .name {
                font-size: 9px;
                font-weight: bold;
                position: relative;
                z-index: 1;
                display: block;
                text-align: left;
                margin: 0 0 5px;
            }
        }
        .chat-story {
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 1px 1px 0 rgba(164, 152, 135, 0.32), 0 0 1px 0 #A39F98;
            display: inline-block;
            padding: 10px 15px;
            position: relative;
            vertical-align: top;
            text-align: left;
            color: #000000;
            line-height: 16px;
            font-size: 14px;
            clear: both;
            &::before {
                background-color: #fff;
                content: "\00a0";
                display: block;
                height: 16px;
                position: absolute;
                top: -1px;
                transform: rotate(45deg) skew(-45deg);
                -moz-transform: rotate(45deg) skew(-45deg);
                -ms-transform: rotate(45deg) skew(-45deg);
                -o-transform: rotate(45deg) skew(-45deg);
                -webkit-transform: rotate(45deg) skew(-45deg);
                width: 20px;
            }
            .story-text {
                position: relative;
                white-space: pre-line;
            }
        }
        &::before {
            background: rgba(255,255,255,0.8);
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
        }
    }
    .extras {
        background: #fff;
        border-top: 1px solid #e9e9e9;
        padding: 10px;
        width: 100%;
        position: relative;
        z-index: 1;
        .btn-next-story {
            float: none;
            background: #d0021b;
            font-size: 14px;
            display: inline-block;
            height: 34px;
            margin: 10px 5px;
        }
        .social-btn {
            background: #e9e9e9;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 4px;
            margin: 10px 5px;
            .fa-icon {
                vertical-align: middle;
                color: #48c631;
            }
            span {
                vertical-align: middle;
                padding-left: 5px;
                font-size: 14px;
            }
        }
    }
    .btn-next-story {
        background: rgba(208, 2, 27,0.5);
        padding: 5px 10px;
        color: #fff;
        font-weight: bold;
        font-size: 12px;
        border-radius: 3px;
        margin: 5px auto;
        max-width: 150px;
        cursor: pointer;
        z-index: 1;
        position: relative;
        float: right;
        &:hover {
            background: #d0021b;
        }
    }
}
.end-of-stories {
    background: #fff;
    padding: 70px 0;
    margin-top: 65px;
    min-height: 500px;
    display: none;
    i {
        font-size: 50px;
        color: #4CAF50;
    }
    h3 {
        font-size: 22px;
        font-weight: normal;
        color: #4CAF50;
    }
    p {
        font-size: 14px;
    }
}
</style>
