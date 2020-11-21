// "Mmmmm hot cross buns" [Assignment 3] by BenC

var fr = 30; // frame rate;
var state;   // state variable determines which part of the hot cross bun we are making  
// state 0 - intro
// state 1 - dough
// state 2 - fruit or choc chips
// state 3 - toppings
// state 4 - baking
// state 5 - dropping
// state 6 - finish

var bkgndColor = []; // array of background colours to use at each state;

var hcbArray = []; // array of hot cross bun objects for end sequence;
var hcbCount = 40; // how many buns to create at the end;


function setup() {
  // add your setup code here
  createCanvas(windowWidth, windowHeight);
  frameRate(fr); // set this explicitly so we know about how fast events will happen

  textFont("Open Sans");  // a google font
  state = 1; 

  bkgndColor = [
    color('#C8C4E1'), //mauve for state 0
    color('#E8E4FF'), //mauve for state 1
    color('#F4F4F4'), //off white for state 2
    color('#E8E4E1'), //different off white for state 3
    color('#FFC29A'), //orange for state 4 baking
    color('#B8F4F1'), //light blue for state 5
    color('#B8F4F1'), //light blue for state 6
    ];

  initCritter();
  initHotCrossBun();
  initButtons();
  initSign();

}

function draw() {
  // add your draw code here
  background(bkgndColor[state]);

  if (state < 5) { // hot cross bun cooking sequences

    drawCritter(critter);
    moveCritterEyes(critter);
    timeoutSpeechCritter(critter);
    if (critter.isBouncing) {moveCritter(critter);}

    drawHotCrossBun(hotCrossBun);
    if (hotCrossBun.isBaking) {bakeHotCrossBun(hotCrossBun);}

    drawButtons(buttons);

  }

  else if (state == 5) { // dropping hot cross buns sequence
    drawCritter(critter);
    drawHotCrossBun(hotCrossBun);

    for (let i=0; i < hcbArray.length; i++) {
      drawHotCrossBun(hcbArray[i]);
      if (hcbArray[i].falling) {dropHotCrossBun(hcbArray[i]);}
    }
    if (((frameCount % 4) == 0) && hcbArray.length < hcbCount) {
      cloneHotCrossBun(hotCrossBun);      
      if (hcbArray.length >= hcbCount) {
        state = 6; // trigger final state
        critter.look = 2; // looking at you
        critter.smile = true;
      }
    }
    
  }

  else if (state == 6) { // end sequence
      if (sign.growing) {
        drawCritter(critter);
        drawHotCrossBun(hotCrossBun);}
  
      for (let i=0; i < hcbArray.length; i++) {
        drawHotCrossBun(hcbArray[i]);
        if (hcbArray[i].falling) {dropHotCrossBun(hcbArray[i]);}
      }

      if (sign.growing) {
        drawSign(sign);

      } else if (critter.isBouncing && critter.bounceYVel < 0) {
        drawCritter(critter);
        moveCritter(critter); 
        drawSign(sign);

      } else if (critter.isBouncing && critter.bounceYVel >= 0) {
        drawSign(sign);
        drawCritter(critter);
        moveCritter(critter);

      } else if (!critter.isBouncing) {
        drawSign(sign);
        drawCritter(critter);
        hotCrossBun.x = width - critter.x;
        drawHotCrossBun(hotCrossBun);

        textSize(50);
        textAlign(CENTER, CENTER);
        textStyle(ITALIC);
        text("Hot Cross Buns!",width/2,height/4);
        text("in your supermarket now",width/2,3*height/4);
        drawBenSee();
      }
     
  }

  //drawSpeedo();
 
}

function initSign() {
  // set properties of sign
  sign = {
    xsize: 0,
    ysize: 0,
    stroke: color('#98D4D1'),
    growing: true
  };
}

function drawSign(sg) {
  // draw and grow sign at end sequence
  if (sg.growing) {
    sg.xsize += width/20;
    sg.ysize += height/20;
  }

  // draw sign
  push();
    stroke(sg.stroke);
    strokeWeight(5);
    fill(bkgndColor[state]);
    rect((width-sg.xsize)/2, (height-sg.ysize)/2,sg.xsize,sg.ysize);
  pop();

  // if sign grown to full size, 
  if ((sg.growing == true) && (sg.xsize >= 2*width/3)) {
    sg.growing = false;

    // set critter to bounce in front of the sign
    critter.isBouncing = true;
    critter.bounceMaxVel = 8*critter.bounceMaxVel; 
    critter.bounceYVel = - critter.bounceMaxVel; 
    //critter.bounceXVel = 0;
  }

}

function drawBenSee () {
 
  // 4.1 Frames in Charcoal
  push();
    translate(1*width/5,1*height/5);
    scale(0.2,0.2);

    strokeWeight(8);
    stroke('#393E46'); // charcoal color for glasses
    noFill();

    gx = 0; // Glasses top left corner
    gy = 0;

    line(gx, gy, gx + 300, gy);
    line(gx + 300, gy, gx + 300, gy + 50);
    line(gx + 150, gy, gx + 150, gy + 50);
    line(gx, gy, gx, gy + 50);
    arc(gx + 75, gy + 50, 150, 75, 0, PI);
    arc(gx + 225, gy + 50, 150, 75, 0, PI);

    // 4.2 Eyebrows

    line(gx + 50, gy - 30, gx + 100, gy - 50);
    line(gx + 200, gy - 50, gx + 250, gy - 30);

    // 4.2 Blue eyes

    strokeWeight(0);
    fill('blue');
    pupilSize = 30;

    ellipse(gx + 100, gy + 50, pupilSize, pupilSize);
    ellipse(gx + 250, gy + 50, pupilSize, pupilSize);
  pop();

}

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}

// just a helper function - no need to understand it all today
function drawSpeedo() {
  let fra = round(frameRate());
  let fractionOfMaxSpeed = fra/60;
  // start a new drawing context (colours, etc.)
  push();
  // draw the coloured "speedo" bar
  noStroke();
  // make it red when we're fast, grey when we're slow
  fill(255*fractionOfMaxSpeed, 50, 50);
  rect(width-150, height-100, 100*fractionOfMaxSpeed, 50);
  // draw the framerate number
  stroke(0);
  fill(255);
  strokeWeight(3);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(fra, width-100, height-75);
  // restore the previous drawing context (colours, etc.)
  pop();
}
