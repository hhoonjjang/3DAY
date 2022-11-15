window.addEventListener("load", start);
const gear = document.getElementById("gearBtn");
const userimg = document.getElementById("photoimgBtn");
const userinfo = document.getElementById("nextBtn");
const pay = document.getElementById("pay");
const buylist = document.getElementById("item1title");
const buylist2 = document.getElementById("item1");
const selllist = document.getElementById("item2title");
const selllist2 = document.getElementById("item2");
const likelist = document.getElementById("item3title");
const likelist2 = document.getElementById("item3");
const sellbuylist = document.getElementById("item4title");
const sellbuylist2 = document.getElementById("item4");
const service = document.getElementById("myPlaceService");
const mylocal = document.getElementById("myPlacelocaltitle");
const mylocal1 = document.getElementById("myPlacelocalimg");
const alim = document.getElementById("myPlacealim");
const friendmail = document.getElementById("myPlacemail");
const bizprofile = document.getElementById("masterprofileimg");
const bizprofile1 = document.getElementById("masterprofiletitle");
const bizpu = document.getElementById("masterprofileimg1");
const bizpu1 = document.getElementById("masterprofiletitle1");
const bizad = document.getElementById("masterprofileimg2");
const bizad1 = document.getElementById("masterprofiletitle2");
const userid = document.getElementById("userid");
const userName = document.getElementById("userName");
const userlocal = document.getElementById("userlocal");

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
const editInput = document.getElementById("editinput");
const editInput2 = document.getElementById("editinput2");
const editBtn = document.getElementById("editbtn2");

let date = new Date();
const address = "http://localhost:8080/items?name=";
const searchAddress = "http://localhost:8080/search/?result=";
const divItemBoard = document.getElementById("itemBoard");
let cookieR;
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
cookieR = document.cookie.split("; ").includes("reverse=123");
let cookieC = document.cookie.split("; ").includes(`carrot=${CC}`);

let cookieCIndex = cookieArray.findIndex((e) => e == `carrot=${CC}`);

let deleteCookie = function (name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};
let userNameApi;
const login1 = async function () {
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
      userid.innerText = "유저아이디";
      userlocal.innerText = "유저로컬";
      userNameApi = result.data.name;
      userName.innerText = userNameApi;
      console.log(userNameApi);
      const tempUser = await axios.post("/api/user/userdisplay", {
        name: userNameApi,
      });
      console.log(tempUser);
      userid.innerText = tempUser.data.userId;
      userlocal.innerText = tempUser.data.userLocal;

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
login1();

// 리버스시작//

// reverseBtn.ondblclick = function () {
//   console.log("둥");
//   if (cookieR) {
//     console.log("쿠키가있을떄");
//     deleteCookie("reverse");
//     document.body.classList.remove("start");
//     for (let i = 0; i < reverseImg.length; i++) {
//       reverseImg[i].classList.remove("start");
//     }
//     for (let i = 0; i < reverseBgc.length; i++) {
//       reverseBgc[i].classList.remove("start");
//     }
//     count = 0;
//   } else {
//     if (count == 4) {
//       count = 0;
//       setCookie("reverse", 123, 1);
//       document.body.classList.add("start");
//       for (let i = 0; i < reverseImg.length; i++) {
//         reverseImg[i].classList.add("start");
//       }
//       for (let i = 0; i < reverseBgc.length; i++) {
//         reverseBgc[i].classList.add("start");
//       }
//     } else {
//       deleteCookie("reverse");
//       console.log("카운트가4가아닐때");
//       document.body.classList.remove("start");
//       for (let i = 0; i < reverseImg.length; i++) {
//         reverseImg[i].classList.remove("start");
//       }
//       for (let i = 0; i < reverseBgc.length; i++) {
//         reverseBgc[i].classList.remove("start");
//       }
//       count = 0;
//     }
//   }
// };
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

// 리버스끝//

// const userDisplay = async function () {
//   console.log("hey");
//   console.log(userNameApi);

//   console.log(tempUser);
//   // userid.innerText = "유저아이디";
//   // userlocal.innerText = "유저로컬";
//   // userName.innerText = "유저네임";
// };
// userDisplay();

function start() {
  const elm = {
    menu: document.querySelector("#menu"),
    userUi: document.querySelector("#imgName"),
    pay: document.querySelector("#pay"),
    mybuysellist: document.querySelector("#list"),
    myplace: document.querySelector("#myPlace"),
    mybiz: document.querySelector("#master"),
  };
  const elm1 = {
    menu2: document.querySelector("#menu2"),
    userUi2: document.querySelector("#imgName2"),
    editName: document.querySelector("#editName"),
  };
  const elm2 = {
    menu3: document.querySelector("#menu3"),
    userUi3: document.querySelector("#imgName3"),
    bgp3: document.querySelector("#bgp3"),
  };

  const props = {
    display0: "display:none;",
    display1: "display:block;",
    top: "top:-100px;",
    transition1: "transition: 1s",
    transition2: "transition: 2s",
    opacity0: "opacity: 0;",
    opacity1: "opacity: 1;",
    trnsDelay0: "transition-delay: 0.3s",
    trnsDelay1: "transition-delay: 0.8s",
    trnsDelay2: "transition-delay: 1.2s",
    trnsDelay3: "transition-delay: 1.6s",
    trnsDelay4: "transition-delay: 1.8s",
    trnsDelay5: "transition-delay: 1.9s",
    trnsDelay6: "transition-delay: 2s",
    zIndex0: "z-index: 0;",
    animarion0: "animation-delay:1s",
    animarion1: "animation-delay:1.3s",
    animarion2: "animation-delay:1.5s",
    animarion3: "animation-delay:1.7s",
    animarion4: "animation-delay:1.9s",
    animarion5: "animation-delay:2s",
  };
  const props1 = {
    display0: "display:none;",
    display1: "display:block;",
    top: "top:-500px;",
    transition1: "transition: 1s;",
    transition2: "transition: 2s;",
    opacity0: "opacity: 0;",
    opacity1: "opacity: 1;",
    trnsDelay0: "transition-delay: 0.3s;",
    trnsDelay1: "transition-delay: 0.8s;",
    trnsDelay2: "transition-delay: 1.2s;",
    trnsDelay3: "transition-delay: 1.6s;",
    trnsDelay4: "transition-delay: 1.8s;",
    trnsDelay5: "transition-delay: 1.9s;",
    trnsDelay6: "transition-delay: 2s;",
    zIndex0: "z-index: 0;",
    animarion0: "animation-delay:1s;",
    animarion1: "animation-delay:1.3s;",
    animarion2: "animation-delay:1.5s;",
    animarion3: "animation-delay:1.7s;",
    animarion4: "animation-delay:1.9;s",
    animarion5: "animation-delay:2s;",
  };
  const props2 = {
    display0: "display:none;",
    display1: "display:block;",
    top: "top:-500px",
    transition1: "transition: top 1s;",
    transition2: "transition: top 2s;",
    opacity0: "opacity: 0;",
    opacity1: "opacity: 1;",
    trnsDelay0: "transition-delay: 0.3s;",
    trnsDelay1: "transition-delay: 0.8s;",
    trnsDelay2: "transition-delay: 1.2s;",
    trnsDelay3: "transition-delay: 1.6s;",
    trnsDelay4: "transition-delay: 1.8s;",
    trnsDelay5: "transition-delay: 1.9s;",
    trnsDelay6: "transition-delay: 2s",
    zIndex0: "z-index: 0;",
    animarion0: "animation-delay:1s;",
    animarion1: "animation-delay:1.3s;",
    animarion2: "animation-delay:1.5s;",
    animarion3: "animation-delay:1.7s;",
    animarion4: "animation-delay:1.9s;",
    animarion5: "animation-delay:2s;",
  };
  const elms = [
    elm.menu,
    elm.userUi,
    elm.pay,
    elm.mybuysellist,
    elm.myplace,
    elm.mybiz,
  ];
  const elms1 = [elm1.menu2, elm1.userUi2, elm1.editName];
  const elms2 = [elm2.bgp3];

  function transition(elements, props) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute("style", `${props[i]}`);
    }
  }
  function transition1(elements1, props1) {
    for (let i = 0; i < elements1.length; i++) {
      elements1[i].setAttribute("style", `${props1[i]}`);
    }
  }
  function transition2(elements2, props2) {
    for (let i = 0; i < elements2.length; i++) {
      elements2[i].setAttribute("style", `${props2[i]}`);
    }
  }

  gear.onclick = () => {
    const properties = [
      `${props.opacity0} ${props.trnsDelay0}`,
      `${props.opacity0} ${props.trnsDelay1} `,
      `${props.opacity0} ${props.trnsDelay3} `,
      `${props.opacity0} ${props.trnsDelay2} `,
      `${props.opacity0} ${props.trnsDelay2} `,
      `${props.opacity0} ${props.trnsDelay2} `,
      `${props.opacity0} ${props.trnsDelay2} `,
    ];
    transition(elms, properties);

    setTimeout(() => {
      document.getElementById("bgp2").style.display = "block";
      const properties1 = [
        `${props1.opacity1} ${props1.transition1} ${props1.top} ${props1.trnsDelay3}  ${props1.animarion1}`,
        `${props1.opacity1} ${props1.transition1} ${props1.top} ${props1.trnsDelay5} ${props1.animarion2}`,
        `${props1.opacity1} ${props1.transition1} ${props1.top} ${props1.trnsDelay6} ${props1.animarion3}`,
      ];
      transition1(elms1, properties1);
    }, 3050);

    console.log("기어 클릭이 됨");
  };
  arrow2.onclick = () => {
    document.getElementById("bgp2").style.display = "none";
    const properties = [
      `${props.opacity1} ${props.trnsDelay1} ${props.trnsDelay0} `,
      `${props.opacity1} ${props.trnsDelay1} ${props.trnsDelay0} `,
      `${props.opacity1} ${props.trnsDelay1} ${props.trnsDelay0}`,
      `${props.opacity1} ${props.trnsDelay2} ${props.trnsDelay0}`,
      `${props.opacity1} ${props.trnsDelay2} ${props.trnsDelay0}`,
      `${props.opacity1} ${props.trnsDelay5} ${props.trnsDelay0}`,
      `${props.opacity1} ${props.trnsDelay6} ${props.trnsDelay0}`,
    ];
    transition(elms, properties);
  };
  userimg.onclick = () => {
    console.log("유저 이미지 클릭 됨");
  };
  userinfo.onclick = () => {
    location.reload();
    console.log("유저 인포 클릭됨");
  };
  pay.onclick = () => {
    console.log("pay 클릭됨");
  };
  buylist.onclick = () => {
    console.log("buylist 클릭됨");
  };
  buylist2.onclick = () => {
    console.log("buylist 클릭됨");
  };
  selllist.onclick = () => {
    const properties = [
      `${props.display0} ${props.trnsDelay1}`,
      `${props.display0} ${props.trnsDelay1} `,
      `${props.display0} ${props.trnsDelay1} `,
      `${props.display0} ${props.trnsDelay2} `,
      `${props.display0} ${props.trnsDelay2} `,
      `${props.display0} ${props.trnsDelay5} `,
      `${props.display0} ${props.trnsDelay6} `,
    ];
    transition(elms, properties);
    setTimeout(() => {
      document.getElementById("bgp3").style.display = "block";
      const properties2 = [`${props2.display1} ${props2.opacity1}  `];
      transition2(elms2, properties2);
    }, 500);

    console.log("selllist 클릭됨");

    arrow3.onclick = () => {
      document.getElementById("bgp3").style.display = "none";
      const properties = [
        `${props.opacity1} ${props.trnsDelay1}`,
        `${props.opacity1} ${props.trnsDelay1} `,
        `${props.opacity1} ${props.trnsDelay1} `,
        `${props.opacity1} ${props.trnsDelay2} `,
        `${props.opacity1} ${props.trnsDelay2} `,
        `${props.opacity1} ${props.trnsDelay5} `,
        `${props.opacity1} ${props.trnsDelay6} `,
      ];
      transition(elms, properties);
    };
    // const properties = [
    //   `${props.display0} ${props.trnsDelay1}`,
    //   `${props.display0} ${props.trnsDelay1} `,
    //   `${props.display0} ${props.trnsDelay1} `,
    //   `${props.display0} ${props.trnsDelay2} `,
    //   `${props.display0} ${props.trnsDelay2} `,
    //   `${props.display0} ${props.trnsDelay5} `,
    //   `${props.display0} ${props.trnsDelay6} `,
    // ];
    // transition(elms, properties);

    // setTimeout(() => {
    //   document.getElementById("bgp3").style.display = "block";
    //   const properties2 = [
    //     `${props2.display1} ${props2.opacity1} ${props2.top} `,
    //   ];
    //   transition2(elms2, properties2);
    // }, 300);
  };

  selllist2.onclick = async () => {
    console.log("selllist시작");
    divItemBoard.innerText = "";
    try {
      if (!cookieR) {
        mode = 0;
      } else {
        mode = 1;
      }
      const item = (
        await axios.post("/api/item/mypageitem", {
          cookie: cookieArray[cookieCIndex],
          mode: mode,
        })
      ).data.tempItem;
      console.log(item);
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

        const divItemTrade = document.createElement("div");

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

        divItemLocal.innerText = item.itemLocal;
        divItemTrade.classList.add("item-trade");
        divItemTrade.innerText = item.itemDealing;

        divItemBottom.classList.add("item-bottom");
        divItemFocus.classList.add("item-focus");
        divItemFocus.innerText = `관심 ${10}`;
        divItemBorderdot.classList.add("border-dot");
        divItemBorderdot.innerText = "！";
        divItemCountingView.classList.add("item-countingview");
        divItemCountingView.innerText = `채팅 ${78}`;
        console.log(divItemBoard);
        console.log(articleItem);
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

        divItemMiddle.appendChild(divItemTrade);

        divItemBottom.appendChild(divItemFocus);
        divItemBottom.appendChild(divItemBorderdot);
        divItemBottom.appendChild(divItemCountingView);
      });
      const properties = [
        `${props.display0} ${props.trnsDelay1}`,
        `${props.display0} ${props.trnsDelay1} `,
        `${props.display0} ${props.trnsDelay1} `,
        `${props.display0} ${props.trnsDelay2} `,
        `${props.display0} ${props.trnsDelay2} `,
        `${props.display0} ${props.trnsDelay5} `,
        `${props.display0} ${props.trnsDelay6} `,
      ];
      transition(elms, properties);
      setTimeout(() => {
        document.getElementById("bgp3").style.display = "block";
        const properties2 = [`${props2.display1} ${props2.opacity1}  `];
        transition2(elms2, properties2);
      }, 1000);

      console.log("selllist 클릭됨");
    } catch (err) {
      {
        console.error(err);
      }
      console.error(err);
    }
  };
  arrow3.onclick = () => {
    document.getElementById("bgp3").style.display = "none";
    const properties = [
      `${props.opacity1} ${props.trnsDelay1}`,
      `${props.opacity1} ${props.trnsDelay1} `,
      `${props.opacity1} ${props.trnsDelay1} `,
      `${props.opacity1} ${props.trnsDelay2} `,
      `${props.opacity1} ${props.trnsDelay2} `,
      `${props.opacity1} ${props.trnsDelay5} `,
      `${props.opacity1} ${props.trnsDelay6} `,
    ];
    transition(elms, properties);
  };
  likelist.onclick = () => {
    console.log("likelist 클릭됨");
  };
  likelist2.onclick = () => {
    console.log("likelist 클릭됨");
  };
  sellbuylist.onclick = () => {
    console.log("sellbuylist 클릭됨");
  };
  sellbuylist2.onclick = () => {
    console.log("sellbuylist 클릭됨");
  };
  service.onclick = () => {
    console.log("service 클릭됨");
  };
  mylocal.onclick = () => {
    console.log("내동네 설정 클릭됨");
  };
  mylocal1.onclick = () => {
    console.log("내 동네설정 클릭됨");
  };
  alim.onclick = () => {
    console.log("알림키워드 클릭됨");
  };
  friendmail.onclick = () => {
    console.log("friendmail 클릭됨");
  };
  bizprofile.onclick = () => {
    console.log("비지니스 프로필 설정 클릭됨");
  };
  bizprofile1.onclick = () => {
    console.log("비지니스 프로필 설정 클릭됨");
  };
  bizpu.onclick = () => {
    console.log("비지니스 홍보글 클릭됨");
  };
  bizpu1.onclick = () => {
    console.log("비지니스 홍보글 클릭됨");
  };
  bizad.onclick = () => {
    console.log("비지니스 광고글 클릭됨");
  };
  bizad1.onclick = () => {
    console.log("비지니스 광고글 클릭됨");
  };
}
console.log(editBtn);
editBtn.onclick = async function () {
  console.log(editInput.value);
  console.log(editInput2.value);
  try {
    const userName = await axios.put("/api/user/update", {
      editInput: editInput.value,
      editInput2: editInput2.value,
      cookie: cookieArray[cookieCIndex],
    });
    console.log(userName);
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

let filterItemList = [];
const searchItem = document.forms["search-form"];
searchItem.onsubmit = async function (event) {
  event.preventDefault();

  if (filterItemList) {
    for (let i = 0; i < filterItemList.length; i++) {
      filterItemList.pop();
    }
  }
  console.log(filterItemList);
  const filterItemListSend = await axios.post("/api/item/filterItem", {
    list: filterItemList,
  });

  location.href = searchAddress + searchItem.search.value;
};
