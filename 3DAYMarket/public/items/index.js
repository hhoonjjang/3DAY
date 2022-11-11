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

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");

const imgArr = [img1, img2, img3, img4];
// const imgArr = [img1, img2, img3];n
// const imgArr = [img1, img2];n
// const imgArr = [img1];n

imgArr[0].src = "../image/1.png";
imgArr[1].src = "../image/2.jpg";
imgArr[2].src = "../image/3.jpg";
imgArr[3].src = "../image/4.jpg";

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

//
const itemIndex = window.location.href.split("?")[1].split("=")[1];
async function getDetailItem() {
  console.log(itemIndex);
  try {
    const item = (await axios.get("/api/item/detail?itemIndex=" + itemIndex))
      .data.tempIt;
    console.log(item);
  } catch (err) {
    console.error(err);
  }
}
getDetailItem();
