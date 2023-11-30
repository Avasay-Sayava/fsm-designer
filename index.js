/*
  Finite State Machine Designer (https://madebyevan.com/fsm/)
  License: MIT License (see below)

  Copyright (c) 2010 Evan Wallace

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
 */

// Opera 8.0+
var isOpera =
  (!!window.opr && !!opr.addons) ||
  !!window.opera ||
  navigator.userAgent.indexOf(" OPR/") >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== "undefined";

// Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
  })(
    !window["safari"] ||
      (typeof safari !== "undefined" && window["safari"].pushNotification)
  );

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/ false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
var isChrome =
  !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Edge (based on chromium) detection
var isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;

function Link(a, b) {
  this.nodeA = a;
  this.nodeB = b;
  this.text = "";
  this.lineAngleAdjust = 0; // value to add to textAngle when link is straight line

  // make anchor point relative to the locations of nodeA and nodeB
  this.parallelPart = 0.5; // percentage from nodeA to nodeB
  this.perpendicularPart = 0; // pixels from line between nodeA and nodeB
}

Link.prototype.getAnchorPoint = function () {
  var dx = this.nodeB.x - this.nodeA.x;
  var dy = this.nodeB.y - this.nodeA.y;
  var scale = Math.sqrt(dx * dx + dy * dy);
  return {
    x:
      this.nodeA.x +
      dx * this.parallelPart -
      (dy * this.perpendicularPart) / scale,
    y:
      this.nodeA.y +
      dy * this.parallelPart +
      (dx * this.perpendicularPart) / scale,
  };
};

Link.prototype.setAnchorPoint = function (x, y) {
  var dx = this.nodeB.x - this.nodeA.x;
  var dy = this.nodeB.y - this.nodeA.y;
  var scale = Math.sqrt(dx * dx + dy * dy);
  this.parallelPart =
    (dx * (x - this.nodeA.x) + dy * (y - this.nodeA.y)) / (scale * scale);
  this.perpendicularPart =
    (dx * (y - this.nodeA.y) - dy * (x - this.nodeA.x)) / scale;
  // snap to a straight line
  if (
    this.parallelPart > 0 &&
    this.parallelPart < 1 &&
    Math.abs(this.perpendicularPart) < snapToPadding
  ) {
    this.lineAngleAdjust = (this.perpendicularPart < 0) * Math.PI;
    this.perpendicularPart = 0;
  }
};

Link.prototype.getEndPointsAndCircle = function () {
  if (this.perpendicularPart == 0) {
    var midX = (this.nodeA.x + this.nodeB.x) / 2;
    var midY = (this.nodeA.y + this.nodeB.y) / 2;
    var start = this.nodeA.closestPointOnCircle(midX, midY);
    var end = this.nodeB.closestPointOnCircle(midX, midY);
    return {
      hasCircle: false,
      startX: start.x,
      startY: start.y,
      endX: end.x,
      endY: end.y,
    };
  }
  var anchor = this.getAnchorPoint();
  var circle = circleFromThreePoints(
    this.nodeA.x,
    this.nodeA.y,
    this.nodeB.x,
    this.nodeB.y,
    anchor.x,
    anchor.y
  );
  var isReversed = this.perpendicularPart > 0;
  var reverseScale = isReversed ? 1 : -1;
  var startAngle =
    Math.atan2(this.nodeA.y - circle.y, this.nodeA.x - circle.x) -
    (reverseScale * nodeRadius) / circle.radius;
  var endAngle =
    Math.atan2(this.nodeB.y - circle.y, this.nodeB.x - circle.x) +
    (reverseScale * nodeRadius) / circle.radius;
  var startX = circle.x + circle.radius * Math.cos(startAngle);
  var startY = circle.y + circle.radius * Math.sin(startAngle);
  var endX = circle.x + circle.radius * Math.cos(endAngle);
  var endY = circle.y + circle.radius * Math.sin(endAngle);
  return {
    hasCircle: true,
    startX: startX,
    startY: startY,
    endX: endX,
    endY: endY,
    startAngle: startAngle,
    endAngle: endAngle,
    circleX: circle.x,
    circleY: circle.y,
    circleRadius: circle.radius,
    reverseScale: reverseScale,
    isReversed: isReversed,
  };
};

Link.prototype.draw = function (c) {
  var stuff = this.getEndPointsAndCircle();
  // draw arc
  c.beginPath();
  if (stuff.hasCircle) {
    c.arc(
      stuff.circleX,
      stuff.circleY,
      stuff.circleRadius,
      stuff.startAngle,
      stuff.endAngle,
      stuff.isReversed
    );
  } else {
    c.moveTo(stuff.startX, stuff.startY);
    c.lineTo(stuff.endX, stuff.endY);
  }
  c.stroke();
  // draw the head of the arrow
  if (stuff.hasCircle) {
    drawArrow(
      c,
      stuff.endX,
      stuff.endY,
      stuff.endAngle - stuff.reverseScale * (Math.PI / 2)
    );
  } else {
    drawArrow(
      c,
      stuff.endX,
      stuff.endY,
      Math.atan2(stuff.endY - stuff.startY, stuff.endX - stuff.startX)
    );
  }
  // draw the text
  if (stuff.hasCircle) {
    var startAngle = stuff.startAngle;
    var endAngle = stuff.endAngle;
    if (endAngle < startAngle) {
      endAngle += Math.PI * 2;
    }
    var textAngle = (startAngle + endAngle) / 2 + stuff.isReversed * Math.PI;
    var textX = stuff.circleX + stuff.circleRadius * Math.cos(textAngle);
    var textY = stuff.circleY + stuff.circleRadius * Math.sin(textAngle);
    drawMultilineText(
      c,
      this.text,
      textX,
      textY,
      textAngle,
      inArr(this, selectedObjects)
    );
  } else {
    var textX = (stuff.startX + stuff.endX) / 2;
    var textY = (stuff.startY + stuff.endY) / 2;
    var textAngle = Math.atan2(
      stuff.endX - stuff.startX,
      stuff.startY - stuff.endY
    );
    drawMultilineText(
      c,
      this.text,
      textX,
      textY,
      textAngle + this.lineAngleAdjust,
      inArr(this, selectedObjects)
    );
  }
};

Link.prototype.containsPoint = function (x, y) {
  var stuff = this.getEndPointsAndCircle();
  if (stuff.hasCircle) {
    var dx = x - stuff.circleX;
    var dy = y - stuff.circleY;
    var distance = Math.sqrt(dx * dx + dy * dy) - stuff.circleRadius;
    if (Math.abs(distance) < hitTargetPadding) {
      var angle = Math.atan2(dy, dx);
      var startAngle = stuff.startAngle;
      var endAngle = stuff.endAngle;
      if (stuff.isReversed) {
        var temp = startAngle;
        startAngle = endAngle;
        endAngle = temp;
      }
      if (endAngle < startAngle) {
        endAngle += Math.PI * 2;
      }
      if (angle < startAngle) {
        angle += Math.PI * 2;
      } else if (angle > endAngle) {
        angle -= Math.PI * 2;
      }
      return angle > startAngle && angle < endAngle;
    }
  } else {
    var dx = stuff.endX - stuff.startX;
    var dy = stuff.endY - stuff.startY;
    var length = Math.sqrt(dx * dx + dy * dy);
    var percent =
      (dx * (x - stuff.startX) + dy * (y - stuff.startY)) / (length * length);
    var distance = (dx * (y - stuff.startY) - dy * (x - stuff.startX)) / length;
    return percent > 0 && percent < 1 && Math.abs(distance) < hitTargetPadding;
  }
  return false;
};

function Node(x, y) {
  this.parent = null;
  this.x = x;
  this.y = y;
  this.mouseOffsetX = 0;
  this.mouseOffsetY = 0;
  this.isAcceptState = false;
  this.text = "";
  this.textOnly = false;
  this.runtimeColor = null;
}

Node.prototype.setMouseStart = function (x, y) {
  this.mouseOffsetX = this.x - x;
  this.mouseOffsetY = this.y - y;
};

Node.prototype.setAnchorPoint = function (x, y) {
  this.x = x + this.mouseOffsetX;
  this.y = y + this.mouseOffsetY;
};

Node.prototype.draw = function (c) {
  c.strokeStyle = c.fillStyle = this.runtimeColor ?? this.fillStyle;
  if (this.textOnly) {
    drawMultilineText(
      c,
      this.text,
      this.x,
      this.y,
      null,
      inArr(this, selectedObjects)
    );
    if (this != selectObject(mouseX, mouseY) && !inArr(this, selectedObjects))
      return;
    c.strokeStyle =
      this.runtimeColor ?? inArr(this, selectedObjects)
        ? "rgba(0, 0, 255, 0.3)"
        : "rgba(0, 0, 0, 0.3)";
  }

  // draw the circle
  c.beginPath();
  c.arc(this.x, this.y, nodeRadius, 0, 2 * Math.PI, false);
  c.stroke();

  if (!this.textOnly)
    // draw the text
    drawMultilineText(
      c,
      this.text,
      this.x,
      this.y,
      null,
      inArr(this, selectedObjects)
    );

  // draw a double circle for an accept state
  if (this.isAcceptState) {
    c.beginPath();
    c.arc(this.x, this.y, nodeRadius - 6, 0, 2 * Math.PI, false);
    c.stroke();
  }
};

Node.prototype.closestPointOnCircle = function (x, y) {
  var dx = x - this.x;
  var dy = y - this.y;
  var scale = Math.sqrt(dx * dx + dy * dy);
  return {
    x: this.x + (dx * nodeRadius) / scale,
    y: this.y + (dy * nodeRadius) / scale,
  };
};

Node.prototype.containsPoint = function (x, y) {
  return (
    (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <
    nodeRadius * nodeRadius
  );
};

function SelfLink(node, mouse) {
  this.node = node;
  this.anchorAngle = 0;
  this.mouseOffsetAngle = 0;
  this.text = "";

  if (mouse) {
    this.setAnchorPoint(mouse.x, mouse.y);
  }
}

SelfLink.prototype.setMouseStart = function (x, y) {
  this.mouseOffsetAngle =
    this.anchorAngle - Math.atan2(y - this.node.y, x - this.node.x);
};

SelfLink.prototype.setAnchorPoint = function (x, y) {
  this.anchorAngle =
    Math.atan2(y - this.node.y, x - this.node.x) + this.mouseOffsetAngle;
  // snap to 90 degrees
  var snap = Math.round(this.anchorAngle / (Math.PI / 2)) * (Math.PI / 2);
  if (Math.abs(this.anchorAngle - snap) < 0.1) this.anchorAngle = snap;
  // keep in the range -pi to pi so our containsPoint() function always works
  if (this.anchorAngle < -Math.PI) this.anchorAngle += 2 * Math.PI;
  if (this.anchorAngle > Math.PI) this.anchorAngle -= 2 * Math.PI;
};

SelfLink.prototype.getEndPointsAndCircle = function () {
  var circleX = this.node.x + 1.5 * nodeRadius * Math.cos(this.anchorAngle);
  var circleY = this.node.y + 1.5 * nodeRadius * Math.sin(this.anchorAngle);
  var circleRadius = 0.75 * nodeRadius;
  var startAngle = this.anchorAngle - Math.PI * 0.8;
  var endAngle = this.anchorAngle + Math.PI * 0.8;
  var startX = circleX + circleRadius * Math.cos(startAngle);
  var startY = circleY + circleRadius * Math.sin(startAngle);
  var endX = circleX + circleRadius * Math.cos(endAngle);
  var endY = circleY + circleRadius * Math.sin(endAngle);
  return {
    hasCircle: true,
    startX: startX,
    startY: startY,
    endX: endX,
    endY: endY,
    startAngle: startAngle,
    endAngle: endAngle,
    circleX: circleX,
    circleY: circleY,
    circleRadius: circleRadius,
  };
};

SelfLink.prototype.draw = function (c) {
  var stuff = this.getEndPointsAndCircle();
  // draw arc
  c.beginPath();
  c.arc(
    stuff.circleX,
    stuff.circleY,
    stuff.circleRadius,
    stuff.startAngle,
    stuff.endAngle,
    false
  );
  c.stroke();
  // draw the text on the loop farthest from the node
  var textX = stuff.circleX + stuff.circleRadius * Math.cos(this.anchorAngle);
  var textY = stuff.circleY + stuff.circleRadius * Math.sin(this.anchorAngle);
  drawMultilineText(
    c,
    this.text,
    textX,
    textY,
    this.anchorAngle,
    inArr(this, selectedObjects)
  );
  // draw the head of the arrow
  drawArrow(c, stuff.endX, stuff.endY, stuff.endAngle + Math.PI * 0.4);
};

SelfLink.prototype.containsPoint = function (x, y) {
  var stuff = this.getEndPointsAndCircle();
  var dx = x - stuff.circleX;
  var dy = y - stuff.circleY;
  var distance = Math.sqrt(dx * dx + dy * dy) - stuff.circleRadius;
  return Math.abs(distance) < hitTargetPadding;
};

function StartLink(node, start) {
  this.node = node;
  this.deltaX = 0;
  this.deltaY = 0;
  this.text = "";

  if (start) {
    this.setAnchorPoint(start.x, start.y);
  }
}

StartLink.prototype.setAnchorPoint = function (x, y) {
  this.deltaX = x - this.node.x;
  this.deltaY = y - this.node.y;

  if (Math.abs(this.deltaX) < snapToPadding) {
    this.deltaX = 0;
  }

  if (Math.abs(this.deltaY) < snapToPadding) {
    this.deltaY = 0;
  }
};

StartLink.prototype.getEndPoints = function () {
  var startX = this.node.x + this.deltaX;
  var startY = this.node.y + this.deltaY;
  var end = this.node.closestPointOnCircle(startX, startY);
  return {
    startX: startX,
    startY: startY,
    endX: end.x,
    endY: end.y,
  };
};

StartLink.prototype.draw = function (c) {
  var stuff = this.getEndPoints();

  // draw the line
  c.beginPath();
  c.moveTo(stuff.startX, stuff.startY);
  c.lineTo(stuff.endX, stuff.endY);
  c.stroke();

  // draw the text at the end without the arrow
  var textAngle = Math.atan2(
    stuff.startY - stuff.endY,
    stuff.startX - stuff.endX
  );
  drawMultilineText(
    c,
    this.text,
    stuff.startX,
    stuff.startY,
    textAngle,
    inArr(this, selectedObjects)
  );

  // draw the head of the arrow
  drawArrow(c, stuff.endX, stuff.endY, Math.atan2(-this.deltaY, -this.deltaX));
};

StartLink.prototype.containsPoint = function (x, y) {
  var stuff = this.getEndPoints();
  var dx = stuff.endX - stuff.startX;
  var dy = stuff.endY - stuff.startY;
  var length = Math.sqrt(dx * dx + dy * dy);
  var percent =
    (dx * (x - stuff.startX) + dy * (y - stuff.startY)) / (length * length);
  var distance = (dx * (y - stuff.startY) - dy * (x - stuff.startX)) / length;
  return percent > 0 && percent < 1 && Math.abs(distance) < hitTargetPadding;
};

function TemporaryLink(from, to) {
  this.from = from;
  this.to = to;
}

TemporaryLink.prototype.draw = function (c) {
  // draw the line
  c.beginPath();
  c.moveTo(this.to.x, this.to.y);
  c.lineTo(this.from.x, this.from.y);
  c.stroke();

  // draw the head of the arrow
  drawArrow(
    c,
    this.to.x,
    this.to.y,
    Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x)
  );
};

// draw using this instead of a canvas and call toLaTeX() afterward
function ExportAsLaTeX(bounds) {
  this.bounds = bounds;
  this._points = [];
  this._texData = "";
  this._scale = 0.1; // to convert pixels to document space (TikZ breaks if the numbers get too big, above 500?)

  this.toLaTeX = function () {
    return (
      "\\documentclass[12pt]{article}\n" +
      "\\usepackage{tikz}\n" +
      "\n" +
      "\\begin{document}\n" +
      "\n" +
      "\\begin{center}\n" +
      "\\begin{tikzpicture}[scale=0.2]\n" +
      "\\tikzstyle{every node}+=[inner sep=0pt]\n" +
      this._texData +
      "\\end{tikzpicture}\n" +
      "\\end{center}\n" +
      "\n" +
      "\\end{document}\n"
    );
  };

  this.beginPath = function () {
    this._points = [];
  };
  this.arc = function (x, y, radius, startAngle, endAngle, isReversed) {
    x -= this.bounds[0];
    y -= this.bounds[1];
    x *= this._scale;
    y *= this._scale;
    radius *= this._scale;
    if (endAngle - startAngle == Math.PI * 2) {
      this._texData +=
        "\\draw [" +
        this.strokeStyle +
        "] (" +
        fixed(x, 3) +
        "," +
        fixed(-y, 3) +
        ") circle (" +
        fixed(radius, 3) +
        ");\n";
    } else {
      if (isReversed) {
        var temp = startAngle;
        startAngle = endAngle;
        endAngle = temp;
      }
      if (endAngle < startAngle) {
        endAngle += Math.PI * 2;
      }
      // TikZ needs the angles to be in between -2pi and 2pi or it breaks
      if (Math.min(startAngle, endAngle) < -2 * Math.PI) {
        startAngle += 2 * Math.PI;
        endAngle += 2 * Math.PI;
      } else if (Math.max(startAngle, endAngle) > 2 * Math.PI) {
        startAngle -= 2 * Math.PI;
        endAngle -= 2 * Math.PI;
      }
      startAngle = -startAngle;
      endAngle = -endAngle;
      this._texData +=
        "\\draw [" +
        this.strokeStyle +
        "] (" +
        fixed(x + radius * Math.cos(startAngle), 3) +
        "," +
        fixed(-y + radius * Math.sin(startAngle), 3) +
        ") arc (" +
        fixed((startAngle * 180) / Math.PI, 5) +
        ":" +
        fixed((endAngle * 180) / Math.PI, 5) +
        ":" +
        fixed(radius, 3) +
        ");\n";
    }
  };
  this.moveTo = this.lineTo = function (x, y) {
    x -= this.bounds[0];
    y -= this.bounds[1];
    x *= this._scale;
    y *= this._scale;
    this._points.push({ x: x, y: y });
  };
  this.stroke = function () {
    if (this._points.length == 0) return;
    this._texData += "\\draw [" + this.strokeStyle + "]";
    for (var i = 0; i < this._points.length; i++) {
      var p = this._points[i];
      this._texData +=
        (i > 0 ? " --" : "") +
        " (" +
        fixed(p.x, 2) +
        "," +
        fixed(-p.y, 2) +
        ")";
    }
    this._texData += ";\n";
  };
  this.fill = function () {
    if (this._points.length == 0) return;
    this._texData += "\\fill [" + this.strokeStyle + "]";
    for (var i = 0; i < this._points.length; i++) {
      var p = this._points[i];
      this._texData +=
        (i > 0 ? " --" : "") +
        " (" +
        fixed(p.x, 2) +
        "," +
        fixed(-p.y, 2) +
        ")";
    }
    this._texData += ";\n";
  };
  this.measureText = function (text) {
    var c = canvas.getContext("2d");
    c.font = displayFont;
    return c.measureText(text);
  };
  this.advancedFillText = function (text, originalText, x, y, angleOrNull) {
    x -= this.bounds[0];
    y -= this.bounds[1];
    if (text.replace(" ", "").length > 0) {
      var nodeParams = "";
      // x and y start off as the center of the text, but will be moved to one side of the box when angleOrNull != null
      if (angleOrNull != null) {
        var width = this.measureText(text).width;
        var dx = Math.cos(angleOrNull);
        var dy = Math.sin(angleOrNull);
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) (nodeParams = "[right] "), (x -= width / 2);
          else (nodeParams = "[left] "), (x += width / 2);
        } else {
          if (dy > 0) (nodeParams = "[below] "), (y -= 10);
          else (nodeParams = "[above] "), (y += 10);
        }
      }
      x *= this._scale;
      y *= this._scale;
      var escapedBraces = originalText.replace(/{/g, "\\{");
      escapedBraces = escapedBraces.replace(/}/g, "\\}");
      this._texData +=
        "\\draw (" +
        fixed(x, 2) +
        "," +
        fixed(-y, 2) +
        ") node " +
        nodeParams +
        "{$" +
        escapedBraces.replace(/ /g, "\\mbox{ }") +
        "$};\n";
    }
  };

  this.translate = this.save = this.restore = this.clearRect = function () {};
}

// draw using this instead of a canvas and call toSVG() afterward
function ExportAsSVG(bounds) {
  this.width = bounds[2] - bounds[0];
  this.height = bounds[3] - bounds[1];
  this.bounds = bounds;
  this.fillStyle = "black";
  this.strokeStyle = "black";
  this.lineWidth = 1;
  this.font = displayFont;
  this._points = [];
  this._svgData = "";
  this._transX = 0;
  this._transY = 0;

  this.toSVG = function () {
    var data = '<?xml version="1.0" standalone="no"?>\n';
    data +=
      '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n\n';
    data +=
      '<svg width="' +
      this.width +
      '" height="' +
      this.height +
      '" version="1.1" xmlns="http://www.w3.org/2000/svg">\n';
    data += this._svgData;
    data += "</svg>\n";
    return data;
  };

  this.beginPath = function () {
    this._points = [];
  };
  this.arc = function (x, y, radius, startAngle, endAngle, isReversed) {
    x -= this.bounds[0];
    y -= this.bounds[1];
    x += this._transX;
    y += this._transY;
    var style =
      'stroke="' +
      this.strokeStyle +
      '" stroke-width="' +
      this.lineWidth +
      '" fill="none"';

    if (endAngle - startAngle == Math.PI * 2) {
      this._svgData +=
        "\t<ellipse " +
        style +
        ' cx="' +
        fixed(x, 3) +
        '" cy="' +
        fixed(y, 3) +
        '" rx="' +
        fixed(radius, 3) +
        '" ry="' +
        fixed(radius, 3) +
        '"/>\n';
    } else {
      if (isReversed) {
        var temp = startAngle;
        startAngle = endAngle;
        endAngle = temp;
      }

      if (endAngle < startAngle) {
        endAngle += Math.PI * 2;
      }

      var startX = x + radius * Math.cos(startAngle);
      var startY = y + radius * Math.sin(startAngle);
      var endX = x + radius * Math.cos(endAngle);
      var endY = y + radius * Math.sin(endAngle);
      var useGreaterThan180 = Math.abs(endAngle - startAngle) > Math.PI;
      var goInPositiveDirection = 1;

      this._svgData += "\t<path " + style + ' d="';
      this._svgData += "M " + fixed(startX, 3) + "," + fixed(startY, 3) + " "; // startPoint(startX, startY)
      this._svgData += "A " + fixed(radius, 3) + "," + fixed(radius, 3) + " "; // radii(radius, radius)
      this._svgData += "0 "; // value of 0 means perfect circle, others mean ellipse
      this._svgData += +useGreaterThan180 + " ";
      this._svgData += +goInPositiveDirection + " ";
      this._svgData += fixed(endX, 3) + "," + fixed(endY, 3); // endPoint(endX, endY)
      this._svgData += '"/>\n';
    }
  };
  this.moveTo = this.lineTo = function (x, y) {
    x -= this.bounds[0];
    y -= this.bounds[1];
    x += this._transX;
    y += this._transY;
    this._points.push({ x: x, y: y });
  };
  this.stroke = function () {
    if (this._points.length == 0) return;
    this._svgData +=
      '\t<polygon stroke="' +
      this.strokeStyle +
      '" stroke-width="' +
      this.lineWidth +
      '" points="';
    for (var i = 0; i < this._points.length; i++) {
      this._svgData +=
        (i > 0 ? " " : "") +
        fixed(this._points[i].x, 3) +
        "," +
        fixed(this._points[i].y, 3);
    }
    this._svgData += '"/>\n';
  };
  this.fill = function () {
    if (this._points.length == 0) return;
    this._svgData +=
      '\t<polygon fill="' +
      this.fillStyle +
      '" stroke-width="' +
      this.lineWidth +
      '" points="';
    for (var i = 0; i < this._points.length; i++) {
      this._svgData +=
        (i > 0 ? " " : "") +
        fixed(this._points[i].x, 3) +
        "," +
        fixed(this._points[i].y, 3);
    }
    this._svgData += '"/>\n';
  };
  this.measureText = function (text) {
    var c = canvas.getContext("2d");
    c.font = displayFont;
    return c.measureText(text);
  };
  this.fillText = function (text, x, y) {
    x -= this.bounds[0];
    y -= this.bounds[1];
    x += this._transX;
    y += this._transY;
    if (text.replace(" ", "").length > 0) {
      this._svgData +=
        '\t<text x="' +
        fixed(x, 3) +
        '" y="' +
        fixed(y, 3) +
        '" font-family="Times New Roman, serif, Consolas, Courier New, monospace" font-size="20">' +
        textToXML(text) +
        "</text>\n";
    }
  };
  this.translate = function (x, y) {
    this._transX = x;
    this._transY = y;
  };

  this.save = this.restore = this.clearRect = function () {};
}

const greekLetterNames = [
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
  "Iota",
  "Kappa",
  "Lambda",
  "Mu",
  "Nu",
  "Xi",
  "Omicron",
  "Pi",
  "Rho",
  "Sigma",
  "Tau",
  "Upsilon",
  "Phi",
  "Chi",
  "Psi",
  "Omega",
  "emptyset",
  "right",
  "left",
  "in",
  "notin",
  "subseteq",
  "nsubseteq",
  "subset",
  "nsubset",
  "ni",
  "notni",
  "superseteq",
  "nsuperseteq",
  "superset",
  "nsuperset",
  "Left",
  "Right",
  "perp",
  "vdash",
  "forall",
  "cup",
  "cap",
  "cdot",
  "times",
];

const subscripts = {
  0: "₀",
  1: "₁",
  2: "₂",
  3: "₃",
  4: "₄",
  5: "₅",
  6: "₆",
  7: "₇",
  8: "₈",
  9: "₉",
  "+": "₊",
  "∗": "⁎",
  "-": "₋",
  "=": "₌",
  "(": "₍",
  ")": "₎",
  a: "ₐ",
  e: "ₑ",
  o: "ₒ",
  x: "ₓ",
  h: "ₕ",
  k: "ₖ",
  l: "ₗ",
  m: "ₘ",
  n: "ₙ",
  p: "ₚ",
  s: "ₛ",
  t: "ₜ",
};

const superscripts = {
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
  "+": "⁺",
  "∗": "*",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ⁱ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  q: "𐞥",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
  A: "ᴬ",
  B: "ᴮ",
  C: "ꟲ",
  D: "ᴰ",
  E: "ᴱ",
  F: "ꟳ",
  G: "ᴳ",
  H: "ᴴ",
  I: "ᴵ",
  J: "ᴶ",
  K: "ᴷ",
  L: "ᴸ",
  M: "ᴹ",
  N: "ᴺ",
  O: "ᴼ",
  P: "ᴾ",
  Q: "ꟴ",
  R: "ᴿ",
  T: "ᵀ",
  U: "ᵁ",
  V: "ⱽ",
  W: "ᵂ",
};

const doubleStrucks = {
  A: "𝔸",
  B: "𝔹",
  C: "ℂ",
  D: "𝔻",
  E: "𝔼",
  F: "𝔽",
  G: "𝔾",
  H: "ℍ",
  I: "𝕀",
  J: "𝕁",
  K: "𝕂",
  L: "𝕃",
  M: "𝕄",
  N: "ℕ",
  O: "𝕆",
  P: "ℙ",
  Q: "ℚ",
  R: "ℝ",
  S: "𝕊",
  T: "𝕋",
  U: "𝕌",
  V: "𝕍",
  W: "𝕎",
  X: "𝕏",
  Y: "𝕐",
  Z: "ℤ",
  a: "𝕒",
  b: "𝕓",
  c: "𝕔",
  d: "𝕕",
  e: "𝕖",
  f: "𝕗",
  g: "𝕘",
  h: "𝕙",
  i: "𝕚",
  j: "𝕛",
  k: "𝕜",
  l: "𝕝",
  m: "𝕞",
  n: "𝕟",
  o: "𝕠",
  p: "𝕡",
  q: "𝕢",
  r: "𝕣",
  s: "𝕤",
  t: "𝕥",
  u: "𝕦",
  v: "𝕧",
  w: "𝕨",
  x: "𝕩",
  y: "𝕪",
  z: "𝕫",
  0: "𝟘",
  1: "𝟙",
  2: "𝟚",
  3: "𝟛",
  4: "𝟜",
  5: "𝟝",
  6: "𝟞",
  7: "𝟟",
  8: "𝟠",
  9: "𝟡",
};

function convertLatexShortcuts(text) {
  text = text.replaceAll("*", "∗").replaceAll(">=", "≥").replaceAll("<=", "≤").replaceAll("!=", "≠");
  if (text.split("\\hr").length % 2 == 0) {
    text =
      text.substring(0, text.lastIndexOf("\\hr")).replaceAll("\\hr", "") +
      text.substring(text.lastIndexOf("\\hr"));
  } else text = text.replaceAll("\\hr", "");

  for (var i = 0; i < greekLetterNames.length; i++) {
    var name = greekLetterNames[i];
    if (name == "emptyset") {
      text = text.replace(
        new RegExp("\\\\" + name, "g"),
        String.fromCharCode(8709)
      );
      continue;
    }
    if (name == "right") {
      text = text.replace(
        new RegExp("\\\\" + name, "g"),
        String.fromCharCode(8594)
      );
      continue;
    }
    if (name == "left") {
      text = text.replace(
        new RegExp("\\\\" + name, "g"),
        String.fromCharCode(8592)
      );
      continue;
    }
    if (name == "in") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "∈");
      continue;
    }
    if (name == "notin") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "∉");
      continue;
    }
    if (name == "subseteq") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⊆");
      continue;
    }
    if (name == "nsubseteq") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⊈");
      continue;
    }
    if (name == "subset") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⊂");
      continue;
    }
    if (name == "nsubset") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⊄");
      continue;
    }
    if (name == "ni") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "∋");
      continue;
    }
    if (name == "notni") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "∌");
      continue;
    }
    if (name == "superseteq") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⊇");
      continue;
    }
    if (name == "nsuperseteq") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⊉");
      continue;
    }
    if (name == "superset") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⊃");
      continue;
    }
    if (name == "nsuperset") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⊅");
      continue;
    }
    if (name == "Left") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⇐");
      continue;
    }
    if (name == "Right") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⇒");
      continue;
    }
    if (name == "vdash") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⊢");
      continue;
    }
    if (name == "perp") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "⊥");
      continue;
    }
    if (name == "forall") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "∀");
      continue;
    }
    if (name == "cup") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "∪");
      continue;
    }
    if (name == "cap") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "∩");
      continue;
    }
    if (name == "cdot") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "·");
      continue;
    }
    if (name == "times") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "×");
      continue;
    }
    text = text.replace(
      new RegExp("\\\\" + name, "g"),
      String.fromCharCode(913 + i + (i > 16))
    );
    text = text.replace(
      new RegExp("\\\\" + name.toLowerCase(), "g"),
      String.fromCharCode(945 + i + (i > 16))
    );
  }

  for (let i = 0; i < text.length; i++) {
    if (subscripts[text.charAt(i)])
      text = text.replace("_" + text.charAt(i), subscripts[text.charAt(i)]);
    if (superscripts[text.charAt(i)])
      text = text.replace("^" + text.charAt(i), superscripts[text.charAt(i)]);
  }

  for (let i = 0; i < text.length; i++) {
    if (doubleStrucks[text.charAt(i)])
      text = text.replace(
        "\\\\" + text.charAt(i),
        doubleStrucks[text.charAt(i)]
      );
  }

  return text;
}

function textToXML(text) {
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  var result = "";
  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i);
    if (c >= 0x20 && c <= 0x7e) {
      result += text[i];
    } else {
      result += "&#" + c + ";";
    }
  }
  return result;
}

function drawArrow(c, x, y, angle) {
  var dx = Math.cos(angle);
  var dy = Math.sin(angle);
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(x - 8 * dx + 5 * dy, y - 8 * dy - 5 * dx);
  c.lineTo(x - 8 * dx - 5 * dy, y - 8 * dy + 5 * dx);
  c.fill();
}

function canvasHasFocus() {
  return (document.activeElement || document.body) == document.body;
}

function drawText(c, originalText, x, y, angleOrNull, isSelected, start = 0) {
  var text;
  if (isSelected && selectedObjects.length == 1)
    text =
      convertLatexShortcuts(
        originalText.substring(0, selectedText[0] - start)
      ) +
      convertLatexShortcuts(
        originalText.substring(selectedText[0] - start, selectedText[1] - start)
      ) +
      convertLatexShortcuts(originalText.substring(selectedText[1] - start));
  else text = convertLatexShortcuts(originalText);
  c.font = displayFont;
  var width = c.measureText(text).width;
  var notSelectedWidth1 = c.measureText(
    convertLatexShortcuts(originalText.substring(0, selectedText[0] - start))
  ).width;
  var untilCaretWidth = c.measureText(
    convertLatexShortcuts(originalText.substring(0, selectedText[2] - start))
  ).width;
  var selectedWidth = c.measureText(
    convertLatexShortcuts(
      originalText.substring(selectedText[0] - start, selectedText[1] - start)
    )
  ).width;

  end = start + originalText.length;

  // center the text
  x -= width / 2;

  // position the text intelligently if given an angle
  if (angleOrNull != null) {
    var cos = Math.cos(angleOrNull);
    var sin = Math.sin(angleOrNull);
    var cornerPointX = (width / 2 + 5) * (cos > 0 ? 1 : -1);
    var cornerPointY = (10 + 5) * (sin > 0 ? 1 : -1);
    var slide =
      sin * Math.pow(Math.abs(sin), 40) * cornerPointX -
      cos * Math.pow(Math.abs(cos), 10) * cornerPointY;
    x += cornerPointX - sin * slide;
    y += cornerPointY + cos * slide;
  }

  // draw text and caret (round the coordinates so the caret falls on a pixel)
  if ("advancedFillText" in c) {
    c.advancedFillText(text, originalText, x + width / 2, y, angleOrNull);
  } else {
    x = Math.round(x);
    y = Math.round(y);
    if (isSelected && selectedObjects.length == 1) {
      c.fillText(
        convertLatexShortcuts(
          originalText.substring(0, selectedText[0] - start)
        ),
        x,
        y + 6
      );
      x += notSelectedWidth1;
      c.fillStyle = "blue";
      c.fillRect(x, y - 10, selectedWidth, 20);
      c.fillStyle = "white";
      c.fillText(
        convertLatexShortcuts(
          originalText.substring(
            selectedText[0] - start,
            selectedText[1] - start
          )
        ),
        x,
        y + 6
      );
      x += selectedWidth;
      c.fillStyle = "blue";
      c.fillText(
        convertLatexShortcuts(originalText.substring(selectedText[1] - start)),
        x,
        y + 6
      );

      x -= notSelectedWidth1 + selectedWidth;

      if (
        caretVisible &&
        canvasHasFocus() &&
        document.hasFocus() &&
        selectedText[2] >= start &&
        selectedText[2] <= end
      ) {
        x += untilCaretWidth;
        c.beginPath();
        c.moveTo(x, y - 10);
        c.lineTo(x, y + 10);
        c.stroke();
        x -= untilCaretWidth;
      }
    } else {
      c.fillText(text, x, y + 6);
    }

    var hrs = [];
    while (originalText.indexOf("\\hr", hrs[hrs.length - 1] + 3 || 0) > -1) {
      hrs.push(originalText.indexOf("\\hr", hrs[hrs.length - 1] + 3 || 0));
    }

    var i = 0;

    while (hrs.length > i + 1) {
      if (
        !(selectedText[2] > hrs[i] && selectedText[2] < hrs[i + 1] + 3) ||
        !isSelected || selectedObjects.length != 1
      ) {
        var width1 = c.measureText(
          convertLatexShortcuts(originalText.substring(0, hrs[i]))
        ).width;
        var width2 = c.measureText(
          convertLatexShortcuts(originalText.substring(0, hrs[i + 1] + 3))
        ).width;
        c.fillRect(x + width1, y - 11, width2 - width1, 1.5);
      }

      i += 2;
    }
  }
}

function drawMultilineText(c, originalText, x, y, angleOrNull, isSelected) {
  var start = 0;
  if (angleOrNull != null) {
    var sin = Math.sin(angleOrNull);
    var cornerPointY = (10 + 5) * (sin > 0 ? 1 : -1);
    y +=
      (cornerPointY *
        (originalText.split("\r").length - 1) *
        Math.abs(sin) *
        2) /
      Math.PI;
  }

  originalText.split("\r").forEach((line, i) => {
    drawText(
      c,
      line,
      x,
      y + 25 * i - (originalText.split("\r").length - 1) * 10,
      angleOrNull,
      isSelected,
      start++
    );
    start += line.length;
  });
}

let caretTimer;
var caretVisible = true;

function resetCaret() {
  clearInterval(caretTimer);
  caretVisible = selectedObjects.length == 1;
  draw();
  caretTimer = setInterval(() => {
    if (selectedObjects.length == 1) caretVisible = !caretVisible;
    else caretVisible = false;
    draw();
  }, 500);
}

var canvas;
var mouseOnCanvas = false;
var canvasFocus = false;
var nodeRadius = 30;
var displayFont =
  '20px "XITS Math", Calibri';
var nodes = [];
var links = [];

var fromX = null,
  fromY = null;
var orgX = null,
  orgY = null;
var toX = null,
  toY = null;

var zKey = false;
var yKey = false;
var cKey = false;
var vKey = false;
var mouseX = 0;
var mouseY = 0;
var copiedText = "";
var copied = [];
var selectedText = [0, 0, 0];
var mouseDown = false;
var sliderMouseDown = false;
var cursorVisible = true;
var snapToPadding = 6; // pixels
var hitTargetPadding = 6; // pixels
var selectedObjects = []; // either a Link or a Node
var currentLink = null; // a Link
var movingObject = false;
var originalClick;

function clearCanvas() {
  nodes = [];
  links = [];
  localStorage["fsm"] = JSON.stringify(getBackupData());
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  nodeRadius = 30;
  document.getElementById("rangeSlider").value = 30;
}

function makeNodeTextOnly() {
  selectedObjects.forEach((object) => {
    if ("textOnly" in object) {
      object.textOnly = !object.textOnly;
      draw();
    }
  });
}

function radiusChanged() {
  var newRadius = document.getElementById("rangeSlider").value;
  newRadius = parseInt(newRadius);
  nodeRadius = newRadius;
  updateRangeValue();
  draw();
}

function drawUsing(c) {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.translate(0.5, 0.5);

  for (var i = 0; i < nodes.length; i++) {
    c.lineWidth = 1;
    c.fillStyle = c.strokeStyle =
      nodes[i].runtimeColor ?? inArr(nodes[i], selectedObjects)
        ? nodes[i] == selectObject(mouseX, mouseY)
          ? "rgba(0,0,255,0.7)"
          : "blue"
        : nodes[i] == selectObject(mouseX, mouseY)
        ? "rgba(0,0,0,0.7)"
        : "black";
    nodes[i].draw(c);
  }
  for (var i = 0; i < links.length; i++) {
    c.lineWidth = 1;
    c.fillStyle = c.strokeStyle = inArr(links[i], selectedObjects)
      ? links[i] == selectObject(mouseX, mouseY)
        ? "rgba(0,0,255,0.7)"
        : "blue"
      : links[i] == selectObject(mouseX, mouseY)
      ? "rgba(0,0,0,0.7)"
      : "black";
    links[i].draw(c);
  }
  if (currentLink != null) {
    c.lineWidth = 1;
    c.fillStyle = c.strokeStyle = "black";
    currentLink.draw(c);
  }

  if (toX != null) {
    c.fillStyle = "rgba(0, 0, 0, 0.2)";
    var top = Math.min(fromY, toY),
      left = Math.min(fromX, toX),
      bottom = Math.max(fromY, toY),
      right = Math.max(fromX, toX);
    c.fillRect(left, top, right - left, bottom - top);
    c.setLineDash([5, 2]);
    c.strokeRect(left, top, right - left, bottom - top);
  }

  c.restore();
}

function draw(flag = true) {
  drawUsing(canvas.getContext("2d"));
  if (flag) saveBackup();
}

function selectObject(x, y) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].containsPoint(x, y)) {
      return nodes[i];
    }
  }
  for (var i = 0; i < links.length; i++) {
    if (links[i].containsPoint(x, y)) {
      return links[i];
    }
  }
  return null;
}

function selectObjects(left, top, right, bottom) {
  var objects = [];
  nodes.forEach(function (node) {
    if (
      top <= node.y &&
      node.y <= bottom &&
      left <= node.x &&
      node.x <= right
    ) {
      objects.push(node);
    }
  });

  links.forEach(function (link) {
    try {
      var data = link.getEndPointsAndCircle();
      if (
        2 * top <= data.startY + data.endY &&
        data.startY + data.endY <= 2 * bottom &&
        2 * left <= data.startX + data.endX &&
        data.startX + data.endX <= 2 * right
      ) {
        objects.push(link);
      }
    } catch (e) {
      for (let i = left; i <= right; i++) {
        for (let j = top; j < bottom; j++) {
          if (link.containsPoint(i, j))
            objects.push(link);
        }
      }
    }
  });

  return Array.from(new Set(objects));
}

function snapNode(node) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == node) continue;

    if (Math.abs(node.x - nodes[i].x) < snapToPadding) {
      node.x = nodes[i].x;
    }

    if (Math.abs(node.y - nodes[i].y) < snapToPadding) {
      node.y = nodes[i].y;
    }
  }
}

window.onload = function () {
  undoStack = [localStorage["fsm"]];
  redoStack = [];
  const contextMenu = document.getElementById("context-menu");
  const scope = document.querySelector("body");

  window.onmousemove = function (e) {
    var mouse = crossBrowserRelativeMousePos(e);
    mouseX = mouse.x;
    mouseY = mouse.y;
    draw();
  };

  window.onclick = (e) => {
    contextMenu.classList.remove("visible");
    contextMenu.classList.remove("selected");
  };

  scope.onscroll = (e) => {
    contextMenu.style.transform = `translate(0, -${window.scrollY}px)`;
  };

  contextMenu.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  canvas.fillStyle = "#FFF";
  context.fillRect(0, 0, canvas.width, canvas.height);
  restoreBackup();
  draw();

  canvas.width = localStorage["width"] ?? "800";
  canvas.height = localStorage["height"] ?? "600";

  setInterval(() => {
    if (
      canvas.width != document.getElementById("width").value ||
      canvas.height != document.getElementById("height").value
    ) {
      if (selectedObjects.length != 1) selectedText = [-1, -1, -1];

      canvas.width = document.getElementById("width").value;
      canvas.height = document.getElementById("height").value;
      localStorage["width"] = canvas.width;
      localStorage["height"] = canvas.height;
      draw();
    }

    saveBackup();
    if (selectedObjects.length > 0) {
      document.getElementById("selectedObj").style.pointerEvents = "";
      document.getElementById("selectedObj").style.opacity = "1";

      if (selectedObjects.length == 1 && selectedObjects[0] instanceof Node) {
        document.getElementById("run").style.pointerEvents = "";
        document.getElementById("run").style.opacity = "1";
      } else {
        document.getElementById("run").style.pointerEvents = "none";
        document.getElementById("run").style.opacity = "0.6";
      }
    } else {
      document.getElementById("selectedObj").style.pointerEvents = "none";
      document.getElementById("selectedObj").style.opacity = "0.6";
      document.getElementById("run").style.pointerEvents = "";
      document.getElementById("run").style.opacity = "1";
    }

    if (!nodeRadius || nodeRadius <= 0 || nodeRadius > 80) nodeRadius = 30;
  }, 1);

  document.getElementById("history").onmousedown = function () {
    sliderMouseDown = true;
  };

  document.getElementById("history").onmouseup = function () {
    sliderMouseDown = false;
  };

  window.onmousedown = function () {
    mouseDown = true;
    nodes.forEach((node) => {
      node.runtimeColor = null;
    });

    canvasFocus = mouseOnCanvas;

    draw();
  };

  window.onmouseup = function () {
    mouseDown = false;
    if (toX != null) {
      var top = Math.min(fromY, toY),
        left = Math.min(fromX, toX),
        bottom = Math.max(fromY, toY),
        right = Math.max(fromX, toX);
      selectedObjects = selectObjects(left, top, right, bottom);

      if (selectedObjects.length == 1) {
        if (selectedObjects[0] instanceof StartLink)
          document.getElementById("info").innerHTML = `
            <p>Automata info:</p>
            <p>Full: ${isFull(selectedObjects[0].node)}</p>
            <p>Deterministic: ${isDeterministic(selectedObjects[0].node)}</p>
          `;
        else
          document.getElementById("info").innerHTML = `
            <p>Automata info:</p>
            <p>Full: ${isFull(selectedObjects[0])}</p>
            <p>Deterministic: ${isDeterministic(selectedObjects[0])}</p>
          `;
      } else
        document.getElementById("info").innerHTML = `
          <p>Automata info:</p>
          <p>Full: ...</p>
          <p>Deterministic: ...</p>
        `;
    }

    fromX = fromY = toX = toY = null;
    console.log("reset");

    draw();
  };

  canvas.onmousedown = function (e) {
    var mouse = crossBrowserRelativeMousePos(e);
    var selectedObject = selectObject(mouse.x, mouse.y);

    if (selectedObject) {
      if (selectedObject instanceof StartLink)
        document.getElementById("info").innerHTML = `
            <p>Automata info:</p>
            <p>Full: ${isFull(selectedObject.node)}</p>
            <p>Deterministic: ${isDeterministic(selectedObject.node)}</p>
          `;
      else
        document.getElementById("info").innerHTML = `
            <p>Automata info:</p>
            <p>Full: ${isFull(selectedObject)}</p>
            <p>Deterministic: ${isDeterministic(selectedObject)}</p>
          `;
    } else
      document.getElementById("info").innerHTML = `
          <p>Automata info:</p>
          <p>Full: ...</p>
          <p>Deterministic: ...</p>
        `;

    if (e.which === 3) {
      e.preventDefault();

      contextMenu.classList.remove("visible");

      contextMenu.style.top = `${e.clientY + window.scrollY}px`;
      contextMenu.style.left = `${e.clientX}px`;
      contextMenu.offsetWidth;
      contextMenu.classList.add("visible");
      contextMenu.classList.add("selected");
      if (selectedObject == null) contextMenu.classList.remove("selected");
    } else {
      contextMenu.classList.remove("visible");
      contextMenu.classList.remove("selected");
    }

    if (selectedObject != null) {
      if (!inArr(selectedObject, selectedObjects)) {
        if (e.ctrlKey) selectedObjects.push(selectedObject);
        else selectedObjects = [selectedObject];
      } else if (e.ctrlKey) {
        for (let i = 0; i < selectedObjects.length; i++) {
          if (selectedObjects[i] == selectedObject) {
            delete selectedObjects[i];
            break;
          }
        }
      }

      text = selectedObject.text;

      selectedText = [text.length, text.length, text.length];
    } else {
      selectedObjects = [];
    }

    movingObject = false;
    originalClick = mouse;

    if (selectedObject != null) {
      if (e.shiftKey && selectedObject instanceof Node) {
        selectedObjects = [selectedObject];
        currentLink = new SelfLink(selectedObject, mouse);
      } else if (selectedObjects.length > 0) {
        movingObject = true;
        deltaMouseX = deltaMouseY = 0;
        selectedObjects.forEach((object) => {
          if (object.setMouseStart) {
            object.setMouseStart(mouse.x, mouse.y);
          }
        });

        resetCaret();
      }
    } else if (e.shiftKey) {
      currentLink = new TemporaryLink(mouse, mouse);
    }

    draw();

    if (canvasHasFocus()) {
      // disable drag-and-drop only if the canvas is already focused
      return false;
    } else {
      // otherwise, let the browser switch the focus away from wherever it was
      resetCaret();
      return true;
    }
  };

  canvas.ondblclick = function (e) {
    var mouse = crossBrowserRelativeMousePos(e);
    var selectedObject = selectObject(mouse.x, mouse.y);
    if (selectedObject != null) {
      if (e.ctrlKey) selectedObjects.push(selectedObject);
      else selectedObjects = [selectedObject];
    }

    if (selectedObject == null) {
      selectedObject = new Node(mouse.x, mouse.y);
      if (e.ctrlKey) selectedObjects.push(selectedObject);
      else selectedObjects = [selectedObject];
      nodes.push(selectedObject);
      resetCaret();
      draw();
    } else if (selectedObject instanceof Node) {
      selectedObject.isAcceptState = !selectedObject.isAcceptState;
      draw();
    }

    redoStack = [];
  };

  canvas.onmousemove = function (e) {
    var mouse = crossBrowserRelativeMousePos(e);

    if (currentLink != null) {
      var targetNode = selectObject(mouse.x, mouse.y);
      if (!(targetNode instanceof Node)) {
        targetNode = null;
      }

      if (selectedObjects.length == 0) {
        if (targetNode != null) {
          currentLink = new StartLink(targetNode, originalClick);
        } else {
          currentLink = new TemporaryLink(originalClick, mouse);
        }
      } else {
        if (targetNode == selectedObjects[selectedObjects.length - 1]) {
          currentLink = new SelfLink(
            selectedObjects[selectedObjects.length - 1],
            mouse
          );
        } else if (targetNode != null) {
          currentLink = new Link(
            selectedObjects[selectedObjects.length - 1],
            targetNode
          );
        } else {
          currentLink = new TemporaryLink(
            selectedObjects[selectedObjects.length - 1].closestPointOnCircle(
              mouse.x,
              mouse.y
            ),
            mouse
          );
        }
      }
      draw();
    }

    if (movingObject && mouseDown) {
      selectedObjects.forEach((object) => {
        if (selectedObjects.length == 1 || object instanceof Node)
          object.setAnchorPoint(mouse.x, mouse.y);
        if (object instanceof Node) snapNode(object);
        draw();
      });
    } else if (!movingObject && mouseDown && currentLink == null) {
      updateSelectionBox(mouse);
    }
  };

  canvas.onmouseup = function (e) {
    if (movingObject) redoStack = [];
    movingObject = false;

    if (currentLink != null) {
      if (!(currentLink instanceof TemporaryLink)) {
        if (e.ctrlKey) {
          selectedObjects.push(currentLink);
        } else {
          selectedObjects = [currentLink];
        }
        links.push(currentLink);

        resetCaret();

        redoStack = [];
      }
      currentLink = null;
      draw();
    }
  };

  canvas.onclick = function (e) {
    var mouse = crossBrowserRelativeMousePos(e);
    var selectedObject = selectObject(mouse.x, mouse.y);
    if (selectedObject != null && !e.ctrlKey && !e.shiftKey) {
      selectedObjects = [selectedObject];
      draw();
    }
  };

  canvas.addEventListener("mouseenter", () => {
    mouseOnCanvas = true;
  });

  canvas.addEventListener("mouseleave", () => {
    mouseOnCanvas = false;
  });
};

document.onkeydown = function (e) {
  var key = crossBrowserKey(e);

  if (e.ctrlKey) {
    if (key === 90) {
      zKey = true;
      undo();
    } else if (key === 89) {
      yKey = true;
      redo();
    } else if (key === 67) {
      e.preventDefault();
      cKey = true;
      if (e.shiftKey) {
        if (selectedObjects.length == 1)
          copiedText = selectedObjects[0].text.substring(
            selectedText[0],
            selectedText[1]
          );
      } else copy();
    } else if (key === 86) {
      e.preventDefault();
      vKey = true;
      if (e.shiftKey) {
        if (selectedObjects.length == 1) {
          if (selectedText[0] == selectedText[1]) {
            selectedObjects[0].text =
              selectedObjects[0].text.substr(0, selectedText[2]) +
              copiedText +
              selectedObjects[0].text.substr(
                selectedText[2],
                selectedObjects[0].text.length
              );
            selectedText[2] =
              selectedText[0] =
              selectedText[1] +=
                copiedText.length;
          } else {
            selectedObjects[0].text =
              selectedObjects[0].text.substr(0, selectedText[0]) +
              copiedText +
              selectedObjects[0].text.substr(selectedText[1]);
            selectedText[2] =
              selectedText[1] =
              selectedText[0] +=
                copiedText.length;
          }
        }
      } else paste();
    } else if (key === 65) {
      e.preventDefault();

      if (e.altKey) {
        selectedObjects.forEach((object) => {
          selectAutomaton(object);
        });
      } else if (e.shiftKey) {
        if (selectedObjects.length == 1)
          selectedText = [
            0,
            selectedObjects[0].text.length,
            selectedObjects[0].text.length,
          ];
      } else {
        selectedObjects = [...nodes, ...links];
      }

      draw();
    } else if (key === 88) {
      if (e.shiftKey) {
        if (selectedObjects.length == 1) {
          copiedText = selectedObjects[0].text.substring(
            selectedText[0],
            selectedText[1]
          );

          selectedObjects[0].text =
            selectedObjects[0].text.substring(0, selectedText[0]) +
            selectedObjects[0].text.substring(selectedText[1]);

          selectedText[1] = selectedText[2] = selectedText[0];
        }
      } else {
        copy();
        deleteSelected();
      }
    } else if (key === 8) {
      // backspace key
      if (selectedObjects.length == 1 && selectedObjects[0].text) {
        var text = selectedObjects[0].text;
        selectedObjects[0].text =
          text.substring(0, selectedText[0]).replace(/\s?(?!\s)\S*$/, "") +
          text.substring(selectedText[1]);
        selectedText[0] =
          selectedText[1] =
          selectedText[2] -=
            text.length -
            selectedObjects[0].text.length -
            selectedText[1] +
            selectedText[0];
        selectedText[2] = Math.max(selectedText[2], 0);
        selectedText[1] = Math.max(selectedText[1], 0);
        selectedText[0] = Math.max(selectedText[0], 0);
        resetCaret();
        draw();
      }

      // backspace is a shortcut for the back button, but do NOT want to change pages
      return false;
    }
  }

  if (key == 27) {
    selectedObjects = [];
    document.getElementById("context-menu").classList.remove("visible");
  }

  if (selectedObjects.length == 1 && selectedObjects[0].text.length != 0) {
    handleKeyEvent(selectedObjects[0], e);
    var text = selectedObjects[0].text;
    selectedText[2] = Math.min(selectedText[2], text.length);
    selectedText[2] = Math.max(selectedText[2], 0);
    selectedText[1] = Math.min(selectedText[1], text.length);
    selectedText[1] = Math.max(selectedText[1], 0);
    selectedText[0] = Math.min(selectedText[0], text.length);
    selectedText[0] = Math.max(selectedText[0], 0);
    resetCaret();
  }

  if (key == 16) {
  } else if (!canvasHasFocus()) {
    // don't read keystrokes when other things have focus
    return true;
  } else if (key == 8) {
    // backspace key
    if (selectedObjects.length == 1 && selectedObjects[0].text) {
      if (selectedText[0] == selectedText[1]) {
        selectedObjects[0].text =
          selectedObjects[0].text.substr(0, selectedText[2] - 1) +
          selectedObjects[0].text.substr(
            selectedText[2],
            selectedObjects[0].text.length
          );
        selectedText[2] = selectedText[0] = selectedText[1] -= 1;
      } else {
        selectedObjects[0].text =
          selectedObjects[0].text.substr(0, selectedText[0]) +
          selectedObjects[0].text.substr(
            selectedText[1],
            selectedObjects[0].text.length
          );
        selectedText[2] = selectedText[1] = selectedText[0];
      }
      resetCaret();
      draw();
    }

    // backspace is a shortcut for the back button, but do NOT want to change pages
    return false;
  } else if (key == 46) {
    // delete key
    deleteSelected();
  }
};

document.onkeypress = function (e) {
  if (!canvasFocus) return true;

  e.preventDefault();

  // don't read keystrokes when other things have focus
  var key = crossBrowserKey(e);
  if (!canvasHasFocus()) {
    // don't read keystrokes when other things have focus
    return true;
  } else if (
    ((key >= 0x20 && key <= 0x7e) || key == 13) &&
    !e.metaKey &&
    !e.altKey &&
    !e.ctrlKey &&
    selectedObjects.length == 1 &&
    "text" in selectedObjects[0]
  ) {
    if (selectedText[0] == selectedText[1]) {
      selectedObjects[0].text =
        selectedObjects[0].text.substr(0, selectedText[2]) +
        String.fromCharCode(key) +
        selectedObjects[0].text.substr(
          selectedText[2],
          selectedObjects[0].text.length
        );
      selectedText[2] = selectedText[0] = ++selectedText[1];
    } else {
      selectedObjects[0].text =
        selectedObjects[0].text.substr(0, selectedText[0]) +
        String.fromCharCode(key) +
        selectedObjects[0].text.substr(selectedText[1]);
      selectedText[2] = selectedText[1] = ++selectedText[0];
    }
    resetCaret();
    draw();

    // don't let keys do their actions (like space scrolls down the page)
    e.preventDefault();
  } else if (key == 8) {
    e.preventDefault();
  }

  if (selectedObjects.length == 1) {
    if (selectedObjects[0] instanceof StartLink)
      document.getElementById("info").innerHTML = `
          <p>Automata info:</p>
          <p>Full: ${isFull(selectedObjects[0].node)}</p>
          <p>Deterministic: ${isDeterministic(selectedObjects[0].node)}</p>
        `;
    else
      document.getElementById("info").innerHTML = `
          <p>Automata info:</p>
          <p>Full: ${isFull(selectedObjects[0])}</p>
          <p>Deterministic: ${isDeterministic(selectedObjects[0])}</p>
        `;
  } else
    document.getElementById("info").innerHTML = `
        <p>Automata info:</p>
        <p>Full: ...</p>
        <p>Deterministic: ...</p>
      `;
};

document.onkeyup = function (e) {
  var key = crossBrowserKey(e);

  if (key == 90) zKey = false;
  else if (key == 89) yKey = false;
  else if (key === 67) cKey = false;
  else if (key === 86) vKey = false;
};

function crossBrowserKey(e) {
  e = e || window.event;
  return e.which || e.keyCode;
}

function crossBrowserElementPos(e) {
  e = e || window.event;
  var obj = e.target || e.srcElement;
  var x = 0,
    y = 0;
  while (obj.offsetParent) {
    x += obj.offsetLeft;
    y += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return { x: x, y: y };
}

function crossBrowserMousePos(e) {
  e = e || window.event;
  return {
    x:
      e.pageX ||
      e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft,
    y:
      e.pageY ||
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop,
  };
}

function crossBrowserRelativeMousePos(e) {
  var element = crossBrowserElementPos(e);
  var mouse = crossBrowserMousePos(e);
  return {
    x: mouse.x - element.x,
    y: mouse.y - element.y,
  };
}

function saveAsPNG() {
  // First, re-render the image with nothing selected.
  var oldSelectedObjects = selectedObjects;
  selectedObjects = [];
  drawUsing(canvas.getContext("2d"));
  selectedObjects = oldSelectedObjects;

  // Second, crop the image to only the part with content.
  var bounds = getBoundingRect();
  var croppedWidth = bounds[2] - bounds[0];
  var croppedHeight = bounds[3] - bounds[1];
  var croppedData = canvas
    .getContext("2d")
    .getImageData(bounds[0], bounds[1], croppedWidth, croppedHeight);

  // Create a temporary canvas to generate PNG data with padding.
  var tmp = document.createElement("canvas");
  var padding = 16; // Adjust the padding as needed (1em = 16px)
  tmp.width = croppedWidth + 2 * padding;
  tmp.height = croppedHeight + 2 * padding;
  var tmpCtx = tmp.getContext("2d");

  // Set the background color of the temporary canvas (white in this case)
  tmpCtx.fillStyle = "white";
  tmpCtx.fillRect(0, 0, tmp.width, tmp.height);

  var tmp2 = document.createElement("canvas");
  tmp2.height = croppedHeight;
  tmp2.width = croppedWidth;
  var tmp2Ctx = tmp2.getContext("2d");
  tmp2Ctx.putImageData(croppedData, 0, 0);

  // Draw the cropped image onto the temporary canvas with padding
  tmpCtx.drawImage(tmp2, padding, padding);
  // download image
  download(tmp.toDataURL("image/png"), "automaton.png");
}

function saveSelectedAsPng() {
  var canvas2 = document.createElement("canvas");
  var bounds = getSelectedBoundingRect();
  var ctx2 = canvas2.getContext("2d");

  canvas2.height = bounds[3] - bounds[1];
  canvas2.width = bounds[2] - bounds[0];

  var croppedHeight = canvas2.height;
  var croppedWidth = canvas2.width;

  var nodesTmp = [...nodes];
  var nodesToSave = [];
  var linksTmp = [...links];
  var linksToSave = [];
  selectedObjects.forEach((obj) => {
    if (obj instanceof Node) nodesToSave.push(obj);
    else linksToSave.push(obj);
  });

  selectedObjects = [];
  nodes = [...nodesToSave];
  links = [...linksToSave];

  draw(false);

  var croppedData = canvas
    .getContext("2d")
    .getImageData(bounds[0], bounds[1], croppedWidth, croppedHeight);

  ctx2.putImageData(croppedData, 0, 0);

  // Create a temporary canvas to generate PNG data with padding.
  var tmp = document.createElement("canvas");
  var padding = 16; // Adjust the padding as needed (1em = 16px)
  tmp.width = croppedWidth + 2 * padding;
  tmp.height = croppedHeight + 2 * padding;
  var tmpCtx = tmp.getContext("2d");

  tmpCtx.fillStyle = "white";
  tmpCtx.fillRect(0, 0, tmp.width, tmp.height);

  tmpCtx.drawImage(canvas2, padding, padding);

  download(tmp.toDataURL("image/png"), "automaton.png");

  nodes = [...nodesTmp];
  links = [...linksTmp];
  selectedObjects = [...nodesToSave, ...linksToSave];

  draw();
}

function getSelectedBoundingRect() {
  var nodesTmp = [...nodes];
  var nodesToSave = [];
  var linksTmp = [...links];
  var linksToSave = [];
  selectedObjects.forEach((obj) => {
    if (obj instanceof Node) nodesToSave.push(obj);
    else linksToSave.push(obj);
  });

  selectedObjects = [];
  nodes = [...nodesToSave];
  links = [...linksToSave];

  draw(false);

  var bounds = getBoundingRect();

  nodes = [...nodesTmp];
  links = [...linksTmp];
  selectedObjects = [...nodesToSave, ...linksToSave];

  draw();

  return bounds;
}

// Returns a bounding rectangle that contains all non-empty pixels. Returns an
// array: [min x, min y, max x, max y].
function getBoundingRect() {
  var context = canvas.getContext("2d");
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  var indexToLocation = function (i) {
    var pixelIndex = Math.floor(i / 4);
    var col = Math.floor(pixelIndex % canvas.width);
    var row = Math.floor(pixelIndex / canvas.width);
    return [col, row];
  };

  // Search for non-blank pixels and keep track of the outermost locations to
  // form the rectangle.
  var maxX = -1;
  var minX = canvas.width + 1;
  var maxY = -1;
  var minY = canvas.height + 1;
  for (var i = 0; i < imageData.data.length; i++) {
    if (imageData.data[i] != 0) {
      var loc = indexToLocation(i);
      var x = loc[0];
      var y = loc[1];
      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }
      if (y < minY) {
        minY = y;
      }
      if (y > maxY) {
        maxY = y;
      }
    }
  }
  // Return the full canvas if all pixels were blank.
  if (minX >= maxX) {
    return [0, 0, canvas.width, canvas.height];
  }
  // Add some padding around the image.
  var padding = 2;
  minX -= padding;
  minY -= padding;
  maxX += padding;
  maxY += padding;
  if (minX < 0) minX = 0;
  if (minY < 0) minY = 0;
  if (maxX > canvas.width) maxX = canvas.width;
  if (maxY > canvas.width) maxY = canvas.width;
  return [minX, minY, maxX, maxY];
}

function downloadFile(filename, data, type) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:" + type + ";base64," + btoa(data));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function download(url, filename) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    })
    .catch(console.error);
}

function downloadSVGFile(filename, svgData) {
  downloadFile(filename, svgData, "image/svg+xml");
}

function saveAsSVG() {
  var bounds = getBoundingRect();
  var exporter = new ExportAsSVG(bounds);
  var oldSelectedObjects = selectedObjects;
  selectedObjects = [];
  drawUsing(exporter);
  selectedObjects = oldSelectedObjects;
  var svgData = exporter.toSVG();
  downloadSVGFile("automaton.svg", svgData);
}

function saveSelectedAsSvg(flag = false) {
  var bounds = getSelectedBoundingRect();
  var exporter = new ExportAsSVG(bounds);
  var nodesTmp = [...nodes];
  var nodesToSave = [];
  var linksTmp = [...links];
  var linksToSave = [];
  selectedObjects.forEach((obj) => {
    if (obj instanceof Node) nodesToSave.push(obj);
    else linksToSave.push(obj);
  });

  selectedObjects = [];
  nodes = [...nodesToSave];
  links = [...linksToSave];

  drawUsing(exporter);

  var svgData = exporter.toSVG();
  if (!flag) downloadSVGFile("automaton.svg", svgData);

  nodes = [...nodesTmp];
  links = [...linksTmp];
  selectedObjects = [...nodesToSave, ...linksToSave];

  draw();

  return svgData;
}

function saveAsLaTeX() {
  var bounds = getBoundingRect();
  var exporter = new ExportAsLaTeX(bounds);
  var oldSelectedObjects = selectedObjects;
  selectedObjects = [];
  drawUsing(exporter);
  selectedObjects = oldSelectedObjects;
  var texData = exporter.toLaTeX();
  downloadText("automaton.txt", texData);
}

function saveSelectedAsLaTeX() {
  var bounds = getSelectedBoundingRect();
  var exporter = new ExportAsSVG(bounds);
  var nodesTmp = [...nodes];
  var nodesToSave = [];
  var linksTmp = [...links];
  var linksToSave = [];
  selectedObjects.forEach((obj) => {
    if (obj instanceof Node) nodesToSave.push(obj);
    else linksToSave.push(obj);
  });

  selectedObjects = [];
  nodes = [...nodesToSave];
  links = [...linksToSave];

  drawUsing(exporter);

  var texData = exporter.toLaTeX();
  downloadSVGFile("automaton.svg", texData);

  nodes = [...nodesTmp];
  links = [...linksTmp];
  selectedObjects = [...nodesToSave, ...linksToSave];

  draw();
}

function downloadText(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function saveAsJSON() {
  var jsonData = JSON.stringify(getBackupData());
  downloadFile("automaton_backup.json", jsonData, "text/json");
}

function saveSelectedAsJSON() {
  var nodesTmp = [...nodes];
  var nodesToSave = [];
  var linksTmp = [...links];
  var linksToSave = [];
  selectedObjects.forEach((obj) => {
    if (obj instanceof Node) nodesToSave.push(obj);
    else linksToSave.push(obj);
  });

  nodes = [...nodesToSave];
  links = [...linksToSave];

  var jsonData = JSON.stringify(getBackupData());
  downloadFile("automaton_backup.json", jsonData, "text/json");

  nodes = [...nodesTmp];
  links = [...linksTmp];

  draw();
}

function jsonUploaded() {
  var uploadElement = document.getElementById("jsonUpload");
  if (uploadElement.files.length < 1) return;
  var file = uploadElement.files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var content = e.target.result;
    try {
      var data = JSON.parse(content);
      var nodesTmp = [...nodes];
      var linksTmp = [...links];
      nodes = [];
      links = [];
      restoreFromBackupData(data, false);
      nodes.push(...nodesTmp);
      links.push(...linksTmp);
      draw();
    } catch (e) {
      alert("Failed loading file " + file.name);
    }
  };
  reader.readAsText(file);
}

function uploadJSON() {
  var uploadElement = document.getElementById("jsonUpload");
  uploadElement.click();
}

function det(a, b, c, d, e, f, g, h, i) {
  return a * e * i + b * f * g + c * d * h - a * f * h - b * d * i - c * e * g;
}

function circleFromThreePoints(x1, y1, x2, y2, x3, y3) {
  var a = det(x1, y1, 1, x2, y2, 1, x3, y3, 1);
  var bx = -det(
    x1 * x1 + y1 * y1,
    y1,
    1,
    x2 * x2 + y2 * y2,
    y2,
    1,
    x3 * x3 + y3 * y3,
    y3,
    1
  );
  var by = det(
    x1 * x1 + y1 * y1,
    x1,
    1,
    x2 * x2 + y2 * y2,
    x2,
    1,
    x3 * x3 + y3 * y3,
    x3,
    1
  );
  var c = -det(
    x1 * x1 + y1 * y1,
    x1,
    y1,
    x2 * x2 + y2 * y2,
    x2,
    y2,
    x3 * x3 + y3 * y3,
    x3,
    y3
  );
  return {
    x: -bx / (2 * a),
    y: -by / (2 * a),
    radius: Math.sqrt(bx * bx + by * by - 4 * a * c) / (2 * Math.abs(a)),
  };
}

function fixed(number, digits) {
  return number.toFixed(digits).replace(/0+$/, "").replace(/\.$/, "");
}

function restoreFromBackupData(backup, flag = true) {
  for (var i = 0; i < backup.nodes.length; i++) {
    var backupNode = backup.nodes[i];
    var node = new Node(backupNode.x, backupNode.y);
    node.isAcceptState = backupNode.isAcceptState;
    node.text = backupNode.text;
    node.textOnly = backupNode.textOnly;
    nodes.push(node);
  }
  for (var i = 0; i < backup.links.length; i++) {
    var backupLink = backup.links[i];
    var link = null;
    if (backupLink.type == "SelfLink") {
      link = new SelfLink(nodes[backupLink.node]);
      link.anchorAngle = backupLink.anchorAngle;
      link.text = backupLink.text;
    } else if (backupLink.type == "StartLink") {
      link = new StartLink(nodes[backupLink.node]);
      link.deltaX = backupLink.deltaX;
      link.deltaY = backupLink.deltaY;
      link.text = backupLink.text;
    } else if (backupLink.type == "Link") {
      link = new Link(nodes[backupLink.nodeA], nodes[backupLink.nodeB]);
      link.parallelPart = backupLink.parallelPart;
      link.perpendicularPart = backupLink.perpendicularPart;
      link.text = backupLink.text;
      link.lineAngleAdjust = backupLink.lineAngleAdjust;
    }
    if (link != null) {
      links.push(link);
    }
  }
  nodeRadius = backup.nodeRadius;
  document.getElementById("rangeSlider").value = `${nodeRadius}`;

  if (flag) draw();
}

function restoreBackup(data = localStorage["fsm"]) {
  if (!localStorage || !JSON) {
    return;
  }

  try {
    var backup = JSON.parse(data);
    restoreFromBackupData(backup);
  } catch (e) {
    localStorage["fsm"] = "";
  }
}

function getBackupData() {
  var backup = {
    nodes: [],
    links: [],
    nodeRadius: nodeRadius,
  };
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var backupNode = {
      x: node.x,
      y: node.y,
      text: node.text,
      isAcceptState: node.isAcceptState,
      textOnly: node.textOnly,
    };
    backup.nodes.push(backupNode);
  }
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var backupLink = null;
    if (link instanceof SelfLink) {
      backupLink = {
        type: "SelfLink",
        node: nodes.indexOf(link.node),
        text: link.text,
        anchorAngle: link.anchorAngle,
      };
    } else if (link instanceof StartLink) {
      backupLink = {
        type: "StartLink",
        node: nodes.indexOf(link.node),
        text: link.text,
        deltaX: link.deltaX,
        deltaY: link.deltaY,
      };
    } else if (link instanceof Link) {
      backupLink = {
        type: "Link",
        nodeA: nodes.indexOf(link.nodeA),
        nodeB: nodes.indexOf(link.nodeB),
        text: link.text,
        lineAngleAdjust: link.lineAngleAdjust,
        parallelPart: link.parallelPart,
        perpendicularPart: link.perpendicularPart,
      };
    }
    if (backupLink != null) {
      backup.links.push(backupLink);
    }
  }
  return backup;
}

var redoStack = [];
var undoStack = [];

function saveBackup() {
  if (!localStorage || !JSON) return;

  var range = document.getElementById("history");
  range.max = undoStack.length + redoStack.length - 1;

  if (!sliderMouseDown) {
    updateRangeValue();
  }

  var backup = getBackupData();

  if (
    localStorage["fsm"] !== undoStack[undoStack.length - 1] &&
    (!mouseDown || sliderMouseDown || zKey || yKey)
  ) {
    undoStack.push(localStorage["fsm"]);
  }

  localStorage["fsm"] = JSON.stringify(backup);
}

function undo() {
  if (!localStorage || !JSON || undoStack.length <= 1) {
    return;
  }

  if (undoStack[undoStack.length - 1] != localStorage["fsm"])
    undoStack.push(localStorage["fsm"]);

  redoStack.push(undoStack[undoStack.length - 1]);
  undoStack.pop();

  clearCanvas();
  restoreBackup(undoStack[undoStack.length - 1]);

  undoStack.pop();

  selectedObjects = [];
}

function redo() {
  if (!localStorage || !JSON || redoStack.length == 0) {
    return;
  }

  undoStack.push(redoStack[redoStack.length - 1]);
  redoStack.pop();

  clearCanvas();
  restoreBackup(undoStack[undoStack.length - 1]);

  undoStack.pop();

  selectedObjects = [];
}

function updateSlider() {
  var range = document.getElementById("history");
  var undoLen = undoStack.length - 1;
  if (range.value > undoLen)
    for (var i = 0; i < range.value - undoLen; i++) redo();
  else for (var i = 0; i < -range.value + undoLen; i++) undo();
  updateRangeValue();
}

function updateRangeValue() {
  document.getElementById("history").value = undoStack.length - 1;
}

function copy() {
  selectedObjects.forEach((e) => {
    if (e instanceof Node) copied = [];
    return;
  });

  selectedObjects.forEach((e) => {
    if (e instanceof Node) {
      copied.push(new Node(e.x, e.y));
      copied[copied.length - 1].mouseOffsetX = e.mouseOffsetX;
      copied[copied.length - 1].mouseOffsetY = e.mouseOffsetY;
      copied[copied.length - 1].isAcceptState = e.isAcceptState;
      copied[copied.length - 1].textOnly = e.textOnly;
      copied[copied.length - 1].text = e.text;
      copied[copied.length - 1].parent = e;
    }
  });

  links.forEach((e) => {
    if (
      e instanceof Link &&
      inArr(e.nodeA, selectedObjects) &&
      inArr(e.nodeB, selectedObjects)
    ) {
      copied.push(
        new Link(
          getElementWithParent(e.nodeA, copied),
          getElementWithParent(e.nodeB, copied)
        )
      );
      copied[copied.length - 1].lineAngleAdjust = e.lineAngleAdjust;
      copied[copied.length - 1].parallelPart = e.parallelPart;
      copied[copied.length - 1].perpendicularPart = e.perpendicularPart;
      copied[copied.length - 1].text = e.text;
    } else if (e instanceof SelfLink && inArr(e.node, selectedObjects)) {
      copied.push(new SelfLink(getElementWithParent(e.node, copied)));
      copied[copied.length - 1].anchorAngle = e.anchorAngle;
      copied[copied.length - 1].mouseOffsetAngle = e.mouseOffsetAngle;
      copied[copied.length - 1].text = e.text;
    } else if (e instanceof StartLink && inArr(e.node, selectedObjects)) {
      copied.push(new StartLink(getElementWithParent(e.node, copied)));
      copied[copied.length - 1].deltaX = e.deltaX;
      copied[copied.length - 1].deltaY = e.deltaY;
      copied[copied.length - 1].text = e.text;
    }
  });
}

function paste() {
  if (copied.length > 0) selectedObjects = [];
  copied.forEach((object) => {
    if (object instanceof Node) {
      object.x += 20;
      object.y += 20;
      nodes.push(object);
    } else {
      links.push(object);
    }

    selectedObjects.push(object);
  });

  copy();

  redoStack = [];

  draw();
}

function inArr(obj, arr) {
  let out = false;
  arr.forEach((e) => {
    if (e == obj) out = true;
  });
  return out;
}

function getElementWithParent(parent, arr) {
  var out = null;
  arr.forEach((e) => {
    if (e.parent == parent) {
      out = e;
      return;
    }
  });
  return out;
}

function selectAutomaton(object) {
  selectedText = [-1, -1, -1];

  if (!inArr(object, selectedObjects)) selectedObjects.push(object);

  if (object instanceof Node) {
    links.forEach((link) => {
      if (
        (link.node == object || link.nodeA == object || link.nodeB == object) &&
        !inArr(link, selectedObjects)
      ) {
        selectAutomaton(link);
      }
    });
  } else if (object instanceof Link) {
    if (!inArr(object.nodeA, selectedObjects)) selectAutomaton(object.nodeA);
    if (!inArr(object.nodeB, selectedObjects)) selectAutomaton(object.nodeB);
  } else if (object instanceof SelfLink || object instanceof StartLink) {
    if (!inArr(object.node, selectedObjects)) selectAutomaton(object.node);
  }
}

function deleteSelected() {
  if (selectedObjects.length != 0) {
    for (var i = 0; i < nodes.length; i++) {
      selectedObjects.forEach((object) => {
        if (nodes[i] == object) {
          nodes.splice(i--, 1);
        }
      });
    }

    for (var i = 0; i < links.length; i++) {
      selectedObjects.forEach((object) => {
        try {
          if (
            links[i] == object ||
            links[i].node == object ||
            links[i].nodeA == object ||
            links[i].nodeB == object
          ) {
            links.splice(i--, 1);
          }
        } catch (err) {}
      });
    }
    selectedObjects = [];

    redoStack = [];

    draw();
  }
}

function handleKeyEvent(selectedObject, e) {
  var key = crossBrowserKey(e);
  var text = selectedObject.text;

  if (key >= 35 && key <= 39) e.preventDefault();

  if (e.ctrlKey && (key === 37 || key === 39)) {
    if (key === 39) {
      if (e.shiftKey) selectToNextSpace(text, true);
      else moveCaretToNextSpace(text, true);
    } else if (key === 37) {
      if (e.shiftKey) selectToNextSpace(text, false);
      else moveCaretToNextSpace(text, false);
    }
  } else if (!e.shiftKey) {
    handleNonShiftKey(key, text);
  } else {
    handleShiftKey(key, text);
  }
}

function handleNonShiftKey(key, text) {
  var [start, end, caret] = selectedText;

  if (start !== end) {
    handleNonEmptySelection(key, selectedText);
  } else {
    handleEmptySelection(key, text);
  }
}

function handleNonEmptySelection(key, selectedText) {
  var [start, end, caret] = selectedText;

  switch (key) {
    case 39:
      selectedText[2] = selectedText[0] = selectedText[1];
      break;
    case 37:
      selectedText[2] = selectedText[1] = selectedText[0];
      break;
    default:
      break;
  }
}

function handleEmptySelection(key, text) {
  var [start, end, caret] = selectedText;

  switch (key) {
    case 39:
      selectedText[2] = selectedText[0] = ++selectedText[1];
      break;
    case 35:
      selectedText[2] = selectedText[0] = selectedText[1] = text.length;
      break;
    case 37:
      selectedText[2] = selectedText[1] = --selectedText[0];
      break;
    case 36:
      selectedText[2] = selectedText[1] = selectedText[0] = 0;
      break;
    default:
      break;
  }
}

function handleShiftKey(key, text) {
  var [start, end, caret] = selectedText;

  if (start === end) {
    handleEmptySelectionWithShift(key, text);
  } else if (end === caret) {
    handleEndSelectionWithShift(key, text);
  } else {
    handleMidSelectionWithShift(key, text);
  }
}

function handleEmptySelectionWithShift(key, text) {
  var [start, end, caret] = selectedText;

  switch (key) {
    case 39:
      selectedText[2] = ++selectedText[1];
      break;
    case 35:
      selectedText[2] = selectedText[1] = text.length;
      break;
    case 37:
      selectedText[2] = --selectedText[0];
      break;
    case 36:
      selectedText[2] = selectedText[0] = 0;
      break;
    default:
      break;
  }
}

function handleEndSelectionWithShift(key, text) {
  var [start, end, caret] = selectedText;

  switch (key) {
    case 39:
      selectedText[1]++;
      selectedText[2] = selectedText[1];
      break;
    case 35:
      selectedText[1] = text.length;
      selectedText[2] = selectedText[1];
      break;
    case 37:
      selectedText[2] = --selectedText[1];
      break;
    case 36:
      selectedText[1] = selectedText[0];
      selectedText[0] = 0;
      selectedText[2] = selectedText[0];
      break;
    default:
      break;
  }
}

function handleMidSelectionWithShift(key) {
  var [start, end, caret] = selectedText;

  switch (key) {
    case 39:
      selectedText[0]++;
      selectedText[2] = selectedText[0];
      break;
    case 35:
      selectedText[0] = selectedText[1];
      selectedText[1] = text.length;
      selectedText[2] = selectedText[1];
      break;
    case 37:
      selectedText[0]--;
      selectedText[2] = selectedText[0];
      break;
    case 36:
      selectedText[0] = 0;
      selectedText[2] = selectedText[0];
      break;
    default:
      break;
  }
}

function moveCaretToNextSpace(text, moveRight) {
  var [start, end, caret] = selectedText;
  let newIndex = caret;

  if (moveRight) {
    var i = 0;
    do {
      newIndex = text.indexOf(" ", caret + i);
    } while (newIndex == caret + i++);

    if (newIndex === -1) {
      newIndex = text.length;
    }
  } else {
    var i = 0;
    do {
      newIndex = text.substring(0, caret - i).lastIndexOf(" ") + 1;
    } while (newIndex == caret - i++);

    if (newIndex === -1) {
      newIndex = 0;
    }
  }

  selectedText[0] = selectedText[1] = newIndex;
  selectedText[2] = newIndex;
}

function selectToNextSpace(text, moveRight) {
  var [start, end, caret] = selectedText;
  let newIndex = caret;

  if (moveRight) {
    var i = 0;
    do {
      newIndex = text.indexOf(" ", caret + i);
    } while (newIndex == caret + i++);

    if (newIndex === -1) {
      newIndex = text.length;
    }
  } else {
    var i = 0;
    do {
      newIndex = text.substring(0, caret - i).lastIndexOf(" ") + 1;
    } while (newIndex == caret - i++);

    if (newIndex === -1) {
      newIndex = 0;
    }
  }

  if (selectedText[1] == selectedText[2]) {
    selectedText[1] = newIndex;
  } else if (selectedText[0] == selectedText[2]) {
    selectedText[0] = newIndex;
  }
  var txt0 = selectedText[0];
  var txt1 = selectedText[1];
  selectedText[0] = Math.min(txt0, txt1);
  selectedText[1] = Math.max(txt0, txt1);
  selectedText[2] = newIndex;
}

function run(start, word) {
  word = convertLatexShortcuts(word);

  if (word.length == 0) {
    if (start.isAcceptState) {
      start.runtimeColor = "green";
      console.log(`accepted ((${convertLatexShortcuts(start.text)}))`);
    } else {
      start.runtimeColor = "red";
      console.log(`declined ( ${convertLatexShortcuts(start.text)} )`);
    }
    return;
  }

  selectedObjects.push(start);

  if (word.charAt(0) == "ε") return run(start, word.substring(1));

  var stay = true;

  for (var i = 0; i < links.length; i++) {
    const link = links[i];
    if (
      link.nodeA == start &&
      (inArr(word.charAt(0), link.text.split(/[\s\r]*,[\s\r]*/)) ||
        inArr("\\Sigma", link.text.split(/[\s\r]*,[\s\r]*/)))
    ) {
      selectedObjects.push(link);
      run(link.nodeB, word.substring(1));
      stay = false;
    } else if (
      link.node == start &&
      link instanceof SelfLink &&
      (inArr(word.charAt(0), link.text.split(/[\s\r]*,[\s\r]*/)) ||
        inArr("\\Sigma", link.text.split(/[\s\r]*,[\s\r]*/)))
    ) {
      selectedObjects.push(link);
      run(link.node, word.substring(1));
      stay = false;
    }
  }

  if (stay) {
    run(start, word.substring(1));
  }
}

function getAlphabet(object, selected = []) {
  var alphabet = [];

  if (!inArr(object, selected)) selected.push(object);

  if (object instanceof Node) {
    links.forEach((link) => {
      if (
        (link.node == object || link.nodeA == object || link.nodeB == object) &&
        !inArr(link, selected)
      ) {
        getAlphabet(link, selected).forEach((letter) => {
          if (letter != "\\Sigma" && letter != "\\epsilon" && letter != "")
            alphabet.push(letter);
        });
      }
    });
  } else if (!(object instanceof StartLink)) {
    object.text.split(/\s*,\s*/).forEach((letter) => {
      if (letter != "\\Sigma" && letter != "\\epsilon" && letter != "")
        alphabet.push(letter);
    });

    if (object instanceof Link) {
      if (!inArr(object.nodeA, selected))
        getAlphabet(object.nodeA, selected).forEach((letter) => {
          if (letter != "\\Sigma" && letter != "\\epsilon" && letter != "")
            alphabet.push(letter);
        });
      if (!inArr(object.nodeB, selected))
        getAlphabet(object.nodeB, selected).forEach((letter) => {
          if (letter != "\\Sigma" && letter != "\\epsilon" && letter != "")
            alphabet.push(letter);
        });
    } else if (object instanceof SelfLink) {
      if (!inArr(object.node, selected))
        getAlphabet(object.node, selected).forEach((letter) => {
          if (letter != "\\Sigma" && letter != "\\epsilon" && letter != "")
            alphabet.push(letter);
        });
    }
  }

  return Array.from(new Set(alphabet));
}

function isFull(object, selected = []) {
  if (!object || inArr(object, selected) || object instanceof StartLink)
    return true;

  if (!(object instanceof Node))
    return isFull(object.node, selected) && isFull(object.nodeA, selected);

  var alphabet = getAlphabet(object);

  selected.push(object);

  if (
    Array.from(new Set(getLetters(object))).length != alphabet.length &&
    !inArr("\\Sigma", getLetters(object))
  ) {
    return false;
  }

  var out = true;

  links.forEach((link) => {
    if (object == link.nodeA || object == link.node)
      out = out && isFull(link.node, selected) && isFull(link.nodeB, selected);
  });

  return out;
}

function isDeterministic(object, selected = []) {
  if (!object || inArr(object, selected) || object instanceof StartLink)
    return true;

  selected.push(object);

  if (
    Array.from(new Set(getLetters(object))).length != getLetters(object).length
  ) {
    return false;
  }

  var out = true;

  links.forEach((link) => {
    if (object == link.nodeA || object == link.node)
      out =
        out &&
        isDeterministic(link.node, selected) &&
        isDeterministic(link.nodeB, selected);
  });

  return out;
}

function getLetters(object) {
  var letters = [];

  links.forEach((link) => {
    if (object == link.nodeA || object == link.node)
      link.text.split(/\s*,\s*/).forEach((letter) => {
        if (letter != "\\epsilon" && letter != "") letters.push(letter);
      });
  });

  return letters;
}

function equals(a, b) {
  var out = true;

  a.forEach((e) => {
    out = out && inArr(e, b);
  });

  b.forEach((e) => {
    out = out && inArr(e, a);
  });

  return out;
}

function updateSelectionBox(mouse) {
  if (fromX == null && fromY == null) {
    orgX = toX = fromX = mouse.x;
    orgY = toY = fromY = mouse.y;
  } else {
    toX = mouse.x;
    toY = mouse.y;
  }
}
