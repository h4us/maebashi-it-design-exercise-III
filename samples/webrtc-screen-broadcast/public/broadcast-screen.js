/* eslint-disable no-undef, no-unused-vars */

const peerConnections = {};
const config = {
  iceServers: [
    {
      'urls': 'stun:stun.l.google.com:19302',
    },
  ]
};

const socket = io.connect(window.location.origin);

socket.on('answer', (id, description) => {
  peerConnections[id].setRemoteDescription(description);
});

socket.on('watcher', id => {
  const peerConnection = new RTCPeerConnection(config);
  peerConnections[id] = peerConnection;

  window.stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit('candidate', id, event.candidate);
    }
  };

  peerConnection
    .createOffer()
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
      socket.emit('offer', id, peerConnection.localDescription);
    });
});

socket.on('candidate', (id, candidate) => {
  peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
});

socket.on('disconnectPeer', id => {
  peerConnections[id].close();
  delete peerConnections[id];
});

async function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }

  let captureStream;

  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia();
  } catch (err) {
    console.error('Error: ', err);
  }

  window.stream = captureStream;
  socket.emit('broadcaster');
}

function handleError(error) {
  console.error('Error: ', error);
}

window.onunload = window.onbeforeunload = () => {
  socket.close();
};

// initialize
getStream();
