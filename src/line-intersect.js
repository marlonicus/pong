export default (x1, y1, x2, y2, x3, y3, x4, y4, d) => {
  var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom != 0) {
    var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    if (ua >= 0 && ua <= 1) {
      var ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
      if (ub >= 0 && ub <= 1) {
        var x = x1 + ua * (x2 - x1);
        var y = y1 + ua * (y2 - y1);
        return { x: x, y: y, d: d };
      }
    }
  }
  return null;
};
