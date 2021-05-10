const kafka = require('kafka-node');
const bp = require('body-parser');

let kafkaHost = 'kafka-pod:9092';
let kafkaTopic = 'testingtopic';

try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient({kafkaHost: kafkaHost});
  const producer = new Producer(client);
  let payloads = [
    {
      topic: kafkaTopic,
      messages: 'Hello world!',
      partition: 0,
      attributes: 0
    }
  ];

  producer.on('ready', function() {
    producer.send(payloads, (err: any, data: any) => {
      if (err) {
        console.log('[kafka-producer -> '+kafkaTopic+']: broker update failed');
      } else {
        console.log('[kafka-producer -> '+kafkaTopic+']: broker update success');
      }
    });
  });

  producer.on('error', function(err: any) {
    console.log(err);
    console.log('[kafka-producer -> '+kafkaTopic+']: connection errored');
    throw err;
  });
}
catch(e) {
  console.log(e);
}
