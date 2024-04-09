var i = 0;
//var txt = 'Lorem ipsum dummy text blabla.';
const textInput = document.querySelector(".text")
var speed = 50;

document.addEventListener("click",)

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}