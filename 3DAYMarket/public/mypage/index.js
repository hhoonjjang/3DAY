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
// -----------------------------------------------------------------
const userid = document.getElementById("userid");
const userName = document.getElementById("userName");
const userlocal = document.getElementById("userlocal");

function start() {
  userid.innerText = "";
  userName.innerText = "";
  userlocal.innerText = "";

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
  const props = {
    top: "top:-100px",
    transition1: "transition: top 1s",
    transition2: "transition: top 2s",
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
    top: "top:-500px",
    transition1: "transition: top 1s",
    transition2: "transition: top 2s",
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
  const elms = [
    elm.menu,
    elm.userUi,
    elm.pay,
    elm.mybuysellist,
    elm.myplace,
    elm.mybiz,
  ];
  const elms1 = [elm1.menu2, elm1.userUi2, elm1.editName];

  function transition(elements, props) {
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute("style", `${props[i]}`);
    }
  }
  function transition1(elements1, props1) {
    console.log(elements1);
    for (let i = 0; i < elements1.length; i++) {
      elements1[i].setAttribute("style", `${props1[i]}`);
    }
  }

  gear.onclick = () => {
    const properties = [
      `${props.opacity0} ${props.trnsDelay1}`,
      `${props.opacity0} ${props.trnsDelay1} `,
      `${props.opacity0} ${props.trnsDelay1} `,
      `${props.opacity0} ${props.trnsDelay2} `,
      `${props.opacity0} ${props.trnsDelay2} `,
      `${props.opacity0} ${props.trnsDelay5} `,
      `${props.opacity0} ${props.trnsDelay6} `,
    ];
    transition(elms, properties);

    setTimeout(() => {
      document.getElementById("bgp2").style.display = "block";
      const properties1 = [
        `${props1.opacity1} ${props1.top} `,
        `${props1.opacity1} ${props1.top}`,
        `${props1.opacity1} ${props1.top}`,
      ];
      transition1(elms1, properties1);
    }, 3000);

    console.log("기어 클릭이 됨");
  };
  arrow2.onclick = () => {
    document.getElementById("bgp2").style.display = "none";
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
    console.log("selllist 클릭됨");
  };
  selllist2.onclick = () => {
    console.log("selllist 클릭됨");
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
start();
