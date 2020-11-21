// button functions and mousePressed function

function initButtons() {
    // set location and size of buttons
    buttons = {
      x: hotCrossBun.x,
      y: height*0.7,
      xSpacing: 80,
      sizeOuter: 60,
      sizeInner: 45,
      yTick: 100,
      tickOuter: 70,
      tickInner: 55,
    };
  }

  function drawButtons (bt) {
    // draw buttons to add ingredients to hot cross bun
    push();
      translate(bt.x,bt.y);
      noStroke();
      
      if ((state >= 1) && (state <= 4) && !hotCrossBun.isBaking) {
        // tick button
        push();
          translate(0,bt.yTick);
          fill("#30475E");
          ellipse(0,0,bt.tickOuter);
          fill(bkgndColor[0]);
          ellipse(0,0,bt.tickInner);
          
          noFill();
          stroke("#30475E");
          strokeWeight(8);
          line(-4,+15,-15,0);
          line(-4,+15, 15,-15);
        pop();
  
        if (state <=3) {
          // 3 button outlines
          fill("#30475E");
          noStroke();
          ellipse(-bt.xSpacing,0,bt.sizeOuter);
          ellipse(           0,0,bt.sizeOuter);
          ellipse( bt.xSpacing,0,bt.sizeOuter);
  
          if (state == 1) {
            // left button vanilla
            fill(hotCrossBun.dPal[0]);
            ellipse(-bt.xSpacing,0,bt.sizeInner);
  
            // middle button cinnamon
            fill(hotCrossBun.dPal[1]);
            ellipse(           0,0,bt.sizeInner);
  
            // right button chocolate
            fill(hotCrossBun.dPal[2]);
            ellipse( bt.xSpacing,0,bt.sizeInner);
          }
          else if (state == 2) {
            // left button black currants
            fill(bkgndColor[0]);
            ellipse(-bt.xSpacing   , 0,bt.sizeInner);
            fill(0);
            ellipse(-bt.xSpacing-10, 1,6);
            ellipse(-bt.xSpacing   ,-8,6);
            ellipse(-bt.xSpacing +4, 7,6);
            ellipse(-bt.xSpacing+11,-1,6);
  
            // middle button cranberries
            fill(bkgndColor[0]);
            ellipse( 0, 0,bt.sizeInner);
            fill(220,0,70); // cranberries
            ellipse(-8, 1,12);
            ellipse( 7,-4,12);
            
            // right button choc chips
            fill(bkgndColor[0]);
            ellipse(bt.xSpacing,0,bt.sizeInner);
            fill("#290001"); // choc chips
            arc(bt.xSpacing+8, 3,12,12,-0.1*PI,0.9*PI);
            arc(bt.xSpacing-6, 5,12,12, 0.2*PI,1.2*PI);
            arc(bt.xSpacing+1,-6,12,12, 0.1*PI,1.1*PI);
          }
          else if (state == 3) {
            // left button hot cross
            stroke(255);
            strokeWeight(5);
            noFill();
            arc(-bt.xSpacing+12,10,50,37,1.05*PI, 1.5*PI);
            arc(-bt.xSpacing-12,10,50,37, 1.5*PI,1.95*PI);
  
            // middle button coconut sprinkles
            strokeWeight(3);
            line(  0,-12, 15, -8);
            line(-16,  6, -2, 14);
            line(-18, -4, -4, -7);
            line(  0,  4, 16,  0);
                      
            // right button icing sugar dust
            noStroke();
            fill(255);
            ellipse(bt.xSpacing   ,  0, 2);
            ellipse(bt.xSpacing-10,  3, 2);
            ellipse(bt.xSpacing-13, -8, 2);
            ellipse(bt.xSpacing+10,-15, 2);
            ellipse(bt.xSpacing+15, -1, 2);
            ellipse(bt.xSpacing- 6,  8, 2);
            ellipse(bt.xSpacing+ 1,-15, 2);
            ellipse(bt.xSpacing+ 8, 12, 2);
          }
        }
      }
    pop();
  }
  

  function mousePressed() {
    // buttons add ingredients to hot cross bun, depending on what state it is
  
    if (state == 1) { // changing dough
      if (dist(mouseX,mouseY,buttons.x,buttons.y+buttons.yTick) <= buttons.tickOuter/2) {
        state = 2; // tick button moves to next state
  
        critter.isBouncing = true; //set critter bouncing
        critter.bounceYVel = - critter.bounceMaxVel; 

        // critter comments on choice of dough
        critter.speech = critter.speechDough[hotCrossBun.dough];
        critter.speechTimer = 3*fr;
  
      } else if (dist(mouseX,mouseY,buttons.x - buttons.xSpacing ,buttons.y) <= buttons.sizeOuter/2) {
        hotCrossBun.dough=0; // left option button changes dough
      } else if (dist(mouseX,mouseY,buttons.x                    ,buttons.y) <= buttons.sizeOuter/2) {
        hotCrossBun.dough=1; // middle option button changes dough
      } else if (dist(mouseX,mouseY,buttons.x + buttons.xSpacing ,buttons.y) <= buttons.sizeOuter/2) {
        hotCrossBun.dough=2; // right option button changes dough
      }
    
    } else if (state == 2) { // adding fruit or choc chip 
      if (dist(mouseX,mouseY,buttons.x,buttons.y+buttons.yTick) <= buttons.tickOuter/2) {
        state = 3; // tick button moves to next state
  
        critter.isBouncing = true; //set critter bouncing
        critter.bounceYVel = - critter.bounceMaxVel; 
        critter.smile = true;

        // critter comments on choice of filling
        critter.speech = critter.speechFilling[hotCrossBun.fcType];
        critter.speechTimer = 3*fr;
  
      } else if (dist(mouseX,mouseY,buttons.x - buttons.xSpacing ,buttons.y) <= buttons.sizeOuter/2) {
        if (hotCrossBun.fcType!=0) {
          hotCrossBun.fc = []; // blank array of fruit/chips to start over
          hotCrossBun.fcType=0; // change to currants
        } 
        for (i=0;i<5;i++) {addFruitChip(hotCrossBun);} // add 5 currants
          
      } else if (dist(mouseX,mouseY,buttons.x ,buttons.y) <= buttons.sizeOuter/2) {
        if (hotCrossBun.fcType!=1) {
          hotCrossBun.fc = []; // blank array of fruit/chips to start over
          hotCrossBun.fcType=1; // change to cranberries
        } 
        for (i=0;i<2;i++) {addFruitChip(hotCrossBun);} // add 2 cranberries
  
      } else if (dist(mouseX,mouseY,buttons.x + buttons.xSpacing ,buttons.y) <= buttons.sizeOuter/2) {
        if (hotCrossBun.fcType!=2) {
          hotCrossBun.fc = []; // blank array of fruit/chips to start over
          hotCrossBun.fcType=2; // change to chioc chips
        } 
        for (i=0;i<3;i++) {addFruitChip(hotCrossBun);} // add 3 choc chips
      }
    }
    else if (state == 3) { // adding sprinkles or a hot cross
      if (dist(mouseX,mouseY,buttons.x,buttons.y+buttons.yTick) <= buttons.tickOuter/2) {
        
        state = 4; // tick button moves to next state
        hotCrossBun.isBaking = true; // commence baking routine

        critter.isBouncing = true; //set critter bouncing
        critter.bounceYVel = - critter.bounceMaxVel; 
        
        // critter comments on choice of topping
        if (hotCrossBun.topSugar)
        {
          critter.speech = critter.speechTopping[2];
          critter.speechTimer = 3*fr;
        } else if (hotCrossBun.topCnut) {
          critter.speech = critter.speechTopping[1];
          critter.speechTimer = 3*fr;
        } else if (hotCrossBun.topHC) {
          critter.speech = critter.speechTopping[0];
          critter.speechTimer = 3*fr;
        } else { critter.speech = ""; }      
           
      } else if (dist(mouseX,mouseY,buttons.x - buttons.xSpacing ,buttons.y) <= buttons.sizeOuter/2) {
        hotCrossBun.topHC = !hotCrossBun.topHC; // toggle hot cross off or on
  
      } else if (dist(mouseX,mouseY,buttons.x                    ,buttons.y) <= buttons.sizeOuter/2) {
        if (hotCrossBun.topCnut == false) {
          hotCrossBun.topCnut = true; // turn on coconut
          addCoconutSprinkles(hotCrossBun);
          hotCrossBun.topSugar = false; // turn off sugar if it is on
          hotCrossBun.sugar = [] ;
        }
      } else if (dist(mouseX,mouseY,buttons.x + buttons.xSpacing ,buttons.y) <= buttons.sizeOuter/2) {
        if (hotCrossBun.topSugar == false) {
          hotCrossBun.topSugar = true; // turn on sugar
          addIcingSugarDust(hotCrossBun);
          hotCrossBun.topCnut = false; // turn off coconut if it is on
          hotCrossBun.cn = [] ;
        }
      }
    }
    else if (state == 4) {
      if ((dist(mouseX,mouseY,buttons.x,buttons.y+buttons.yTick) <= buttons.tickOuter/2)
        && hotCrossBun.isBaking == false) {
        
        critter.speechTimer = 0; // turn off any speech in progress
        critter.speech = "";
        critter.look = 3; // critter closes eyes
        critter.smile = false;
        
        state = 5; // tick button moves to next state
      }
    }
  
  }