//this is used to prevent the game from running a stage that doesn't exist
maxStage = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //the stage number is initalized to zero
  constructorRun = false;
}

function draw() {
  background(135, 206, 250);
  switch (stageNumber) {
    case 1:
      //run the constructor for stage one if it hasn't been run
      if (!constructorRun) {
        stage1Constructor();
        constructorRun = true;
      }
      //then draw the stage
      drawStage1();
      break;
    case 2:
      break;
    case 3:
      break;
    /*
        ...
      */
    default:
  }
}

function windowResized() {
  //this handles the resizing of the window
  resizeCanvas(windowWidth, windowHeight);
}

function incrimentStage() {
  if (stageNumber == maxStage) {
    return;
  }

  stageNumber++;
  constructorRun = false;
}
