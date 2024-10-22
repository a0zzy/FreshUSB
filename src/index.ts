import usb, { Device, getDeviceList } from "usb";
import readline from "readline";
import helpMenu from "./commands/helpMenu";
import commandList from "./commands/commands";

console.clear();

// Check for EVs for configuration
function testForConfiguration(): void {
  // Check for Verbose
  if (process.env.VERBOSE == "true") {
    console.log("Verbose true");
    // Return values
    console.log("[EV] Passive Scan: " + process.env.PASSIVE_SCAN);
  }
}

function triggerWebUI(): void {

}

testForConfiguration();

let devicesScanned: string[] = [];

function isUsbDrive(device: Device): boolean {
  let deviceNumber = devicesScanned.length + 1;
  const MASS_STORAGE_CLASS = 0x08;

  console.log("[ATTACH] Device " + deviceNumber);

  devicesScanned.push(JSON.stringify({ name: "Device " + deviceNumber }));

  console.log("[SCAN] Device " + deviceNumber);

  // Get device descriptor
  const deviceDescriptor = device.deviceDescriptor;

  // Check the class of the interface to see if it's a mass storage device
  if (device.interfaces && device.interfaces.length > 0) {
    for (const iface of device.interfaces) {
      if (iface.descriptor.bInterfaceClass === MASS_STORAGE_CLASS) {
        console.log("[TRUE] Device " + deviceNumber);
        return true;
      }
    }
  }

  console.log("[FALSE] Device " + deviceNumber);

  return false;
}

const devices = getDeviceList();
const usbDrives = devices.filter(isUsbDrive);

console.log("[FINISH] Connected USB drives:", usbDrives);

// Create an interface for reading user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to process user input by checking against commandList
const processCommand = (command: string) => {
  const commands = commandList(); // Fetch the command list

  const matchedCommand = commands.find((cmd) => cmd.command === command.trim());

  if (matchedCommand) {
    matchedCommand.function(); // Execute the associated function
  } else {
    switch (command.trim()) {
      case "exit":
        console.log("Exiting...");
        rl.close();
        break;
      case "clear":
        console.clear();
        break;
      default:
        console.log(`Unknown command: ${command}`);
    }
  }
};

// Prompt the user for input and handle it
rl.setPrompt("> ");
rl.prompt();

rl.on("line", (input: string) => {
  processCommand(input);
  rl.prompt(); // Re-prompt after handling the input
});

rl.on("close", () => {
  console.log("Command prompt closed.");
  process.exit(0);
});
