let getCookie = function (name) {
  let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  console.log(value);
  return value ? value[2] : null;
};

let cookieServer = async function () {
  let CC = getCookie("carrot");

  let cookieArray = document.cookie.split("; ");
  let cookieCIndex = cookieArray.findIndex((e) => e == `carrot=${CC}`);
  if (cookieArray[cookieCIndex]) {
    try {
      const result = await axios.post("/api/user/cookie", {
        cookie: cookieArray[cookieCIndex],
      });

      console.log(result.data.name);

      document.getElementById("user-name").innerText = result.data.name;
    } catch (error) {
      // console.error(error);
    }
  }
};
cookieServer();

const tempData = [
  {
    name: "김영준",
    text: "코드도둑",
  },

  {
    name: "정재훈",
    text: "여심도둑",
  },
  {
    name: "김재일",
    text: "술도둑",
  },
  {
    name: "이재혁",
    text: "도둑",
  },
  {
    name: "3재에Young",
    text: "당근마켓",
  },
];

const createOneChat = function (data) {
  const tempBox = document.createElement("div");
  tempBox.classList.add("one-chat");
  const tempdiv1 = document.createElement("div");
  const tempdiv2 = document.createElement("div");
  const tempdiv3 = document.createElement("div");
  tempdiv3.innerText = "사진로그";
  const tempdiv4 = document.createElement("div");
  const tempdiv5 = document.createElement("div");

  const tempImgUser = document.createElement("img");
  tempImgUser.classList.add("vs-img");
  tempImgUser.src = "./chatimg/default.png";
  tempdiv1.append(tempImgUser);
  tempBox.append(tempdiv1);
  const tempVsInfo = document.createElement("div");
  tempVsInfo.classList.add("vs-info");

  const tempspanName = document.createElement("span");
  tempspanName.classList.add("vs-name");
  tempspanName.innerText = data.name;
  const tempspanData1 = document.createElement("span");
  tempspanData1.classList.add("vs-data");
  tempspanData1.innerText = "local";

  const tempspanData2 = document.createElement("span");
  tempspanData2.classList.add("vs-data");
  tempspanData2.innerText = ".";

  const tempspanData3 = document.createElement("span");
  tempspanData3.classList.add("vs-data");
  tempspanData3.innerText = "log-day";

  const tempLastLog = document.createElement("div");
  tempLastLog.classList.add("vs-chatlog");
  tempLastLog.innerText = data.text;

  const tempImgLog = document.createElement("img");
  tempImgLog.classList.add("vs-log-img");

  const chatVsList = document.getElementById("chat-vs");
  tempdiv2.classList.add("fbox-between");
  tempdiv4.append(tempspanName);
  tempdiv5.append(tempspanData1);
  tempdiv5.append(tempspanData2);
  tempdiv5.append(tempspanData3);
  tempdiv2.append(tempdiv4);
  tempdiv2.append(tempdiv5);

  tempVsInfo.append(tempdiv2);
  tempVsInfo.append(tempLastLog);
  tempdiv3.append(tempImgLog);
  tempBox.append(tempVsInfo);

  tempBox.append(tempdiv3);

  chatVsList.append(tempBox);
};

tempData.forEach((data) => {
  createOneChat(data);
});
function activeOnChat() {
  const chatList = document.getElementsByClassName("one-chat");
  const nameList = document.getElementsByClassName("vs-name");
  // await const sendInfo = axios("/api/chat/vsinfo",{
  //   name: addScope,
  // });
  console.log("hi인포느ㅐㄴㅁ어ㅑㄴㅁ어");
  for (let i = 0; i < chatList.length; i++) {
    chatList[i].onclick = async function () {
      const partnerName = nameList[i].innerText;

      importPage("chatting");
      //내용추가 및 수정

      setTimeout(() => {
        socketFunc();
      }, 1000);
      const data = await axios.post(
        "/api/chat/sendinfo" + `?name=${partnerName}`
      );
    };
  }
}
activeOnChat();
async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}
async function importPage(target) {
  document.querySelector("#" + target).innerHTML = await fetchHtmlAsText(
    target + ".html"
  );
  console.log(document.querySelector("#" + target).innerHTML);
}

let changeImg = function (len) {
  for (let i = 0; i < len.length; i++) {
    len[i].classList.add("on");
  }
};

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList == "one-chat") {
    // alert("asd");
  }
});

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
// let count = 0;
// let reverseBgc = [...document.getElementsByClassName("bs")];
// document.getElementById("invert-btn").onclick = function () {
//   count += 1;
//   document.body.classList.toggle("on");
//   console.log(mainBox.style.backgroundColor);
//   if (count % 2 != 0) {
//     mainBox.style.backgroundColor = "black";
//   } else {
//     mainBox.style.backgroundColor = "rgb(254, 240, 214)";
//   }
//   if (document.getElementById("msg")) {
//     reverseBgc = [...document.getElementsByClassName("bs")];

//     document.getElementById("msg").classList.toggle("msgBox");

//     const mybubble = [...document.getElementsByClassName("my-speech-bubble")];
//     for (let i = 0; i < mybubble.length; i++) {
//       mybubble[i].style.color = "black";
//       mybubble[i].classList.toggle = "yellow";
//     }

//     const vsbubble = [...document.getElementsByClassName("vs-speech-bubble")];
//     for (let i = 0; i < vsbubble.length; i++) {
//       vsbubble[i].style.color = "black";
//       vsbubble[i].classList.toggle = "yellow";
//     }
//     const invertImg = [...document.getElementsByClassName("inimg")];

//     for (let i = 0; i < invertImg.length; i++) {
//       invertImg[i].classList.toggle("on");
//     }
//   }
//   if (document.getElementById("none-vs")) {
//     document.getElementById("none-vs").style.filter = "invert()";
//   }

//   for (let i = 0; i < reverseBgc.length; i++) {
//     reverseBgc[i].classList.toggle("start");
//   }
// };

// function socketFunc() {
//   const socket = io();

//   // setInterval(() => {
//   const textBtnElem = document.forms["msg-zone"];
//   //   console.log(textBtnElem);

//   //   if (textBtnElem) {
//   //     clearInterval();
//   //   }
//   // }, 500);

//   const chatElem = document.getElementById("vs-chat-zone");
//   if (textBtnElem) {
//     textBtnElem.onsubmit = (e) => {
//       e.preventDefault();
//       socket.emit("chat", {
//         userId: document.getElementById("user-name").innerText,
//         text: text,
//         parterId: document.getElementById("partner-id").innerText,
//       });
//     };
//   }
//   socket.on("chat", (data) => {
//     const tempElem = document.createElement("li");
//     console.log(data.id);
//     if (data.id) {
//       tempElem.innerText = data.id + " : " + data.text;
//     } else {
//       tempElem.classList.add("alert");
//       tempElem.innerText = data.text;
//     }
//     chatElem.append(tempElem);
//   });

//   socket.on("list", (data) => {
//     data.list.forEach((item) => {
//       const tempElem = document.createElement("li");
//       tempElem.innerText = item.userId + " : " + item.text;
//       chatElem.append(tempElem);
//     });
//   });
// }
// socketFunc();
// function submitBtn(e) {
//   e.preventDefault();
//   const text = document.forms["msg-zone"].msg.innerText;
//   const time = new Date().toLocaleTimeString;
//   console.log(text);
//   console.log(time);
// }

// async function submitBtn() {
//   const text = document.forms["msg-zone"]["msg"].value;
//   if (text == "") {
//     return alert("메시지를 입력하시오");
//   }
//   const now = new Date();
//   let hour = parseInt(now.getHours());
//   let ampm;
//   if (hour >= 12) {
//     hour = hour - 12;
//     ampm = "오후";
//   } else {
//     ampm = "오전";
//     if (hour < 10) {
//       hour = "0" + hour;
//     }
//   }
//   let min = parseInt(now.getMinutes());
//   if (min < 10) {
//     min = "0" + min;
//   }
//   const time = `${ampm} ${hour}:${min}`;

//   const chatZone = document.getElementById("vs-chat-zone");
//   const addLi = document.createElement("li");
//   addLi.classList.add("my-chat");
//   const addSpan = document.createElement("span");
//   addSpan.innerText = time;
//   addLi.append(addSpan);
//   const addDiv = document.createElement("div");
//   addDiv.classList.add("my-speech-bubble");
//   const addH3 = document.createElement("h3");
//   addH3.innerText = text;
//   addDiv.append(addH3);
//   addLi.append(addDiv);
//   chatZone.append(addLi);

//   chatZone.scrollTop = chatZone.scrollHeight;

//   try {
//     const chatToServer = await axios.post("/api/chat", {
//       userId: document.getElementById("user-name").innerText,
//       text: text,
//       parterId: document.getElementById("partner-id").innerText,
//     });
//   } catch (err) {
//     console.log(err);
//   }

//   document.forms["msg-zone"]["msg"].value = "";
//   document.forms["msg-zone"]["msg"].focus;
// }

// function submitText(event) {
//   if (window.event.keyCode == 13) {
//     submitBtn();

//     event.returnValue = false;
//     //textarea 에서 줄바꿈 방지

//     document.forms["msg-zone"]["msg"].value = "";
//   }
// }
