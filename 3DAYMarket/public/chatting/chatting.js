document.forms["msg-zone"].onsubmit = function (e) {
  e.preventDefault();
  const text = document.getElementById("msg").innerHTML;
  const time = new Date().toLocaleTimeString;
  console.log(text);
  console.log(time);
};

document.getElementById("msg-sumbit").onclick = function (e) {
  e.preventDefault();
};

function submitFunc(e) {
  e.preventDefault();
  value = "";
  console.log("test");
}

// const form = document.getElementById("msg-zone");
// form.addEventListener("submit", submitFunc);
