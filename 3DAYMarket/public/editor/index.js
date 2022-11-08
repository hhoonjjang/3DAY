// 코드 리펙토링 해야함, 한번에 하려면 꼬일수 있으니 미리 해놓자

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

const titleInput = document.getElementById("title-input");
const titleGuide = document.getElementById("title-guide");
function titleGuideNone() {
  titleGuide.classList.add("display-none");
  titleInput.classList.remove("red-border");
}
function titleGuideFalse() {
  titleGuide.classList.remove("display-none");
  titleInput.classList.add("red-border");
  titleInput.classList.remove("green-border");
}
function titleGuideTrue() {
  titleGuide.classList.add("display-none");
  titleInput.classList.remove("red-border");
  titleInput.classList.add("green-border");
}
function titleChange(e) {
  if (e.value.length < 1) {
    titleGuideNone();
  } else if (e.value.length < 5) {
    titleGuideFalse();
  } else {
    titleGuideTrue();
  }
}

const priceInput = document.getElementById("price-input");
const priceGuide = document.getElementById("price-guide");
const priceMsg = document.getElementById("price-msg");
priceInput.value = "";
function priceGuideNone() {
  priceGuide.classList.add("display-none");
  priceInput.classList.remove("red-border");
  priceInput.classList.remove("green-border");
}
function priceGuideFalse() {
  priceGuide.classList.remove("display-none");
  priceInput.classList.add("red-border");
  priceInput.classList.remove("green-border");
}
function priceGuideTrue() {
  priceGuide.classList.add("display-none");
  priceInput.classList.remove("red-border");
  priceInput.classList.add("green-border");
}
function priceGuideReturn() {
  priceInput.value = "";
  priceGuide.classList.add("display-none");
  priceInput.classList.remove("red-border");
}
priceInput.onfocus = () => {
  if (priceInput.value == 0) priceInput.value = "";
  priceInput.value = priceInput.value.replace(/,/g, "");
};
function priceChange(e) {
  if (e.value.length < 1) {
    priceGuideNone();
  } else if (e.value % 1) {
    priceGuideFalse();
    priceMsg.innerText = "소수점은 입력할 수 없습니다";
  } else if (isNaN(e.value)) {
    priceGuideFalse();
    priceMsg.innerText = "숫자만 입력해주세요";
  } else {
    priceGuideTrue();
  }
}
priceInput.onblur = () => {
  if (priceInput.value == "") return;
  if (priceInput.value % 1 || isNaN(priceInput.value)) {
    priceGuideReturn();
  }
  if (priceInput.value != "")
    priceInput.value = Number(priceInput.value).toLocaleString();
};

const subtitleTextarea = document.getElementById("subtitle-textarea");
const subtitleGuide = document.getElementById("subtitle-guide");
const subtitleHolder = document.getElementById("textarea-placeholder");
subtitleTextarea.value = "";
function subtitleNone() {
  subtitleGuide.classList.add("display-none");
  subtitleTextarea.classList.remove("red-border");
}
function subtitleFalse() {
  subtitleGuide.classList.remove("display-none");
  subtitleTextarea.classList.add("red-border");
  subtitleTextarea.classList.remove("green-border");
}
function subtitleTrue() {
  subtitleGuide.classList.add("display-none");
  subtitleTextarea.classList.remove("red-border");
  subtitleTextarea.classList.add("green-border");
}
subtitleTextarea.onfocus = () => {
  subtitleHolder.classList.add("display-none");
};
function subtitleChange() {
  if (subtitleTextarea.value == "") {
    subtitleNone();
  } else if (subtitleTextarea.value.length < 11) {
    subtitleFalse();
  } else {
    subtitleTrue();
  }
}
subtitleTextarea.onblur = () => {
  if (!subtitleTextarea.value) {
    subtitleHolder.classList.remove("display-none");
  }
};

document.getElementById("submit-form").onsubmit = (e) => {
  e.preventDefault();
  console.log(123);
};
