const keysPressed = {
  left: false,
  right: false
};

document.addEventListener("keydown", event => {
  if (event.keyCode == 37) {
    keysPressed.left = true;
  } else if (event.keyCode == 39) {
    keysPressed.right = true;
  }
});

document.addEventListener("keyup", event => {
  if (event.keyCode == 37) {
    keysPressed.left = false;
  } else if (event.keyCode == 39) {
    keysPressed.right = false;
  }
});

export default keysPressed;
