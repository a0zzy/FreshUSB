import helpMenu from "./helpMenu"; // Adjust the import to match the correct file

// List all commands to correlate functions
let commands = [
  {
    command: "ping",
    details: "Responds with 'Pong'",
    function: function () {
      console.log("Pong");
    },
  },
  {
    command: "hello",
    details: "Greets the user",
    function: function () {
      console.log("Hello there!");
    },
  },
  {
    command: "help",
    details: "Shows the help menu",
    function: function () {
      helpMenu();
    },
  },
  {
    command: "clear",
    details: "Clears the console",
    function: function () {
      console.clear();
    },
  },
  {
    command: "exit",
    details: "Exit the program",
    function: function () {
      process.exit();
    },
  },
];

export default function commandList() {
  return commands;
}
