// critter functions

function initCritter () {
    critter = {
        x: width/4, // critter location on screen
        y: height/2,
        isBouncing: true, // if critter is moving at the moment
        bounceMaxVel: 10, // starting bounce velocity
        bounceYVel: -10, // how far through a bounce the critter is
        bounceXVel: width/160, // how fast critter approaches hot cross bun

        col: color(100,100,220), // critter body colour

        xeye: 15, // relative coords of eye
        yeye: -18, 
        look: 1,  // eyes are looking at 0 mouse cursor 1 hot cross bun 2 you 3 blink
        lookTimer: 2*fr, // frames until next change
        lookTime: // average length of time looking at...
          [1.5*fr, // mouse cursor
           0.8*fr, // hot cross bun
           0.8*fr, // you
           0.1*fr], // blinking

        smile: false, // smiling or not

        speechTimer: 4*fr, // frames until speech disappears
        speech: "what are you making?", // initial speech
        speechDough: 
          ["mmm vanilla",
          "mmm cinnamon",
          "mmm chocolate"
          ],
        speechFilling: 
          ["currants yum!",
          "cranberries!",
          "choc chip yum!"
          ],
        speechTopping:
          ["hot cross bun!",
          "coconut!",
          "sugar!"
          ],
        speechBaked: "can I have one?",
    };
}

function drawCritter(cr) {
    // critter  
    push();
      translate(cr.x,cr.y);
  
      scale (2.0, 2.0);
  
      // body 
      fill(cr.col); //mauve
      noStroke();
      ellipse(  0,  0,110,100);
  
      // paws
      ellipse(-30, 50, 40, 35);
      ellipse( 30, 50, 40, 35);
  
      // eyes
  
      if (cr.look <= 2) { // eyes open

        fill(250); // whites of eyes
        ellipse(-cr.xeye , cr.yeye, 30, 20);
        ellipse( cr.xeye , cr.yeye, 30, 20);
    
        // work out coordinates where eyes are looking
        
        if (cr.look == 0) {
          let vTemp = createVector(mouseX - cr.x, mouseY - (cr.y + cr.yeye));
          vTemp.limit(1);
          xlook = 6*vTemp.x;
          ylook = 2*vTemp.y;  

        } else if (cr.look == 1) {
          xlook = 6;
          ylook = 2;
      
        } else if (cr.look == 2) {
          xlook = 0;
          ylook = 0;
        }

        fill(0); // black pupils
        ellipse( -cr.xeye + xlook, cr.yeye + ylook, 12, 12); 
        ellipse(  cr.xeye + xlook, cr.yeye + ylook, 12, 12); 

      } else if (cr.look == 3) { //eyes blinking
        
        stroke(0);
        strokeWeight(3);
        noFill();

        line(-cr.xeye-13,   cr.yeye, -cr.xeye+13, cr.yeye);
        line(-cr.xeye , -10+cr.yeye, -cr.xeye+13, cr.yeye);
        line(-cr.xeye ,  10+cr.yeye, -cr.xeye+13, cr.yeye);
        
        line(+cr.xeye-13,   cr.yeye, +cr.xeye+13, cr.yeye);
        line(+cr.xeye , -10+cr.yeye, +cr.xeye-13, cr.yeye);
        line(+cr.xeye ,  10+cr.yeye, +cr.xeye-13, cr.yeye);
        
        
      }
  
      // eyebrows
  
      stroke(0);
      strokeWeight(3);
      noFill();
  
      arc(-18 , -25, 30, 24, 4.8*PI/4, 6.5*PI/4);
      arc( 18 , -25, 30, 24, 5.5*PI/4, 7.2*PI/4);
  
      // mouth
  
      push();
        rotate(-PI/60);    
        fill(250); // tooth
        rect(1,8,12,10);
        stroke(0); 
        noFill();
        if (cr.smile) arc(0,5,40,5,0,PI);
        else line(-20,8,20,8);
      pop();
 
      // speech bubble
      if (!cr.isBouncing && cr.speechTimer > 0) {
        noStroke();
        fill(0);
        textSize(16);
        text(cr.speech, 0, -60);
      }
  
    pop();
  }

  function moveCritterEyes(cr) {
    // change properties of critter eyes when timer runs down to zero
    cr.lookTimer -= 1;
    //print(cr.look,cr.lookTimer);
    if (cr.lookTimer <= 0) {
      cr.look = random([0, 1, 2, 3]); // choose a random state for next look
      cr.lookTimer = cr.lookTime[cr.look] * (0.8 + random(0.4));
    }
  }

  function moveCritter(cr) {
    // execute critter motion
    critter.x += critter.bounceXVel;
    critter.y += critter.bounceYVel;
    
    // if critter has landed, turn off bouncing
    if (critter.bounceYVel >= critter.bounceMaxVel) {
      critter.isBouncing = false;
    }
    critter.bounceYVel += critter.bounceMaxVel/5;
    
  }

  function timeoutSpeechCritter(cr) {
    // count down frames to zero then speech bubble disappears
    if (cr.speechTimer > 0) {
      cr.speechTimer -= 1;
    } 
  }
