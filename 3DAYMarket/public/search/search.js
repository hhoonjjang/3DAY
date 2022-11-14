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
const searchAddress = "http://localhost:8080/search/?result=";

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
  const itemList = (
    await axios.post("/api/item/searchItem", {
      // value: searchItem.value,
    })
  ).data.tempItem;
  // console.log(itemList);
  // console.log(searchItem.value);
  // console.log(item[1].itemTitle);

  const searchItemValue = detailName.toLowerCase();

  // console.log(searchItem.search.value);
  for (let i = 0; i < itemList.length; i++) {
    if (searchItemValue.search) {
      let item = itemList[i].itemTitle;
      // console.log(item.length);
      for (let j = 0; j < item.length; j++) {
        if (item[j].toLowerCase().indexOf(searchItemValue) != -1) {
          if (filterItemList[j] == filterItemList[j + 1]) {
            filterItemList.pop();
          }
          filterItemList.push(itemList[i]);
        }
      }
    }
  }
  if (filterItemList != undefined) {
    console.log(filterItemList);
  }

  // location.href = `${searchAddress}${searchItem.search.value}`;
  // window.history.back();

  // if (window.event.keyCode == 13){

  // }
  createItem(title, local, price);
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

const createItem = function (title, local, price) {};
