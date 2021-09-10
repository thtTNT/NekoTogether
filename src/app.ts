import {app, BrowserWindow} from 'electron'
import {run as runApp} from './nekoTogether'


app.whenReady().then(() => {
    runApp()
})
