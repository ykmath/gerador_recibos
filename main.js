const {app, BrowserWindow, ipcMain, Menu} = require("electron");
const path = require("path");
const fs = require("fs");

const createSplashScreen = () => {
    const splash = new BrowserWindow({
        width: 600,
        height: 300,
        frame: false,
        show: false,
        resizable: false,
        alwaysOnTop: true,
    })

    splash.loadFile("./splash.html");

    splash.once("ready-to-show", () => {splash.show()});

    const mainApp = createWindow("index", 800, 600);

    mainApp.once("ready-to-show", () => {
        if (splash) {
            splash.close();
        }
        mainApp.show();
    })
}

const createWindow = (page, x, y) => {
    const win = new BrowserWindow({
        width: x,
        height: y,
        minWidth: 900,
        minHeight: 600,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.loadFile(`${page}.html`);

    Menu.setApplicationMenu(null);

    return win;
}

app.whenReady().then(() => {
    createSplashScreen();

    ipcMain.on("getDados", (event, dados) => {
        const reciboPagina = createWindow("recibo", 1200, 900);
        reciboPagina.webContents.on("did-finish-load", () => {
            reciboPagina.webContents.send("setDados", dados);
        })
    })

    ipcMain.on("pdf", (event, nome) => {
        event.sender.printToPDF({})
         .then((data) => {
            fs.writeFile(path.join(app.getPath("downloads"), `Recibo - ${nome}.pdf`), data, (err) => {});
         })
    })

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createSplashScreen();
    })

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    })
})