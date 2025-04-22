const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // Add APIs here for secure communication
});
// Required for Electron IPC or future enhancements
window.addEventListener("DOMContentLoaded", () => {
  console.log("Electron is ready!");
});
