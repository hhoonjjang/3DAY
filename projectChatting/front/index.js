const chatList = document.getElementsByClassName("one-chat");

console.log(chatList[0]);

async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

async function importPage(target) {
  document.querySelector("#" + target).innerHTML = await fetchHtmlAsText(
    target + ".html"
  );
}

chatList[0].onclick = () => {
  importPage("chatting");
};
