import { Server } from "socket.io";

interface IPlayer {
  id: string;
  name: string;
  selectCharacter: number;
  position: number[];
  rotation: number[];
  action: string;
}

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

const players: IPlayer[] = [];

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected.`);

  socket.on("enter", ({ name, selectCharacter }) => {
    const newPlayer = {
      id: socket.id,
      name,
      selectCharacter,
      position: [0, 1.6, 0],
      rotation: [0, 0, 0],
      action: "Idle",
    };
    players.push(newPlayer);

    socket.emit("player", newPlayer);
    io.emit("players", players);
  });

  socket.on("move", ({ position, rotation, action }) => {
    const player = players.find((player) => player.id === socket.id);
    if (player) {
      player.position = position;
      player.rotation = rotation;
      player.action = action;

      io.emit("players", players);
    }
  });

  socket.on("message", (message) => {
    io.emit("receive", message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);

    players.splice(
      players.findIndex((player) => player.id === socket.id),
      1
    );
    io.emit("players", players);
  });
});

io.listen(4000);
