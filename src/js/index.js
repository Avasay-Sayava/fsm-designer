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

function convertLatexShortcuts(text) {
  text = text
    .replaceAll("*", "∗")
    .replaceAll(">=", "≥")
    .replaceAll("<=", "≤")
    .replaceAll("!=", "≠");
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
    if (name == "lang") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "ℒ");
      continue;
    }
    if (name == "exists") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "Ǝ");
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

  for (var i = 0; i < text.length; i++) {
    if (subscripts[text.charAt(i)])
      text = text.replace("_" + text.charAt(i), subscripts[text.charAt(i)]);
    if (superscripts[text.charAt(i)])
      text = text.replace("^" + text.charAt(i), superscripts[text.charAt(i)]);
  }

  for (var i = 0; i < text.length; i++) {
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

function drawText(
  c,
  originalText,
  x,
  y,
  angleOrNull,
  isSelected,
  start = 0,
  xCentered = true,
  yCentered = true
) {
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
  if (xCentered) x -= width / 2;

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
        !isSelected ||
        selectedObjects.length != 1
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

function drawMultilineText(
  c,
  originalText,
  x,
  y,
  angleOrNull,
  isSelected,
  xCentered = true,
  yCentered = true
) {
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

  if (yCentered) y -= ((originalText.split("\r").length - 1) * 25) / 2;

  originalText.split("\r").forEach((line, i) => {
    drawText(
      c,
      line,
      x,
      y + 25 * i,
      angleOrNull,
      isSelected,
      start++,
      xCentered,
      yCentered
    );
    start += line.length;
  });
}

var caretTimer;
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
var displayFont = '20px "Cambria Math", "XITS Math", Calibri';
var nodes = [];
var links = [];
var cells = [];
var textBoxes = [];

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
  cells = [];
  textBoxes = [];
  localStorage["fsm"] = JSON.stringify(getBackupData());
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  nodeRadius = 30;
  document.getElementById("rangeSlider").value = 30;
}

function toggleOutline() {
  selectedObjects.forEach((object) => {
    if ("outline" in object) {
      object.outline = !object.outline;
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
  for (var i = 0; i < textBoxes.length; i++) {
    c.lineWidth = 1;

    c.fillStyle = c.strokeStyle = inArr(textBoxes[i], selectedObjects)
      ? textBoxes[i] == selectObject(mouseX, mouseY)
        ? "rgba(0,0,255,0.7)"
        : "blue"
      : textBoxes[i] == selectObject(mouseX, mouseY)
      ? "rgba(0,0,0,0.7)"
      : "black";
    textBoxes[i].draw(c);
  }
  for (var i = 0; i < cells.length; i++) {
    c.lineWidth = 1;

    c.fillStyle = c.strokeStyle = inArr(cells[i], selectedObjects)
      ? cells[i] == selectObject(mouseX, mouseY)
        ? "rgba(0,0,255,0.7)"
        : "blue"
      : cells[i] == selectObject(mouseX, mouseY)
      ? "rgba(0,0,0,0.7)"
      : "black";
    cells[i].draw(c);
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
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].containsPoint(x, y)) {
      return cells[i];
    }
  }
  for (var i = 0; i < textBoxes.length; i++) {
    if (textBoxes[i].containsPoint(x, y)) {
      return textBoxes[i];
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
      var data = link.getEndPoints();
      if (
        2 * top <= data.startY + data.endY &&
        data.startY + data.endY <= 2 * bottom &&
        2 * left <= data.startX + data.endX &&
        data.startX + data.endX <= 2 * right
      ) {
        objects.push(link);
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
        for (var i = 0; i < selectedObjects.length; i++) {
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
      if (e.altKey) {
        selectedObject = new TextBox("enter text", mouse.x, mouse.y);
        if (e.ctrlKey) selectedObjects.push(selectedObject);
        else selectedObjects = [selectedObject];
        textBoxes.push(selectedObject);
        selectedText = [
          selectedObject.text.length,
          selectedObject.text.length,
          selectedObject.text.length,
        ];
        draw();
      } else {
        selectedObject = new Node(mouse.x, mouse.y);
        if (e.ctrlKey) selectedObjects.push(selectedObject);
        else selectedObjects = [selectedObject];
        nodes.push(selectedObject);
        selectedText = [0, 0, 0];
        resetCaret();
        draw();
      }
    } else if (selectedObject instanceof Node) {
      selectedObject.isAcceptState = !selectedObject.isAcceptState;
      draw();
    } else if (selectedObject instanceof Cell) {
      selectedObject.tape.add("\\Delta", selectedObject.index + 1);
      selectedObject.tape.align();
      selectedObjects = [selectedObject.tape.cells[selectedObject.index + 1]];
      selectedText = [
        selectedObjects[0].text.length,
        selectedObjects[0].text.length,
        selectedObjects[0].text.length,
      ];
      draw();
    } else if (selectedObject instanceof TextBox && e.altKey) {
      for (var i = 0; i < textBoxes.length; i++) {
        if (selectedObject == textBoxes[i]) textBoxes.splice(i--, 1);
      }
      selectedObject = new Tape(selectedObject.x, selectedObject.y);
      if (e.ctrlKey) selectedObjects.push(selectedObject.cells[0]);
      else selectedObjects = [selectedObject.cells[0]];
      selectedText = [
        selectedObject.cells[0].text.length,
        selectedObject.cells[0].text.length,
        selectedObject.cells[0].text.length,
      ];
      draw();
    }
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
        if (
          selectedObjects.length == 1 ||
          object instanceof Node ||
          object instanceof TextBox
        )
          object.setAnchorPoint(mouse.x, mouse.y);
        if (object instanceof Node) snapNode(object);
        draw();
      });
    } else if (!movingObject && mouseDown && currentLink == null) {
      updateSelectionBox(mouse);
    }
  };

  canvas.onmouseup = function (e) {
    var selectedObject = selectedObjects[selectedObjects.length - 1];
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
      } else {
        nodes.push(new Node(currentLink.to.x, currentLink.to.y));
        if (selectedObject) {
          links.push(new Link(selectedObject, nodes[nodes.length - 1]));
          selectedObjects = [nodes[nodes.length - 1]];
        } else {
          links.push(new StartLink(nodes[nodes.length - 1], currentLink.from));
          selectedObjects = [nodes[nodes.length - 1]];
        }

        selectedText = [0, 0, 0];

        resetCaret();
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
              selectedObjects[0].text.substring(0, selectedText[2]) +
              copiedText +
              selectedObjects[0].text.substring(
                selectedText[2],
                selectedObjects[0].text.length
              );
            selectedText[2] =
              selectedText[0] =
              selectedText[1] +=
                copiedText.length;
          } else {
            selectedObjects[0].text =
              selectedObjects[0].text.substring(0, selectedText[0]) +
              copiedText +
              selectedObjects[0].text.substring(selectedText[1]);
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
          if (object instanceof Cell) {
            selectedObjects.push(...object.tape.cells);
            selectedObjects = Array.from(new Set(selectedObjects));
          } else {
            selectAutomaton(object);
          }
        });
      } else if (e.shiftKey) {
        if (selectedObjects.length == 1)
          selectedText = [
            0,
            selectedObjects[0].text.length,
            selectedObjects[0].text.length,
          ];
      } else {
        selectedObjects = [...nodes, ...links, ...cells, ...textBoxes];
        selectedText = [
          selectedObjects[0].text.length,
          selectedObjects[0].text.length,
          selectedObjects[0].text.length,
        ];
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

        if (selectedObjects[0].align) selectedObjects[0].align();
        if (selectedObjects[0].tape) selectedObjects[0].tape.align();

        resetCaret();
        draw();

        if (selectedObjects.length == 1) {
          if (selectedObjects[0] instanceof StartLink)
            document.getElementById("info").innerHTML = `
                <p>Automata info:</p>
                <p>Full: ${isFull(selectedObjects[0].node)}</p>
                <p>Deterministic: ${isDeterministic(
                  selectedObjects[0].node
                )}</p>
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

      // backspace is a shortcut for the back button, but do NOT want to change pages
      return false;
    }
  }

  if (key == 9) {
    if (selectedObjects.length == 1 && selectedObjects[0] instanceof Cell) {
      if (e.shiftKey)
        selectedObjects = [selectedObjects[0].left() || selectedObjects[0]];
      else selectedObjects = [selectedObjects[0].right() || selectedObjects[0]];
      selectedText = [
        selectedObjects[0].text.length,
        selectedObjects[0].text.length,
        selectedObjects[0].text.length,
      ];
      e.preventDefault();
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

    if (selectedObjects[0].align) selectedObjects[0].align();
    if (selectedObjects[0].tape) selectedObjects[0].tape.align();

    draw();
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
          selectedObjects[0].text.substring(0, selectedText[2] - 1) +
          selectedObjects[0].text.substring(
            selectedText[2],
            selectedObjects[0].text.length
          );
        selectedText[2] = selectedText[0] = selectedText[1] -= 1;
      } else {
        selectedObjects[0].text =
          selectedObjects[0].text.substring(0, selectedText[0]) +
          selectedObjects[0].text.substring(
            selectedText[1],
            selectedObjects[0].text.length
          );
        selectedText[2] = selectedText[1] = selectedText[0];
      }

      if (selectedObjects[0].align) selectedObjects[0].align();
      if (selectedObjects[0].tape) selectedObjects[0].tape.align();

      resetCaret();
      draw();
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

    // backspace is a shortcut for the back button, but do NOT want to change pages
    return false;
  } else if (key == 46) {
    // delete key
    deleteSelected();
  }
};

document.onkeypress = function (e) {
  if (canvasFocus) e.preventDefault();

  // don't read keystrokes when other things have focus
  var key = crossBrowserKey(e);
  if (!canvasHasFocus()) {
    // don't read keystrokes when other things have focus
    return true;
  } else if (
    // ((key >= 0x20 && key <= 0x7e) || key == 13) &&
    !e.metaKey &&
    !e.altKey &&
    !e.ctrlKey &&
    selectedObjects.length == 1 &&
    "text" in selectedObjects[0]
  ) {
    if (selectedText[0] == selectedText[1]) {
      if (
        !(
          (key == 41 &&
            selectedObjects[0].text.substr(selectedText[0], 1) == ")") ||
          (key == 93 &&
            selectedObjects[0].text.substr(selectedText[0], 1) == "]") ||
          (key == 125 &&
            selectedObjects[0].text.substr(selectedText[0], 1) == "}")
        )
      )
        selectedObjects[0].text =
          selectedObjects[0].text.substring(0, selectedText[2]) +
          (key == 40
            ? "()"
            : key == 91
            ? "[]"
            : key == 123
            ? "{}"
            : String.fromCharCode(key)) +
          selectedObjects[0].text.substring(
            selectedText[2],
            selectedObjects[0].text.length
          );
      selectedText[2] = selectedText[0] = ++selectedText[1];
    } else if (key == 40 || key == 123 || key == 91) {
      selectedObjects[0].text =
        selectedObjects[0].text.substring(0, selectedText[0]) +
        String.fromCharCode(key) +
        selectedObjects[0].text.substring(selectedText[0], selectedText[1]) +
        (key == 40
          ? String.fromCharCode(key + 1)
          : String.fromCharCode(key + 2)) +
        selectedObjects[0].text.substring(selectedText[1]);
      selectedText[0]++;
      selectedText[1]++;
      selectedText[2]++;
    } else {
      selectedObjects[0].text =
        selectedObjects[0].text.substring(0, selectedText[0]) +
        String.fromCharCode(key) +
        selectedObjects[0].text.substring(selectedText[1]);
      selectedText[2] = selectedText[1] = ++selectedText[0];
    }

    if (selectedObjects[0].align) selectedObjects[0].align();
    if (selectedObjects[0].tape) selectedObjects[0].tape.align();

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
  var cellsTmp = [...cells];
  var cellsToSave = [];
  var textBoxesTmp = [...textBoxes];
  var textBoxesToSave = [];
  selectedObjects.forEach((obj) => {
    if (obj instanceof Node) nodesToSave.push(obj);
    else if (obj instanceof Cell) cellsToSave.push(...obj.tape.cells);
    else if (obj instanceof TextBox) textBoxesToSave.push(obj);
    else linksToSave.push(obj);
  });

  nodes = [...nodesToSave];
  links = [...linksToSave];
  cells = Array.from(new Set(cellsToSave));
  textBoxes = [...textBoxesToSave];
  selectedObjects = [];

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
  cells = [...cellsTmp];
  textBoxes = [...textBoxesTmp];
  selectedObjects = [
    ...nodesToSave,
    ...linksToSave,
    ...cellsToSave,
    ...textBoxesToSave,
  ];

  draw();
}

function getSelectedBoundingRect() {
  var nodesTmp = [...nodes];
  var nodesToSave = [];
  var linksTmp = [...links];
  var linksToSave = [];
  var cellsTmp = [...cells];
  var cellsToSave = [];
  var textBoxesTmp = [...textBoxes];
  var textBoxesToSave = [];
  selectedObjects.forEach((obj) => {
    if (obj instanceof Node) nodesToSave.push(obj);
    else if (obj instanceof Cell) cellsToSave.push(...obj.tape.cells);
    else if (obj instanceof TextBox) textBoxesToSave.push(obj);
    else linksToSave.push(obj);
  });

  nodes = [...nodesToSave];
  links = [...linksToSave];
  cells = Array.from(new Set(cellsToSave));
  textBoxes = [...textBoxesToSave];
  selectedObjects = [];

  draw(false);

  var bounds = getBoundingRect();

  nodes = [...nodesTmp];
  links = [...linksTmp];
  cells = [...cellsTmp];
  textBoxes = [...textBoxesTmp];
  selectedObjects = [
    ...nodesToSave,
    ...linksToSave,
    ...cellsToSave,
    ...textBoxesToSave,
  ];

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
  element.setAttribute(
    "href",
    "data:" +
      type +
      ";base64," +
      window.btoa(unescape(encodeURIComponent(data)))
  );
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
  var cellsTmp = [...cells];
  var cellsToSave = [];
  var textBoxesTmp = [...textBoxes];
  var textBoxesToSave = [];
  selectedObjects.forEach((obj) => {
    if (obj instanceof Node) nodesToSave.push(obj);
    else if (obj instanceof Cell) cellsToSave.push(...obj.tape.cells);
    else if (obj instanceof TextBox) textBoxesToSave.push(obj);
    else linksToSave.push(obj);
  });

  nodes = [...nodesToSave];
  links = [...linksToSave];
  cells = Array.from(new Set(cellsToSave));
  textBoxes = [...textBoxesToSave];
  selectedObjects = [];

  drawUsing(exporter);

  var svgData = exporter.toSVG();
  if (!flag) downloadSVGFile("automaton.svg", svgData);

  nodes = [...nodesTmp];
  links = [...linksTmp];
  cells = [...cellsTmp];
  textBoxes = [...textBoxesTmp];
  selectedObjects = [
    ...nodesToSave,
    ...linksToSave,
    ...cellsToSave,
    ...textBoxesToSave,
  ];

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
  var cellsTmp = [...cells];
  var cellsToSave = [];
  var textBoxesTmp = [...textBoxes];
  var textBoxesToSave = [];
  selectedObjects.forEach((obj) => {
    if (obj instanceof Node) nodesToSave.push(obj);
    else if (obj instanceof Cell) cellsToSave.push(...obj.tape.cells);
    else if (obj instanceof TextBox) textBoxesToSave.push(obj);
    else linksToSave.push(obj);
  });

  nodes = [...nodesToSave];
  links = [...linksToSave];
  cells = Array.from(new Set(cellsToSave));
  textBoxes = [...textBoxesToSave];
  selectedObjects = [];

  drawUsing(exporter);

  var texData = exporter.toLaTeX();
  downloadSVGFile("automaton.svg", texData);

  nodes = [...nodesTmp];
  links = [...linksTmp];
  cells = [...cellsTmp];
  textBoxes = [...textBoxesTmp];
  selectedObjects = [
    ...nodesToSave,
    ...linksToSave,
    ...cellsToSave,
    ...textBoxesToSave,
  ];

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

function saveSelectedAsJSON(flag = true) {
  var nodesTmp = [...nodes];
  var nodesToSave = [];
  var linksTmp = [...links];
  var linksToSave = [];
  var cellsTmp = [...cells];
  var cellsToSave = [];
  var textBoxesTmp = [...textBoxes];
  var textBoxesToSave = [];
  selectedObjects.forEach((obj) => {
    if (obj instanceof Node) nodesToSave.push(obj);
    else if (obj instanceof Cell) cellsToSave.push(...obj.tape.cells);
    else if (obj instanceof TextBox) textBoxesToSave.push(obj);
    else linksToSave.push(obj);
  });

  nodes = [...nodesToSave];
  links = [...linksToSave];
  cells = Array.from(new Set(cellsToSave));
  textBoxes = [...textBoxesToSave];

  var backupData = getBackupData();
  if (flag)
    downloadFile(
      "automaton_backup.json",
      JSON.stringify(getBackupData()),
      "text/json"
    );

  nodes = [...nodesTmp];
  links = [...linksTmp];
  cells = [...cellsTmp];
  textBoxes = [...textBoxesTmp];

  draw();

  if (!flag) return backupData;
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
      var cellsTmp = [...cells];
      var textBoxesTmp = [...textBoxes];
      nodes = [];
      links = [];
      cells = [];
      restoreFromBackupData(data, false);
      nodes.push(...nodesTmp);
      links.push(...linksTmp);
      cells.push(...cellsTmp);
      textBoxes.push(...textBoxesTmp);
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

function restoreFromBackupData(backup, flag = true, select = false) {
  if (select) selectedObjects = [];
  if (backup.nodes)
    for (var i = 0; i < backup.nodes.length; i++) {
      var backupNode = backup.nodes[i];
      var node = new Node(backupNode.x, backupNode.y);
      node.isAcceptState = backupNode.isAcceptState;
      node.text = backupNode.text;
      node.outline = backupNode.outline;
      nodes.push(node);
      if (select) selectedObjects.push(node);
    }
  if (backup.tapes)
    for (var i = 0; i < backup.tapes.length; i++) {
      var tape = new Tape(0, 0, backup.tapes[i], !flag);
      if (select) selectedObjects.push(...tape.cells);
    }
  if (backup.textBoxes)
    for (var i = 0; i < backup.textBoxes.length; i++) {
      var backupTextBox = backup.textBoxes[i];
      var textBox = new TextBox(
        backupTextBox.text,
        backupTextBox.x,
        backupTextBox.y
      );
      textBox.outline = backupTextBox.outline;
      textBoxes.push(textBox);
      if (select) selectedObjects.push(textBox);
    }
  if (backup.links)
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
        if (select) selectedObjects.push(link);
      }
    }
  nodeRadius = backup.nodeRadius;
  document.getElementById("rangeSlider").value = `${nodeRadius}`;

  document.getElementById("height").value = canvas.height =
    backup.height || "600";
  document.getElementById("width").value = canvas.width = backup.width || "800";

  if (flag) draw();
}

function restoreBackup(data = localStorage["fsm"]) {
  if (!localStorage || !JSON) {
    return;
  }

  try {
    var backup = JSON.parse(data);
    restoreFromBackupData(backup);
    console.log("restoted backup");
  } catch (e) {
    localStorage["fsm"] = "";
  }
}

function getBackupData() {
  var backup = {
    height: canvas.height,
    width: canvas.width,
    nodes: [],
    links: [],
    tapes: [],
    textBoxes: [],
    nodeRadius: nodeRadius,
  };
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var backupNode = {
      x: node.x,
      y: node.y,
      text: node.text,
      isAcceptState: node.isAcceptState,
      outline: node.outline,
    };
    backup.nodes.push(backupNode);
  }
  var tapes = new Set();
  for (var i = 0; i < cells.length; i++) {
    tapes.add(cells[i].tape);
  }
  tapes.forEach(function (tape) {
    backup.tapes.push(new Tape(0, 0, tape, true));
  });
  for (var i = 0; i < textBoxes.length; i++) {
    var textBox = textBoxes[i];
    var backupTextBox = {
      x: textBox.x,
      y: textBox.y,
      text: textBox.text,
      outline: textBox.outline,
    };
    backup.textBoxes.push(backupTextBox);
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
    JSON.stringify(backup) !== undoStack[undoStack.length - 1] &&
    (!mouseDown || sliderMouseDown || zKey || yKey)
  ) {
    undoStack.push(JSON.stringify(backup));
    redoStack = [];
  }

  localStorage["fsm"] = JSON.stringify(backup);
}

function undo() {
  if (!localStorage || !JSON || undoStack.length <= 1) {
    return;
  }

  if (undoStack[undoStack.length - 1] != localStorage["fsm"])
    undoStack.push(localStorage["fsm"]);

  redoStack.push(undoStack.pop());
  clearCanvas();
  restoreBackup(undoStack[undoStack.length - 1]);

  selectedObjects = [];
}

function redo() {
  if (!localStorage || !JSON || redoStack.length == 0) {
    return;
  }

  undoStack.push(redoStack.pop());
  clearCanvas();
  restoreBackup(undoStack[undoStack.length - 1]);

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

function copy(flag = true) {
  if (flag) copied = saveSelectedAsJSON(false);
  copied.nodes.forEach((e) => {
    e.x += 20;
    e.y += 20;
  });
  copied.tapes.forEach((e) => {
    e.x += 20;
    e.y += 20;
  });
  copied.textBoxes.forEach((e) => {
    e.x += 20;
    e.y += 20;
  });
}

function paste() {
  restoreFromBackupData(copied, true, true);

  copy(false);
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

    for (var i = 0; i < cells.length; i++) {
      selectedObjects.forEach((object) => {
        if (cells[i] == object) {
          var tape = cells[i].tape;
          tape.remove(cells[i--].index);
          tape.align();
        }
      });
    }

    for (var i = 0; i < textBoxes.length; i++) {
      selectedObjects.forEach((object) => {
        if (textBoxes[i] == object) {
          textBoxes.splice(i--, 1);
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
  varnewIndex = caret;

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
  varnewIndex = caret;

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
      if (start.runtimeColor != "green") start.runtimeColor = "red";
      console.log(`declined ( ${convertLatexShortcuts(start.text)} )`);
    }

    for (var i = 0; i < links.length; i++) {
      const link = links[i];
      if (
        link.nodeA == start &&
        inArr("ε", convertLatexShortcuts(link.text).split(/[\s\r]*,[\s\r]*/))
      ) {
        selectedObjects.push(link);
        run(link.nodeB, word);
      }
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
      inArr("ε", convertLatexShortcuts(link.text).split(/[\s\r]*,[\s\r]*/))
    ) {
      selectedObjects.push(link);
      run(link.nodeB, word);
    }

    if (
      link.nodeA == start &&
      (inArr(
        word.charAt(0),
        convertLatexShortcuts(link.text).split(/[\s\r]*,[\s\r]*/)
      ) ||
        inArr("Σ", convertLatexShortcuts(link.text).split(/[\s\r]*,[\s\r]*/)))
    ) {
      selectedObjects.push(link);
      run(link.nodeB, word.substring(1));
      stay = false;
    } else if (
      link.node == start &&
      link instanceof SelfLink &&
      (inArr(
        word.charAt(0),
        convertLatexShortcuts(link.text).split(/[\s\r]*,[\s\r]*/)
      ) ||
        inArr("Σ", convertLatexShortcuts(link.text).split(/[\s\r]*,[\s\r]*/)))
    ) {
      selectedObjects.push(link);
      run(link.node, word.substring(1));
      stay = false;
    }
  }

  if (stay) {
    if (start.runtimeColor != "green") start.runtimeColor = "red";
    console.log(`declined ( ${convertLatexShortcuts(start.text)} )`);
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
          if (
            convertLatexShortcuts(letter) != "Σ" &&
            convertLatexShortcuts(letter) != "ε" &&
            letter != ""
          )
            alphabet.push(convertLatexShortcuts(letter));
        });
      }
    });
  } else if (!(object instanceof StartLink)) {
    object.text.split(/\s*,\s*/).forEach((letter) => {
      if (
        convertLatexShortcuts(letter) != "Σ" &&
        convertLatexShortcuts(letter) != "ε" &&
        letter != ""
      )
        alphabet.push(convertLatexShortcuts(letter));
    });

    if (object instanceof Link) {
      if (!inArr(object.nodeA, selected))
        getAlphabet(object.nodeA, selected).forEach((letter) => {
          if (
            convertLatexShortcuts(letter) != "Σ" &&
            convertLatexShortcuts(letter) != "ε" &&
            convertLatexShortcuts(letter) != ""
          )
            alphabet.push(convertLatexShortcuts(letter));
        });
      if (!inArr(object.nodeB, selected))
        getAlphabet(object.nodeB, selected).forEach((letter) => {
          if (
            convertLatexShortcuts(letter) != "Σ" &&
            convertLatexShortcuts(letter) != "ε" &&
            convertLatexShortcuts(letter) != ""
          )
            alphabet.push(convertLatexShortcuts(letter));
        });
    } else if (object instanceof SelfLink) {
      if (!inArr(object.node, selected))
        getAlphabet(object.node, selected).forEach((letter) => {
          if (
            convertLatexShortcuts(letter) != "Σ" &&
            convertLatexShortcuts(letter) != "ε" &&
            convertLatexShortcuts(letter) != ""
          )
            alphabet.push(convertLatexShortcuts(letter));
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
    !inArr("Σ", getLetters(object))
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
        if (convertLatexShortcuts(letter) != "ε" && letter != "")
          letters.push(convertLatexShortcuts(letter));
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