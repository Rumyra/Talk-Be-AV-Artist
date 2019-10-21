// set up audio context
var audioContext = (window.AudioContext || window.webkitAudioContext);
// create audio class
if (audioContext) {
  // Web Audio API is available.
  var audioAPI = new audioContext();
} else {
  // Web Audio API is not available. Ask the user to use a supported browser.
  alert("Oh nos! It appears your browser does not support the Web Audio API, please upgrade or use a different browser");
}

window.addEventListener("keydown", event => {
 if (event.code === 'ArrowDown') {

   audioAPI.resume();

 }
})

// variables
var analyserNode,
    frequencyData = new Uint8Array(4096),
    newFreqData,
    animateDom = function() {};


// create an audio API analyser node and connect to source
function createAnalyserNode(audioSource) {
  analyserNode = audioAPI.createAnalyser();
  analyserNode.fftSize = 8192;
  audioSource.connect(analyserNode);
}


function animate() {
  requestAnimationFrame(animate);
  analyserNode.getByteFrequencyData(frequencyData);
  newFreqData = adjustFreqData();
  // frequencyData.forEach(newData);
  animateDom();
}

// var arrCountOne = 0, arrCountTwo = 0, newFreqOne = [], newFreqTwo = [];
// function newDataOne(ele,ind,arr) {
//   if (ind%256 === 0) {
//     newFreqOne[arrCountOne] = ele;
//     arrCountOne++;
//   }
// };

// function newDataTwo(ele,ind,arr) {
//   if (ind%2 === 0) {
//     newFreqTwo[arrCountTwo] = ele;
//     arrCountTwo++;
//   }
// };

// function animateTwo() {
//   requestAnimationFrame(animate);
//   analyserNode.getByteFrequencyData(frequencyData);
//   newFreqData = adjustFreqData();

//   frequencyData.forEach(newDataOne);

//   animateDom();
// }


var shapeCount = 32;
function adjustFreqData() {
  analyserNode.getByteFrequencyData(frequencyData);
  var removed = frequencyData.slice(0,1024);

  var newFreqs = [], prevRangeStart = 0, prevItemCount = 0;

  // set up the maxPow & thus ratio based on shapeCount
  var maxPow = Math.pow(2,shapeCount/2);
  var ratio = 1024/maxPow;

  // looping - get values for new array based on shapeCount
  for (let j=1; j<shapeCount+1; j++) {
    var itemCount, rangeStart;

    var pow = j/2;

    // use ratio to get itemCount (round)
    itemCount = Math.ceil( ((Math.pow(2, pow))*ratio)/2 );

    rangeStart = prevRangeStart + Math.ceil(prevItemCount/2);
     // get new values
    var newValue = 0, total = 0;
    for (let k=rangeStart; k<rangeStart+itemCount; k++) {
      // add up items and divide by total
      total += frequencyData[k];
      newValue = parseInt(total/itemCount);
    }
    // add to new array
    newFreqs.push(newValue);

    prevItemCount = itemCount;
    prevRangeStart = rangeStart;
  }

  return newFreqs;
}

// getUserMedia success callback -> pipe audio stream into audio API
var gotStream = function(stream) {
  // Create an audio input from the stream.
  var audioSource = audioAPI.createMediaStreamSource(stream);
  createAnalyserNode(audioSource);
  animate();
}

// pipe in analysing to getUserMedia
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(gotStream);


// const vis_spectrum_mic = {

// should be == duh!
//   dom: function dom() {
//     screen.innerHTML('<section><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></section>');
//   },
//   get allEls() {
//     return document.querySelectorAll('#screen i');
//   },
//   set totalEls() {
//     this.allEls.length;
//   },

//   // function css() {},

//   animate: function animate() {
//     for (let i=0; i<totalEls; i++) {
//       //style i
//       allEls[i].style.display = 'inline-block';
//       allEls[i].style.width = '20px';
//       allEls[i].style.backgroundColor = 'hsla(0,50%,50%,1)';


//       var freqVol = frequencyData[i*16]/2;
//       allEls[i].style.height = freqVol+'vh';
//     }
//   }

// }


// MIDI STUFF

var midi, data = [0,0,0], threshold;
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, function() {console.log('failed')});
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
  // when we get a succesful response, run this code
  midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

  var inputs = midi.inputs.values();
  // loop over all available inputs and listen for any MIDI input
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      // each time there is a midi message call the onMIDIMessage function
      input.value.onmidimessage = onMIDIMessage;
  }
}

function onMIDIMessage(message) {
  data = message.data; // this gives us our [command/channel, note, velocity] data.
  console.log('MIDI data', data); // MIDI data [144, 63, 73]

}











