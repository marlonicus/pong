import screen from "../screen";
import keyboard from "../keyboard";

const playerSystem = entities => {
  for (const entity of entities) {
    if (entity.id === "player") {
      if (keyboard.left) {
        entity.components["physics"].velocity.x = -entity.components["speed"]
          .speed;
      } else if (keyboard.right) {
        entity.components["physics"].velocity.x =
          entity.components["speed"].speed;
      } else {
        entity.components["physics"].velocity.x = 0;
      }

      entity.components["position"].x = Math.min(
        screen.width - entity.components["shape"].width,
        Math.max(0, entity.components["position"].x)
      );

      entity.components["position"].y =
        screen.height - entity.components["shape"].height - 20;
    }
  }
};

export default playerSystem;
