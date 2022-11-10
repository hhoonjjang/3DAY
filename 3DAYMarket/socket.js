const socket = require("socket.io");
const { Chat } = require("./models/index.js");

module.exports = (server) => {
  const io = socket(server);

  io.on("connection", (ws) => {
    Chat.findAll().then((data) => {
      ws.emit("list", { list: data });
    });

    ws.on("chat", async (data) => {
      try {
        await Chat.create({ userId: ws.userId, text: data.text });
        io.emit("chat", { id: ws.userId, text: data.text });
      } catch (error) {
        ws.emit("chat", { text: "관리자 DB 관리 안하냐?" });
        console.error(error);
      }
    });
  });

  io.of("c");
};
