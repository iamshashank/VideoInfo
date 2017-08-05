const electron = require('electron');
//app object is responsible for creating window and starting the app
const {app}  = electron;
//BrowseeWindow responsible for creating a new broweser eindow
const {BrowserWindow,ipcMain} = electron;
const ffmpeg = require('fluent-ffmpeg');

//this justs declares te variable
let mainWindow;


//we ineract with the window via event based programming
app.on('ready',()=>{
  console.log('App Started');
  //without any parameters (empty object) we get a simple window
  //new BrowserWindow({});
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

//to receive event in index.js
ipcMain.on('video:submit',(event,path)=>{
  ffmpeg.ffprobe(path,(err, metadata)=>{
    console.log(metadata.format.duration);
    mainWindow.webContents.send('video:metadata',metadata.format.duration);
  });
});
