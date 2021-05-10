const kafka = require('kafka-node');
const bp = require('body-parser');

let kafkaHost = 'kafka-pod:9092';
let kafkaTopic = 'testingtopic';

try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient({kafkaHost: kafkaHost});
  let consumer = new Consumer(
    client,
    [{ topic: kafkaTopic, partition: 0 }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  );
  consumer.on('message', function(message: any) {
    console.log('here');
    console.log(
      'kafka-> ',
      message.value
    );
  })
  consumer.on('error', function(err: any) {
    console.log('error', err);
  });
}
catch(e) {
  console.log(e);
}
