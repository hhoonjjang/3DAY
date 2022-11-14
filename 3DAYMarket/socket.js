const socket = require("socket.io");
const { Chat, Item } = require("./models/index.js");

module.exports = (server) => {
  const io = socket(server);

  io.on("connection", (ws) => {
    console.log("커넥완료");
    Chat.findAll().then((data) => {
      ws.emit("list", { list: data });
    });

    // Item.findAll().then((data) => {
    //   ws.emit("item", { list: data });
    //   console.log(list);
    // });

    ws.on("chat", async (data) => {
      try {
        await Chat.create({
          userId: data.userId,
          text: data.text,
          partnerId: data.partnerId,
          time: data.time,
        });
        console.log(data.userId);
        console.log(data.text);
        console.log(data.partnerId);

        // io.emit("chat", {
        //   id: ws.userId,
        //   text: data.text,
        //   parterId: ws.parterId,
        //   time: ws.time,
        // });
      } catch (error) {
        ws.emit("chat", { text: "관리자 DB 관리 안하냐?" });
        console.error(error);
      }
    });
  });

  io.of("c");
};
