// document.forms["msg-zone"].onsubmit = function (e) {
//   e.preventDefault();
//   const text = document.getElementById("msg").innerHTML;
//   const time = new Date().toLocaleTimeString;
//   console.log(text);
//   console.log(time);
// };

// document.getElementById("msg-sumbit").onclick = function (e) {
//   e.preventDefault();
// };

// function submitFunc(e) {
//   e.preventDefault();
//   value = "";
//   console.log("test");
// }

// document.getElementById("msg-zone").onsubmit = function (e) {
//   e.preventDefault();
//   console.log("asd");
// };
// const form = document.getElementById("msg-zone");
// form.addEventListener("submit", submitFunc);

// document.getElementById("partner-id").innerText = partnerName;

async function socketFunc() {
  const socket = io();
  // const text = document.forms["msg-zone"]["msg"].value;
  // // setInterval(() => {

  //   if (textBtnElem) {
  //     clearInterval();
  //   }
  // }, 500);
  // const msg = document.getElementById("msg");
  // msg.onkeydown = (event) => {
  //   submitText(event);
  // };

  const asd = document.forms["msg-zone"];
  console.log(asd);
  const chatElem = document.getElementById("vs-chat-zone");

  document.forms["msg-zone"].onsubmit = function (e) {
    const text = document.forms["msg-zone"]["msg"].value;
    if (text == "") {
      alert("메시지를 입력하시오");
      return false;
    }
    e.preventDefault();

    const now = new Date();
    let hour = parseInt(now.getHours());
    let ampm;
    if (hour >= 12) {
      hour = hour - 12;
      ampm = "오후";
    } else {
      ampm = "오전";
      if (hour < 10) {
        hour = "0" + hour;
      }
    }
    let min = parseInt(now.getMinutes());
    if (min < 10) {
      min = "0" + min;
    }
    const time = `${ampm} ${hour}:${min}`;
    if (text) {
      submitBtn(text, time);
    }

    socket.emit("chat", {
      userId: document.getElementById("user-name").innerText,
      text: text,
      partnerId: document.getElementById("partner-id").innerText,
      time: time,
    });
  };

  socket.on("list", (data) => {
    //완
    console.log(data.list);
    data.list.forEach((item) => {
      console.log(item.text);
      console.log(item.time);
      console.log(item.userId);
      console.log(document.getElementById("user-name").innerText);
      if (item.userId == document.getElementById("user-name").innerText) {
        submitBtn(item.text, item.time);
      }
    });
  });
}

function submitBtn(serverText, serverTime) {
  const chatZone = document.getElementById("vs-chat-zone");
  const addLi = document.createElement("li");
  addLi.classList.add("my-chat");
  const addSpan = document.createElement("span");

  addSpan.innerText = serverTime;

  addLi.append(addSpan);
  const addDiv = document.createElement("div");
  addDiv.classList.add("my-speech-bubble");
  const addH3 = document.createElement("h3");

  addH3.innerText = serverText;

  addDiv.append(addH3);
  addLi.append(addDiv);
  chatZone.append(addLi);

  chatZone.scrollTop = chatZone.scrollHeight;

  // try {
  //   const chatToServer = await axios.post("/api/chat", {
  //     userId: document.getElementById("user-name").innerText,
  //     text: text,
  //     parterId: document.getElementById("partner-id").innerText,
  //     time: time,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }

  document.forms["msg-zone"]["msg"].value = "";
  document.forms["msg-zone"]["msg"].focus;
}

function submitText(event) {
  if (window.event.keyCode == 13) {
    // submitBtn();

    event.returnValue = false;
    //textarea 에서 줄바꿈 방지

    document.forms["msg-zone"]["msg"].value = "";
  }
}
