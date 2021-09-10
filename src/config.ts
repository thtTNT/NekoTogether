import {v4 as generateUUIDv4} from 'uuid'

export default class Config {

    public CLIENT_VERSION = "1.0.0"
    public PROTOCOL_VERSION = 1
    public clientId: string

    constructor() {
        this.clientId = generateUUIDv4();
    }

}
