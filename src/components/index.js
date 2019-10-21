export const positionComponent = ({ x = 0, y = 0 } = {}) => ({
  position: {
    x,
    y
  }
});

export const physicsComponent = ({ velocity = { x: 0, y: 0 } } = {}) => ({
  physics: {
    velocity
  }
});

export const speedComponent = ({ speed } = {}) => ({
  speed: {
    speed
  }
});

export const colorComponent = ({ hex = "#000" } = {}) => ({
  color: {
    hex
  }
});

export const renderComponent = () => ({
  render: {
    rendered: false
  }
});

export const shapeComponent = ({ width, height }) => ({
  shape: {
    width,
    height
  }
});
