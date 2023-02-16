import UI5BaseObject from "sap/ui/base/Object";
import JSONModel from "sap/ui/model/json/JSONModel";
import capitalize from "sap/base/strings/capitalize";

type association = {
    from: string,
    to: string,
    entity: string
};

/**
 * @namespace be.thevaluechain.fioriadvanced.core
 */
export default abstract class BaseObject extends UI5BaseObject {
    private busy = false;
    constructor(data?: any) {
        super();

        //Attempt to copy the oData values to the object
        if (data) {
            //@ts-ignore
            for (const key of Object.keys(data)) {
                if (!this.containsSpecialChars(key)) {
                    //@ts-ignore
                    this[key] = data[key];
                }
            }
        }

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

    public containsSpecialChars(str: string): boolean {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    protected camelize(str: string):string{
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index == 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    // protected camelizeProperties(data: any): any {
    //     const camelizedData: any = {};
    //     for (const key of Object.keys(data)) {
    //         const newKey: string = this.camelize(key);
    //         camelizedData[newKey] = data[key];
    //     }
    //     return camelizedData;
    // }

    camelizeProperties<T extends Record<string, unknown>, J extends Record<string, unknown>>(data: T): J {
        let camelizedData: J = {} as J;
        for (const key of Object.keys(data)) {
            const newKey: string = this.camelize(key);
            camelizedData = Object.assign(camelizedData, { [newKey]: data[key] })
        }
        return camelizedData;
    }

    //abstract getEntityName(): string;
    //abstract getKeys(): unknown;
    //abstract getAssociations(): Array<association>;
}