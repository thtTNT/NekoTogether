import {app, BrowserWindow} from 'electron'
import {run as runApp} from './NekoTogether'


app.whenReady().then(() => {
    runApp(app)
})
