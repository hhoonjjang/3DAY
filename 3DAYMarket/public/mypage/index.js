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

const useruserInfo = async () => {
  const userInfo = await axios.post("/api/user/mypage", {
    id: userId.value,
  });
  console.log(userInfo);
};
useruserInfo();

gear.onclick = () => {
  console.log("기어 클릭이 됨");
};
userimg.onclick = () => {
  console.log("유저 이미지 클릭 됨");
};
userinfo.onclick = () => {
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
