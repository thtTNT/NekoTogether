import {v4 as generateUUIDv4} from 'uuid'

export default class Config {

    CLIENT_VERSION = "1.0.0"
    PROTOCOL_VERSION = 1

    constructor(props) {
        this.clientId = generateUUIDv4();
    }

}
