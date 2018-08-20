<template>
    <MainLayout>
        <div class="chatstory-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>{{ chatStoryData.title }}</h2>
                    </div>
                    <div id="chatStoryBody" class="chat-body">
                        <div id="all-messages" class="all-messages">
                            <div>
                                <div class="chat-story" v-for="eachMessage in liveMessages" :class="{'sender': eachMessage.sender_name === sender, 'self': eachMessage.sender_name !== sender }">
                                    <span class="name">{{ eachMessage.sender_name }}</span>
                                    <span class="story-text">{{ eachMessage.message }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="typing-wrap" v-if="!chatHasEnded">
                            <div class="typing">
                                <span></span>
                                <span></span>
                                <span></span>
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
import chatStories from '@/constants/chat-stories.json';

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
        scrollToBottom() {
          chatBody.scrollTop = chatBody.scrollHeight;
        }
    },
    watch: {
        'liveMessages'(liveMessages) {
            if (liveMessages.length === this.chatStoryData.messages.length) {
                this.chatHasEnded = true;
            }
        }
    },
    created() {
        const that = this;
        const { chatSlug } = this.$route.params;
        const chatStoryData = chatStories[chatSlug];
        const chatBody = document.getElementById('messages');
        
        
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
                $('#chatStoryBody')[0].scrollHeight;
            }, timePassed * 1000);
        });
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
    }
    .chat-body {
        text-align: center;
        overflow-y: auto;
        background: #f9f9f9;
        width: 100%;
        height: calc(100vh - 170px);
        margin-top: 10px;
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
            &.sender {
                float: left;
                margin: 5px 45px 5px 20px;
            }
            &.sender::before {
                box-shadow: -1px 1px 1px 0 rgba(164, 152, 135, 0.32);
                left: -5px;
            }
            &.self {
                background-color: #FFBAC2;
                float: right;
                margin: 5px 20px 5px 45px;
            }
            &.self::before {
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
                font-weight: bold;
                font-size: 12px;
            }
            .story-text {
                position: relative;
                white-space: pre-line;
            }
        }
    }
}
</style>
