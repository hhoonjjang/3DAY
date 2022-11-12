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

const feedback = document.getElementById("feedback");
const feedbackMsg = document.getElementById("feedback-msg");
const idX = document.getElementById("id-x");
const idV = document.getElementById("id-v");
const nameX = document.getElementById("name-x");
const nameV = document.getElementById("name-v");
const pwX = document.getElementById("pw-x");
const pwV = document.getElementById("pw-v");
const pwcX = document.getElementById("pwc-x");
const pwcV = document.getElementById("pwc-v");
const localX = document.getElementById("local-x");
const localV = document.getElementById("local-v");

let userLocalData;
userLocal.onchange = () => {
  if (userLocal.value == "local-none") userLocalData = undefined;
  else if (userLocal.value == "local-seoul") userLocalData = "서울특별시";
  else if (userLocal.value == "local-busan") userLocalData = "부산광역시";
  else if (userLocal.value == "local-daegu") userLocalData = "대구광역시";
  else if (userLocal.value == "local-incheon") userLocalData = "인천광역시";
  else if (userLocal.value == "local-gwangju") userLocalData = "광주광역시";
  else if (userLocal.value == "local-daejeon") userLocalData = "대전광역시";
  else if (userLocal.value == "local-ulssan") userLocalData = "울산광역시";
  else if (userLocal.value == "local-sejong") userLocalData = "세종특별자치시";
  else if (userLocal.value == "local-gyungki") userLocalData = "경기도";
  else if (userLocal.value == "local-gangwon") userLocalData = "강원도";
  else if (userLocal.value == "local-chungbuk") userLocalData = "충청북도";
  else if (userLocal.value == "local-chungnam") userLocalData = "충청남도";
  else if (userLocal.value == "local-jeonbuk") userLocalData = "전라북도";
  else if (userLocal.value == "local-jeonnam") userLocalData = "전라남도";
  else if (userLocal.value == "local-gyungbuk") userLocalData = "경상북도";
  else if (userLocal.value == "local-gyungnam") userLocalData = "경상남도";
  else if (userLocal.value == "local-jeju") userLocalData = "제주특별자치도";
  if (userLocal.value == "local-none") {
    localX.classList.remove("display-none");
    localV.classList.add("display-none");
  } else {
    localX.classList.add("display-none");
    localV.classList.remove("display-none");
  }
  console.log(userLocalData);
};

userId.onfocus = () => {
  feedbackMsg.innerText =
    "ID : 영문시작, 최소 하나 이상의 숫자를 포함한 5~10 길이의 영문, 숫자 조합";
};
userId.onblur = () => {
  feedbackMsg.innerText = "";
};
userId.oninput = () => {
  if (!checkuserId.test(userId.value)) {
    idX.classList.remove("display-none");
    idV.classList.add("display-none");
  } else {
    idX.classList.add("display-none");
    idV.classList.remove("display-none");
  }
};

userName.onfocus = () => {
  feedbackMsg.innerText = "이름 : 2~5 길이의 한글";
};
userName.onblur = () => {
  feedbackMsg.innerText = "";
};
userName.oninput = () => {
  if (!checkusername.test(userName.value)) {
    nameX.classList.remove("display-none");
    nameV.classList.add("display-none");
  } else {
    nameX.classList.add("display-none");
    nameV.classList.remove("display-none");
  }
};

userPassword.onfocus = () => {
  feedbackMsg.innerText = "PW : 8~20 길이의 소문자, 숫자, 특수문자 조합 ";
};
userPassword.onblur = () => {
  feedbackMsg.innerText = "";
};
userPassword.oninput = () => {
  if (!checkpassword.test(userPassword.value)) {
    pwX.classList.remove("display-none");
    pwV.classList.add("display-none");
  } else {
    pwX.classList.add("display-none");
    pwV.classList.remove("display-none");
  }
  userCheckpassword.oninput();
};
userCheckpassword.oninput = () => {
  if (
    userPassword.value != userCheckpassword.value ||
    !userCheckpassword.value ||
    !checkpassword.test(userPassword.value)
  ) {
    pwcX.classList.remove("display-none");
    pwcV.classList.add("display-none");
  } else {
    pwcX.classList.add("display-none");
    pwcV.classList.remove("display-none");
  }
};

//  이름 : 2~5 길이의 한글
const checkusername = /^[가-힣]{2,5}$/;
//  아이디 : 영문자로 시작하고, 5~10 길이의 영문자와 숫자의 조합 (숫자 필수)
const checkuserId = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{4,9}$/;
// const checkUserID = checkuserId.test(userId.value);
// 비밀번호 : 소문자, 숫자, 특수문자 조합의 8~20자
// const checkpassword = /(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/;
// 비밀번호 : 소문자, 숫자, 특수문자 조합의 8자 이상
const checkpassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

let isCorrect;
function registecheck() {
  if (!userId.value) {
    alert("아이디가 입력되지 않았습니다.");
    userId.focus();
    isCorrect = false;
  } else if (!checkuserId.test(userId.value)) {
    // alert("영문자로 시작하고, 5~10 길이의 영문자와 숫자의 조합");
    alert("아이디가 올바르게 입력되지 않았습니다.");
    isCorrect = false;
  } else if (!userName.value) {
    alert("이름이 입력되지 않았습니다.");
    userName.focus();
    isCorrect = false;
  } else if (!checkusername.test(userName.value)) {
    alert("이름이 올바르게 입력되지 않았습니다.");
    isCorrect = false;
  } else if (!userPassword.value) {
    alert("비밀번호가 입력되지 않았습니다.");
    userPassword.focus();
    isCorrect = false;
  } else if (!userCheckpassword.value) {
    alert("비밀번호확인이 입력되지 않았습니다.");
    userCheckpassword.focus();
    isCorrect = false;
  } else if (
    // !check(userPassword, checkpassword, "소문자, 숫자, 특수문자 조합의 8~20자")
    !checkpassword.test(userPassword.value)
  ) {
    alert("비밀번호가 올바르게 입력되지 않았습니다.");
    userPassword.focus();
    isCorrect = false;
  } else if (userPassword.value != userCheckpassword.value) {
    alert("비밀번호가 일치하지 않습니다.");
    userPassword.focus();
    userCheckpassword.focus();
    isCorrect = false;
  } else if (!userLocalData) {
    alert("지역이 선택되지 않았습니다.");
    userLocal.focus();
    isCorrect = false;
  } else {
    isCorrect = true;
  }
}

function start() {
  let goPage = "http://localhost:8080";
  // console.log(location.href);
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
  // console.log(elm.registerForm.getElementsByTagName("form")[0]);
  elm.registerForm.getElementsByTagName("form")[0].onsubmit = (e) => {
    e.preventDefault();
    // console.log(e.target["login--id"]);
    // console.log(e.target["signup-username"]);
  };
  document.getElementById("backBtn1").onclick = function () {
    location.href = goPage;
  };


  signUp.onclick = async function () {
    registecheck();
    if (!isCorrect) {
      return;
    }


    try {
      if (
        // checkUserName &&
        // checkUserID &&
        // checkPassWord &&
        // checkCheckPassWord()) == true
        true
      ) {

        const user = await axios.post("/api/user/regist", {
          id: userId.value,
          pw: userPassword.value,
          name: userName.value,
          local: userLocalData,
        });
        alert("회원가입에 성공하셨습니다.");
      }
      // console.log("데이터보낸다잉");
      window.location.reload();
    } catch (err) {
      // alert(err.response.data.message);
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
      location.href = "http://localhost:8080/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };
}
