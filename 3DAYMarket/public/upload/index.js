// 코드 리펙토링 해야함, 한번에 하려면 꼬일수 있으니 미리 해놓자

// 빈 입력값 예외처리 -> 알럿 말고 온포커스로 변경

// oninput 컨트롤 + 백스페이스 지울때, 컨트롤 + C 로 입력할때 등 예외처리 구현 필요
// 가이드 버티컬 얼라인 미들(처럼 보이게) 구현 필요
// 가격 한글병행표시기능 추가
// 프라이스인풋 투로케일스트링 했을때 1조?? 넘어가면 이상하게 표시됨, 예외처리해서 막던가, 제대로 표시되게 조치해야함
// 공백 예외처리 필요

// 백엔드 관련
// 카테고리 설정을 해주세요 (빈 내용 예외처리)
// 라우터이름 upload
// 등록하기 >>>> 서버전송
// [이미지 등록시 페이지에 보이기, 최소한에 표시라도]

//
let isTitleTrue;
let isPriceTrue;
let isSubtitleTrue;

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

//
//
const titleInput = document.getElementById("title-input");
const titleGuide = document.getElementById("title-guide");
titleInput.oninput = function () {
  isTitleTrue = false;
  if (titleInput.value.length < 1) {
    titleGuide.classList.add("display-none");
    titleInput.classList.remove("red-border");
    titleInput.classList.remove("green-border");
  } else if (titleInput.value.length < 5) {
    titleGuide.classList.remove("display-none");
    titleInput.classList.add("red-border");
    titleInput.classList.remove("green-border");
  } else {
    titleGuide.classList.add("display-none");
    titleInput.classList.remove("red-border");
    titleInput.classList.add("green-border");
    isTitleTrue = true;
  }
};
//
//
const priceInput = document.getElementById("price-input");
const priceGuide = document.getElementById("price-guide");
const priceMsg = document.getElementById("price-msg");
priceInput.value = "";
priceInput.onfocus = () => {
  if (priceInput.value == 0) priceInput.value = "";
  priceInput.value = priceInput.value.replace(/,/g, "");
};

priceInput.oninput = () => {
  isPriceTrue = false;
  if (priceInput.value.length < 1) {
    priceGuide.classList.add("display-none");
    priceInput.classList.remove("red-border");
    priceInput.classList.remove("green-border");
  } else if (priceInput.value % 1) {
    priceGuide.classList.remove("display-none");
    priceInput.classList.add("red-border");
    priceInput.classList.remove("green-border");
    priceMsg.innerText = "소수점은 입력할 수 없습니다";
  } else if (isNaN(priceInput.value)) {
    priceGuide.classList.remove("display-none");
    priceInput.classList.add("red-border");
    priceInput.classList.remove("green-border");
    priceMsg.innerText = "숫자만 입력해주세요";
  } else {
    priceGuide.classList.add("display-none");
    priceInput.classList.remove("red-border");
    priceInput.classList.add("green-border");
    isPriceTrue = true;
  }
};
priceInput.onblur = () => {
  if (priceInput.value == "") return;
  if (priceInput.value % 1 || isNaN(priceInput.value)) {
    priceInput.value = "";
    priceGuide.classList.add("display-none");
    priceInput.classList.remove("red-border");
  }
  if (priceInput.value != "")
    priceInput.value = Number(priceInput.value).toLocaleString();
};
//
//
const subtitleTextarea = document.getElementById("subtitle-textarea");
const subtitleGuide = document.getElementById("subtitle-guide");
const subtitleHolder = document.getElementById("textarea-placeholder");
subtitleTextarea.value = "";
subtitleTextarea.onfocus = () => {
  subtitleHolder.classList.add("display-none");
};
subtitleTextarea.oninput = () => {
  isSubtitleTrue = false;
  if (subtitleTextarea.value == "") {
    subtitleGuide.classList.add("display-none");
    subtitleTextarea.classList.remove("red-border");
  } else if (subtitleTextarea.value.length < 11) {
    subtitleGuide.classList.remove("display-none");
    subtitleTextarea.classList.add("red-border");
    subtitleTextarea.classList.remove("green-border");
  } else {
    subtitleGuide.classList.add("display-none");
    subtitleTextarea.classList.remove("red-border");
    subtitleTextarea.classList.add("green-border");
    isSubtitleTrue = true;
  }
};
subtitleTextarea.onblur = () => {
  if (!subtitleTextarea.value) {
    subtitleHolder.classList.remove("display-none");
  }
};
//
//
let itemCategories;
let itemCondition;
let itemTuning;
let itemDealing;
let itemImage;
let itemLocal;
const imageArr = [];

function getValue() {
  const categoriesList = document.getElementsByName("categories");
  categoriesList.forEach((elem) => {
    if (elem.checked) {
      itemCategories = elem.id;
    }
  });
  const conditionList = document.getElementsByName("condition");
  conditionList.forEach((elem) => {
    if (elem.checked) {
      itemCondition = elem.id;
    }
  });
  const tuningList = document.getElementsByName("tuning");
  tuningList.forEach((elem) => {
    if (elem.checked) {
      itemTuning = elem.id;
    }
  });
  const dealingList = document.getElementsByName("dealing");
  dealingList.forEach((elem) => {
    if (elem.checked) {
      itemDealing = elem.id;
    }
  });
  const localList = document.getElementsByName("local");
  localList.forEach((elem) => {
    if (elem.checked) {
      if (elem.id == "local-seoul") itemLocal = "서울특별시";
      else if (elem.id == "local-busan") itemLocal = "부산광역시";
      else if (elem.id == "local-daegu") itemLocal = "대구광역시";
      else if (elem.id == "local-incheon") itemLocal = "인천광역시";
      else if (elem.id == "local-gwangju") itemLocal = "광주광역시";
      else if (elem.id == "local-daejeon") itemLocal = "대전광역시";
      else if (elem.id == "local-ulssan") itemLocal = "울산광역시";
      else if (elem.id == "local-sejong") itemLocal = "세종특별자치시";
      else if (elem.id == "local-gyungki") itemLocal = "경기도";
      else if (elem.id == "local-gangwon") itemLocal = "강원도";
      else if (elem.id == "local-chungbuk") itemLocal = "충청북도";
      else if (elem.id == "local-chungnam") itemLocal = "충청남도";
      else if (elem.id == "local-jeonbuk") itemLocal = "전라북도";
      else if (elem.id == "local-jeonnam") itemLocal = "전라남도";
      else if (elem.id == "local-gyungbuk") itemLocal = "경상북도";
      else if (elem.id == "local-gyungnam") itemLocal = "경상남도";
      else if (elem.id == "local-jeju") itemLocal = "제주특별자치도";
    }
  });
}
//

let formData = new FormData();
document.getElementById("submit-form").onsubmit = async function (e) {
  e.preventDefault();
  //
  getValue();
  if (
    !itemCategories ||
    !itemCondition ||
    !itemTuning ||
    !itemDealing ||
    !isTitleTrue ||
    !isPriceTrue ||
    !isSubtitleTrue ||
    !itemLocal ||
    !itemImage
  ) {
    alert("모든 입력을 완료해주세요");
    return;
  }


  try {
    const itemTitle = titleInput.value;
    const itemPrice = Number(priceInput.value.replace(/,/g, ""));
    const itemSubtitle = subtitleTextarea.value;
    const uploadImgS = document.getElementById("img-uploader-label");
    formData.append("itemTitle", itemTitle);
    formData.append("itemLocal", itemLocal);
    formData.append("itemPrice", itemPrice);
    formData.append("itemSubtitle", itemSubtitle);
    formData.append("itemCategories", itemCategories);
    formData.append("itemCondition", itemCondition);
    formData.append("itemTuning", itemTuning);
    formData.append("itemDealing", itemDealing);
    // const result = await axios.post("/api/item/add", {
    //   itemImage: itemImage,
    //   itemTitle: itemTitle,
    //   itemPrice: itemPrice,
    //   itemSubtitle: itemSubtitle,
    //   itemCategories: itemCategories,
    //   itemCondition: itemCondition,
    //   itemTuning: itemTuning,
    //   itemDealing: itemDealing,
    // });
    const img = await axios.post("/api/item/uploadFiles", formData);
    if (img) {
      alert("성공적으로 상품이 등록되었습니다.");
      location.href = "http://localhost:8080/";
    }
  } catch (err) {
    console.error(err);

  }

  // try {
  //   const result = await axios.post("/api/item/add", {
  //     itemTitle: itemTitle,
  //     itemPrice: itemPrice,
  //     itemSubtitle: itemSubtitle,
  //     itemCategories: itemCategories,
  //     itemCondition: itemCondition,
  //     itemTuning: itemTuning,
  //     itemDealing: itemDealing,
  //     itemImage: ,
  //   });
  // } catch (err) {
  //   console.error(err);
  // }
};
//
//
// 1개의 이미지올림 >> 어펜드추가, 배열추가, 프리뷰하나추가
// 1개의 이미지삭제 >> 어펜드리셋, 배열내 아이템 1개 삭제, 배열forEach해서 모든 배열의값을 어펜드, 프리뷰하나삭제
function createElement(e, file) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  div.classList.add("img-block");
  img.setAttribute("src", e.target.result);
  img.setAttribute("data-file", file.name);
  div.appendChild(img);
  div.onclick = () => {
    deleteImageFiles(file.name);
    div.classList.add("display-none");
  };

  return div;
}

let stopper = false;
function getImageFiles(e) {
  for (let i = 0; i < imageArr.length; i++) {
    if (imageArr[i].name == e.currentTarget.files[0].name) {
      stopper = true;
    }
  }
  if (!e.currentTarget.files[0].type.match("image/")) {
    alert("이미지 파일만 업로드 가능합니다");
    e.target.value = "";
    return;
  } else if (imageArr.length > 3) {
    alert("4개 까지만 업로드가 가능합니다");
    e.target.value = "";
    return;
  } else if (stopper) {
    alert("중복된 파일은 업로드가 불가능합니다");
    e.target.value = "";
    stopper = false;
    return;
  }
  itemImage = e.currentTarget.files[0];
  formData.append("img", itemImage);
  imageArr.push(itemImage);
  // for (let value of formData.values()) {
  //   console.log(value);
  // }

  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = createElement(e, itemImage);
    document.getElementById("img-box").appendChild(preview);
  };
  reader.readAsDataURL(itemImage);
  // console.log(imageArr);
  e.target.value = "";
}

function deleteImageFiles(e) {
  formData.delete("img");
  for (let i = 0; i < imageArr.length; i++) {
    if (imageArr[i].name == e) {
      imageArr.splice(imageArr[i], 1);
      imageArr.forEach((elem) => {
        formData.append("img", elem);
      });
      // for (let value of formData.values()) {
      //   console.log(value);
      // }
    }
  }
  // for (let value of formData.values()) {
  //   console.log(value);
  // }
  // console.log(imageArr);
}

document
  .getElementById("img-uploader")
  .addEventListener("change", getImageFiles);
