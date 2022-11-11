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
  chatElem.innerHTML = "";
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
    // console.log(data.list);
    data.list.forEach((item) => {
      // console.log(item.text);
      // console.log(item.time);
      // console.log(item.userId);
      // console.log(item.partnerId);
      // console.log(document.getElementById("user-name").innerText);
      if (item.userId == document.getElementById("user-name").innerText) {
        console.log("hi");
        createOneChat(item);
      }

      // console.log(item.partnerId);
      // console.log(document.getElementById("partner-id").innerText);
      if (item.partnerId == document.getElementById("partner-id").innerText) {
        submitBtn(item.text, item.time);
      }
    });
    deletedouble();
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

const createOneChat = function (data) {
  const tempBox = document.createElement("div");
  tempBox.classList.add("one-chat");
  const tempdiv1 = document.createElement("div");
  const tempdiv2 = document.createElement("div");
  const tempdiv3 = document.createElement("div");
  tempdiv3.innerText = "사진로그";
  const tempdiv4 = document.createElement("div");
  const tempdiv5 = document.createElement("div");

  const tempImgUser = document.createElement("img");
  tempImgUser.classList.add("vs-img");
  tempImgUser.src = "./chatimg/default.png";
  tempdiv1.append(tempImgUser);
  tempBox.append(tempdiv1);
  const tempVsInfo = document.createElement("div");
  tempVsInfo.classList.add("vs-info");

  const tempspanName = document.createElement("span");
  tempspanName.classList.add("vs-name");
  tempspanName.innerText = data.partnerId;
  const tempspanData1 = document.createElement("span");
  tempspanData1.classList.add("vs-data");
  tempspanData1.innerText = "local";

  const tempspanData2 = document.createElement("span");
  tempspanData2.classList.add("vs-data");
  tempspanData2.innerText = ".";

  const tempspanData3 = document.createElement("span");
  tempspanData3.classList.add("vs-data");
  tempspanData3.innerText = "log-day";

  const tempLastLog = document.createElement("div");
  tempLastLog.classList.add("vs-chatlog");
  tempLastLog.innerText = data.text;

  const tempImgLog = document.createElement("img");
  tempImgLog.classList.add("vs-log-img");

  const chatVsList = document.getElementById("chat-vs");
  tempdiv2.classList.add("fbox-between");
  tempdiv4.append(tempspanName);
  tempdiv5.append(tempspanData1);
  tempdiv5.append(tempspanData2);
  tempdiv5.append(tempspanData3);
  tempdiv2.append(tempdiv4);
  tempdiv2.append(tempdiv5);

  tempVsInfo.append(tempdiv2);
  tempVsInfo.append(tempLastLog);
  tempdiv3.append(tempImgLog);
  tempBox.append(tempVsInfo);

  tempBox.append(tempdiv3);

  chatVsList.append(tempBox);
};

const deletedouble = function () {
  let vsNameList = document.getElementsByClassName("vs-name");
  let nameNum = vsNameList.length;
  let vsChat = document.getElementsByClassName("one-chat");
  let chatNum = vsChat.length;

  console.log(vsNameList[2].innerText);
  const tempNum = [];
  for (let i = nameNum - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (vsNameList[i].innerText == vsNameList[j].innerText) {
        // vsChat[j].remove();
        tempNum.push(j);
        // console.log("asd");
      }
    }
  }
  tempNum.sort();
  console.log(tempNum);
  let count = 0;
  for (let m = 0, n = 1; m < tempNum.length; m++, n++) {
    let tempN = tempNum[m];

    if (count != 0) {
      tempN = tempN - 1 * m;
    } else {
      count++;
    }
    vsChat[tempN].remove();
  }
};
