let previousInstruction;
let thisImage;
function drawMessage(textForMessage, thisInstructionStage, anyKeyBool = false) {
  //textForMessage: the text to draw
  //anyKeyBool: <true|false> whether or not to draw "press any key to continue"
  var border = 10;
  var width = 500;
  var height = 300;
  var positionX = windowWidth / 2 - width / 2;
  var positionY = windowHeight / 2 - height / 2;

  if (textForMessage.startsWith("image")) {
    thisInstruction = textForMessage.slice(6);
    thisInstruction = thisInstruction.split(" ");
    if (previousInstruction != thisInstructionStage) {
      thisImage = loadImage(thisInstruction[0]);
      previousInstruction = thisInstructionStage;
    }
    image(
      thisImage,
      windowWidth / 2 - parseInt(thisInstruction[1]) / 2,
      windowHeight / 2 - parseInt(thisInstruction[2]) / 2,
      parseInt(thisInstruction[1]),
      parseInt(thisInstruction[2])
    );

    //rect(0, 0, 100, 100);
  } else if (textForMessage.startsWith("description")) {
    thisInstruction = textForMessage.slice(12);
    thisInstruction = customSplit(thisInstruction, " ", 3);
    if (previousInstruction != thisInstructionStage) {
      thisImage = loadImage(thisInstruction[0]);
      previousInstruction = thisInstructionStage;
    }
    image(
      thisImage,
      windowWidth / 2 - parseInt(thisInstruction[1]) / 2,
      windowHeight / 2 - 250,
      parseInt(thisInstruction[1]),
      parseInt(thisInstruction[2])
    );
    var width = parseInt(thisInstruction[1]);
    if (width < 500) {
      width = 500;
    }
    var height = parseInt(thisInstruction[2]);
    noFill();
    strokeWeight(3);
    rect(
      windowWidth / 2 - width / 2 - 10,
      windowHeight / 2 - 260,
      width + 20,
      height + 200
    );
    strokeWeight(1);
    fill(0);
    textSize(18);
    text(
      thisInstruction[3],
      windowWidth / 2 - width / 2,
      windowHeight / 2 - 240 + height,
      width,
      height
    );
  } else {
    noFill();
    stroke(0);
    strokeWeight(3);
    rect(positionX, positionY, width, height); //draw the rectangle for the instrudtions

    strokeWeight(1); //reset stroke weight to default
    fill(0); //reset fill for text
    textSize(18);
    text(
      textForMessage,
      positionX + border,
      positionY + border, //I guess the position for text is the top left corner too...
      width - 2 * border,
      height - 2 * border
    );

    if (anyKeyBool) {
      stroke(255);
      fill(255);
      const continueString = "Press any key to continue";
      var width2 = textWidth(continueString);
      text(
        continueString,
        positionX + width / 2 - width2 / 2,
        positionY + height / 2 + 100
      );
    }
  }
}

function drawImage(img, width, height) {
  var border = 10;
  var positionX = 0;
  var positionY = windowHeight - height;
  image(img, positionX, positionY, width, height);
}

function incrimentTimer() {
  timeElapsed += 0.05;
}

function customSplit(str, separator, limit) {
  str = str.split(separator);

  if (str.length > limit) {
    var ret = str.splice(0, limit);
    ret.push(str.join(separator));

    return ret;
  }

  return str;
}
