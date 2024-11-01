var $ = jQuery;
$(document).ready(function () {
  function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    var ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    var timeString = hours + ":" + minutes;
    timeString += " " + ampm;

    $("#taskbar-clock").text(timeString);
  }

  updateClock();
  setInterval(updateClock, 60000);
});
