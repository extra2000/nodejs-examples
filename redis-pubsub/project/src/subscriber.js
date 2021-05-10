var redis = require("redis");

const subscriber = redis.createClient({
    host: 'redis-pod.sampleapps',
    port: '6379',
    password: 'abcde12345'
});

subscriber.on("message", function (channel, message) {
    console.log("Message: " + message + " on channel: " + channel + " is arrive!");
});

subscriber.subscribe("notification");
