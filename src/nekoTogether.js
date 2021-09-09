import Discover from './network/discover'
import Config from './config'

export default class NekoTogether {

    constructor(props) {
        NekoTogether.instance = this;
        this.config = new Config();
        this.discover = new Discover()
    }

}

export function run() {
    new NekoTogether()
}


