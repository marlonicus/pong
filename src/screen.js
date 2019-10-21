const screen = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.onresize = () => {
  screen.width = window.innerWidth;
  screen.height = window.innerHeight;
};

export default screen;
