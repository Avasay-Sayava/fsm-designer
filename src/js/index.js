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

// ------------------------------------------------------------------------------------- //

const customKeys = {
  // homework 12
  "5db81e4ae28": window.btoa(
    unescape(
      encodeURIComponent(
        JSON.stringify({
          nodeRadius: 20,
          height: 270,
          width: 320,
          nodes: [
            { x: 67, y: 62, text: "q_0", isAcceptState: false, outline: false },
            { x: 169, y: 62, text: "q_1", isAcceptState: true, outline: false },
            { x: 67, y: 163, text: "q_2", isAcceptState: true, outline: false },
            {
              x: 169,
              y: 163,
              text: "q_3",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 271,
              y: 163,
              text: "q_4",
              isAcceptState: true,
              outline: false,
            },
          ],
          links: [
            { type: "StartLink", node: 0, text: "", deltaX: -43, deltaY: -45 },
            {
              type: "Link",
              nodeA: 0,
              nodeB: 1,
              text: "0",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 0,
              nodeB: 2,
              text: "1",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 2,
              nodeB: 3,
              text: ".",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5588235294117647,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 1,
              nodeB: 3,
              text: ".",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 3,
              nodeB: 4,
              text: "1",
              lineAngleAdjust: 0,
              parallelPart: 0.6538461538461539,
              perpendicularPart: 13,
            },
            {
              type: "Link",
              nodeA: 4,
              nodeB: 3,
              text: "0",
              lineAngleAdjust: 0,
              parallelPart: 0.375,
              perpendicularPart: 9,
            },
            {
              type: "SelfLink",
              node: 2,
              text: "0,1",
              anchorAngle: 1.5707963267948966,
            },
            {
              type: "SelfLink",
              node: 4,
              text: "1",
              anchorAngle: 1.5707963267948966,
            },
            {
              type: "SelfLink",
              node: 3,
              text: "0",
              anchorAngle: 1.5707963267948966,
            },
          ],
          tapes: [],
          textBoxes: [],
        })
      )
    )
  ),
  // homework 13
  "72aedb2bd4a": window.btoa(
    unescape(
      encodeURIComponent(
        JSON.stringify({
          nodeRadius: 20,
          height: 600,
          width: 1000,
          nodes: [
            {
              x: 53,
              y: 51,
              text: "1.",
              isAcceptState: false,
              outline: true,
            },
            {
              x: 96,
              y: 105,
              text: "q_0",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 197,
              y: 105,
              text: "q_1",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 260,
              y: 51,
              text: "3.",
              isAcceptState: false,
              outline: true,
            },
            {
              x: 305,
              y: 105,
              text: "q_0",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 409,
              y: 105,
              text: "q_1",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 522,
              y: 105,
              text: "q_2",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 643,
              y: 105,
              text: "q_3",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 719,
              y: 51,
              text: "5.",
              isAcceptState: false,
              outline: true,
            },
            {
              x: 762,
              y: 105,
              text: "q_0",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 862,
              y: 105,
              text: "q_1",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 862,
              y: 200,
              text: "q_3",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 762,
              y: 200,
              text: "q_2",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 53,
              y: 171,
              text: "7.",
              isAcceptState: false,
              outline: true,
            },
            {
              x: 96,
              y: 200,
              text: "q_0",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 197,
              y: 200,
              text: "q_1",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 305,
              y: 200,
              text: "q_2",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 96,
              y: 295,
              text: "q_3",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 197,
              y: 295,
              text: "q_4",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 305,
              y: 295,
              text: "q_5",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 443,
              y: 200,
              text: "q_0",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 544,
              y: 200,
              text: "q_1",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 544,
              y: 295,
              text: "q_2",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 409,
              y: 171,
              text: "9.",
              isAcceptState: false,
              outline: true,
            },
            {
              x: 443,
              y: 295,
              text: "q_3",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 643,
              y: 295,
              text: "q_4",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 643,
              y: 200,
              text: "q_5",
              isAcceptState: true,
              outline: false,
            },
          ],
          links: [
            {
              type: "StartLink",
              node: 1,
              text: "",
              deltaX: -50,
              deltaY: 0,
            },
            {
              type: "Link",
              nodeA: 1,
              nodeB: 2,
              text: "a",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6055045871559633,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 1,
              text: "\\Sigma",
              anchorAngle: -1.5707963267948966,
            },
            {
              type: "StartLink",
              node: 4,
              text: "",
              deltaX: -50,
              deltaY: 0,
            },
            {
              type: "Link",
              nodeA: 4,
              nodeB: 5,
              text: "a",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6055045871559633,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 4,
              text: "\\Sigma",
              anchorAngle: -1.5707963267948966,
            },
            {
              type: "Link",
              nodeA: 5,
              nodeB: 6,
              text: "b",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.675,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 6,
              nodeB: 7,
              text: "a",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5873015873015873,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 7,
              text: "\\Sigma",
              anchorAngle: -1.5707963267948966,
            },
            {
              type: "StartLink",
              node: 9,
              text: "",
              deltaX: -50,
              deltaY: 0,
            },
            {
              type: "Link",
              nodeA: 9,
              nodeB: 10,
              text: "a",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6055045871559633,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 9,
              text: "\\Sigma",
              anchorAngle: -1.5707963267948966,
            },
            {
              type: "Link",
              nodeA: 10,
              nodeB: 11,
              text: "a",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5858585858585859,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 9,
              nodeB: 12,
              text: "b",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 12,
              nodeB: 11,
              text: "b",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 11,
              text: "\\Sigma",
              anchorAngle: 0,
            },
            {
              type: "StartLink",
              node: 14,
              text: "",
              deltaX: -50,
              deltaY: 0,
            },
            {
              type: "Link",
              nodeA: 14,
              nodeB: 15,
              text: "a",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6055045871559633,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 15,
              nodeB: 16,
              text: "b",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5350877192982456,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 16,
              text: "\\Sigma",
              anchorAngle: 0,
            },
            {
              type: "Link",
              nodeA: 14,
              nodeB: 17,
              text: "\\epsilon",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 17,
              nodeB: 18,
              text: "a",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 18,
              nodeB: 19,
              text: "b",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 17,
              text: "\\Sigma",
              anchorAngle: -3.141592653589793,
            },
            {
              type: "StartLink",
              node: 20,
              text: "",
              deltaX: -50,
              deltaY: 0,
            },
            {
              type: "Link",
              nodeA: 20,
              nodeB: 21,
              text: "a",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6055045871559633,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 21,
              nodeB: 22,
              text: "b",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5350877192982456,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 22,
              nodeB: 24,
              text: "a",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 24,
              nodeB: 20,
              text: "b",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 22,
              nodeB: 25,
              text: "a",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5050505050505051,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 25,
              nodeB: 26,
              text: "c",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6222222222222222,
              perpendicularPart: -11,
            },
            {
              type: "Link",
              nodeA: 26,
              nodeB: 25,
              text: "a",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.4222222222222222,
              perpendicularPart: -13,
            },
          ],
          tapes: [],
          textBoxes: [],
        })
      )
    )
  ),
  ty2g471pl00: window.btoa(
    unescape(
      encodeURIComponent(
        JSON.stringify({
          nodeRadius: 20,
          height: 2370,
          width: 500,
          nodes: [
            {
              x: 125,
              y: 62,
              text: "q_0",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 287,
              y: 62,
              text: "q_1",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 287,
              y: 190,
              text: "q_3",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 125,
              y: 190,
              text: "q_2",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 125,
              y: 311,
              text: "q_0",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 287,
              y: 311,
              text: "q_1",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 287,
              y: 430,
              text: "q_2",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 125,
              y: 520,
              text: "q_0",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 287,
              y: 520,
              text: "q_1",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 287,
              y: 657,
              text: "q_2",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 449,
              y: 657,
              text: "q_3",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 125,
              y: 657,
              text: "q_4",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 287,
              y: 797,
              text: "q_5",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 125,
              y: 881,
              text: "q_0",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 287,
              y: 881,
              text: "q_1",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 287,
              y: 1031,
              text: "q_2",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 125,
              y: 1137,
              text: "q_0",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 287,
              y: 1137,
              text: "q_1",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 287,
              y: 1269,
              text: "q_2",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 287,
              y: 1399,
              text: "q_3",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 125,
              y: 1399,
              text: "q_5",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 125,
              y: 1269,
              text: "q_4",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 125,
              y: 1569,
              text: "q_0",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 287,
              y: 1569,
              text: "q_1",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 125,
              y: 1729,
              text: "q_3",
              isAcceptState: true,
              outline: false,
            },
            { x: 287, y: 1729, text: "", isAcceptState: false, outline: false },
            {
              x: 125,
              y: 1874,
              text: "q_0",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 125,
              y: 2020,
              text: "q_1",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 125,
              y: 2323,
              text: "q_2",
              isAcceptState: false,
              outline: false,
            },
            {
              x: 125,
              y: 2172,
              text: "q_3",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 298,
              y: 2020,
              text: "q_4",
              isAcceptState: true,
              outline: false,
            },
            {
              x: 298,
              y: 2323,
              text: "q_5",
              isAcceptState: false,
              outline: false,
            },
          ],
          links: [
            { type: "StartLink", node: 0, text: "", deltaX: -51, deltaY: 0 },
            {
              type: "Link",
              nodeA: 0,
              nodeB: 1,
              text: "a;\\perp/none",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5118110236220472,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 1,
              nodeB: 2,
              text: "c;\\perp/none\rc;A/none",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.3393939393939394,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 1,
              text: "a;\\perp/push A\ra;A/push A",
              anchorAngle: 0,
            },
            {
              type: "Link",
              nodeA: 0,
              nodeB: 3,
              text: "c;\\perp/none",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            { type: "SelfLink", node: 2, text: "b;A/pop A", anchorAngle: 0 },
            {
              type: "Link",
              nodeA: 2,
              nodeB: 3,
              text: "b;\\perp/none",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.32156862745098047,
              perpendicularPart: 0,
            },
            { type: "StartLink", node: 4, text: "", deltaX: -56, deltaY: 0 },
            {
              type: "Link",
              nodeA: 4,
              nodeB: 5,
              text: "a;\\perp/push A",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6296296296296297,
              perpendicularPart: 0,
            },
            { type: "SelfLink", node: 5, text: "a;A/push AA", anchorAngle: 0 },
            {
              type: "Link",
              nodeA: 5,
              nodeB: 6,
              text: "b;A/pop A",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5867768595041323,
              perpendicularPart: 0,
            },
            { type: "SelfLink", node: 6, text: "b;A/pop A", anchorAngle: 0 },
            {
              type: "Link",
              nodeA: 6,
              nodeB: 4,
              text: "b;\\perp/push A",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5855937385349149,
              perpendicularPart: 0,
            },
            { type: "StartLink", node: 7, text: "", deltaX: -57, deltaY: 0 },
            {
              type: "Link",
              nodeA: 7,
              nodeB: 8,
              text: "a;\\perp/none",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.7222222222222222,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 8,
              nodeB: 9,
              text: "b;\\perp/none",
              lineAngleAdjust: 0,
              parallelPart: 0.5620437956204379,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 9,
              nodeB: 10,
              text: "a;\\perp/push \\perp\ra;A/push A",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6934306569343066,
              perpendicularPart: -24,
            },
            {
              type: "Link",
              nodeA: 10,
              nodeB: 9,
              text: "b;\\perp/push A\rb;A/ push A",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.708029197080292,
              perpendicularPart: -26,
            },
            {
              type: "Link",
              nodeA: 9,
              nodeB: 11,
              text: "c;\\perp/none",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5935483870967742,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 9,
              nodeB: 12,
              text: "c;A/pop A",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 12,
              nodeB: 11,
              text: "c;\\perp/pop \\perp",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.21634934572634013,
              perpendicularPart: -22.592895110465854,
            },
            { type: "StartLink", node: 13, text: "", deltaX: -62, deltaY: 0 },
            {
              type: "Link",
              nodeA: 13,
              nodeB: 14,
              text: "a;\\perp/none",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.4691358024691358,
              perpendicularPart: 0,
            },
            { type: "SelfLink", node: 12, text: "c;A/pop A", anchorAngle: 0 },
            {
              type: "Link",
              nodeA: 13,
              nodeB: 15,
              text: "b;\\perp/none",
              lineAngleAdjust: 0,
              parallelPart: 0.5381547942722493,
              perpendicularPart: 110.95028500301936,
            },
            {
              type: "Link",
              nodeA: 14,
              nodeB: 15,
              text: "b;\\perp/push A\rb;A/push A",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.34447921323200714,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 14,
              text: "a;\\perp/push A\ra;A/push A",
              anchorAngle: 0,
            },
            { type: "SelfLink", node: 15, text: "c;A/pop A", anchorAngle: 0 },
            {
              type: "Link",
              nodeA: 15,
              nodeB: 13,
              text: "c;\\perp/push A",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6255211165488489,
              perpendicularPart: 0,
            },
            { type: "StartLink", node: 16, text: "", deltaX: -64, deltaY: 0 },
            {
              type: "Link",
              nodeA: 16,
              nodeB: 17,
              text: "a;\\perp/push S",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6851851851851852,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 17,
              text: "a;S/push A\ra;A/push A",
              anchorAngle: 0,
            },
            {
              type: "Link",
              nodeA: 17,
              nodeB: 18,
              text: "b;S/push D\rb;A/push D",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6439393939393939,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 16,
              nodeB: 18,
              text: "b;\\perp/none",
              lineAngleAdjust: 0,
              parallelPart: 0.5861500412201155,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 18,
              text: "b;\\perp/push B\rb;B/push B",
              anchorAngle: 0,
            },
            {
              type: "Link",
              nodeA: 18,
              nodeB: 19,
              text: "c;B/pop B",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5307692307692308,
              perpendicularPart: 0,
            },
            { type: "SelfLink", node: 19, text: "c;B/pop B", anchorAngle: 0 },
            {
              type: "Link",
              nodeA: 19,
              nodeB: 20,
              text: "c;D/pop D",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.845679012345679,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 19,
              nodeB: 21,
              text: "c;\\perp/none",
              lineAngleAdjust: 0,
              parallelPart: 0.9371479660259275,
              perpendicularPart: -99.82114044862895,
            },
            {
              type: "Link",
              nodeA: 20,
              nodeB: 21,
              text: "a;S\\pop S",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 20,
              text: "a;A/pop A",
              anchorAngle: -0.5092897648414845,
            },
            { type: "StartLink", node: 22, text: "", deltaX: -56, deltaY: 0 },
            {
              type: "Link",
              nodeA: 22,
              nodeB: 23,
              text: "a;\\perp/push S\rb;\\perp/push D",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6234567901234568,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 22,
              nodeB: 24,
              text: "c;\\perp/none",
              lineAngleAdjust: 0,
              parallelPart: 0.40298507462686567,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 23,
              text: "a;S/push A\ra;D/push A\ra;A/push A\ra;B/push A\rb;S/push B\rb;D/push B\rb;A/push B\rb;B/push B",
              anchorAngle: 0,
            },
            {
              type: "Link",
              nodeA: 23,
              nodeB: 25,
              text: "c;S/none\rc;D/none\rc;A/none\rc;B/none",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
            {
              type: "SelfLink",
              node: 25,
              text: "a;A/pop A\rb;B/pop B",
              anchorAngle: 0,
            },
            {
              type: "Link",
              nodeA: 25,
              nodeB: 24,
              text: "a;S/pop S\rb;D/pop D",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5555555555555556,
              perpendicularPart: 0,
            },
            { type: "StartLink", node: 26, text: "", deltaX: -64, deltaY: 0 },
            {
              type: "SelfLink",
              node: 26,
              text: "0;⊥/push AS\r0;S\\pop S\r0;A/push AS",
              anchorAngle: 0,
            },
            {
              type: "Link",
              nodeA: 26,
              nodeB: 27,
              text: "1;A/pop A",
              lineAngleAdjust: 0,
              parallelPart: 0.726027397260274,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 27,
              nodeB: 28,
              text: "1;A/pop A",
              lineAngleAdjust: 0,
              parallelPart: 0.6336633663366337,
              perpendicularPart: -32,
            },
            {
              type: "Link",
              nodeA: 29,
              nodeB: 27,
              text: "1;A/pop A",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.47706422018348627,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 28,
              nodeB: 29,
              text: "1;A/pop A",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5400366481486868,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 27,
              nodeB: 30,
              text: "2;\\perp/none",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.6589595375722543,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 28,
              nodeB: 31,
              text: "2;\\perp/none",
              lineAngleAdjust: 3.141592653589793,
              parallelPart: 0.5606936416184971,
              perpendicularPart: 0,
            },
            {
              type: "Link",
              nodeA: 31,
              nodeB: 30,
              text: "2;\\perp/none",
              lineAngleAdjust: 0,
              parallelPart: 0.5,
              perpendicularPart: 0,
            },
          ],
          tapes: [],
          textBoxes: [],
        })
      )
    )
  ),
  kf3mr5n21o3: window.btoa(
    unescape(
      encodeURIComponent({
        nodeRadius: 20,
        height: 2550,
        width: 600,
        nodes: [
          { x: 93, y: 112, text: "q_0", isAcceptState: false, outline: false },
          { x: 247, y: 112, text: "q_1", isAcceptState: false, outline: false },
          { x: 401, y: 112, text: "q_3", isAcceptState: true, outline: false },
          { x: 93, y: 264, text: "q_0", isAcceptState: true, outline: false },
          { x: 247, y: 264, text: "q_1", isAcceptState: false, outline: false },
          { x: 401, y: 264, text: "q_3", isAcceptState: false, outline: false },
          { x: 93, y: 531, text: "q_0", isAcceptState: false, outline: false },
          { x: 247, y: 531, text: "q_1", isAcceptState: false, outline: false },
          { x: 401, y: 531, text: "q_2", isAcceptState: true, outline: false },
          { x: 93, y: 675, text: "q_0", isAcceptState: false, outline: false },
          { x: 247, y: 675, text: "q_1", isAcceptState: true, outline: false },
          { x: 401, y: 675, text: "q_2", isAcceptState: true, outline: false },
          { x: 401, y: 796, text: "q_4", isAcceptState: false, outline: false },
          { x: 247, y: 796, text: "q_3", isAcceptState: true, outline: false },
          { x: 401, y: 917, text: "q_5", isAcceptState: true, outline: false },
          { x: 93, y: 1108, text: "q_0", isAcceptState: false, outline: false },
          {
            x: 247,
            y: 1108,
            text: "q_1",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 394,
            y: 1108,
            text: "q_2",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 394,
            y: 1237,
            text: "q_3",
            isAcceptState: false,
            outline: false,
          },
          { x: 93, y: 1237, text: "q_4", isAcceptState: true, outline: false },
          { x: 93, y: 1378, text: "q_0", isAcceptState: false, outline: false },
          {
            x: 247,
            y: 1378,
            text: "q_1",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 401,
            y: 1378,
            text: "q_2",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 401,
            y: 1500,
            text: "q_3",
            isAcceptState: false,
            outline: false,
          },
          { x: 247, y: 1500, text: "q_4", isAcceptState: true, outline: false },
          { x: 93, y: 1730, text: "q_0", isAcceptState: true, outline: false },
          {
            x: 247,
            y: 1730,
            text: "q_1",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 401,
            y: 1730,
            text: "q_2",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 401,
            y: 1916,
            text: "q_3",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 247,
            y: 1916,
            text: "q_4",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 247,
            y: 2101,
            text: "q_0",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 401,
            y: 2101,
            text: "q_1",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 401,
            y: 2282,
            text: "q_2",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 247,
            y: 2282,
            text: "q_3",
            isAcceptState: false,
            outline: false,
          },
          {
            x: 247,
            y: 2438,
            text: "q_4",
            isAcceptState: false,
            outline: false,
          },
          { x: 93, y: 2438, text: "q_5", isAcceptState: false, outline: false },
          { x: 93, y: 2107, text: "q_6", isAcceptState: true, outline: false },
          { x: 93, y: 2282, text: "q_7", isAcceptState: false, outline: false },
        ],
        links: [
          { type: "StartLink", node: 0, text: "", deltaX: -44, deltaY: -43 },
          {
            type: "Link",
            nodeA: 0,
            nodeB: 1,
            text: "b;A/pop A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.45528455284552843,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 1,
            nodeB: 2,
            text: "c;\\perp/none",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.732484076433121,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 1,
            text: "b;A/pop A",
            anchorAngle: -1.5707963267948966,
          },
          { type: "StartLink", node: 3, text: "", deltaX: -47, deltaY: -40 },
          {
            type: "Link",
            nodeA: 3,
            nodeB: 4,
            text: "a;\\perp/push S",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.6818181818181818,
            perpendicularPart: -10,
          },
          {
            type: "SelfLink",
            node: 0,
            text: "a;⊥/push A\ra;A/push A",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "SelfLink",
            node: 2,
            text: "c;\\perp/none",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "SelfLink",
            node: 4,
            text: "a;S/pop S\ra;A/push AS\ra;\\perp/push AS",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "Link",
            nodeA: 4,
            nodeB: 5,
            text: "b;A/pop A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.4805194805194805,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 5,
            text: "b;A/pop A",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "Link",
            nodeA: 5,
            nodeB: 3,
            text: "b;\\perp/push S",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.6233766233766234,
            perpendicularPart: -103,
          },
          {
            type: "Link",
            nodeA: 4,
            nodeB: 3,
            text: "b;\\perp/push S",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.2792207792207792,
            perpendicularPart: -11,
          },
          { type: "StartLink", node: 6, text: "", deltaX: -47, deltaY: -40 },
          {
            type: "Link",
            nodeA: 6,
            nodeB: 7,
            text: "b;A/pop A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.43506493506493504,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 6,
            text: "a;\\perp/push AS\ra;A/push AS\ra;S/pop S",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "SelfLink",
            node: 7,
            text: "c;A/pop A",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "Link",
            nodeA: 7,
            nodeB: 8,
            text: "c;\\perp/none",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.381294964028777,
            perpendicularPart: 0,
          },
          { type: "StartLink", node: 9, text: "", deltaX: -47, deltaY: -40 },
          {
            type: "Link",
            nodeA: 9,
            nodeB: 10,
            text: "0;\\perp/push A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.6038961038961039,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 10,
            nodeB: 11,
            text: "1;A/pop A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.38961038961038963,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 10,
            text: "0;A/push A",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "SelfLink",
            node: 11,
            text: "1;A/none",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "Link",
            nodeA: 11,
            nodeB: 13,
            text: "2;A/pop A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.3659305993690852,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 13,
            nodeB: 12,
            text: "2;\\perp/none",
            lineAngleAdjust: 0,
            parallelPart: 0.5909090909090909,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 12,
            nodeB: 14,
            text: "2;\\perp/none",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.2077922077922078,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 11,
            nodeB: 12,
            text: "2;\\perp/none",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.4793388429752066,
            perpendicularPart: -31,
          },
          {
            type: "Link",
            nodeA: 10,
            nodeB: 13,
            text: "2;A/pop A",
            lineAngleAdjust: 0,
            parallelPart: 0.5950413223140496,
            perpendicularPart: 34,
          },
          {
            type: "Link",
            nodeA: 9,
            nodeB: 12,
            text: "1;\\perp/none\r2;\\perp/none",
            lineAngleAdjust: 0,
            parallelPart: 0.3618282270215972,
            perpendicularPart: 127.01433772984166,
          },
          {
            type: "SelfLink",
            node: 14,
            text: "2;\\perp/none",
            anchorAngle: 0,
          },
          { type: "StartLink", node: 15, text: "", deltaX: -47, deltaY: -40 },
          {
            type: "Link",
            nodeA: 15,
            nodeB: 16,
            text: "a;\\perp/none",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.4090909090909091,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 16,
            text: "a;\\perp/push A\ra;A/push A",
            anchorAngle: -2.0897603288640245,
          },
          {
            type: "Link",
            nodeA: 16,
            nodeB: 17,
            text: "b;A/pop A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.6168831168831169,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 17,
            text: "b;A/pop A",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "Link",
            nodeA: 16,
            nodeB: 18,
            text: "c;A/pop A",
            lineAngleAdjust: 0,
            parallelPart: 1.0824313725490198,
            perpendicularPart: -105.94854355937576,
          },
          {
            type: "Link",
            nodeA: 18,
            nodeB: 19,
            text: "c;\\perp/none",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.42857142857142855,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 18,
            text: "c;A/pop A",
            anchorAngle: 0.6006690394748925,
          },
          {
            type: "Link",
            nodeA: 17,
            nodeB: 19,
            text: "b;\\perp/none",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.735765838011227,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 17,
            nodeB: 18,
            text: "c;A/pop A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.40310077519379844,
            perpendicularPart: 0,
          },
          { type: "StartLink", node: 20, text: "", deltaX: -47, deltaY: -40 },
          {
            type: "SelfLink",
            node: 21,
            text: "b;A/pop A",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "Link",
            nodeA: 21,
            nodeB: 22,
            text: "c;A/push \\perpA",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.4594594594594595,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 20,
            text: "a;⊥/push A\ra;A/push A",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "Link",
            nodeA: 20,
            nodeB: 21,
            text: "b;A/pop A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.7402597402597403,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 22,
            text: "c;A/push A",
            anchorAngle: -1.5707963267948966,
          },
          {
            type: "Link",
            nodeA: 22,
            nodeB: 23,
            text: "b;A/pop A",
            lineAngleAdjust: 0,
            parallelPart: 0.5,
            perpendicularPart: 0,
          },
          { type: "SelfLink", node: 23, text: "b;A/pop A", anchorAngle: 0 },
          {
            type: "Link",
            nodeA: 23,
            nodeB: 24,
            text: "b;\\perp/none",
            lineAngleAdjust: 0,
            parallelPart: 0.5,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 24,
            text: "b;\\perp/none",
            anchorAngle: -3.141592653589793,
          },
          { type: "StartLink", node: 25, text: "", deltaX: -47, deltaY: -40 },
          {
            type: "Link",
            nodeA: 25,
            nodeB: 26,
            text: "c;\\perp/push V\rc;C/push C",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.5,
            perpendicularPart: -17,
          },
          {
            type: "Link",
            nodeA: 26,
            nodeB: 27,
            text: "a;Γ/push S\rb;Γ/push T",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.6038961038961039,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 27,
            text: "a;Γ/push A\rb;Γ/push B",
            anchorAngle: 0,
          },
          {
            type: "Link",
            nodeA: 27,
            nodeB: 28,
            text: "a;A/pop A\rb;B/pop B",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.6021505376344086,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 28,
            text: "a;Γ/pop A\rb;Γ/pop B",
            anchorAngle: 0,
          },
          {
            type: "Link",
            nodeA: 27,
            nodeB: 29,
            text: "a;S/pop S\rb;T/pop T",
            lineAngleAdjust: 0,
            parallelPart: 0.37271916586637405,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 28,
            nodeB: 29,
            text: "a;S/pop S\rb;T/pop T",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.44805194805194803,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 29,
            nodeB: 25,
            text: "c;V/none",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.6600013719303061,
            perpendicularPart: -49.80147788861537,
          },
          {
            type: "SelfLink",
            node: 29,
            text: "c;C/pop C",
            anchorAngle: 1.5707963267948966,
          },
          {
            type: "Link",
            nodeA: 25,
            nodeB: 27,
            text: "a;Γ/push S\rb;Γ/push T",
            lineAngleAdjust: 0,
            parallelPart: 0.7045454545454546,
            perpendicularPart: -115,
          },
          {
            type: "Link",
            nodeA: 26,
            nodeB: 25,
            text: "c;V/push C\rc;C/push C",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.6038961038961039,
            perpendicularPart: -21,
          },
          { type: "StartLink", node: 30, text: "", deltaX: -47, deltaY: -40 },
          {
            type: "Link",
            nodeA: 30,
            nodeB: 31,
            text: "x;\\perp/none",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.6103896103896104,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 31,
            nodeB: 32,
            text: "y;\\perp/push A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.3867403314917127,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 32,
            nodeB: 33,
            text: "x;A/pop A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.7679558011049724,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 33,
            nodeB: 34,
            text: "y;A/push AAA\ry;⊥/push AAA",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.6602564102564102,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 34,
            nodeB: 35,
            text: "x;A/pop A",
            lineAngleAdjust: 3.141592653589793,
            parallelPart: 0.5028248587570622,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 35,
            nodeB: 32,
            text: "y;A/push AAA",
            lineAngleAdjust: 0,
            parallelPart: 0.8792904290429041,
            perpendicularPart: 75.80120561229371,
          },
          {
            type: "Link",
            nodeA: 35,
            nodeB: 37,
            text: "x;A/pop A",
            lineAngleAdjust: 0,
            parallelPart: 0.47435897435897434,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 33,
            nodeB: 37,
            text: "x;A/pop A",
            lineAngleAdjust: 0,
            parallelPart: 0.325,
            perpendicularPart: 0,
          },
          {
            type: "Link",
            nodeA: 37,
            nodeB: 36,
            text: "x;\\perp/none",
            lineAngleAdjust: 0,
            parallelPart: 0.5961538461538461,
            perpendicularPart: 0,
          },
          {
            type: "SelfLink",
            node: 37,
            text: "x;A/pop A",
            anchorAngle: 0.7008037459012456,
          },
          {
            type: "Link",
            nodeA: 32,
            nodeB: 37,
            text: "z;A/none",
            lineAngleAdjust: 0,
            parallelPart: 0.6522988505747126,
            perpendicularPart: 56,
          },
          {
            type: "Link",
            nodeA: 16,
            nodeB: 19,
            text: "c;\\perp/none",
            lineAngleAdjust: 0,
            parallelPart: 0.6589687043139977,
            perpendicularPart: 0,
          },
        ],
        tapes: [],
        textBoxes: [],
      })
    )
  ),
};

// ------------------------------------------------------------------------------------- //

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
  "div",
  "times",
  "exists",
];

// const subscripts = {
//   0: "₀",
//   1: "₁",
//   2: "₂",
//   3: "₃",
//   4: "₄",
//   5: "₅",
//   6: "₆",
//   7: "₇",
//   8: "₈",
//   9: "₉",
//   "+": "₊",
//   "∗": "⁎",
//   "-": "₋",
//   "=": "₌",
//   "(": "₍",
//   ")": "₎",
//   a: "ₐ",
//   e: "ₑ",
//   o: "ₒ",
//   x: "ₓ",
//   h: "ₕ",
//   k: "ₖ",
//   l: "ₗ",
//   m: "ₘ",
//   n: "ₙ",
//   p: "ₚ",
//   s: "ₛ",
//   t: "ₜ",
// };

// const superscripts = {
//   0: "⁰",
//   1: "¹",
//   2: "²",
//   3: "³",
//   4: "⁴",
//   5: "⁵",
//   6: "⁶",
//   7: "⁷",
//   8: "⁸",
//   9: "⁹",
//   "+": "⁺",
//   "∗": "*",
//   "-": "⁻",
//   "=": "⁼",
//   "(": "⁽",
//   ")": "⁾",
//   a: "ᵃ",
//   b: "ᵇ",
//   c: "ᶜ",
//   d: "ᵈ",
//   e: "ᵉ",
//   f: "ᶠ",
//   g: "ᵍ",
//   h: "ʰ",
//   i: "ⁱ",
//   j: "ʲ",
//   k: "ᵏ",
//   l: "ˡ",
//   m: "ᵐ",
//   n: "ⁿ",
//   o: "ᵒ",
//   p: "ᵖ",
//   q: "𐞥",
//   r: "ʳ",
//   s: "ˢ",
//   t: "ᵗ",
//   u: "ᵘ",
//   v: "ᵛ",
//   w: "ʷ",
//   x: "ˣ",
//   y: "ʸ",
//   z: "ᶻ",
//   A: "ᴬ",
//   B: "ᴮ",
//   C: "ꟲ",
//   D: "ᴰ",
//   E: "ᴱ",
//   F: "ꟳ",
//   G: "ᴳ",
//   H: "ᴴ",
//   I: "ᴵ",
//   J: "ᴶ",
//   K: "ᴷ",
//   L: "ᴸ",
//   M: "ᴹ",
//   N: "ᴺ",
//   O: "ᴼ",
//   P: "ᴾ",
//   Q: "ꟴ",
//   R: "ᴿ",
//   T: "ᵀ",
//   U: "ᵁ",
//   V: "ⱽ",
//   W: "ᵂ",
// };

const scripted = {
  A: "𝒜",
  B: "ℬ",
  C: "𝒞",
  D: "𝒟",
  E: "ℰ",
  F: "ℱ",
  G: "𝒢",
  H: "ℋ",
  I: "ℐ",
  J: "𝒥",
  K: "𝒦",
  L: "ℒ",
  M: "ℳ",
  N: "𝒩",
  O: "𝒪",
  P: "𝒫",
  Q: "𝒬",
  R: "ℛ",
  S: "𝒮",
  T: "𝒯",
  U: "𝒰",
  V: "𝒱",
  W: "𝒲",
  X: "𝒳",
  Y: "𝒴",
  Z: "𝒵",
  a: "𝒶",
  b: "𝒷",
  c: "𝒸",
  d: "𝒹",
  e: "ℯ",
  f: "𝒻",
  g: "ℊ",
  h: "𝒽",
  i: "𝒾",
  j: "𝒿",
  k: "𝓀",
  l: "ℓ",
  m: "𝓂",
  n: "𝓃",
  o: "ℴ",
  p: "𝓅",
  q: "𝓆",
  r: "𝓇",
  s: "𝓈",
  t: "𝓉",
  u: "𝓊",
  v: "𝓋",
  w: "𝓌",
  x: "𝓍",
  y: "𝓎",
  z: "𝓏",
};

const scriptedR = {
  𝒜: "A",
  ℬ: "B",
  𝒞: "C",
  𝒟: "D",
  ℰ: "E",
  ℱ: "F",
  𝒢: "G",
  ℋ: "H",
  ℐ: "I",
  𝒥: "J",
  𝒦: "K",
  ℒ: "L",
  ℳ: "M",
  𝒩: "N",
  𝒪: "O",
  𝒫: "P",
  𝒬: "Q",
  ℛ: "R",
  𝒮: "S",
  𝒯: "T",
  𝒰: "U",
  𝒱: "V",
  𝒲: "W",
  𝒳: "X",
  𝒴: "Y",
  𝒵: "Z",
  𝒶: "a",
  𝒷: "b",
  𝒸: "c",
  𝒹: "d",
  ℯ: "e",
  𝒻: "f",
  ℊ: "g",
  𝒽: "h",
  𝒾: "i",
  𝒿: "j",
  𝓀: "k",
  ℓ: "l",
  𝓂: "m",
  𝓃: "n",
  ℴ: "o",
  𝓅: "p",
  𝓆: "q",
  𝓇: "r",
  𝓈: "s",
  𝓉: "t",
  𝓊: "u",
  𝓋: "v",
  𝓌: "w",
  𝓍: "x",
  𝓎: "y",
  𝓏: "z",
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
const doubleStrucksR = {
  𝔸: "A",
  𝔹: "B",
  ℂ: "C",
  𝔻: "D",
  𝔼: "E",
  𝔽: "F",
  𝔾: "G",
  ℍ: "H",
  𝕀: "I",
  𝕁: "J",
  𝕂: "K",
  𝕃: "L",
  𝕄: "M",
  ℕ: "N",
  𝕆: "O",
  ℙ: "P",
  ℚ: "Q",
  ℝ: "R",
  𝕊: "S",
  𝕋: "T",
  𝕌: "U",
  𝕍: "V",
  𝕎: "W",
  𝕏: "X",
  𝕐: "Y",
  ℤ: "Z",
  𝕒: "a",
  𝕓: "b",
  𝕔: "c",
  𝕕: "d",
  𝕖: "e",
  𝕗: "f",
  𝕘: "g",
  𝕙: "h",
  𝕚: "i",
  𝕛: "j",
  𝕜: "k",
  𝕝: "l",
  𝕞: "m",
  𝕟: "n",
  𝕠: "o",
  𝕡: "p",
  𝕢: "q",
  𝕣: "r",
  𝕤: "s",
  𝕥: "t",
  𝕦: "u",
  𝕧: "v",
  𝕨: "w",
  𝕩: "x",
  𝕪: "y",
  𝕫: "z",
  "𝟘": "0",
  "𝟙": "1",
  "𝟚": "2",
  "𝟛": "3",
  "𝟜": "4",
  "𝟝": "5",
  "𝟞": "6",
  "𝟟": "7",
  "𝟠": "8",
  "𝟡": "9",
};

// ------------------------------------------------------------------------------------- //

class Node {
  static radius = 30;
  constructor(x, y) {
    this.parent = null;
    this.x = x;
    this.y = y;
    this.mouseOffsetX = 0;
    this.mouseOffsetY = 0;
    this.isAcceptState = false;
    this.text = "";
    this.outline = false;
    this.runtimeColor = null;
  }
  setMouseStart(x, y) {
    this.mouseOffsetX = this.x - x;
    this.mouseOffsetY = this.y - y;
  }
  setAnchorPoint(x, y) {
    this.x = x + this.mouseOffsetX;
    this.y = y + this.mouseOffsetY;
  }
  draw(c) {
    c.strokeStyle = c.fillStyle = this.runtimeColor ?? c.fillStyle;
    if (this.outline) {
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
    c.arc(this.x, this.y, Node.radius, 0, 2 * Math.PI, false);
    c.stroke();

    if (!this.outline)
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
      c.arc(this.x, this.y, Node.radius - 6, 0, 2 * Math.PI, false);
      c.stroke();
    }
  }
  closestPointOnCircle(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;
    var scale = Math.sqrt(dx * dx + dy * dy);
    return {
      x: this.x + (dx * Node.radius) / scale,
      y: this.y + (dy * Node.radius) / scale,
    };
  }
  containsPoint(x, y) {
    return (
      (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <
      Node.radius * Node.radius
    );
  }
}

class Link {
  constructor(a, b) {
    this.nodeA = a;
    this.nodeB = b;
    this.text = "";
    this.lineAngleAdjust = 0; // value to add to textAngle when link is straight line

    // make anchor point relative to the locations of nodeA and nodeB
    this.parallelPart = 0.5; // percentage from nodeA to nodeB
    this.perpendicularPart = 0; // pixels from line between nodeA and nodeB
  }
  getAnchorPoint() {
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
  }
  setAnchorPoint(x, y) {
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
  }
  getEndPointsAndCircle() {
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
      (reverseScale * Node.radius) / circle.radius;
    var endAngle =
      Math.atan2(this.nodeB.y - circle.y, this.nodeB.x - circle.x) +
      (reverseScale * Node.radius) / circle.radius;
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
  }
  draw(c) {
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
  }
  containsPoint(x, y) {
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
      var distance =
        (dx * (y - stuff.startY) - dy * (x - stuff.startX)) / length;
      return (
        percent > 0 && percent < 1 && Math.abs(distance) < hitTargetPadding
      );
    }
    return false;
  }
}

class SelfLink {
  constructor(node, mouse) {
    this.node = node;
    this.anchorAngle = 0;
    this.mouseOffsetAngle = 0;
    this.text = "";

    if (mouse) {
      this.setAnchorPoint(mouse.x, mouse.y);
    }
  }
  setMouseStart(x, y) {
    this.mouseOffsetAngle =
      this.anchorAngle - Math.atan2(y - this.node.y, x - this.node.x);
  }
  setAnchorPoint(x, y) {
    this.anchorAngle =
      Math.atan2(y - this.node.y, x - this.node.x) + this.mouseOffsetAngle;
    // snap to 90 degrees
    var snap = Math.round(this.anchorAngle / (Math.PI / 2)) * (Math.PI / 2);
    if (Math.abs(this.anchorAngle - snap) < 0.1) this.anchorAngle = snap;
    // keep in the range -pi to pi so our containsPoint() function always works
    if (this.anchorAngle < -Math.PI) this.anchorAngle += 2 * Math.PI;
    if (this.anchorAngle > Math.PI) this.anchorAngle -= 2 * Math.PI;
  }
  getEndPointsAndCircle() {
    var circleX = this.node.x + 1.5 * Node.radius * Math.cos(this.anchorAngle);
    var circleY = this.node.y + 1.5 * Node.radius * Math.sin(this.anchorAngle);
    var circleRadius = 0.75 * Node.radius;
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
  }
  draw(c) {
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
  }
  containsPoint(x, y) {
    var stuff = this.getEndPointsAndCircle();
    var dx = x - stuff.circleX;
    var dy = y - stuff.circleY;
    var distance = Math.sqrt(dx * dx + dy * dy) - stuff.circleRadius;
    return Math.abs(distance) < hitTargetPadding;
  }
}

class StartLink {
  constructor(node, start) {
    this.node = node;
    this.deltaX = 0;
    this.deltaY = 0;
    this.text = "";

    if (start) {
      this.setAnchorPoint(start.x, start.y);
    }
  }
  setAnchorPoint(x, y) {
    this.deltaX = x - this.node.x;
    this.deltaY = y - this.node.y;

    if (Math.abs(this.deltaX) < snapToPadding) {
      this.deltaX = 0;
    }

    if (Math.abs(this.deltaY) < snapToPadding) {
      this.deltaY = 0;
    }
  }
  getEndPoints() {
    var startX = this.node.x + this.deltaX;
    var startY = this.node.y + this.deltaY;
    var end = this.node.closestPointOnCircle(startX, startY);
    return {
      startX: startX,
      startY: startY,
      endX: end.x,
      endY: end.y,
    };
  }
  draw(c) {
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
    drawArrow(
      c,
      stuff.endX,
      stuff.endY,
      Math.atan2(-this.deltaY, -this.deltaX)
    );
  }
  containsPoint(x, y) {
    var stuff = this.getEndPoints();
    var dx = stuff.endX - stuff.startX;
    var dy = stuff.endY - stuff.startY;
    var length = Math.sqrt(dx * dx + dy * dy);
    var percent =
      (dx * (x - stuff.startX) + dy * (y - stuff.startY)) / (length * length);
    var distance = (dx * (y - stuff.startY) - dy * (x - stuff.startX)) / length;
    return percent > 0 && percent < 1 && Math.abs(distance) < hitTargetPadding;
  }
}

class TemporaryLink {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  draw(c) {
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
  }
}

class TextBox {
  static padding = 5;

  constructor(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.outline = true;
    this.padding = TextBox.padding;
    this.align();
  }

  draw(c) {
    if (inArr(this, selectedObjects) && !this.outline)
      c.strokeStyle = "rgba(0,0,255,0.3)";
    else if (this == selectObject(mouseX, mouseY) && !this.outline)
      c.strokeStyle = "rgba(0,0,0,0.3)";
    if (
      this.outline ||
      inArr(this, selectedObjects) ||
      this == selectObject(mouseX, mouseY)
    )
      c.strokeRect(this.x, this.y, this.width, this.height);
    drawMultilineText(
      c,
      this.text,
      this.x + this.padding,
      this.y + 2.5 * this.padding,
      null,
      inArr(this, selectedObjects),
      false,
      false
    );
  }

  containsPoint(x, y) {
    return (
      this.x <= x &&
      this.x + this.width >= x &&
      this.y <= y &&
      this.y + this.height >= y
    );
  }

  setMouseStart(x, y) {
    this.mouseOffsetX = this.x - x;
    this.mouseOffsetY = this.y - y;
  }

  setAnchorPoint(x, y) {
    this.x = x + this.mouseOffsetX;
    this.y = y + this.mouseOffsetY;
  }

  align(minWidth = 0) {
    this.width = minWidth;
    this.height = 25 * this.text.split("\r").length;

    var start = 0;
    var c = canvas.getContext("2d");

    c.font = displayFont;
    for (var i = 0; i < this.text.split("\r").length; i++) {
      var text;
      if (inArr(this, selectedObjects) && selectedObjects.length == 1)
        text =
          this.text.split("\r")[i].substring(0, selectedText[0] - start) +
          this.text
            .split("\r")
            [i].substring(selectedText[0] - start, selectedText[1] - start) +
          this.text.split("\r")[i].substring(selectedText[1] - start);
      else text = this.text.split("\r")[i];

      this.width = Math.max(
        this.width,
        measureTextWithScripts(c, text, inArr(this, selectedObjects), start)
      );

      start += this.text.split("\r")[i].length + 1;
    }

    this.width += 2 * this.padding;
  }
}

class Cell extends TextBox {
  static width = 40;
  static height = 30;

  constructor(text, x, y, tape, index) {
    super(text, x, y);
    this.index = index;
    this.tape = tape;
    this.align(Cell.width);
  }

  draw(c) {
    c.strokeRect(this.x, this.y, this.width, this.height);
    drawMultilineText(
      c,
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2,
      null,
      inArr(this, selectedObjects),
      true,
      true
    );
  }

  setMouseStart(x, y) {
    this.mouseOffsetX = this.tape.x - x;
    this.mouseOffsetY = this.tape.y - y;
  }

  setAnchorPoint(x, y) {
    this.tape.x = x + this.mouseOffsetX;
    this.tape.y = y + this.mouseOffsetY;
    this.tape.align();
  }

  right() {
    return this.tape.cells[this.index + 1];
  }

  left() {
    return this.tape.cells[this.index - 1];
  }
}

class Tape {
  constructor(x, y, tape = null, uncycled = false) {
    if (tape != null) {
      this.cells = [];
      this.x = tape.x;
      this.y = tape.y;
      for (var i = 0; i < tape.cells.length; i++) {
        this.cells.push(
          new Cell(
            tape.cells[i].text,
            this.x + i * Cell.width,
            this.y,
            uncycled ? null : this,
            i
          )
        );
        this.cells[this.cells.length - 1].outline = tape.cells[i].outline;
      }
      if (!uncycled) cells.push(...this.cells);
    } else {
      this.cells = [
        new Cell("\\Delta", x, y, this, 0),
        new Cell("\\Delta", x + Cell.width, y, this, 1),
        new Cell("\\Delta", x + 2 * Cell.width, y, this, 2),
        new Cell("\\Delta", x + 3 * Cell.width, y, this, 3),
        new Cell("\\Delta", x + 4 * Cell.width, y, this, 4),
        new Cell("...", x + 5 * Cell.width, y, this, 5),
      ];
      cells.push(...this.cells);
      this.x = x;
      this.y = y;
    }

    this.align();
  }

  add(text, index = this.cells.length) {
    var cell = new Cell(text, 0, 0, this, index);

    this.cells.splice(index, 0, cell);

    cells.push(cell);

    this.align();
  }

  remove(index = this.cells.length - 1) {
    var out = this.cells[index];
    this.cells.splice(index, 1);

    for (var i = 0; i < cells.length; i++) {
      if (cells[i] == out) {
        cells.splice(i, 1);
        break;
      }
    }

    this.align();

    return out.text;
  }

  draw(c) {
    this.cells.forEach(function (e) {
      e.draw(c);
    });
  }

  align() {
    var widthSum = 0;
    var maxHeight = 0;

    for (var i = 0; i < this.cells.length; i++) {
      this.cells[i].align(Cell.width - 2 * TextBox.padding);
      this.cells[i].index = i;
      this.cells[i].x = this.x + widthSum;
      this.cells[i].y = this.y;
      widthSum += this.cells[i].width;
      maxHeight = Math.max(maxHeight, this.cells[i].height);
    }

    for (var i = 0; i < this.cells.length; i++) {
      this.cells[i].height = maxHeight;
    }
  }
}

// ------------------------------------------------------------------------------------- //

class ExportAsLaTeX {
  constructor(bounds) {
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

    this.strokeRect = function (x, y, width, height) {
      this.beginPath();
      this.moveTo(x, y);
      this.lineTo(x + width, y);
      this.stroke();
      this.beginPath();
      this.moveTo(x + width, y);
      this.lineTo(x + width, y + height);
      this.stroke();
      this.beginPath();
      this.moveTo(x + width, y + height);
      this.lineTo(x, y + height);
      this.stroke();
      this.beginPath();
      this.moveTo(x, y + height);
      this.lineTo(x, y);
      this.stroke();
    };

    this.arc = function (x, y, radius, startAngle, endAngle, isReversed) {
      x -= this.bounds[0];
      y -= this.bounds[1];
      x *= this._scale;
      y *= this._scale;
      radius *= this._scale;
      if (endAngle - startAngle == Math.PI * 2) {
        this._texData +=
          "\\draw [black] (" +
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
          "\\draw [black] (" +
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
      this._texData += "\\draw [black]";
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
      this._texData += "\\fill [black]";
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
      c.font = canvas.font;
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
}

class ExportAsSVG {
  constructor(bounds) {
    this.width = bounds[2] - bounds[0];
    this.height = bounds[3] - bounds[1];
    this.bounds = bounds;
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

    this.strokeRect = function (x, y, width, height) {
      this.beginPath();
      this.moveTo(x, y);
      this.lineTo(x + width, y);
      this.stroke();
      this.beginPath();
      this.moveTo(x + width, y);
      this.lineTo(x + width, y + height);
      this.stroke();
      this.beginPath();
      this.moveTo(x + width, y + height);
      this.lineTo(x, y + height);
      this.stroke();
      this.beginPath();
      this.moveTo(x, y + height);
      this.lineTo(x, y);
      this.stroke();
    };

    this.arc = function (x, y, radius, startAngle, endAngle, isReversed) {
      x -= this.bounds[0];
      y -= this.bounds[1];
      x += this._transX;
      y += this._transY;
      var style =
        'stroke="black" stroke-width="' + this.lineWidth + '" fill="none"';

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
        '\t<polygon stroke="black" stroke-width="' +
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
        '\t<polygon fill="black" stroke-width="' +
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
      c.font = this.font;
      return c.measureText(text);
    };

    this.fillText = function (text, x, y) {
      x -= this.bounds[0];
      y -= this.bounds[1];
      x += this._transX;
      y += this._transY;
      if (text.replace(" ", "").length > 0) {
        var fontSize = this.font.split("px")[0];
        this._svgData +=
          '\t<text x="' +
          fixed(x, 3) +
          '" y="' +
          fixed(y, 3) +
          '" font-family="Cambria Math, XITS Math, Calibri" font-size="' +
          fontSize +
          '">' +
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
}

// ------------------------------------------------------------------------------------- //

function convertLaTeXShortcuts(text) {
  text = text
    .replaceAll("*", "∗")
    .replaceAll(">=", "≥")
    .replaceAll("<=", "≤")
    .replaceAll("^∗", "*")
    .replaceAll("_∗", "⁎")
    .replaceAll("!=", "≠");
  if (text.split("\\hr").length % 2 == 0) {
    text =
      text.substring(0, text.lastIndexOf("\\hr")).replaceAll("\\hr", "") +
      text.substring(text.lastIndexOf("\\hr"));
  } else text = text.replaceAll("\\hr", "");

  // for (var i = 0; i < text.length; i++) {
  //   if (subscripts[text.charAt(i)])
  //     text = text.replace("_" + text.charAt(i), subscripts[text.charAt(i)]);
  //   if (superscripts[text.charAt(i)])
  //     text = text.replace("^" + text.charAt(i), superscripts[text.charAt(i)]);
  // }

  for (var i = 0; i < text.length; i++) {
    if (scripted[text.charAt(i)])
      text = text.replace(
        "\\" + text.charAt(i) + "\\",
        scripted[text.charAt(i)]
      );
    if (doubleStrucks[text.charAt(i)])
      text = text.replace(
        "\\\\" + text.charAt(i),
        doubleStrucks[text.charAt(i)]
      );
  }

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
    if (name == "div") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "÷");
      continue;
    }
    if (name == "times") {
      text = text.replace(new RegExp("\\\\" + name, "g"), "×");
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
  isSelected = isSelected && selectedObjects.length == 1;
  if (isSelected)
    text =
      convertLaTeXShortcuts(
        originalText.substring(0, selectedText[0] - start)
      ) +
      convertLaTeXShortcuts(
        originalText.substring(selectedText[0] - start, selectedText[1] - start)
      ) +
      convertLaTeXShortcuts(originalText.substring(selectedText[1] - start));
  else text = convertLaTeXShortcuts(originalText);
  c.font = displayFont;
  var width = measureTextWithScripts(c, originalText, isSelected, start);
  var notSelectedWidth = measureTextWithScripts(
    c,
    originalText.substring(0, selectedText[0] - start),
    isSelected,
    start
  );
  var untilCaretWidth = measureTextWithScripts(
    c,
    originalText.substring(0, selectedText[2] - start),
    isSelected,
    start
  );
  var selectedWidth = measureTextWithScripts(
    c,
    originalText.substring(selectedText[0] - start, selectedText[1] - start),
    isSelected,
    start
  );

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
  if (c.advancedFillText) {
    c.advancedFillText(text, originalText, x + width / 2, y, angleOrNull);
  } else {
    x = Math.round(x);
    y = Math.round(y);
    if (isSelected && selectedObjects.length == 1) {
      drawTextWithScripts(
        c,
        convertLaTeXShortcuts(
          originalText.substring(0, selectedText[0] - start)
        ),
        x,
        y + 6
      );
      x += notSelectedWidth;
      c.fillStyle = "blue";
      c.fillRect(x, y - 10, selectedWidth, 20);
      c.fillStyle = "white";
      drawTextWithScripts(
        c,
        convertLaTeXShortcuts(
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
      drawTextWithScripts(
        c,
        convertLaTeXShortcuts(originalText.substring(selectedText[1] - start)),
        x,
        y + 6
      );

      x -= notSelectedWidth + selectedWidth;
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
      drawTextWithScripts(c, text, x, y + 6);
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
        var width1 = measureTextWithScripts(
          c,
          originalText.substring(0, hrs[i]),
          isSelected,
          start
        );
        var width2 = measureTextWithScripts(
          c,
          originalText.substring(0, hrs[i + 1] + 3),
          isSelected,
          start
        );
        c.fillRect(x + width1, y - 11, width2 - width1, 1.5);
      }

      i += 2;
    }
  }
}

function measureTextWithScripts(c, text, isSelected, start) {
  if (isSelected)
    return (
      measureTextWithScripts(
        c,
        text.substring(0, selectedText[0] - start),
        false
      ) +
      measureTextWithScripts(
        c,
        text.substring(selectedText[0] - start, selectedText[1] - start),
        false
      ) +
      measureTextWithScripts(c, text.substring(selectedText[1] - start), false)
    );
  text = convertLaTeXShortcuts(text);
  var width = 0;
  var miniChunk = "";
  var currIndex = 0;
  text.split(/_.|\^./).forEach((chunk, index) => {
    if (index == text.split(/_.|\^./).length - 1 && chunk == "") return;
    chunk = chunk.substring(miniChunk.length - 1);
    c.font = displayFont;
    width += c.measureText(chunk).width;
    c.font = miniFont;
    miniChunk =
      scriptedR[
        text.substring(
          currIndex + chunk.length + 1,
          currIndex + chunk.length + 3
        )
      ] ||
      doubleStrucksR[
        text.substring(
          currIndex + chunk.length + 1,
          currIndex + chunk.length + 3
        )
      ]
        ? text.substring(
            currIndex + chunk.length + 1,
            currIndex + chunk.length + 3
          )
        : text.substring(
            currIndex + chunk.length + 1,
            currIndex + chunk.length + 2
          );
    width += c.measureText(miniChunk).width;
    currIndex += chunk.length + miniChunk.length + 1;
  });

  c.font = displayFont;

  return width;
}

function drawTextWithScripts(c, text, x, y) {
  var miniChunk = "";
  var currIndex = 0;
  text.split(/_.|\^./).forEach((chunk, index) => {
    if (index == text.split(/_.|\^./).length - 1 && chunk == "") return;
    chunk = chunk.substring(miniChunk.length - 1);
    c.font = displayFont;
    c.fillText(chunk, x, y);
    x += c.measureText(chunk).width;
    c.font = miniFont;
    miniChunk =
      scriptedR[
        text.substring(
          currIndex + chunk.length + 1,
          currIndex + chunk.length + 3
        )
      ] ||
      doubleStrucksR[
        text.substring(
          currIndex + chunk.length + 1,
          currIndex + chunk.length + 3
        )
      ]
        ? text.substring(
            currIndex + chunk.length + 1,
            currIndex + chunk.length + 3
          )
        : text.substring(
            currIndex + chunk.length + 1,
            currIndex + chunk.length + 2
          );
    if (
      text.substring(currIndex + chunk.length, currIndex + chunk.length + 1) ==
      "_"
    ) {
      c.fillText(miniChunk, x, y + 4);
    } else if (
      text.substring(currIndex + chunk.length, currIndex + chunk.length + 1) ==
      "^"
    ) {
      c.fillText(miniChunk, x, y - 6);
    }
    x += c.measureText(miniChunk).width;
    currIndex += chunk.length + miniChunk.length + 1;
  });
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

var dialog;

var canvas;
var mouseOnCanvas = false;
var canvasFocus = false;
var displayFont = '20px "Cambria Math", "XITS Math", Calibri';
var miniFont = '14px "Cambria Math", "XITS Math", Calibri';
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
  Node.radius = 30;
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
  Node.radius = newRadius;
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

  textBoxes.forEach(function (textBox) {
    if (
      top <= textBox.y + textBox.height / 2 &&
      textBox.y + textBox.height / 2 <= bottom &&
      left <= textBox.x + textBox.width / 2 &&
      textBox.x + textBox.width / 2 <= right
    ) {
      objects.push(textBox);
    }
  });

  cells.forEach(function (cell) {
    if (
      top <= cell.y + cell.height / 2 &&
      cell.y + cell.height / 2 <= bottom &&
      left <= cell.x + cell.width / 2 &&
      cell.x + cell.width / 2 <= right
    ) {
      objects.push(cell);
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

window.onload = async function () {
  // API
  var params = new URLSearchParams(document.location.search);
  var data = params.get("data");
  if (data != null) {
    data = data.replaceAll(" ", "+");
    for (var key in customKeys) {
      data = data.replace(key, customKeys[key]);
    }
  }
  var auto = params.get("y") ?? params.get("auto");
  var format =
    params.get("format") ?? (params.get("data") ?? "").replace(/.*\./, "");
  if (data != null && data.indexOf(".") == -1) {
    var proceed = true;
    if (auto == null)
      proceed = confirm(
        "Warning! Do you want to proceed?\nBy pressing OK, your restored data will be lost."
      );
    if (proceed)
      localStorage["fsm"] = decodeURIComponent(escape(window.atob(data)));
    history.replaceState(null, "", location.origin + location.pathname);
  }

  // startup
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
    contextMenu.style.translate = `0 -${window.scrollY}px`;
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

  // API
  if (data != null && data.indexOf(".") != -1 && /[a-z]/.test(format)) {
    data = data.split(".")[0];
    const fsm = localStorage["fsm"];
    clearCanvas();
    restoreBackup(decodeURIComponent(escape(window.atob(data))));
    draw();
    setTimeout(() => {
      switch (format) {
        case "png":
          var imageData = saveAsPNG(false);
          localStorage["data"] = '<bg><img src="' + imageData + '"/></bg>';
          break;
        case "svg":
          var imageData = saveAsSVG(false);
          localStorage["data"] = imageData;
          break;
        case "tex":
          var imageData = saveAsLaTeX(false);
          localStorage["data"] =
            '<pre><code class="language-tex">' + imageData + "</code></pre>";
          break;
        case "json":
          localStorage["data"] =
            '<pre><code class="language-json">' +
            JSON.stringify(
              JSON.parse(decodeURIComponent(escape(window.atob(data)))),
              null,
              2
            ) +
            "</code></pre>";
        default:
          break;
      }
      localStorage["fsm"] = fsm;
      location.href = location.origin + location.pathname + "viewdata/";
    }, 0);
  }

  // startup
  else
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

      if (!Node.radius || Node.radius <= 0 || Node.radius > 80)
        Node.radius = 30;
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

      if (selectedObjects.length == 1)
        selectedText = [
          selectedObjects[0].text.length,
          selectedObjects[0].text.length,
          selectedObjects[0].text.length,
        ];

      updateIndicator();
    }

    fromX = fromY = toX = toY = null;

    draw();
  };

  canvas.onmousedown = function (e) {
    var mouse = crossBrowserRelativeMousePos(e);
    var selectedObject = selectObject(mouse.x, mouse.y);

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

    updateIndicator();

    cells.forEach((cell) => {
      cell.tape.align();
    });

    textBoxes.forEach((textBox) => {
      textBox.align();
    });

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
        selectedObject = new TextBox("Enter some text", mouse.x, mouse.y);
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
      selectedObjects = [selectedObject.right()];
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

document.onkeydown = async function (e) {
  var key = crossBrowserKey(e);

  // if (e.altKey && e.ctrlKey) {
  //   selectedObjects.forEach((obj) => {
  //     obj.outline = !obj.outline;
  //   });
  // }

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
        if (selectedObjects.length == 1) {
          copiedText = selectedObjects[0].text.substring(
            selectedText[0],
            selectedText[1]
          );
          if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            navigator.clipboard.writeText(convertLaTeXShortcuts(copiedText));
        }
      } else copy();
    } else if (key === 86) {
      if (navigator && navigator.clipboard && navigator.clipboard.readText)
        copiedText = await navigator.clipboard.readText();
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
        selectGroup(...selectedObjects);
        if (selectedObjects.length == 1)
          selectedText = [
            selectedObjects[0].text.length,
            selectedObjects[0].text.length,
            selectedObjects[0].text.length,
          ];
      } else if (e.shiftKey) {
        if (selectedObjects.length == 1)
          selectedText = [
            0,
            selectedObjects[0].text.length,
            selectedObjects[0].text.length,
          ];
      } else {
        selectedObjects = [...nodes, ...links, ...cells, ...textBoxes];
        if (selectedObjects.length == 1)
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
          if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            navigator.clipboard.writeText(convertLaTeXShortcuts(copiedText));

          selectedObjects[0].text =
            selectedObjects[0].text.substring(0, selectedText[0]) +
            selectedObjects[0].text.substring(selectedText[1]);

          selectedText[1] = selectedText[2] = selectedText[0];
          draw();
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
          text.substring(0, selectedText[0]).replace(/\s*\S+\s*$/, "") +
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

        updateIndicator();
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
      if (selectedObjects.length == 1)
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

  if (
    selectedObjects[0] &&
    selectedObjects.length == 1 &&
    selectedObjects[0].text.length != 0
  ) {
    handleKeyEvent(selectedObjects[0], e);
    for (var i = 0; i < textBoxes.length; i++) {
      textBoxes[i].align();
    }
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

    updateIndicator();

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

  updateIndicator();
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

function saveAsPNG(toDownload = true) {
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
  if (toDownload) return download(tmp.toDataURL("image/png"), "automaton.png");
  else return tmp.toDataURL("image/png");
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

async function download(url, filename) {
  return fetch(url)
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

function saveAsSVG(toDownload = true) {
  var bounds = getBoundingRect();
  var exporter = new ExportAsSVG(bounds);
  selectedObjects = [];

  drawUsing(exporter);

  var svgData = exporter.toSVG();
  if (toDownload) downloadSVGFile("automaton.svg", svgData);
  else return svgData;
}

function saveSelectedAsSvg(download = true) {
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
  if (download) downloadSVGFile("automaton.svg", svgData);

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

  if (!download) return svgData;
}

function saveAsLaTeX(toDownload = true) {
  var bounds = getBoundingRect();
  var exporter = new ExportAsLaTeX(bounds);
  var oldSelectedObjects = selectedObjects;
  selectedObjects = [];
  drawUsing(exporter);
  selectedObjects = oldSelectedObjects;
  var texData = exporter.toLaTeX();
  if (toDownload) downloadText("automaton.txt", texData);
  else return texData;
}

function saveSelectedAsLaTeX() {
  var bounds = getSelectedBoundingRect();
  var exporter = new ExportAsLaTeX(bounds);
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
  downloadFile("automaton.txt", texData, "text");

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
  var startNodesLen = nodes.length;
  Node.radius = backup.nodeRadius;
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
        link = new SelfLink(nodes[startNodesLen + backupLink.node]);
        link.anchorAngle = backupLink.anchorAngle;
        link.text = backupLink.text;
      } else if (backupLink.type == "StartLink") {
        link = new StartLink(nodes[startNodesLen + backupLink.node]);
        link.deltaX = backupLink.deltaX;
        link.deltaY = backupLink.deltaY;
        link.text = backupLink.text;
      } else if (backupLink.type == "Link") {
        link = new Link(
          nodes[startNodesLen + backupLink.nodeA],
          nodes[startNodesLen + backupLink.nodeB]
        );
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
  document.getElementById("rangeSlider").value = `${Node.radius}`;

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
    console.log("restored backup");
  } catch (e) {
    localStorage["fsm"] = "";
  }
}

function getBackupData() {
  var backup = {
    nodeRadius: Node.radius,
    height: canvas.height,
    width: canvas.width,
    nodes: [],
    links: [],
    tapes: [],
    textBoxes: [],
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
  if (copied.nodes)
    copied.nodes.forEach((e) => {
      e.x += 20;
      e.y += 20;
    });
  if (copied.tapes)
    copied.tapes.forEach((e) => {
      e.x += 20;
      e.y += 20;
    });
  if (copied.textBoxes)
    copied.textBoxes.forEach((e) => {
      e.x += 20;
      e.y += 20;
    });
}

function paste() {
  if (!copied.nodes && !copied.tapes && !copied.textBoxes) return;
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
  word = convertLaTeXShortcuts(word);

  if (word.length == 0) {
    if (start.isAcceptState) {
      start.runtimeColor = "green";
      console.log(`accepted ((${convertLaTeXShortcuts(start.text)}))`);
    } else {
      if (start.runtimeColor != "green") start.runtimeColor = "red";
      console.log(`declined ( ${convertLaTeXShortcuts(start.text)} )`);
    }

    for (var i = 0; i < links.length; i++) {
      const link = links[i];
      if (
        link.nodeA == start &&
        inArr("ε", convertLaTeXShortcuts(link.text).split(/[\s\r]*,[\s\r]*/))
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
      inArr("ε", convertLaTeXShortcuts(link.text).split(/[\s\r]*,[\s\r]*/))
    ) {
      selectedObjects.push(link);
      run(link.nodeB, word);
    }

    if (
      link.nodeA == start &&
      (inArr(
        word.charAt(0),
        convertLaTeXShortcuts(link.text).split(/[\s\r]*,[\s\r]*/)
      ) ||
        inArr("Σ", convertLaTeXShortcuts(link.text).split(/[\s\r]*,[\s\r]*/)))
    ) {
      selectedObjects.push(link);
      run(link.nodeB, word.substring(1));
      stay = false;
    } else if (
      link.node == start &&
      link instanceof SelfLink &&
      (inArr(
        word.charAt(0),
        convertLaTeXShortcuts(link.text).split(/[\s\r]*,[\s\r]*/)
      ) ||
        inArr("Σ", convertLaTeXShortcuts(link.text).split(/[\s\r]*,[\s\r]*/)))
    ) {
      selectedObjects.push(link);
      run(link.node, word.substring(1));
      stay = false;
    }
  }

  if (stay) {
    if (start.runtimeColor != "green") start.runtimeColor = "red";
    console.log(`declined ( ${convertLaTeXShortcuts(start.text)} )`);
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
            convertLaTeXShortcuts(letter) != "Σ" &&
            convertLaTeXShortcuts(letter) != "ε" &&
            letter != ""
          )
            alphabet.push(convertLaTeXShortcuts(letter));
        });
      }
    });
  } else if (!(object instanceof StartLink)) {
    object.text.split(/\s*,\s*/).forEach((letter) => {
      if (
        convertLaTeXShortcuts(letter) != "Σ" &&
        convertLaTeXShortcuts(letter) != "ε" &&
        letter != ""
      )
        alphabet.push(convertLaTeXShortcuts(letter));
    });

    if (object instanceof Link) {
      if (!inArr(object.nodeA, selected))
        getAlphabet(object.nodeA, selected).forEach((letter) => {
          if (
            convertLaTeXShortcuts(letter) != "Σ" &&
            convertLaTeXShortcuts(letter) != "ε" &&
            convertLaTeXShortcuts(letter) != ""
          )
            alphabet.push(convertLaTeXShortcuts(letter));
        });
      if (!inArr(object.nodeB, selected))
        getAlphabet(object.nodeB, selected).forEach((letter) => {
          if (
            convertLaTeXShortcuts(letter) != "Σ" &&
            convertLaTeXShortcuts(letter) != "ε" &&
            convertLaTeXShortcuts(letter) != ""
          )
            alphabet.push(convertLaTeXShortcuts(letter));
        });
    } else if (object instanceof SelfLink) {
      if (!inArr(object.node, selected))
        getAlphabet(object.node, selected).forEach((letter) => {
          if (
            convertLaTeXShortcuts(letter) != "Σ" &&
            convertLaTeXShortcuts(letter) != "ε" &&
            convertLaTeXShortcuts(letter) != ""
          )
            alphabet.push(convertLaTeXShortcuts(letter));
        });
    }
  }

  return Array.from(new Set(alphabet));
}

function isFull(object, selected = []) {
  if (!object || inArr(object, selected) || object instanceof StartLink)
    return true;

  if (!(object instanceof Node))
    return (
      isFull(object.node, selected) &&
      isFull(object.nodeA, selected) &&
      isFull(object.nodeB, selected)
    );

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
    if (object == link.nodeA || object == link.nodeB || object == link.node)
      out =
        out &&
        isFull(link.node, selected) &&
        isFull(link.nodeA, selected) &&
        isFull(link.nodeB, selected);
  });

  return out;
}

function isDeterministic(object, selected = []) {
  if (!object || inArr(object, selected) || object instanceof StartLink)
    return true;

  if (!(object instanceof Node))
    return (
      isDeterministic(object.node, selected) &&
      isDeterministic(object.nodeA, selected) &&
      isDeterministic(object.nodeB, selected)
    );

  selected.push(object);

  if (
    Array.from(new Set(getLetters(object))).length !=
      getLetters(object).length ||
    (getLetters(object).indexOf("Σ") != -1 &&
      Array.from(new Set(getLetters(object))).length != 1)
  ) {
    return false;
  }

  var out = true;

  links.forEach((link) => {
    if (object == link.nodeA || object == link.nodeB || object == link.node)
      out =
        out &&
        isDeterministic(link.node, selected) &&
        isDeterministic(link.nodeA, selected) &&
        isDeterministic(link.nodeB, selected);
  });

  return out;
}

function getLetters(object) {
  var letters = [];

  links.forEach((link) => {
    if (object == link.nodeA || object == link.node)
      link.text.split(/\s*,\s*/).forEach((letter) => {
        if (convertLaTeXShortcuts(letter) != "ε" && letter != "")
          letters.push(convertLaTeXShortcuts(letter));
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

function selectGroup(...objects) {
  objects.forEach((object) => {
    if (object instanceof Cell) {
      selectedObjects.push(...object.tape.cells);
    } else {
      selectAutomaton(object);
    }
  });

  selectedObjects = Array.from(new Set(selectedObjects));
}

function updateIndicator() {
  if (selectedObjects.length == 1 && !(selectedObjects[0] instanceof TextBox)) {
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
