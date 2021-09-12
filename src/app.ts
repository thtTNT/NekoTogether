import {app, BrowserWindow} from 'electron'
import {run as runApp} from './NekoTogether'

app.on('window-all-closed', function () {
})

app.whenReady().then(() => {
    runApp(app)
})
