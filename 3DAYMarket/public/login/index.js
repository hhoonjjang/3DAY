window.addEventListener("load", start);

const userId = document.getElementById("login--id");

const loginId = document.getElementById("login-userID");

const userName = document.getElementById("signup-username");
const userPassword = document.getElementById("signup-password");
const loginpassword = document.getElementById("login-password");
const userCheckpassword = document.getElementById("signup-checkpassword");
const userLocal = document.getElementById("signup-local");
const signUp = document.getElementById("sign-up");
const signIn = document.getElementById("sign-in");

//  이름 : 2~5 길이의 한글
const checkusername = /^[가-힣]{2,5}$/;
const checkUserName = checkusername.test(userName.value);
//  아이디 : 영문자로 시작하고, 5~10 길이의 영문자와 숫자의 조합 |  g는 모든 문자를 검색하는 플래그다.
const checkuserId = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,10}$/g;
const checkUserID = checkuserId.test(userId.value);
// 비밀번호 : 소문자, 숫자, 특수문자 조합의 8~20자
const checkpassword = /(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/;

const checklocal = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

function registecheck() {
  if (userId.value == "") {
    alert("아이디를 입력하지 않았습니다.");
    userId.focus();
    return false;
  }
  if (!(checkuserId == userId)) {
    alert("영문자로 시작하고, 5~10 길이의 영문자와 숫자의 조합");
    return false;
  }
  if (userName.value == "") {
    alert("이름을 입력해 주세요");
    userName.focus();
    return false;
  }
  if (!(checkusername == userName)) {
    alert("이름이 잘못되었습니다.");
    return false;
  }
  if (userPassword.value == "") {
    alert("비밀번호를 입력해 주세요");
    userPassword.focus();
    return false;
  }
  if (userCheckpassword.value == "") {
    alert("비밀번호를 입력해 주세요");
    userCheckpassword.focus();
    return false;
  }
  if (
    !check(userPassword, checkpassword, "소문자, 숫자, 특수문자 조합의 8~20자")
  ) {
    return false;
  }
  if (userPassword.value != userCheckpassword.value) {
    alert("비밀번호가 일치 하지 않습니다.");
    userPassword.focus();
    userCheckpassword.focus();
    return false;
  }

  if (userlocal.value == "") {
    alert("지역을 입력해주세요");
    return false;
  }
  if (!userCheckpassword.includes(userlocal.value)) {
    alert("지역이 일치 하지 않습니다.");
    userlocal.focus();
    return false;
  }
}

// const
function start() {
  let goPage = "http://localhost:8080";
  console.log(location.href);
  // console.log(state);

  const elm = {
    arrow: document.querySelector(".form-container__arrow"),
    overlay: document.querySelector(".overlay"),
    title: document.querySelector(".title"),
    signUpButton: document.querySelector(".buttons__signup"),
    loginButton: document.querySelector(".buttons__signup--login"),
    loginForm: document.querySelector(".login-form"),
    registerForm: document.querySelector(".login-form--register"),
  };

  const props = {
    left: "left: 20px;",
    bottom: "bottom: -500px;",
    transition1: "transition: bottom 1s;",
    transition2: "transition: bottom 2s;",
    opacity0: "opacity: 0;",
    opacity1: "opacity: 1;",
    trnsDelay: "transition-delay: 1s;",
    zIndex: "z-index: 6;",
    left0: "left: 0;",
    trnsDelay0: "transition-delay: 0s;",
    zIndex0: "z-index: 0;",
    leftM120: "left: -120px;",
  };

  const elms = [
    elm.arrow,
    elm.overlay,
    elm.title,
    elm.signUpButton,
    elm.loginButton,
    elm.loginForm,
    elm.registerForm,
  ];

  function transition(elements, props) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute("style", `${props[i]}`);
    }
  }

  elm.signUpButton.onclick = async function () {
    goPage = "http://localhost:8080/login/";
    const properties = [
      props.left,
      props.opacity0,
      props.opacity0,
      `${props.transition1} ${props.bottom}`,
      `${props.transition2} ${props.bottom}`,
      props.opacity0,
      `${props.opacity1} ${props.trnsDelay} ${props.zIndex}`,
    ];
    // const userId = document.getElementById["login-username"].value;
    // const userPassword = document.getElementById["login-password"].value;
    // try {
    //   await axios.get("/api/regist/", {
    //     name: userId,
    //   });
    // } catch (error) {
    //   console.error(error.response.data.message);
    // }

    // console.log(userId, "asdasdasd");
    transition(elms, properties);
  };

  elm.loginButton.onclick = function () {
    goPage = "http://localhost:8080/login/";
    const properties = [
      props.left,
      props.opacity0,
      props.opacity0,
      `${props.transition1} ${props.bottom}`,
      `${props.transition2} ${props.bottom}`,
      `${props.opacity1} ${props.trnsDelay} ${props.zIndex}`,
      props.opacity0,
    ];

    transition(elms, properties);
  };

  document.getElementById("arrowClick").onclick = function () {
    const properties = [
      props.leftM120,
      props.opacity1,
      props.opacity1,
      props.opacity1,
      props.opacity1,
      `${props.opacity0} ${props.trnsDelay0} ${props.zIndex0}`,
      `${props.opacity0} ${props.trnsDelay0} ${props.zIndex0}`,
    ];

    transition(elms, properties);
  };
  console.log(elm.registerForm.getElementsByTagName("form")[0]);
  elm.registerForm.getElementsByTagName("form")[0].onsubmit = (e) => {
    e.preventDefault();
    console.log(e.target["login--id"]);
    console.log(e.target["signup-username"]);
  };
  document.getElementById("backBtn1").onclick = function () {
    location.href = goPage;
  };

  signUp.onclick = async function () {
    const checkUserName = checkusername.test(userName.value);
    const checkUserID = checkuserId.test(userId.value);
    const checkPassWord = checkpassword.test(userPassword.value);
    const checkCheckPassWord = function () {
      if (userPassword.value == userCheckpassword.value) {
        return true;
      } else {
        return false;
      }
    };
    const checkchecklocal = function () {
      if (checklocal.includes(userLocal.value)) {
        return true;
      } else {
        return false;
      }
    };
    try {
      if (
        (checkUserName &&
          checkUserID &&
          checkPassWord &&
          checkCheckPassWord() &&
          checkchecklocal()) == true
      ) {
        console.log(checkUserName);
        console.log(checkUserID);
        console.log(checkPassWord);
        console.log(checkCheckPassWord());
        alert = "회원가입에 성공하셨습니다.";

        const user = await axios.post("/api/user/regist", {
          id: userId.value,
          pw: userPassword.value,
          name: userName.value,
          local: userLocal.value,
        });
      }
      console.log("데이터보낸다잉");
      window.location.reload();
    } catch (err) {
      alert(err.response.data.message);
      console.error(err.response.data.message);
    }
    // console.log(document.getElementById("login--id").value);
  };

  signIn.onclick = async function (e) {
    e.preventDefault();
    try {
      const result = await axios.post("/api/user/login", {
        id: document.getElementById("login-userID").value,
        pw: document.getElementById("login-password").value,
      });
      console.log("하이");
      location.href = "http://localhost:8080/";
      console.log("하이");
    } catch (err) {
      alert(err.response.data.message);
    }
  };
}
