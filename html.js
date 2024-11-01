function createTaskbarItem(name, img) {
  if (img) {
    return `<div class="taskbar-item" id="${name}-taskbar" data-group="${name}">
    <img src="./${img}" width="20" height="20" />
    <span>${name} Wish</span>
  </div>`;
  }
  return `<div class="taskbar-item" id="${name}-taskbar" data-group="${name}">
    <img src="./${name}_16.png" width="20" height="20" />
    <span>${name} Wish</span>
  </div>`;
}

function createModal(name, wish, src) {
  console.log(counter);
  var connotation = 1;
  var content = "";
  if (Math.random() > 0.5) {
    connotation = -1;
  }

  var positioning = 50 + 1 * connotation * Math.random() * 10 + "%";

  if (!wish) {
    content = `<img src="${src}" height=260></img>`;
  } else {
    if (name === "note") {
      content = `<div class="popup-wish"><p style="width: 200px" class="animated-text">${wish}</p></div>`;
    } else if (name === "question") {
      content =
        "<div class='popup-question'><form><div class='input-group'><label for='q'>What is the answer based on clue?</label><input id='q' name='q' style='padding: 10px' type='text' autofocus></input></div></form></div>";
    } else {
      content = `<div class="popup-wish"><img src="${name}_128.png" width="200px"><p style="width: 200px" class="animated-text">${wish}</p></div>`;
    }
  }

  return (
    `
    <div
    style="top: ${positioning}; left: ${positioning}; z-index: ${counter}"
    id="${name}-modal" class="popup" draggable="true" class="item" data-group="${name}" onmousedown="bringFront(this, event)">
      <div class="popup-header">
        <span class="popup-title">${name} Wish</span>
        <button class="popup-close" onclick="hidePopup(this)">
          X
        </button>
      </div>
      <div class="popup-content" style="flex-grow: 1">
        ` +
    content +
    `
      </div>
      <div class="popup-footer">
        <button class="button" onclick="hidePopup(this)">LOVE IT! ❤️</button>
      </div>
      <div class="popup-resizer top-left"></div>
      <div class="popup-resizer top-right"></div>
      <div class="popup-resizer bottom-left"></div>
      <div class="popup-resizer bottom-right"></div>
      <div class="popup-resizer top"></div>
      <div class="popup-resizer right"></div>
      <div class="popup-resizer bottom"></div>
      <div class="popup-resizer left"></div>
    </div>
       `
  );
}
