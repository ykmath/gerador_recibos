const {app, BrowserWindow, ipcMain, Menu} = require("electron");
const {exec} = require("child_process");
const path = require("path");
const fs = require("fs");

function formatDate(date) {
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${seconds}s${minutes}m${hours}h ${day}-${month}-${year}`;
}

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

    ipcMain.on("pdf", (event, nome) => {
        event.sender.printToPDF({})
         .then((data) => {
            const documents = app.getPath("documents");
            const recibosPath = path.join(documents, "Recibos Gerados");

            fs.mkdir(recibosPath, {recursive: true}, (err) => {
                if (err) {
                    console.error("Erro ao gerar recibo! ", err);
                }

                const newRecibo = path.join(recibosPath, `Recibo - ${nome} ${formatDate(new Date())}.pdf`);

                fs.writeFile(newRecibo, data, (err) => {
                    if (err) {
                        console.error("Erro: ", err);
                    }
                });
            })
         })
    })

    ipcMain.on("folders", (event) => {
        const documents = app.getPath("documents");
        const recibosFolder = path.join(documents, "Recibos Gerados");

        fs.mkdir(recibosFolder, (err) => {});

        exec(`start "" "${recibosFolder}"`);
    })

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow("index", 800, 600);
    })

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    })
})