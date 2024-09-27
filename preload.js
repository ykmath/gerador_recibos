const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("capturarDados", {
    getDados: (dados) => ipcRenderer.send("getDados", dados),
    setDados: (callback) => ipcRenderer.on("setDados", (_event, dados) => callback(dados)),
    gerarPDF: () => ipcRenderer.send("pdf")
})