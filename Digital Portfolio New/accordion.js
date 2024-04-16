var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var accordPanel = this.nextElementSibling;
    if (accordPanel.style.maxHeight) {
      accordPanel.style.maxHeight = null;
    } else {
      accordPanel.style.maxHeight = accordPanel.scrollHeight + "px";
    }
  });
}