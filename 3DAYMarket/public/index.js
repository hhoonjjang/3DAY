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
const divItemBoard = document.getElementById("item-board-display");
let date = new Date();
const address = "http://localhost:8080/items?name=";

async function getItem() {
  try {
    const item = (await axios.get("/api/item/")).data;
    console.log(item);
    console.log(item[0]);
    item.forEach((item) => {
      console.log(divItemBoard);
      const articleItem = document.createElement("article");
      const aItem = document.createElement("a");
      const divItemTop = document.createElement("div");
      const divItemImg = document.createElement("div");
      const imgItem = document.createElement("img");
      const divItemMiddle = document.createElement("div");
      const divItemTitle = document.createElement("div");
      const divItemPrice = document.createElement("div");
      const divItemLocal = document.createElement("div");
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
      divItemLocal.innerText = item.User.userLocal;
      divItemBottom.classList.add("item-bottom");
      divItemFocus.classList.add("item-focus");
      divItemFocus.innerText = `관심 ${10}`;
      divItemBorderdot.classList.add("border-dot");
      divItemBorderdot.innerText = "！";
      divItemCountingView.classList.add("item-countingview");
      divItemCountingView.innerText = `채팅 ${78}`;
      console.log(item.User.userLocal);
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

// console.log(reverseImg);
// signUpBtn.onclick= async function(){
//     try{
//         console.log(document.getElementById("user-id").value)

//     const user = await axios.post("/api/user/regist",{
//         id: document.getElementById("user-id").value,
//         pw: document.getElementById("user-pw").value,
//         name:document.getElementById("user-name").value,
//     })
// }
//     catch(error){
//         console.error(error.response.data.message)
//     }
// }
// signInBtn.onclick = async function (){
//     try{
//         const result = await axios.post('/api/user/login',{
//             id: document.getElementById("user-id").value,
//         pw: document.getElementById("user-pw").value,
//         })
//         console.log(result);
//         console.log(result.data);z
//         signOutBtn.classList.add("on");
//         chattingBtn.classList.add("on");
//         itemUpload.classList.add("on");
//         userInfo.classList.add("on");
//         const login = document.createElement("div");
//         login.innerText = `${result.data.name}님 어서오세요!`;
//         document.getElementById("loginDisplay").append(login)
//         loginDisplay.style.display="block";

//         signInBtn.classList.add("off");
//         signUpBtn.classList.add("off");

//     }catch(error){
//         // console.error(err)
//         // alert("아이디나 비밀번호가 올바르지않습니다");
//     }
// }

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

// let addItem = async function () {
//   try {
//     const item = await axios.get("/api/item/add", {});
//     console.log(item);
//   } catch (err) {
//     console.error(err);
//   }
// };
// addItem();
// reverseBtn.ondblclick = function(){
//    if(cookieR){
//     deleteCookie("reverse");
//    }
//    else{
//     setCookie("reverse",123,1);
//    }
//     console.log(document.cookieReverse)

//     document.body.classList.toggle("start");
//     for(let i =0;i<reverseImg.length;i++){
//         reverseImg[i].classList.toggle("start");
//     }
//     for(let i =0;i<reverseBgc.length;i++){
//         reverseBgc[i].classList.toggle("start");
//     }

// }
// const reverse = function(){
//     if(cookieR){
//         document.body.classList.add("start");
//     for(let i =0;i<reverseImg.length;i++){
//         // console.log("reverseImg[i]")
//         reverseImg[i].classList.add("start");
//     }
//     for(let i =0;i<reverseBgc.length;i++){
//         // console.log("reverseImg[i]")
//         reverseBgc[i].classList.add("start");
//     }
//     }
//     else{
//         document.body.classList.remove("start");
//         for(let i =0;i<reverseImg.length;i++){
//             // console.log("reverseImg[i]")
//             reverseImg[i].classList.remove("start");
//         }
//         for(let i =0;i<reverseBgc.length;i++){
//             // console.log("reverseImg[i]")
//             reverseBgc[i].classList.remove("start");
//         }
//     }
// }

// reverse();

// deleteCookie("reverse");

async function itemCategoryKind() {
  let selectKind = document.getElementById("select-kind");
  console.log(selectKind.options[selectKind.selectedIndex].value);
  console.log(selectKind.options[selectKind.selectedIndex].text);
  let selectKindValue = selectKind.options[selectKind.selectedIndex].value;
  const item = (await axios.get("/api/item/selectkind?kind=" + selectKindValue))
    .data.tempItem;

  divItemBoard.innerHTML = "";
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
    const divItemBottom = document.createElement("div");
    const divItemFocus = document.createElement("div");
    const divItemBorderdot = document.createElement("div");
    const divItemCountingView = document.createElement("div");
    articleItem.classList.add("item");
    aItem.classList.add("item-link");
    aItem.href = `${address}${item.id}`;
    divItemTop.classList.add("item-top");
    divItemImg.classList.add("item-img");
    imgItem.src = `../uploadedItems/${item?.imgArr?.split("-*,")[0]}`;
    divItemMiddle.classList.add("item-middle");
    divItemTitle.classList.add("item-title");
    divItemTitle.innerText = item.itemTitle;
    divItemPrice.classList.add("item-price");
    divItemPrice.innerText = item.itemPrice;
    divItemLocal.classList.add("item-local");
    divItemLocal.innerText = item.User.userLocal;
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
    divItemBottom.appendChild(divItemFocus);
    divItemBottom.appendChild(divItemBorderdot);
    divItemBottom.appendChild(divItemCountingView);
  });
}

async function itemCategoryLocal() {
  const selectLocal = document.getElementById("select-local");
  const selectLocalValue = selectLocal.options[selectLocal.selectedIndex].value;
  const item = (
    await axios.get("/api/item/selectlocal?local=" + selectLocalValue)
  ).data.tempItem;
  divItemBoard.innerHTML = "";
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
    const divItemBottom = document.createElement("div");
    const divItemFocus = document.createElement("div");
    const divItemBorderdot = document.createElement("div");
    const divItemCountingView = document.createElement("div");
    articleItem.classList.add("item");
    aItem.classList.add("item-link");
    aItem.href = `${address}${item.id}`;
    divItemTop.classList.add("item-top");
    divItemImg.classList.add("item-img");
    imgItem.src = `../uploadedItems/${item?.imgArr?.split("-*,")[0]}`;
    divItemMiddle.classList.add("item-middle");
    divItemTitle.classList.add("item-title");
    divItemTitle.innerText = item.itemTitle;
    divItemPrice.classList.add("item-price");
    divItemPrice.innerText = item.itemPrice;
    divItemLocal.classList.add("item-local");
    divItemLocal.innerText = item.User.userLocal;
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
    divItemBottom.appendChild(divItemFocus);
    divItemBottom.appendChild(divItemBorderdot);
    divItemBottom.appendChild(divItemCountingView);
  });
}

async function itemCategoryTrade() {
  const selectTrade = document.getElementById("select-trade");
  const selectTradeValue = selectTrade.options[selectTrade.selectedIndex].value;
  console.log(selectTradeValue);
  const item = (
    await axios.get("api/item/selecttrade?trade=" + selectTradeValue)
  ).data.tempItem;
  divItemBoard.innerHTML = "";
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
    const divItemBottom = document.createElement("div");
    const divItemFocus = document.createElement("div");
    const divItemBorderdot = document.createElement("div");
    const divItemCountingView = document.createElement("div");
    articleItem.classList.add("item");
    aItem.classList.add("item-link");
    aItem.href = `${address}${item.id}`;
    divItemTop.classList.add("item-top");
    divItemImg.classList.add("item-img");
    imgItem.src = `../uploadedItems/${item?.imgArr?.split("-*,")[0]}`;
    divItemMiddle.classList.add("item-middle");
    divItemTitle.classList.add("item-title");
    divItemTitle.innerText = item.itemTitle;
    divItemPrice.classList.add("item-price");
    divItemPrice.innerText = item.itemPrice;
    divItemLocal.classList.add("item-local");
    divItemLocal.innerText = item.User.userLocal;
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
    divItemBottom.appendChild(divItemFocus);
    divItemBottom.appendChild(divItemBorderdot);
    divItemBottom.appendChild(divItemCountingView);
  });
}
