const titleInput = document.getElementById("title-input");
titleInput.onblur = (e) => {
  if (titleInput.value.length == 0) return;
  else if (titleInput.value.length < 3) {
    alert("3자 이상 입력해주세요");
  }
};

const priceInput = document.getElementById("price-input");
priceInput.value = "";
priceInput.onblur = () => {
  if (priceInput.value == "") return;
  else if (priceInput.value % 1) {
    priceInput.value = "";
    alert("소수점은 입력할 수 없습니다");
  }
  priceInput.value = Number(priceInput.value).toLocaleString();
  if (priceInput.value == "NaN") {
    priceInput.value = "";
    alert("숫자만 입력할 수 있습니다");
  }
};
priceInput.onfocus = () => {
  if (priceInput.value == 0) priceInput.value = "";
  priceInput.value = priceInput.value.replace(/,/g, "");
};

const subtitleTextarea = document.getElementById("subtitle-textarea");
subtitleTextarea.value = "";
subtitleTextarea.onfocus = () => {
  document.getElementById("textarea-placeholder").classList.add("display-none");
};
subtitleTextarea.onblur = () => {
  if (!subtitleTextarea.value) {
    document
      .getElementById("textarea-placeholder")
      .classList.remove("display-none");
  }
};
