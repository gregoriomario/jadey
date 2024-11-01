var $ = jQuery;

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0,
    header = $("." + elmnt.id + "header");
  if (!!header.length) {
    // if present, the header is where you move the DIV from:
    header.on("mousedown", dragMouseDown);
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    $(elmnt).on("mousedown", dragMouseDown);
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

let isResizing = false;
let currentResizer;

let counter = 99;
function bringFront(elem, event) {
  if (event.target.tagName !== "INPUT") {
    event.preventDefault();
  }
  $(elem).css("z-index", counter);
  counter++;
}

document.querySelectorAll(".popup-resizer").forEach((resizer) => {
  resizer.addEventListener("mousedown", (mousedown) => {
    isResizing = true;
    currentResizer = resizer;

    // Store initial values
    const prevX = mousedown.clientX;
    const prevY = mousedown.clientY;
    const rect = popup.getBoundingClientRect();

    function resize(mousemove) {
      if (isResizing) {
        const dx = mousemove.clientX - prevX;
        const dy = mousemove.clientY - prevY;

        if (currentResizer.classList.contains("bottom-right")) {
          popup.style.width = Math.max(rect.width + dx, 200) + "px";
          popup.style.height = Math.max(rect.height + dy, 100) + "px";
        } else if (currentResizer.classList.contains("bottom-left")) {
          popup.style.width = Math.max(rect.width - dx, 200) + "px";
          popup.style.height = Math.max(rect.height + dy, 100) + "px";
          popup.style.left = rect.left + dx + "px";
        } else if (currentResizer.classList.contains("top-right")) {
          popup.style.width = Math.max(rect.width + dx, 200) + "px";
          popup.style.height = Math.max(rect.height - dy, 100) + "px";
          popup.style.top = rect.top + dy + "px";
        } else if (currentResizer.classList.contains("top-left")) {
          popup.style.width = Math.max(rect.width - dx, 200) + "px";
          popup.style.height = Math.max(rect.height - dy, 100) + "px";
          popup.style.left = rect.left + dx + "px";
          popup.style.top = rect.top + dy + "px";
        } else if (currentResizer.classList.contains("right")) {
          popup.style.width = Math.max(rect.width + dx, 200) + "px";
        } else if (currentResizer.classList.contains("bottom")) {
          popup.style.height = Math.max(rect.height + dy, 100) + "px";
        } else if (currentResizer.classList.contains("left")) {
          popup.style.width = Math.max(rect.width - dx, 200) + "px";
          popup.style.left = rect.left + dx + "px";
        } else if (currentResizer.classList.contains("top")) {
          popup.style.height = Math.max(rect.height - dy, 100) + "px";
          popup.style.top = rect.top + dy + "px";
        }
      }
    }

    function stopResize() {
      isResizing = false;
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResize);
    }

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  });
});
