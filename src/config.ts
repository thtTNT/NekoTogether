import {v4 as generateUUIDv4} from 'uuid'
import * as os from "os";
import * as fs from "fs";

export default class Config {

    public CLIENT_VERSION = "1.0.0"
    public PROTOCOL_VERSION = 1
    public clientId: string
    public dataPath: string

    constructor() {
        this.clientId = generateUUIDv4();

        this.dataPath = os.homedir() + "/Library/NekoTogether"
        if (!fs.existsSync(this.dataPath)) {
            fs.mkdirSync(this.dataPath)
        }
    }

}
