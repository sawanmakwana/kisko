const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { exec } = require("child_process");
const log = require('electron-log');
let mainWindow;
const globalShortcut = electron.globalShortcut;
const ipcMain = electron.ipcMain;
let todayDate =  new Date().toISOString().slice(0, 10);

setInterval(()=>{
  log.transports.file.fileName = `${ new Date().toISOString().slice(0, 10)}.log`
},60000)
log.transports.file.fileName = `${todayDate}.log`
    
function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 1200, 
        height: 800,
        fullscreen: true,
        frame: false,
        webPreferences: {        // add
            nodeIntegration: true  // these
          }
    });
     
    mainWindow.loadURL(isDev ? `http://localhost:4000`: `file://${__dirname}/../build/index.html`);
    
    // mainWindow.loadURL(
    //     isDev
    //     ? "http://localhost:3000"
    //     : `file://${path.join(__dirname, "../build/index.html")}`
    // );
    mainWindow.on("closed", () => (mainWindow = null));
   
     
     
    
}

ipcMain.on("logs", (event, args) => {
  if(args.type == 'info') log.info(args.msg);
  else if(args.type == 'error') log.error(args.msg);
  else if(args.type == 'warn') log.warn(args.msg);
  else log.info(args.msg);
});
ipcMain.on("exitFullScreen", (event, args) => {
    mainWindow.setFullScreen(false)
  });
  ipcMain.on("enterFullScreen", (event, args) => {
    mainWindow.setFullScreen(true)
  });
  ipcMain.on("exitApp", (event, args) => {
    app.quit();
  
  });
  ipcMain.on("installApp", (event, args) => {
    exec("/Applications/Kiosk.app/Contents/Resources/extraResources/./adb install /Applications/Kiosk.app/Contents/Resources/extraResources/app-release.apk", (error, stdout, stderr) => {
      if (error) {
          console.log(`[ELECTORN] error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`[ELECTORN] stderr: ${stderr}`);
          return;
      }
      console.log(`[ELECTORN] stdout: ${stdout}`);
          exec("/Applications/Kiosk.app/Contents/Resources/extraResources/./adb shell am start -a android.intent.action.MAIN -n com.stixmdm.app/com.stixmdm.app.MainActivity", (error, stdout, stderr) => {
        if (error) {
            console.log(`[ELECTORN] error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`[ELECTORN] stderr: ${stderr}`);
            return;
        }
        console.log(`[ELECTORN] stdout: ${stdout}`);
    });
  });
  
    
  });
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
    app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    }
});


