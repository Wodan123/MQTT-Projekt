document.addEventListener("DOMContentLoaded", function () {
  const brokerUrlInput = document.getElementById('broker-url');
  const connectBtn = document.getElementById('connect-btn');
  const disconnectBtn = document.getElementById('disconnect-btn'); // Add a disconnect button in your HTML
  const qosSelect = document.getElementById('qos');
  const topicInput = document.getElementById('topic');
  const subscribeBtn = document.getElementById('subscribe-btn');
  const subscribeAllBtn = document.getElementById('subscribe-all-btn');
  const messageContainer = document.createElement('div'); // Create a div to display messages
  const subscribeMQTT = document.getElementById('connect-btnMQTT');
  let client;

  function connect() {
      const brokerUrl = brokerUrlInput.value.trim();
      client = mqtt.connect(brokerUrl);

      client.on('connect', function () {
          console.log('Connected to MQTT broker');
      });

      client.on('message', function (topic, message) {
          console.log(`Received message on ${topic}:`, message.toString());
          displayMessage(topic, message.toString());
      });

      client.on('error', function (error) {
          console.error('MQTT Error:', error);
      });

      client.on('reconnect', function () {
          console.log('Reconnecting to MQTT broker...');
      });

      // Additional connection-related functions...
  }
  function connectMQTT() {
    const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8); // Generate a random clientId
    
    // Adjusted options for WebSocket connection
    const brokerOptions = {
        // Use the WebSocket protocol (ws for non-TLS or wss for TLS connections)
        protocol: 'ws',
        // Correct hostname remains the same
        hostname: 'mqtt-broker.zdw31.cloud',
        // Change the port to the WebSocket port used by HiveMQ's public broker
        port: 8000,
        // Path for MQTT over WebSockets on some brokers (may need to adjust based on the broker)
        path: '/mqtt',
        // Include the clientId in the connection options
        clientId: clientId
    };

    // Connect using MQTT.js with the broker options specified for WebSocket
    client = mqtt.connect(brokerOptions);

    client.on('connect', function () {
        console.log('Connected to MQTT broker with Client ID:', clientId);
    });

    client.on('message', function (topic, message) {
        console.log(`Received message on ${topic}:`, message.toString());
        // Implement displayMessage function to handle incoming messages as needed
        // displayMessage(topic, message.toString());
    });

    client.on('error', function (error) {
        console.error('MQTT Error:', error);
    });

    client.on('reconnect', function () {
        console.log('Reconnecting to MQTT broker...');
    });
}

// Ensure you have a function to display messages if needed, similar to this:
// function displayMessage(topic, message) {
//     // Implement your message display logic here
// }


  function disconnect() {
      if (client) {
          client.end();
          console.log('Disconnected from MQTT broker');
      }
  }

  function subscribe() {
    const topic = topicInput.value.trim();
    if (topic) {
        client.subscribe(topic);
        console.log(`Subscribed to ${topic}`);
        client.publish(topic, 'This is a test message!');
    } else {
        console.error('Invalid topic. Please enter a topic to subscribe.');
    }
}


  function displayMessage(topic, message) {
      // Your existing displayMessage function
      // ...

      // For example, log messages to the console:
      console.log(`Topic: ${topic}, Message: ${message}`);
  }

  connectBtn.addEventListener("click", () => connect());
  disconnectBtn.addEventListener("click", () => disconnect());
  subscribeBtn.addEventListener("click", () => subscribe());
  subscribeMQTT.addEventListener("click", () => connectMQTT());
  subscribeAllBtn.addEventListener("click", () => { /* Your logic for 'Subscribe to All' */ });
});
