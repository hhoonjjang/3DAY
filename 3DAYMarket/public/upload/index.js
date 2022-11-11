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

const imageArr = [];
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
  } catch (err) {
    console.error(err);
  }
};
//
//

function getImageFiles(e) {
  itemImage = e.currentTarget.files[0];
  formData.append("img", itemImage);
  for (let value of formData.values()) {
    console.log(value);
    console.log(formData.get(value));
  }
}

document
  .getElementById("img-uploader")
  .addEventListener("change", getImageFiles);
