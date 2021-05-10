var redis = require("redis");

const publisher = redis.createClient({
    host: 'redis-pod.sampleapps',
    port: '6379',
    password: 'abcde12345'
});

publisher.publish("notification", "{\"message\":\"Hello world from Asgardian!\"}", function(){
    process.exit(0);
});
