// hot cross bun functions

function initHotCrossBun () {

    hotCrossBun = {
        
        // state 1 dough type
        topShape: shapeHotCrossBun(), // create random hot cross bun shape for bottom
        botShape: shapeHotCrossBun(), // create random hot cross bun shape for bottom
        dough: 2, // dough type 0 vanilla 1 cinnamon 2 chocolate
        dPal: [
          color('#E8D4C1'),  // vanilla dough
          color('#F9C49A'),  // cinnamon
          color('#9C5C41')   // chocolate
          ],
        dsPal: [
          color('#C8B4A1'),  // vanilla dough stroke
          color('#D9A47A'),  // cinnamon
          color('#7C3C21')   // chocolate
          ],
        dtPal: color('#FFFFFF'), // topping start white
  
        // state 2 fruit or choc chip filling
        fcType: 1, // fruit/chip type 0 currants 1 cranberries 2 choc chip
        fc: [], // array to hold coords of fruit locations

        // state 3 topping
        topHC: true, // hot cross topping on by default
        topCnut: false, // coconut sprinkles
        cn: [], // array to hold coords of coconut
        topSugar: false, // icing sugar dust
        sugar: [], // array to hold coords of icing sugar dust

        // state 4 baking
        rawHeight: 18,  // offset between bottom and top before baking
        bakedHeight: 6,  // additional offset between bottom and top after baking
        isBaking: false, // switch for when baking sequence starts
        rise: 0, // to track offset during baking
        bPal: [
          color('#FFB461'),  // vanilla dough
          color('#FFB46A'),  // cinnamon
          color('#AC5C31')   // chocolate
          ],
        bsPal: [
          color('#E8A461'),  // vanilla dough stroke
          color('#E9A46A'),  // cinnamon
          color('#8C3C11')   // chocolate
          ],
        btPal: color('#FFFFF6'), // topping bake to off-white

        // state 5 position and velocity
        x: 3*width/4, // location on screen
        y: 1.04*height/1.9,
        yvel: 0,  // velocity when falling
        falling: false, // falling or landed
        ydrop: height, // final y value after dropped

      }
    
      // hotCrossBun.botShape = 
      // hotCrossBun.topShape = shapeHotCrossBun(); // create random hot cross bun shape for top
   
   
}

function shapeHotCrossBun () {
    // generate a randomly shaped top and bottom of a hot cross bun
    // and store it in the hcb object variables

    var vTemp = createVector(50,0);
    var hShape = [];
    var pts = 16;
    for (i = 0 ; i < pts; i++) {
        vIrreg = createVector(random(2),random(7));
        hShape.push(createVector(vTemp.x+vIrreg.x,0.7*vTemp.y+vIrreg.y));
        vTemp.rotate(2*PI/pts);
    } 
    return hShape;
    //print(hShape);
}

function addFruitChip (hcb) {
    // generate locations of fruit pieces or choc chips
    let vTemp = createVector(30+random(17));
    vTemp.rotate(PI*random());
    hcb.fc.push(createVector(vTemp.x, 0.7*vTemp.y));
}

function addCoconutSprinkles (hcb) {
    // generate locations of coconut sprinkles
    for (i = 0; i < 50; i++) {
        let vTemp = createVector(random(40));
        vTemp.rotate(2*PI*random());
        hcb.cn.push(createVector(vTemp.x, 0.7*vTemp.y + 3));
    }
}

function addIcingSugarDust (hcb) {
    // generate locations of icing sugar
    for (i = 0; i < 400; i++) {
        let vTemp = createVector(random(45));
        vTemp.rotate(2*PI*random());
        hcb.sugar.push(createVector(vTemp.x, 0.7*vTemp.y + 3));
    }
}


function drawHotCrossBun (hcb) {
    // hot cross bun
    push();
  
      translate(hcb.x,hcb.y);
  
      scale(2.0, 2.0);
  
      // bun
      fill(hcb.dPal[hcb.dough]); //dough
      stroke(hcb.dsPal[hcb.dough]); //dough edge
      strokeWeight(5);
      
      // base 
      beginShape();
        curveVertex(hcb.botShape[0].x,hcb.botShape[0].y);
        for (i = 0 ; i < hcb.botShape.length; i++) {
          curveVertex(hcb.botShape[i].x,hcb.botShape[i].y);
        }
        curveVertex(hcb.botShape[0].x,hcb.botShape[0].y);
        curveVertex(hcb.botShape[0].x,hcb.botShape[0].y);
      endShape();
      
  
      // fruit or chips appear from state 2 onward
      if (state >= 2) {
        push();
          noStroke();
          if (hcb.fcType == 0) { 
            fill(0); // black currants
            for (i = 0 ; i < hcb.fc.length ; i++)
              ellipse(hcb.fc[i].x,hcb.fc[i].y,3);

          } else if (hcb.fcType == 1) { // cranberries
            fill(220,0,70); // cranberries
            for (i = 0 ; i < hcb.fc.length ; i++)
              ellipse(hcb.fc[i].x,hcb.fc[i].y,6);

          } else if (hcb.fcType == 2) { 
            fill("#290001"); // choc chips
            for (i = 0 ; i < hcb.fc.length ; i++) {
              chipAngle = createVector(1,0).angleBetween(hcb.fc[i]);
              arc(hcb.fc[i].x,hcb.fc[i].y,6,6,
                chipAngle-PI/2,chipAngle+PI/2);
            }
          }
        pop();
      }
  
      // top

      // if baking then change colour gradually
      if (state == 4) {  // if baked then use end colour
        fill(lerpColor(hcb.dPal[hcb.dough], hcb.bPal[hcb.dough], hcb.rise/hcb.bakedHeight)); 
        stroke(lerpColor(hcb.dsPal[hcb.dough], hcb.bsPal[hcb.dough], hcb.rise/hcb.bakedHeight)); 
      }
      else if (state >= 5) {  // if baked then use end colour
        fill(hcb.bPal[hcb.dough]); // dough
        stroke(hcb.bsPal[hcb.dough]); // dough edge
      }

      translate(0,-hcb.rawHeight - hcb.rise); // rise offset between bottom and top
      beginShape();
        curveVertex(hcb.topShape[0].x,hcb.topShape[0].y);
        for (i = 0 ; i < hcb.topShape.length; i++) {
          curveVertex(hcb.topShape[i].x,hcb.topShape[i].y);
        }
        curveVertex(hcb.topShape[0].x,hcb.topShape[0].y);
        curveVertex(hcb.topShape[0].x,hcb.topShape[0].y);
      endShape();
  
      // toppings coconut or sugar
      
      if (state >= 3) {
        topCol = hcb.dtPal; // set topping colour
        if (state >= 4) {
          topCol = hcb.btPal; // set topping colour if baked
        }
        
        if (hcb.topCnut) { 
          // coconut sprinkles
          stroke(topCol);
          strokeWeight(1.5);
          noFill();
          for (i = 1 ; i < hcb.cn.length; i++) {
            let vTemp = p5.Vector.fromAngle(hcb.cn[i].angleBetween(hcb.cn[i-1])*2,8);
            line(hcb.cn[i].x,hcb.cn[i].y,hcb.cn[i].x+vTemp.x,hcb.cn[i].y+vTemp.y);
          }
        }
  
        if (hcb.topSugar) {
          // icing sugar dust
          noStroke();
          fill(topCol);
          for (i = 0 ; i < hcb.sugar.length; i++) {
            ellipse(hcb.sugar[i].x,hcb.sugar[i].y,0.8);
          }
        }
  
        if (hcb.topHC) {
          // hot cross
          stroke(topCol);
          strokeWeight(5);
          noFill();
          arc(hcb.topShape[2].x-10,hcb.topShape[2].y-5,120,90,1.05*PI,1.5*PI);
          arc(hcb.topShape[6].x+10,hcb.topShape[6].y-5,120,90,1.5*PI,1.95*PI);
  
        }
      }
    pop();
  }

  function bakeHotCrossBun (hcb) {
    // rise the hot cross bun a little each frame
    hcb.rise += (0.8+hcb.rise) * hcb.bakedHeight / (fr * 2.5);  // baking accelerates
    if (hcb.rise >= hcb.bakedHeight) {
      hcb.isBaking = false;
      critter.speech = critter.speechBaked;
      critter.speechTimer = 3*fr;
    }
  }

  function cloneHotCrossBun (hcb) {
    // clone the finished hot cross bun, change the shape a little, and add it to the array
    let temphcb = Object.assign({}, hcb);
    temphcb.botShape = shapeHotCrossBun(); 
    temphcb.topShape = shapeHotCrossBun();

    // turn off sugar sometimes because drawing lots of sugar hurts performance
    if (random() > 0.3) {temphcb.topSugar = false;}  
   
    temphcb.x = random(width);
    temphcb.y = 1;
    temphcb.falling = true;
    temphcb.ydrop = (1-hcbArray.length/hcbCount)*3/4*height + random(height/4);
    
    hcbArray.push(temphcb);
  }

  function dropHotCrossBun (hcb) {
    // hot cross bun accelerates as it falls and then lands at the bottom
    hcb.yvel += 5;
    hcb.y += hcb.yvel;
    if (hcb.y > hcb.ydrop) {
      hcb.falling= false;
      hcb.yvel = 0;
    }
  }

