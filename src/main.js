import keyboard from "./keyboard";

import renderSystem from "./systems/render";
import physicsSystem from "./systems/physics";
import playerSystem from "./systems/player";
import npcSystem from "./systems/npc";

import {
  positionComponent,
  colorComponent,
  speedComponent,
  renderComponent,
  shapeComponent,
  physicsComponent
} from "./components";

const entities = [
  {
    id: "player",
    components: {
      ...positionComponent({ x: 40, y: 95 }),
      ...speedComponent({ speed: 3 }),
      ...shapeComponent({ width: 90, height: 15 }),
      ...physicsComponent({ velocity: { x: 0, y: 0 } }),
      ...colorComponent(),
      ...renderComponent()
    }
  },

  {
    id: "ball",
    components: {
      ...positionComponent({ x: 50, y: 50 }),
      ...shapeComponent({ width: 15, height: 15 }),
      ...physicsComponent({ velocity: { x: 2, y: 2 } }),
      ...colorComponent(),
      ...renderComponent()
    }
  },

  {
    id: "npc",
    components: {
      ...positionComponent({ x: 40, y: 10 }),
      ...speedComponent({ speed: 3 }),
      ...shapeComponent({ width: 90, height: 15 }),
      ...physicsComponent({ velocity: { x: 0, y: 0 } }),
      ...colorComponent(),
      ...renderComponent()
    }
  }
];

const systems = [physicsSystem, npcSystem, playerSystem, renderSystem];

const gameLoop = () => {
  for (const system of systems) {
    system(entities);
  }

  requestAnimationFrame(gameLoop);
};

// Kick everything off
gameLoop();
