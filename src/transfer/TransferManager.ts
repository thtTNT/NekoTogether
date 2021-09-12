import UIManager from "../ui/UIManager";
import NekoTogether from "../NekoTogether";

export default class TransferManager {

    constructor() {
    }

    public send(filePath: string) {
        console.log("prepare send file: " + filePath)
        NekoTogether.instance.uiManager.selectClient()
    }


}
