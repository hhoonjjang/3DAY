let title = "글 제목 (test)";
let price = 123456789;
let area = "서울특별시(test)";
let heart = 1234;
let hits = 5678;
let past = 7;
let categories = "의류, 패션(test)";
let sellerId = "seller1234(test)";
let condition = "test_condition";
let tuning = "test_tuning";
let dealing = "test_dealing";
let subtitle = "test_subtitle";

document.getElementById("title-text").innerText = title;
document.getElementById("price-num").innerText = price.toLocaleString();
document.getElementById("area-value").innerText = area;
document.getElementById("heart-value").innerText = heart.toLocaleString();
document.getElementById("hits-value").innerText = hits.toLocaleString();
document.getElementById("past-value").innerText = past;
document.getElementById("seller-categories").innerText = categories;
document.getElementById("seller-id").innerText = sellerId;
document.getElementById("condition").innerText = condition;
document.getElementById("tuning").innerText = tuning;
document.getElementById("dealing").innerText = dealing;
document.getElementById("subtitle-text").innerText = subtitle;

let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");
let img4 = document.getElementById("img4");

let imgArr = [img1, img2, img3, img4];
// // const imgArr = [img1, img2, img3];n
// // const imgArr = [img1, img2];n
// // const imgArr = [img1];n

imgArr[0].src = "../image/1.png";
imgArr[1].src = "../image/2.jpg";
imgArr[2].src = "../image/3.jpg";
imgArr[3].src = "../image/4.jpg";

//
const itemIndex = window.location.href.split("?")[1].split("=")[1];
const chatBtn = document.getElementById("chat-btn");

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
const tempUl = document.getElementById("info-div-slide");
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

async function getDetailItem() {
  console.log(itemIndex);
  try {
    const item = (await axios.get("/api/item/detail?itemIndex=" + itemIndex))
      .data.tempItem;
    const imgArray = [];
    console.log(imgArray);
    console.log(item.imgArr.split("-*,").length);

    // for (let i = 0; i < item.imgArr.split("-*,").length; i++) {
    //   imgArr.push(`img${i}`);
    //   const tempLi = document.createElement("li");
    //   tempLi.classList.add = "info-div-slide-item";
    //   const tempImg = document.createElement(`img`);
    //   tempImg.id = `img${i}`;
    //   console.log(tempUl);
    //   console.log(tempLi);
    //   console.log(tempImg);

    //   tempUl.prepend(tempLi);
    //   tempLi.append(tempImg);
    //   console.log(tempUl);
    // }
    // console.log(tempUl);

    for (let i = 0; i < item.imgArr.split("-*,").length; i++) {
      imgArray.push(item.imgArr.split("-*,")[i]);
      imgArr[i].src = `../uploadedItems/${imgArray[i]}`;
    }
    console.log(imgArr);
    console.log(imgArray);
    console.log(item);
    title = item.itemTitle;
    price = item.itemPrice;
    area = item.itemLocal;
    past = item.updatedAt.split("T")[0];
    sellerId = item.seller_id;
    console.log(item.seller_id);
    categories = item.itemCategories;
    condition = item.itemCondition;
    tuning = item.itemTuning;
    dealing = item.itemDealing;
    subtitle = item.itemSubtitle;
    document.getElementById("title-text").innerText = title;
    document.getElementById("price-num").innerText = price.toLocaleString();
    document.getElementById("area-value").innerText = area;
    document.getElementById("heart-value").innerText = heart.toLocaleString();
    document.getElementById("hits-value").innerText = hits.toLocaleString();
    document.getElementById("past-value").innerText = past;
    document.getElementById("seller-categories").innerText = categories;
    document.getElementById("seller-id").innerText = sellerId;
    document.getElementById("condition").innerText = condition;
    document.getElementById("tuning").innerText = tuning;
    document.getElementById("dealing").innerText = dealing;
    document.getElementById("subtitle-text").innerText = subtitle;
  } catch (err) {
    console.error(err);
  }
}
getDetailItem();

// const divInfoDiv = document.createElement("div");
// divInfoDiv.classList.add("info-div");
// const divReadMore = document.createElement("div");
// divReadMore.classList.add("read-more-div");
// const divInfoDivRel = document.createElement("div");
// divInfoDivRel.classList.add("info-div-rel");
// const divInfoDivInfo = document.createElement("div");
// divInfoDivInfo.classList.add("info-div-info");
// const divReadMoreDivInner = document.createElement("div");
// divReadMoreDivInner.classList.add("read-more-div-inner");
// const divReadMoreDivBanner = document.createElement("div");
// divReadMoreDivBanner.classList.add("read-more-div-banner");
// const divReadMoreDivWarn = document.createElement("div");
// divReadMoreDivWarn.classList.add("read-more-div-warn");
// const ulInfoDivSlide = document.createElement("ul");
// ulInfoDivSlide.classList.add("info-div-slide");
// const liInfoDivSlideItem = document.createElement("li");
// liInfoDivSlideItem.classList.add("info-div-slide-item");
// console.log(divReadMore);
// divMainColum.append(divInfoDiv);
// divMainColum.append(divReadMore);
// divInfoDiv.append(divInfoDivRel);
// divInfoDivRel.append(ulInfoDivSlide);
// ulInfoDivSlide.append(liInfoDivSlideItem);
// ulInfoDivSlide.append(liInfoDivSlideItem);
// ulInfoDivSlide.append(liInfoDivSlideItem);
// ulInfoDivSlide.append(liInfoDivSlideItem);

// divInfoDiv.append(divInfoDivInfo);
// divReadMore.append(divReadMoreDivInner);
// divReadMore.append(divReadMoreDivBanner);
// divReadMore.append(divReadMoreDivWarn);
function moveLeft() {
  if (imgArr.length == 2) {
    imgArr[0].classList.remove("display-none");
    return;
  }
  if (imgArr.length == 3) {
    if (imgArr[1].classList.contains("display-none")) {
      imgArr[1].classList.remove("display-none");
    } else imgArr[0].classList.remove("display-none");
  }
  if (imgArr.length == 4) {
    if (imgArr[2].classList.contains("display-none")) {
      imgArr[2].classList.remove("display-none");
    } else if (imgArr[1].classList.contains("display-none")) {
      imgArr[1].classList.remove("display-none");
    } else imgArr[0].classList.remove("display-none");
  }
}

function moveRight() {
  if (imgArr.length == 2) {
    imgArr[0].classList.add("display-none");
    return;
  }
  if (imgArr.length == 3) {
    if (imgArr[0].classList.contains("display-none")) {
      imgArr[1].classList.add("display-none");
    } else imgArr[0].classList.add("display-none");
  }
  if (imgArr.length == 4) {
    if (imgArr[1].classList.contains("display-none")) {
      imgArr[2].classList.add("display-none");
    } else if (imgArr[0].classList.contains("display-none")) {
      imgArr[1].classList.add("display-none");
    } else imgArr[0].classList.add("display-none");
  }
}

chatBtn.onclick = async function () {
  location.href = "http://localhost:8080/chatting/";
  console.log(sellerId);
};
