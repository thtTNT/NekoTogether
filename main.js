const {app, BrowserWindow} = require('electron')
const nekoTogether = require('./src/nekoTogether')

app.whenReady().then(() => {
    nekoTogether.start()
})
