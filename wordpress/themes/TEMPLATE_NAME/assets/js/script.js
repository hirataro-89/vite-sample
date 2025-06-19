const imgSrc = "" + new URL("../../images/js.png", import.meta.url).href;
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const image = new Image();
image.width = 300;
image.height = 300;
image.src = imgSrc;
image.onload = function() {
  context.drawImage(image, 0, 0, 300, 300);
};
!function() {
  const viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    const value = window.outerWidth > 360 ? "width=device-width,initial-scale=1" : "width=360";
    if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
    }
  }
  addEventListener("resize", switchViewport, false);
  switchViewport();
}();
console.log("hello");
