function isCollided(ball, thing) {
  //this is SUPER not efficient, but oh well. We can fix it later
  ///..or not, it's whatever
  if (thing instanceof target) {
    //edit this because the image is indexed at the top left corner, not the center
    if (ball.position.dist(thing.position) < ball.radius + thing.radius) {
      ball.changePosition(thing.position);
      return true;
    } else {
      return false;
    }
  } else if (thing instanceof wall) {
    if (
      thing.x < ballPosition.x - ball.radius &&
      thing.x + thing.width > ballPosition.x + ball.radius
    ) {
      if (thing.type == TOP) {
        if (
          ballPosition.y - ball.radius < thing.height &&
          ballPosition.y - ball.radius > 0
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          ballPosition.y + ball.radius > windowHeight - thing.height &&
          ballPosition.y + ball.radius < windowHeight
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
}
