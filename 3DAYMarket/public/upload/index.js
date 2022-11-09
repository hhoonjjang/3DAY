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
const imgArr = [];
let getValue1 = async function () {};

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
}
//

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
    //
    const result = await axios.post("/api/item/add", {
      itemTitle: itemTitle,
      itemPrice: itemPrice,
      itemSubtitle: itemSubtitle,
      itemCategories: itemCategories,
      itemCondition: itemCondition,
      itemTuning: itemTuning,
      itemDealing: itemDealing,
    });
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
//
//
// function createElement(e, file) {
//   const div = document.createElement("div");
//   const img = document.createElement("img");
//   div.classList.add("img-block");
//   img.setAttribute("src", e.target.result);
//   img.setAttribute("data-file", file.name);
//   div.appendChild(img);

//   return div;
// }

function getImageFiles(e) {
  itemImage = e.currentTarget.files;
  console.log(itemImage);
  // if ([...itemImage].length > 4 || [...itemImage].length == 0) {
  //   alert("이미지를 1개부터 4개까지 업로드 해주세요");
  //   return;
  // }

  // [...itemImage].forEach((file) => {
  //   if (!file.type.match("image/.*")) {
  //     alert("이미지 파일만 업로드 가능합니다");
  //     return;
  //   }
  //   imgArr.push(file);
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const preview = createElement(e, file);
  //     document.getElementById("img-box").appendChild(preview);
  //   };
  //   reader.readAsDataURL(file);
  // });
}

document
  .getElementById("img-uploader")
  .addEventListener("change", getImageFiles);
