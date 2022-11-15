socketFunc();
const signInBtn = document.getElementById("sign-in");
const signOutBtn = document.getElementById("sign-out");
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
    location.href = "http://localhost:8080/";
  } catch (err) {
    console.error(err);
  }
};
let cookieReverse;

let getCookie = function (name) {
  let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};
let setCookie = function (name, value, exp) {
  let date = new Date();
  date.setTime(date.getTime() + exp * 1000 * 60 * 60 * 9 + 1000 * 60);
  document.cookie =
    name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
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
      const login = document.createElement("div");
      login.innerText = `${result.data.name}님 어서오세요!`;
      document.getElementById("user-name").innerText = result.data.name;
      loginDisplay.style.display = "block";
      document.getElementById("loginDisplay").append(login);
      signInBtn.classList.add("off");
      signUpBtn.classList.add("off");
    } catch (error) {}
  }
};
login();

function activeOnChat() {
  const chatList = document.getElementsByClassName("one-chat");
  const nameList = document.getElementsByClassName("vs-name");
  for (let i = 0; i < chatList.length; i++) {
    chatList[i].onclick = async function () {
      const partnerName = nameList[i].innerText;
      const sellItemInfo = await axios.post("/api/chat/").data;
      const data = await axios.post("/api/chat/sendinfo", {
        me: document.getElementById("user-name").innerText,
        partner: partnerName,
        tempTure: parseInt(Math.random() * 100 + 1),
      });
      document.getElementById("partner-id").innerText = data.data.patner;
      document.getElementById("partenr-tempture").innerText =
        data.data.tempTure + "˚C";
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
  }
});

const mainBox = document.getElementById("main-box");
const main = document.getElementById("main");
const userlist = document.getElementById("userlist");
const chatlist = document.getElementById("chat-list");

if (cookieR) {
  document.getElementById("chat-list").style.borderRight = "5px solid #051e1e";
  document.getElementById("chat-list").style.borderLeft = "5px solid #051e1e";
}

const reverse = function () {
  if (cookieR) {
    document.body.classList.add("start");
    for (let i = 0; i < reverseImg.length; i++) {
      reverseImg[i].classList.add("start");
    }
    for (let i = 0; i < reverseBgc.length; i++) {
      reverseBgc[i].classList.add("start");
    }
  } else {
    document.body.classList.remove("start");
    for (let i = 0; i < reverseImg.length; i++) {
      reverseImg[i].classList.remove("start");
    }
    for (let i = 0; i < reverseBgc.length; i++) {
      reverseBgc[i].classList.remove("start");
    }
  }
};

reverse();

const searchAddress = "http://localhost:8080/search/?result=";
let filterItemList = [];
const searchItem = document.forms["search-form"];
searchItem.onsubmit = async function (event) {
  event.preventDefault();

  if (filterItemList) {
    for (let i = 0; i < filterItemList.length; i++) {
      filterItemList.pop();
    }
  }
  console.log(filterItemList);
  const filterItemListSend = await axios.post("/api/item/filterItem", {
    list: filterItemList,
  });

  location.href = searchAddress + searchItem.search.value;
};
