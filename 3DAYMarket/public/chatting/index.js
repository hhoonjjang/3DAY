// const mysql = require(".././mysql2");
// const con = mysql.createConnection({
//   username: "root",
//   password: "1234",
//   database: "3daymarket",
//   host: "127.0.0.1",
//   dialect: "mysql",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   const sql = "SELECT *partner_id FROM chat";

//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

socketFunc();

const signInBtn = document.getElementById("sign-in");
const signOutBtn = document.getElementById("sign-out");
// const signUpBtn =document.getElementById("sign-up");
const chattingBtn = document.getElementById("chatting");
const itemUpload = document.getElementById("item-upload");
const userInfo = document.getElementById("user-info");
const reverseBtn = document.getElementById("reverse");
const reverseImg = [...document.getElementsByClassName("reverse")];
const reverseBgc = [...document.getElementsByClassName("bgc")];
const loginDisplay = document.getElementById("loginDisplay");
let date = new Date();
const address = "http://localhost:8080/items/";

signOutBtn.onclick = async function () {
  try {
    const result = await axios.post("/api/user/logout");

    loginDisplay.removeChild(loginDisplay.firstChild);
    signOutBtn.classList.remove("on");
    chattingBtn.classList.remove("on");
    itemUpload.classList.remove("on");
    userInfo.classList.remove("on");
    loginDisplay.style.display = "none";

    signInBtn.classList.remove("off");
    // signUpBtn.classList.remove("off");
  } catch (err) {
    console.error(err);
  }
};
let cookieReverse;

let getCookie = function (name) {
  let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  // console.log(value);
  return value ? value[2] : null;
};
let setCookie = function (name, value, exp) {
  let date = new Date();
  date.setTime(date.getTime() + exp * 1000 * 60 * 60 * 9 + 1000 * 60);
  document.cookie =
    name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
  console.log(document.cookie);
  // console.log(cookie);
};
let cookieArray = document.cookie.split("; ");
let CC = getCookie("carrot");
let CR = getCookie("reverse");
let cookieR = document.cookie.split("; ").includes("reverse=123");
let cookieC = document.cookie.split("; ").includes(`carrot=${CC}`);

let cookieCIndex = cookieArray.findIndex((e) => e == `carrot=${CC}`);

let deleteCookie = function (name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

const login = async function () {
  if (cookieArray[cookieCIndex]) {
    try {
      const result = await axios.post("/api/user/cookie", {
        cookie: cookieArray[cookieCIndex],
      });
      signOutBtn.classList.add("on");
      chattingBtn.classList.add("on");
      itemUpload.classList.add("on");
      userInfo.classList.add("on");
      console.log(result.data.name);
      const login = document.createElement("div");
      login.innerText = `${result.data.name}님 어서오세요!`;
      document.getElementById("user-name").innerText = result.data.name;
      loginDisplay.style.display = "block";
      document.getElementById("loginDisplay").append(login);
      signInBtn.classList.add("off");
      signUpBtn.classList.add("off");
    } catch (error) {
      // console.error(error)
    }
  }
};
login();
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

// tempData.forEach((data) => {
//   createOneChat(data);
// });
function activeOnChat() {
  const chatList = document.getElementsByClassName("one-chat");
  const nameList = document.getElementsByClassName("vs-name");
  // await const sendInfo = axios("/api/chat/vsinfo",{
  //   name: addScope,
  // });

  for (let i = 0; i < chatList.length; i++) {
    chatList[i].onclick = async function () {
      const partnerName = nameList[i].innerText;
      const data = await axios.post("/api/chat/sendinfo", {
        me: document.getElementById("user-name").innerText,
        partner: partnerName,
        tempTure: parseInt(Math.random() * 100 + 1),
      });
      document.getElementById("partner-id").innerText = data.data.patner;
      document.getElementById("partenr-tempture").innerText =
        data.data.tempTure + "˚C";

      document.getElementById("item-title").innerText = "데이터받아와야함";
      document.getElementById("item-price").innerText = "데이터받아와야함";
      document.getElementById("trade-status").innerText = "데이터받아와야함";
      setTimeout(() => {
        socketFunc();
        document.getElementById("chat-box").style.display = "flex";
        document.getElementById("none-chat").style.display = "none";
      }, 10);
    };
  }
}
activeOnChat();

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
