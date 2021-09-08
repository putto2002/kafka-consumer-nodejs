const Kafka = require('node-rdkafka');
require('dotenv').config();

const consumer = new Kafka.KafkaConsumer({
    'bootstrap.servers': process.env.BOOTSTRAP_SERVER,
    'sasl.username': process.env.SASL_USERNAME,
    'sasl.password': process.env.SASL_PASSWORD,
    'security.protocol': process.env.SECURITY_PROTOCOL,
    'sasl.mechanisms': process.env.SASL_MECHANISMS,
    'group.id': 'node-example-group-1'
  }, {
    'auto.offset.reset': 'earliest'
  });

consumer.connect();

consumer.on('ready', () => {
    consumer.subscribe([process.env.TOPIC]);
    consumer.consume();
}).on('data', (data) => {
    console.log(data.value.toString());
});