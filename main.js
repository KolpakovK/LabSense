var sequencePath = 'src/MainAnim/';
var sequenceNumberLength = 4;
var fileName = '';
var fileSuffix = '-min.png';

var targetElement = document.getElementById('main-anim');

//var fps = 30;
var startFrame = 1;
var endFrame = 144;
var loop = true;
var pingPong = false;


// Functions

function padWithZeroes(number, length) {
  var paddedNumber = '' + number;
  while (paddedNumber.length < length) {
    paddedNumber = '0' + paddedNumber;
  }
  return paddedNumber;
}

var frames = [];
var framesLoaded = 0;
function loadFrames(callback) {
  for (var i = startFrame; i <= endFrame; i++) {
    frames[i] = new Image();
    frames[i].src = 
    sequencePath + fileName + padWithZeroes(i, sequenceNumberLength) + fileSuffix;
    frames[i].onload = function(){ 
      framesLoaded++; 
      if (framesLoaded >= endFrame-startFrame) {
        callback();
      }
    };

  }
}


var currentFrame = startFrame;
var forwards = true;

function frameAnimation() {
  var canvas = targetElement;
  var context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(frames[currentFrame], 0, 0, canvas.width, canvas.height);

  // If last frame
  if (currentFrame == endFrame) {
    if (!loop) cancelAnimationFrame();

    if (pingPong) {
      forwards = false;
    } else {
      currentFrame = startFrame;
    }
    // If first frame
  } else if (currentFrame == startFrame) {
    if (pingPong) {
      forwards = true;
    }
  }

  if (forwards) {
    currentFrame++;
  } else {
    currentFrame--;
  }

  setTimeout(frameAnimation,28)
  //requestAnimationFrame(frameAnimation);
}

loadFrames(function() {
  frameAnimation();
});