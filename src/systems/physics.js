import lineIntersect from "../line-intersect";
import screen from "../screen";

const getWidth = entity => {
  if (entity.components["shape"]) {
    return entity.components["shape"].width;
  } else if (entity.components["rect"]) {
    return entity.components["rect"].width;
  } else if (entity.components["square"]) {
    return entity.components["square"].size;
  }
};

const getHeight = entity => {
  if (entity.components["shape"]) {
    return entity.components["shape"].height;
  } else if (entity.components["rect"]) {
    return entity.components["rect"].height;
  } else if (entity.components["square"]) {
    return entity.components["square"].size;
  }
};

const boundsCheck = entity => {
  // Right bound
  if (entity.components["position"].x + getWidth(entity) >= screen.width) {
    entity.components["position"].x = screen.width - getWidth(entity);
    entity.components["physics"].velocity.x *= -1;
  }

  // Left bound
  if (entity.components["position"].x <= 0) {
    entity.components["position"].x = 0;
    entity.components["physics"].velocity.x *= -1;
  }

  // Bottom bound
  if (entity.components["position"].y + getHeight(entity) >= screen.height) {
    entity.components["position"].y = screen.height - getHeight(entity);
    entity.components["physics"].velocity.y *= -1;
  }

  // Top bound
  if (entity.components["position"].y <= 0) {
    entity.components["position"].y = 0;
    entity.components["physics"].velocity.y *= -1;
  }
};

const paddleCheck = (
  {
    components: {
      position: ballPosition,
      shape: ballShape,
      physics: { velocity: ballVelocity }
    }
  },
  {
    components: {
      position: paddlePosition,
      shape: paddleShape,
      physics: { velocity: paddleVelocity }
    }
  }
) => {
  const vertical =
    // Bottom left ball -> Top paddle
    lineIntersect(
      ballPosition.x,
      ballPosition.y + ballShape.height,
      ballPosition.x - ballVelocity.x,
      ballPosition.y + ballShape.height - ballVelocity.y,

      paddlePosition.x,
      paddlePosition.y,
      paddlePosition.x + paddleShape.width,
      paddlePosition.y,
      "bottom"
    ) ||
    // Bottom right ball -> Top paddle
    lineIntersect(
      ballPosition.x + ballShape.width,
      ballPosition.y + ballShape.height,
      ballPosition.x + ballShape.width - ballVelocity.x,
      ballPosition.y + ballShape.height - ballVelocity.y,

      paddlePosition.x,
      paddlePosition.y,
      paddlePosition.x + paddleShape.width,
      paddlePosition.y,
      "bottom"
    ) ||
    // Top left ball -> Bottom paddle
    lineIntersect(
      ballPosition.x,
      ballPosition.y,
      ballPosition.x - ballVelocity.x,
      ballPosition.y - ballVelocity.y,

      paddlePosition.x,
      paddlePosition.y + paddleShape.height,
      paddlePosition.x + paddleShape.width,
      paddlePosition.y + paddleShape.height,
      "top"
    ) ||
    // Top right ball -> Bottom paddle
    lineIntersect(
      ballPosition.x + ballShape.width,
      ballPosition.y,
      ballPosition.x + ballShape.width - ballVelocity.x,
      ballPosition.y - ballVelocity.y,

      paddlePosition.x,
      paddlePosition.y + paddleShape.height,
      paddlePosition.x + paddleShape.width,
      paddlePosition.y + paddleShape.height,
      "top"
    );

  const horizontal =
    // Top right ball -> Left paddle
    lineIntersect(
      ballPosition.x + ballShape.width,
      ballPosition.y,
      ballPosition.x + ballShape.width - ballVelocity.x,
      ballPosition.y - ballVelocity.y,

      paddlePosition.x,
      paddlePosition.y,
      paddlePosition.x,
      paddlePosition.y + paddleShape.height,
      "right"
    ) ||
    // Bottom right ball -> Left paddle
    lineIntersect(
      ballPosition.x + ballShape.width,
      ballPosition.y + ballShape.height,
      ballPosition.x + ballShape.width - ballVelocity.x,
      ballPosition.y + ballShape.height - ballVelocity.y,

      paddlePosition.x,
      paddlePosition.y,
      paddlePosition.x,
      paddlePosition.y + paddleShape.height,
      "right"
    ) ||
    // Top left ball -> Right paddle
    lineIntersect(
      ballPosition.x,
      ballPosition.y,
      ballPosition.x - ballVelocity.x,
      ballPosition.y - ballVelocity.y,

      paddlePosition.x + paddlePosition.width,
      paddlePosition.y,
      paddlePosition.x + paddlePosition.width,
      paddlePosition.y + paddleShape.height,
      "left"
    ) ||
    // Bottom left ball -> Right paddle
    lineIntersect(
      ballPosition.x,
      ballPosition.y + ballShape.height,
      ballPosition.x - ballVelocity.x,
      ballPosition.y + ballShape.height - ballVelocity.y,

      paddlePosition.x + paddlePosition.width,
      paddlePosition.y,
      paddlePosition.x + paddlePosition.width,
      paddlePosition.y + paddleShape.height,
      "left"
    );

    horizontal && console.log(horizontal);

  return {
    vertical,
    horizontal
  };
};

const ballPaddleCollision = (ballEntity, paddleEntity) => {
  boundsCheck(ballEntity);

  const ballCollision = paddleCheck(ballEntity, paddleEntity);

  if (ballCollision.vertical) {
    const ballVerticalOffset =
      ballCollision.vertical.d === "bottom" ? getHeight(ballEntity) : 0;
    ballEntity.components["position"].y =
      ballCollision.vertical.y - ballVerticalOffset;

    ballEntity.components["physics"].velocity.y *= -1;
  }

  if (ballCollision.horizontal) {
    const ballHorizontalOffset =
      ballCollision.horizontal.d === "right" ? getWidth(ballEntity) : 0;

    ballEntity.components["position"].x =
      ballCollision.horizontal.x - ballHorizontalOffset;

    ballEntity.components["physics"].velocity.x *= -1;
  }
};

const physicsSystem = entities => {
  for (const entity of entities) {
    if (entity.components["physics"] && entity.components["position"]) {
      entity.components["position"].x +=
        entity.components["physics"].velocity.x;
      entity.components["position"].y +=
        entity.components["physics"].velocity.y;
    }
  }

  const ballEntity = entities.find(({ id }) => id === "ball");
  const targetPaddleId =
    ballEntity.components["physics"].velocity.y > 0 ? "player" : "npc";
  const targetPaddleEntity = entities.find(({ id }) => id === targetPaddleId);

  ballPaddleCollision(ballEntity, targetPaddleEntity);
};

export default physicsSystem;
