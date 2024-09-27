const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const fs = require("fs");

const createWindow = (page, x, y) => {
    const win = new BrowserWindow({
        width: x,
        height: y,
        minWidth: 900,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.loadFile(`${page}.html`);
    return win;
}

app.whenReady().then(() => {
    createWindow("index", 800, 600);

    ipcMain.on("getDados", (event, dados) => {
        const reciboPagina = createWindow("recibo", 1200, 900);
        reciboPagina.webContents.on("did-finish-load", () => {
            reciboPagina.webContents.send("setDados", dados);
        })
    })

    ipcMain.on("pdf", (event) => {
        event.sender.printToPDF({})
         .then((data) => {
            fs.writeFile("output.pdf", data, (err) => {});
         })
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