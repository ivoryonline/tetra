var paragraph = document.getElementById("body");
var text = document.createTextNode("Go back ");
var link = document.createElement("a");
link.href = "index.html";
link.textContent = "home";

paragraph.appendChild(text);
paragraph.appendChild(link);
