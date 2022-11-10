const chatList = document.getElementsByClassName("one-chat");

async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

async function importPage(target) {
  document.querySelector("#" + target).innerHTML = await fetchHtmlAsText(
    target + ".html"
  );
}

let changeImg = function (len) {
  for (let i = 0; i < len.length; i++) {
    len[i].classList.add("on");
  }
};

chatList[0].onclick = () => {
  importPage("chatting");
  const inimg = [...document.getElementsByClassName("inimg")];
  setTimeout(() => {
    changeImg(inimg);
    console.log(inimg);
  }, 1000);
};

const mainBox = document.getElementById("main-box");
const main = document.getElementById("main");
const userlist = document.getElementById("userlist");
const chatlist = document.getElementById("chat-list");

// mainBox.classList.remove("box-shadow-yellow");
// mainBox.classList.add("box-shadow-blue");

// userlist.classList.remove("box-shadow-yellow");
// userlist.classList.add("box-shadow-blue");
// chatlist.classList.remove("box-shadow-yellow");
// chatlist.classList.add("box-shadow-blue");
let count = 0;
let reverseBgc = [...document.getElementsByClassName("bs")];
document.getElementById("invert-btn").onclick = function () {
  count += 1;
  document.body.classList.toggle("on");
  console.log(mainBox.style.backgroundColor);
  if (count % 2 != 0) {
    mainBox.style.backgroundColor = "black";
  } else {
    mainBox.style.backgroundColor = "rgb(254, 240, 214)";
  }
  if (document.getElementById("msg")) {
    reverseBgc = [...document.getElementsByClassName("bs")];

    document.getElementById("msg").classList.toggle("msgBox");

    const mybubble = [...document.getElementsByClassName("my-speech-bubble")];
    for (let i = 0; i < mybubble.length; i++) {
      mybubble[i].style.color = "black";
      mybubble[i].classList.toggle = "yellow";
    }

    const vsbubble = [...document.getElementsByClassName("vs-speech-bubble")];
    for (let i = 0; i < vsbubble.length; i++) {
      vsbubble[i].style.color = "black";
      vsbubble[i].classList.toggle = "yellow";
    }
    const invertImg = [...document.getElementsByClassName("inimg")];

    for (let i = 0; i < invertImg.length; i++) {
      invertImg[i].classList.toggle("on");
    }
  }
  if (document.getElementById("none-vs")) {
    document.getElementById("none-vs").style.filter = "invert()";
  }

  for (let i = 0; i < reverseBgc.length; i++) {
    reverseBgc[i].classList.toggle("start");
  }
};

function socketFunc() {
  const socket = io();

  // setInterval(() => {
  const textBtnElem = document.getElementById("msg-submit");
  //   console.log(textBtnElem);

  //   if (textBtnElem) {
  //     clearInterval();
  //   }
  // }, 500);
  const chatElem = document.getElementById("vs-chat-zone");
  if (textBtnElem) {
    textBtnElem.onclick = (e) => {
      e.preventDefault();
      socket.emit("chat", {
        text: textElem.value,
        userId: document.getElementById("user-name").innerText,
      });
    };
  }
  socket.on("chat", (data) => {
    const tempElem = document.createElement("li");
    if (data.id) {
      tempElem.innerText = data.id + " : " + data.text;
    } else {
      tempElem.classList.add("alert");
      tempElem.innerText = data.text;
    }
    chatElem.append(tempElem);
  });

  socket.on("list", (data) => {
    data.list.forEach((item) => {
      const tempElem = document.createElement("li");
      tempElem.innerText = item.userId + " : " + item.text;
      chatElem.append(tempElem);
    });
  });
}
// socketFunc();
