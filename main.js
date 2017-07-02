const {app, BrowserWindow, Tray} = require('electron')
const path = require('path')
const url = require('url')

let win
let tray

function createWindow () {
 
  win = new BrowserWindow({
    width: 400,
    height: 600,
    resizable : false,
    frame: false,
    icon: `${__dirname}/assets/img/icon.ico`
  })
  win.loadURL(`${__dirname}/index.html`)
  
  tray = new Tray(`${__dirname}/assets/img/icon.ico`)
  tray.setToolTip('Yet Another Youtube Player')
  
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})


