const signInBtn = document.getElementById("sign-in");
const signOutBtn = document.getElementById("sign-out");
const chattingBtn = document.getElementById("chatting");
const itemUpload = document.getElementById("item-upload");
const userInfo = document.getElementById("user-info");
const reverseBtn = document.getElementById("reverse");
const reverseImg = [...document.getElementsByClassName("reverse")];
const reverseBgc = [...document.getElementsByClassName("bgc")];
const loginDisplay = document.getElementById("loginDisplay");
const divItemBoard = document.getElementById("item-board-display");
let cookieR;
const tempUl = document.getElementById("info-div-slide");
let date = new Date();
const address = "http://localhost:8080/items?name=";

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
cookieR = document.cookie.split("; ").includes("reverse=123");
let cookieC = document.cookie.split("; ").includes(`carrot=${CC}`);

let cookieCIndex = cookieArray.findIndex((e) => e == `carrot=${CC}`);

let deleteCookie = function (name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

const login = async function () {
  console.log("asd");
  console.log(cookieArray[cookieCIndex]);
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
      loginDisplay.style.display = "block";
      document.getElementById("loginDisplay").append(login);
      signInBtn.classList.add("off");
      console.log("123");
    } catch (error) {
      console.error(error);
    }
  }
};
login();

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
async function getItem() {
  try {
    if (!cookieR) {
      mode = 0;
    } else {
      mode = 1;
    }
    const item = (await axios.post("/api/item/new", { mode: mode })).data;
    console.log(item);
    console.log(item[0]);
    item.forEach((item) => {
      const articleItem = document.createElement("article");
      const aItem = document.createElement("a");
      const divItemTop = document.createElement("div");
      const divItemImg = document.createElement("div");
      const imgItem = document.createElement("img");
      const divItemMiddle = document.createElement("div");
      const divItemTitle = document.createElement("div");
      const divItemPrice = document.createElement("div");
      const divItemLocal = document.createElement("div");

      const divItemTrade = document.createElement("div");

      const divItemBottom = document.createElement("div");
      const divItemFocus = document.createElement("div");
      const divItemBorderdot = document.createElement("div");
      const divItemCountingView = document.createElement("div");
      articleItem.classList.add("item");
      aItem.classList.add("item-link");
      aItem.href = `${address}${item.id}`;
      divItemTop.classList.add("item-top");
      divItemImg.classList.add("item-img");
      imgItem.src = `../uploadedItems/${item.imgArr.split("-*,")[0]}`;
      divItemMiddle.classList.add("item-middle");
      divItemTitle.classList.add("item-title");
      divItemTitle.innerText = item.itemTitle;
      divItemPrice.classList.add("item-price");
      divItemPrice.innerText = item.itemPrice;
      divItemLocal.classList.add("item-local");

      divItemLocal.innerText = item.itemLocal;
      divItemTrade.classList.add("item-trade");
      divItemTrade.innerText = item.itemDealing;

      divItemBottom.classList.add("item-bottom");
      divItemFocus.classList.add("item-focus");
      divItemFocus.innerText = `관심 ${10}`;
      divItemBorderdot.classList.add("border-dot");
      divItemBorderdot.innerText = "！";
      divItemCountingView.classList.add("item-countingview");
      divItemCountingView.innerText = `채팅 ${78}`;

      divItemBoard.appendChild(articleItem);
      articleItem.appendChild(aItem);
      aItem.appendChild(divItemTop);
      aItem.appendChild(divItemMiddle);
      aItem.appendChild(divItemBottom);
      divItemTop.appendChild(divItemImg);
      divItemImg.appendChild(imgItem);
      divItemMiddle.appendChild(divItemTitle);
      divItemMiddle.appendChild(divItemPrice);
      divItemMiddle.appendChild(divItemLocal);

      divItemMiddle.appendChild(divItemTrade);

      divItemBottom.appendChild(divItemFocus);
      divItemBottom.appendChild(divItemBorderdot);
      divItemBottom.appendChild(divItemCountingView);
    });
  } catch (err) {
    console.error(err);
  }
}

getItem();

// const address = "http://localhost:8080/items?name=";
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
