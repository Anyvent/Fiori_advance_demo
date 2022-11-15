import Object from "sap/ui/base/Object";
import JSONModel from "sap/ui/model/json/JSONModel";
import capitalize from "sap/base/strings/capitalize";

type association = {
    from: string,
    to: string,
    entity: string
};

/**
 * @namespace com.eliagroup.pm.pmeequipments.model
 */
export default abstract class BaseObject extends Object {
    private busy = false;
    constructor() {
        super();
        this.busy = false;
    }

    public setBusy(busy: boolean): void {
        this.busy = busy;
    }
    public zeroPad(num: number, places: number): string {
        const zero = places - num.toString().length + 1;
        return `${Array(+(zero > 0 && zero)).join("0")}${num}`;
    }
    protected base64toBlob(base64Data: string, contentType: string): Blob {
        contentType = contentType || '';
        const sliceSize = 1024;
        const byteCharacters = atob(base64Data);
        const bytesLength = byteCharacters.length;
        const slicesCount = Math.ceil(bytesLength / sliceSize);
        const byteArrays = new Array(slicesCount);

        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            const begin = sliceIndex * sliceSize;
            const end = Math.min(begin + sliceSize, bytesLength);

            const bytes = new Array(end - begin);
            for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, {
            type: contentType
        });
    }


    //abstract getEntityName(): string;
    //abstract getKeys(): unknown;
    //abstract getAssociations(): Array<association>;
}