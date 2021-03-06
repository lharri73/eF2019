function stage2Constructor() {
  //The constructor for the stage
  instructionStage = 2;
  maxInstruction = instructions[stageNumber].length;
  equationImage = loadImage("images/eqns/velocity_eqn.jpg");

  initialPosition = createVector(
    floor(random(10, 50)),
    random(80, windowHeight - 80)
  );

  targetPosition = createVector(windowWidth - 50, initialPosition.y);

  thisBall = new ball(initialPosition, createVector(0, 0), createVector(0, 0));
  thisTarget = new target(targetPosition);

  timerIsActive = false;
  timeElapsed = 0.0;

  //----------------------------------------------------------------------------
  //this creates the textBox in the middle of the screen
  //its contents are returned from the textBox.value() function
  textSize(20); //font size
  textBox = createInput();
  textBox.style("color", "#ffffff"); //text color
  textBox.style("background-color", backgroundColor.toString()); //background color
  textBox.style("border", "2px solid #ffffff"); //border styling
  textBox.attribute("type", "number");
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
  textBox.size(300, textAscent()); //size of the textbox

  //----------------------------------------------------------------------------
  //initialize game values
  versionID = int(random(0, 3)); //will generate a value between 0 and 2
  //random will return numbers between 0 and 2.9999999999, but never 3

  stage2Time = roundToFixed(random(3, 10), 2);
  stage2DispA =
    thisBall.position.dist(thisTarget.position) -
    thisTarget.radius -
    thisBall.radius;
  stage2Disp = roundToFixed(stage2DispA, 2);
  stage2Velocity = roundToFixed(stage2Disp / stage2Time, 2);

  if (DEBUG) {
    switch (versionID) {
      case 0: //time, disp, vel
        console.log(stage2Time);
        break;
      case 1:
        console.log(stage2Disp);
        break;
      case 2:
        console.log(stage2Velocity);
        break;
    }
  }
}

function drawStage2() {
  //the draw function, called every frame

  if (instructionStage >= instructions[stageNumber].length) {
    stage2LoopAndCheck();
  }

  if (instructionStage < maxInstruction) {
    drawMessage(
      instructions[stageNumber][instructionStage],
      instructionStage,
      true
    );
  }

  if (timerIsActive) {
    drawTimer();
  }

  function stage2LoopAndCheck() {
    drawObjectivesStage2();
    drawImageStage2();
    thisTarget.draw();
    thisBall.update();
    thisBall.draw();
    if (isCollided(thisBall, thisTarget)) {
      thisBall.isActive = false;
      clearInterval(timer);
      timerIsActive = false;
      instructionStage = 1;
    }
  }
}

function drawObjectivesStage2() {
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(0, 0, 200, 75);

  strokeWeight(1);
  fill(0);
  textSize(12);
  /*IDs:
   *  0: given displacement and velocity, solve for time
   *  1: given time and velocity, solve for displacement
   *  2: given displacement and time, solve for velocity
   */
  switch (versionID) {
    case 0:
      text("Displacement: " + stage2Disp + "m", 10, textAscent() + 10);
      text("Velocity    : " + stage2Velocity + "m/s", 10, textAscent() * 2 + 15);
      text("Time        : ?", 10, textAscent() * 3 + 20);
      break;
    case 1:
      text("Displacement: ?", 10, textAscent() + 10);
      text("Velocity    : " + stage2Velocity + "m/s", 10, textAscent() * 2 + 15);
      text("Time        : " + stage2Time + "s", 10, textAscent() * 3 + 20);
      break;
    case 2:
      text("Displacement: " + stage2Disp + "m", 10, textAscent() + 10);
      text("Velocity    : ?", 10, textAscent() * 2 + 15);
      text("Time        : " + stage2Time + "s", 10, textAscent() * 3 + 20);
      break;
  }
  textSize(20);
}

function drawImageStage2() {
  drawImage(equationImage, 100, 100);
}

function stage2KeyPressed(value) {
  if (instructionStage > maxInstruction) {
    switch (value) {
      case 32: //32 = space
        break;
      case 13: //13 = Enter
        if (!thisBall.isActive) {
          enteredValue = parseFloat(textBox.value());
          switch (versionID) {
            case 0:
              if (stage2Time == enteredValue) {
                textBox.attribute("hidden", true);
                thisBall.velocity = createVector(stage2Velocity, 0);
                thisBall.isActive = true;
                timerIsActive = true;
                timer = setInterval(incrimentTimer, 50);
              } else {
                instructionStage = 0;
              }
              break;
            case 1:
              if (stage2Disp == enteredValue) {
                textBox.attribute("hidden", true);
                thisBall.velocity = createVector(stage2Velocity, 0);
                thisBall.isActive = true;
                timerIsActive = true;
                timer = setInterval(incrimentTimer, 50);
              } else {
                instructionStage = 0;
              }
              break;
            case 2:
              if (stage2Velocity == enteredValue) {
                textBox.attribute("hidden", true);
                thisBall.velocity = createVector(stage2Velocity, 0);
                thisBall.isActive = true;
                timerIsActive = true;
                timer = setInterval(incrimentTimer, 50);
              } else {
                instructionStage = 0;
              }
              break;
          }
        }
        break;
    }
    return; //don't run the next code
  }

  if (instructionStage <= maxInstruction && instructionStage > 1) {
    //catch any key and run the function if there is more instructions to show
    instructionStage++;
  }
  if (instructionStage == 1) {
    changeScore(10);
    incrimentStage();
  }
  if (instructionStage == 0) {
    changeScore(-2);
    resetStage();
  }
}

function stage2MouseClicked() {
  //executed when the mouse is clicked and we're on stage 2
}

function stage2Resized() {
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
}

function drawTimer() {
  text(roundToFixed(timeElapsed, 2), windowWidth / 2, windowHeight / 2);
}
