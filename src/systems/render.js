const cache = {};

const createElement = id => {
  const element = document.createElement("div");
  element.id = id;
  cache[id] = element;
  return element;
};

const renderSystem = entities => {
  for (const entity of entities) {
    if (!entity.components["render"]) continue;

    if (!entity.components["render"].rendered) {
      document.body.append(createElement(entity.id));
      entity.components["render"].rendered = true;
    }

    if (entity.components["shape"]) {
      cache[entity.id].style.width = `${entity.components["shape"].width}px`;
      cache[entity.id].style.height = `${entity.components["shape"].height}px`;
    }

    if (entity.components["color"]) {
      cache[entity.id].style.background = `${entity.components["color"].hex}`;
    }

    if (entity.components["position"]) {
      cache[entity.id].style.position = "absolute";
      cache[entity.id].style.left = `${entity.components["position"].x}px`;
      cache[entity.id].style.top = `${entity.components["position"].y}px`;
    }
  }
};

export default renderSystem;
