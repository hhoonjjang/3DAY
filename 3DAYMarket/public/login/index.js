window.addEventListener("load", start);

const userlocal = document.getElementById("signup-local");
const userId = document.getElementById("login--id");
const userName = document.getElementById("signup-username");
const userPassword = document.getElementById("signup-password");
const userCheckpassword = document.getElementById("signup-checkpassword");
const signUp = document.getElementById("sign-up");
const signIn = document.getElementById("sign-in");

// const
function start() {
  let goPage = "http://localhost:8080";
  console.log(location.href);

  /* ===========================
    Elements Selectors
============================ */

  const elm = {
    arrow: document.querySelector(".form-container__arrow"),
    overlay: document.querySelector(".overlay"),
    title: document.querySelector(".title"),
    signUpButton: document.querySelector(".buttons__signup"),
    loginButton: document.querySelector(".buttons__signup--login"),
    loginForm: document.querySelector(".login-form"),
    registerForm: document.querySelector(".login-form--register"),
  };

  /* ===========================
    Properties Object
============================ */

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

  /* ===========================
    Elements Array
============================ */

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

  /* ===========================
    Events
============================ */

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

  function registecheck() {
    //  이름 : 2~5 길이의 한글
    const checkusername = /^[가-힣]{2,5}$/;

    //  아이디 : 영문자로 시작하고, 5~10 길이의 영문자와 숫자의 조합 |  g는 모든 문자를 검색하는 플래그다.
    const checkuserId = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,10}$/g;

    // 비밀번호 : 소문자, 숫자, 특수문자 조합의 8~20자
    const checkpassword = /(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/;
    //  지역 : 서울특별시 , 부산광역시 , 대구광역시, 인천광역시, 광주광역시 , 대전광역시
    // 울산광역시 , 세종특별자치시 , 경기도 , 강원도 ,충청북도 ,충청남도 ,전라북도
    // 전라남도  경상북도 경상남도 제주특별자치도
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

    if (userId.value == "") {
      alert("아이디를 입력하지 않았습니다.");
      userId.focus();
      return false;
    }
    if (
      !check(
        checkuserId,
        userId,
        "영문자로 시작하고, 5~10 길이의 영문자와 숫자의 조합"
      )
    ) {
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
      !check(
        userPassword,
        checkpassword,
        "소문자, 숫자, 특수문자 조합의 8~20자"
      )
    ) {
      return false;
    }
    if (userPassword.value != userCheckpassword.value) {
      alert("비밀번호가 일치 하지 않습니다.");
      userPassword.focus();
      userCheckpassword.focus();
      return false;
    }
    if (userName.value == "") {
      alert("이름을 입력해 주세요");
      userName.focus();
      return false;
    }
    if (!check(checkusername, userName, "이름이 잘못되었습니다.")) {
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
  // userId;
  // userName;
  // userPassword;
  // userCheckpassword;
  // signUp;
  // signIn;
  // }
  registecheck();
}

// ----------------------------------------------------------------------------------start() // 회원가입 로그인

signUp.onclick = async function () {
  try {
    const user = await axios.post("/api/user/regist", {
      id: userId.value,
      pw: userPassword.value,
      name: userName.value,
    });
    console.log("데이터보낸다잉");
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
  // console.log(document.getElementById("login--id").value);
};

signIn.onclick = async function () {
  try {
    const result = await axios.post("/api/user/login", {
      id: document.getElementById("login-userID").value,
      pw: document.getElementById("login-password").value,
    });
  } catch (err) {
    console.error(err);
  }
};

// --------------------------------------------------------------------- 서버동기화
