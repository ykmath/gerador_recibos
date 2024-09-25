const {app, BrowserWindow, ipcMain} = require("electron/main");
const fs = require("fs");
const path = require("path");

const createWindow = (page, x, y) => {
    const win = new BrowserWindow({
        width: x,
        height: y,
        icon: "img/icon.ico",
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.loadFile(page + ".html");
    return win;
}

app.whenReady().then(() => {
    createWindow("index", 800, 600);

    ipcMain.on("dados", (event, dados) => {
        const arquivo = fs.open("texto.txt", "w", (err) => {});
        const win = BrowserWindow.fromWebContents(event.sender);
        win.setTitle(dados);
        const reciboPagina = createWindow("recibo", 1200, 900);
    })


    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    })
})