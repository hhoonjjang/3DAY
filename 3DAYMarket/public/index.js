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
const invertStart = document.getElementById("invert-start");
const divItemBoard = document.getElementById("item-board-display");

let date = new Date();
const address = "http://localhost:8080/items?name=";

const selectKind = document.getElementById("select-kind");
let selectKindValue;
const selectLocal = document.getElementById("select-local");
let selectLocalValue;
const selectTrade = document.getElementById("select-trade");
let selectTradeValue;

async function getItem() {
  try {
    const item = (await axios.get("/api/item/")).data;
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
let setCookie = function (name, value, exp) {
  let date = new Date();
  date.setTime(date.getTime() + exp * 1000 * 60 * 60 * 9 + 1000 * 60);
  document.cookie =
    name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
  console.log(document.cookie);
  // console.log(cookie);
};

let cookieReverse;

console.log(document.cookie);

let getCookie = function (name) {
  let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  console.log(value);
  return value ? value[2] : null;
};

let cookieArray = document.cookie.split("; ");

let CR = getCookie("reverse");
let CC = getCookie("carrot");
let cookieR = document.cookie.split("; ").includes("reverse=123");
let cookieC = document.cookie.split("; ").includes(`carrot=${CC}`);
console.log(cookieC);
let cookieCIndex = cookieArray.findIndex((e) => e == `carrot=${CC}`);
console.log(cookieArray[cookieCIndex]);
console.log(cookieR);

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

// 리버스시작//
let count = 0;
invertStart.ondblclick = function () {
  count++;
  console.log(count);
};

reverseBtn.ondblclick = function () {
  console.log("둥");
  if (cookieR) {
    console.log("쿠키가있을떄");
    deleteCookie("reverse");
    document.body.classList.remove("start");
    for (let i = 0; i < reverseImg.length; i++) {
      reverseImg[i].classList.remove("start");
    }
    for (let i = 0; i < reverseBgc.length; i++) {
      reverseBgc[i].classList.remove("start");
    }
    count = 0;
  } else {
    if (count == 4) {
      count = 0;
      setCookie("reverse", 123, 1);
      document.body.classList.add("start");
      for (let i = 0; i < reverseImg.length; i++) {
        reverseImg[i].classList.add("start");
      }
      for (let i = 0; i < reverseBgc.length; i++) {
        reverseBgc[i].classList.add("start");
      }
    } else {
      deleteCookie("reverse");
      console.log("카운트가4가아닐때");
      document.body.classList.remove("start");
      for (let i = 0; i < reverseImg.length; i++) {
        reverseImg[i].classList.remove("start");
      }
      for (let i = 0; i < reverseBgc.length; i++) {
        reverseBgc[i].classList.remove("start");
      }
      count = 0;
    }
  }
};
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

// 리버스끝//
async function itemCategoryKind() {
  selectKindValue = selectKind.options[selectKind.selectedIndex].value;
  let item;
  divItemBoard.innerHTML = "";
  if (!selectTradeValue && !selectLocalValue) {
    item = (await axios.get("/api/item/selectkind?kind=" + selectKindValue))
      .data.tempItem;
  }
  if (selectTradeValue && !selectLocalValue) {
    item = (
      await axios.post("/api/item/selectkindtrade", {
        kind: selectKindValue,
        trade: selectTradeValue,
      })
    ).data;
  }
  if (!selectTradeValue && selectLocalValue) {
    item = (
      await axios.post("/api/item/selectkindlocal", {
        kind: selectKindValue,
        local: selectLocalValue,
      })
    ).data;
  }
  if (selectTradeValue && selectLocalValue) {
    item = (
      await axios.post("/api/item/selectall", {
        kind: selectKindValue,
        local: selectLocalValue,
        trade: selectTradeValue,
      })
    ).data;
  }

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
}

async function itemCategoryLocal() {
  divItemBoard.innerHTML = "";
  let item;
  selectLocalValue = selectLocal.options[selectLocal.selectedIndex].value;

  if (!selectKindValue && !selectTradeValue) {
    item = (await axios.get("/api/item/selectlocal?local=" + selectLocalValue))
      .data.tempItem;
    console.log("로컬만");
  }
  if (!selectKindValue && selectTradeValue) {
    item = (
      await axios.post("/api/item/selectlocaltrade", {
        local: selectLocalValue,
        trade: selectTradeValue,
      })
    ).data;

    console.log("로컬과 트레이드");
  }
  if (!selectTradeValue && selectKindValue) {
    console.log("로컬카인드");
    console.log(selectLocalValue);
    item = (
      await axios.post("/api/item/selectkindlocal", {
        kind: selectKindValue,
        local: selectLocalValue,
      })
    ).data;
    console.log("로컬과 카인드");
  }
  if (selectKindValue && selectTradeValue) {
    item = (
      await axios.post("/api/item/selectall", {
        kind: selectKindValue,
        local: selectLocalValue,
        trade: selectTradeValue,
      })
    ).data;
    console.log("셀렉트오올");
  }
  console.log(item);
  item?.forEach((item) => {
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
}

async function itemCategoryTrade() {
  selectTradeValue = selectTrade.options[selectTrade.selectedIndex].value;
  divItemBoard.innerHTML = "";
  let item;
  if (!selectKindValue && !selectLocalValue) {
    item = (await axios.get("api/item/selecttrade?trade=" + selectTradeValue))
      .data.tempItem;
  }
  if (!selectKindValue && selectLocalValue) {
    item = (
      await axios.post("/api/item/selectlocaltrade", {
        local: selectLocalValue,
        trade: selectTradeValue,
      })
    ).data;
  }
  if (selectKindValue && !selectLocalValue) {
    const item = (
      await axios.post("/api/item/selectkindtrade", {
        kind: selectKindValue,
        trade: selectTradeValue,
      })
    ).data;
  }
  if (selectKindValue && selectLocalValue) {
    item = (
      await axios.post("/api/item/selectall", {
        kind: selectKindValue,
        local: selectLocalValue,
        trade: selectTradeValue,
      })
    ).data;
  }
  console.log(item);
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
}
