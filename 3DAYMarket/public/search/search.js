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
const divItemBoard = document.getElementsByClassName("result-sub")[0];
divItemBoard.innerHTML = "";
let date = new Date();
const address = "http://localhost:8080/items?name=";
const searchAddress = "http://localhost:8080/search/?result=";
let mode;
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
      signUpBtn.classList.add("off");
      console.log("123");
    } catch (error) {
      // console.error(error)
    }
  }
};
login();

const searchDetail = new URL(location.href).searchParams;
const detailName = searchDetail.get("result");
console.log(detailName);

let filterItemList = [];

// console.log(searchItem);
window.onload = async function (event) {
  // event.preventDefault();
  // if (searchItem.search.value == "") {
  //   return;
  // }

  if (filterItemList) {
    for (let i = 0; i < filterItemList.length; i++) {
      filterItemList.pop();
    }
  }
  // console.log(window.event.keyCode);
  // if (window.event.keyCode == 8) {
  //
  //   return console.log(filterItemList);
  // }
  // const itemList = (
  //   await axios.post("/api/item/searchItem", {
  //     // value: searchItem.value,
  //   })
  // ).data.tempItem;
  // console.log(itemList);
  // console.log(searchItem.value);
  // console.log(item[1].itemTitle);
  if (!cookieR) {
    mode = 0;
  } else {
    mode = 1;
  }
  const itemList = (
    await axios.post("/api/item/searchItem", {
      mode: mode,
    })
  ).data.tempItem;

  const searchItemValue = detailName.toLowerCase();

  // console.log(searchItem.search.value);
  for (let i = 0; i < itemList.length; i++) {
    if (searchItemValue.search) {
      let item = itemList[i].itemTitle;
      // console.log(item.length);
      for (let j = 0; j < item.length; j++) {
        if (item.toLowerCase().indexOf(searchItemValue) != -1) {
          // if (filterItemList[j] == filterItemList[j + 1]) {
          //   filterItemList.pop();
          // }
          // filterItemList.push(itemList[i]);

          if (filterItemList[j] == itemList[i]) {
            continue;
          } else {
            filterItemList.push(itemList[i]);
            break;
          }
        }
      }
    }
  }
  if (filterItemList.length != 0) {
    console.log(filterItemList);
    console.log(filterItemList[0].itemPrice);

    for (let k = 0; k < filterItemList.length; k++) {
      createItem(
        filterItemList[k].itemTitle,
        filterItemList[k].itemLocal,
        filterItemList[k].itemPrice,
        filterItemList.length,
        filterItemList[k].id,
        filterItemList[k].imgArr,
        filterItemList[k].itemDealing
      );
    }
  }

  // location.href = `${searchAddress}${searchItem.search.value}`;
  // window.history.back();

  // if (window.event.keyCode == 13){

  // }
};

// console.log();
// const testCheck = async function () {
//   const check = await axios.post("/filterItem", {});
//   console.log(check);
// };
// testCheck();

// async function getSearchResult(){
//   const itemIndex = window.location.href
//   try{
//     const resultItem = (await axios.get("/api/item/search?result="+))
//   }
// }

const createItem = function (title, local, price, num, id, imgArr, dealing) {
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
  aItem.href = `${address}${id}`;

  divItemTop.classList.add("item-top");
  divItemImg.classList.add("item-img");
  imgItem.src = `../uploadedItems/${imgArr.split("-*,")[0]}`;
  // imgItem.src = `../uploadedItems/${imgArr}`;

  divItemMiddle.classList.add("item-middle");
  divItemTitle.classList.add("item-title");
  divItemTitle.innerText = title;
  const divItemTitleH4 = document.createElement("h4");
  divItemTitleH4.innerText = price;
  const divItemPriceSpan = document.createElement("span");

  divItemPriceSpan.classList.add("price");
  divItemTitleH4.innerText = price;

  divItemPrice.classList.add("item-price");
  divItemLocal.classList.add("item-local");

  divItemLocal.innerText = local;
  divItemTrade.classList.add("item-trade");
  divItemTrade.innerText = dealing;

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
  divItemTitle.appendChild(divItemTitleH4);
  divItemMiddle.appendChild(divItemTitle);
  divItemPrice.appendChild(divItemPriceSpan);
  divItemMiddle.appendChild(divItemPrice);
  divItemMiddle.appendChild(divItemLocal);

  divItemMiddle.appendChild(divItemTrade);

  divItemBottom.appendChild(divItemFocus);
  divItemBottom.appendChild(divItemBorderdot);
  divItemBottom.appendChild(divItemCountingView);
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
