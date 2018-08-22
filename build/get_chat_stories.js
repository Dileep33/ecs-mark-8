const async = require('async');
const request = require('request');
const fs = require('fs');

const CHAT_STORY_URL = 'https://s3.ap-south-1.amazonaws.com/chat-stories.pratilipi.com/stories/chat-story-';

let chatStoryCount = 1;
const chatStories = {};
async.forever((foreverCallback) => {
    request.get(`${CHAT_STORY_URL}${chatStoryCount}.json`, (error, response, data) => {
        if (response.statusCode !== 200) {
            console.log('something is wrong');
            foreverCallback(1);
        } else {
            
            const chatStoryData = JSON.parse(data);
            chatStories[chatStoryData['url-slug']] = chatStoryData;
            chatStoryCount++;
            foreverCallback(null);
        }
    });
}, () => {
    console.log('all done');
    fs.writeFile(`./src/constants/chat-stories.json`, JSON.stringify(chatStories, null, 4), (error, data) => {
        if (!error) {
            console.log('written successfully');
        } else {
            console.log('SOME ERROR: ');
            console.log(error);
        }
    });
});
