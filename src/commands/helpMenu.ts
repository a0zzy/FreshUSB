export default function helpMenu() {
  const commandList = require("./commands").default; // Lazy load to avoid circular dependency
  let output = commandList();

  let commandOutput = "Help Menu\n";

  function compileCommands() {
    output.forEach((element: any) => {
      commandOutput +=
        element.command +
        ": " +
        (element.details || "No details available") +
        "\n";
    });
  }

  compileCommands();
  console.log(commandOutput);
  return null;
}
