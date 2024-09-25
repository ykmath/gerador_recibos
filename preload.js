const {contextBridge, ipcRenderer} = require("electron/renderer");

contextBridge.exposeInMainWorld("capturarDados", {
    getDados: (dados) => ipcRenderer.send("dados", dados)
})