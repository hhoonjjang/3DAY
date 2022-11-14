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
const slideDiv = document.getElementById("info-div-slide");
// let img1 = document.getElementById("img1");
// let img2 = document.getElementById("img2");
// let img3 = document.getElementById("img3");
// let img4 = document.getElementById("img4");

let imgArr = [];
// // const imgArr = [img1, img2, img3];n
// // const imgArr = [img1, img2];n
// // const imgArr = [img1];n

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
      // slideDiv
      const litag = document.createElement("li");
      const imgtag = document.createElement("img");
      imgtag.setAttribute("id", `img${i + 1}`);
      litag.classList.add("info-div-slide-item");
      litag.setAttribute("id", `imglist${i + 1}`);
      slideDiv.append(litag);
      litag.append(imgtag);
      imgArr.push(item.imgArr.split("-*,")[i]);
      imgtag.src = imgArr[i].src = `../uploadedItems/${imgArr[i]}`;
    }
    console.log(imgArr);

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

function moveLeft() {
  if (imgArr.length == 2) {
    img1.classList.remove("display-none");
    imglist1.classList.remove("width-auto");
    return;
  }
  if (imgArr.length == 3) {
    if (img2.classList.contains("display-none")) {
      img2.classList.remove("display-none");
      imglist2.classList.remove("width-auto");
    } else {
      img1.classList.remove("display-none");
      imglist1.classList.remove("width-auto");
    }
  }
  if (imgArr.length == 4) {
    if (img3.classList.contains("display-none")) {
      img3.classList.remove("display-none");
      imglist3.classList.remove("width-auto");
    } else if (img2.classList.contains("display-none")) {
      img2.classList.remove("display-none");
      imglist2.classList.remove("width-auto");
    } else {
      img1.classList.remove("display-none");
      imglist1.classList.remove("width-auto");
    }
  }
}

function moveRight() {
  if (imgArr.length == 2) {
    img1.classList.add("display-none");
    imglist1.classList.add("width-auto");
    return;
  }
  if (imgArr.length == 3) {
    if (img1.classList.contains("display-none")) {
      img2.classList.add("display-none");
      imglist2.classList.add("width-auto");
    } else {
      img1.classList.add("display-none");
      imglist1.classList.add("width-auto");
    }
  }
  if (imgArr.length == 4) {
    if (img2.classList.contains("display-none")) {
      img3.classList.add("display-none");
      imglist3.classList.add("width-auto");
    } else if (img1.classList.contains("display-none")) {
      img2.classList.add("display-none");
      imglist2.classList.add("width-auto");
    } else {
      img1.classList.add("display-none");
      imglist1.classList.add("width-auto");
    }
  }
}

chatBtn.onclick = async function () {
  const item = (await axios.get("/api/item/detail?itemIndex=" + itemIndex)).data
    .tempItem;
  console.log(item);
  try {
    const result = await axios.post("/api/chat/", item);
    console.log(result);
    location.href = "http://localhost:8080/chatting/";
  } catch (err) {
    console.error(err);
  }
  // console.log(result);
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

function deleteItem() {
  if (confirm("정말로 삭제하시겠습니까?")) {
    //
    //
    //
    alert("정상적으로 삭제되었습니다");
    //
  } else {
    return;
  }
}
