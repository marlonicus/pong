import screen from "../screen";

const playerSystem = entities => {
  const ball = entities.find(({ id }) => id === "ball");

  for (const entity of entities) {
    if (entity.id === "npc") {
      if (
        ball.components["position"].x <
        entity.components["position"].x + entity.components["shape"].width / 2
      ) {
        entity.components["physics"].velocity.x = -entity.components["speed"]
          .speed;
      } else if (
        ball.components["position"].x >
        entity.components["position"].x + entity.components["shape"].width / 2
      ) {
        entity.components["physics"].velocity.x =
          entity.components["speed"].speed;
      } else {
        entity.components["physics"].velocity.x = 0;
      }

      entity.components["position"].x = Math.min(
        screen.width - entity.components["shape"].width,
        Math.max(0, entity.components["position"].x)
      );

      entity.components["position"].y = 20;
    }
  }
};

export default playerSystem;
