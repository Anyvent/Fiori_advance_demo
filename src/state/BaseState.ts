import Object from "sap/ui/base/Object";
import JSONModel from "sap/ui/model/json/JSONModel";
import Log, { Level } from "sap/base/Log";
import BaseObject from "../model/BaseObject";
import BaseServiceV4 from "../service/BaseServiceV4";
import BaseServiceV2 from "../service/BaseServiceV2";
import { ValueState } from "sap/ui/core/library";
import Message from "sap/ui/core/message/Message";
// import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

type MatchingObject = {
    path: string;
    object: Record<string, unknown>;
};

/**
 * @namespace be.thevaluechain.fioriadvanced.state
 */
export default abstract class BaseState extends Object {
    protected service: BaseServiceV4 | BaseServiceV2;
    protected data: any;//Record<string, BaseObject | Array<BaseObject>>;
    private model: JSONModel;
    private logger: Log;
    private messageMapperPaths: Array<string> = [];
    constructor() {
        super();
        this.logger = (Log.getLogger("be.elia.bc.zbc_elia_lib.objects.BaseState", Level.INFO) as Log);
        // Log.info("be.elia.bc.zbc_elia_lib.objects.BaseState", Level.INFO);
    }
    public getModel(): JSONModel {
        if (!this.model) {
            this.model = new JSONModel(this.data)
        }
        return this.model;
    }
    public updateModel(hardRefresh?: boolean): void {
        if (this.model) {
            this.model.refresh(hardRefresh ? true : false);
        }
    }
    protected getService(): BaseServiceV4 | BaseServiceV2 {
        return this.service;
    }
    protected getData(): unknown {//Record<string, BaseObject | Array<BaseObject>> {
        return this.data;
    }

    public enableDirty(): void {
        this.setBrowserDirty(true);
    }

    public disableDirty(): void {
        this.setBrowserDirty(false);
    }

    protected setBrowserDirty(isDirty: boolean): void {
        sap && sap.ushell && sap.ushell.Container && sap.ushell.Container.setDirtyFlag(isDirty);
    }

    protected camelize(str: string):string{
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index == 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    protected formatDate(date: Date) {
        if (date instanceof Date) {
            let oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "yyyy-MM-dd"
            });
            date = oDateFormat.format(date);
        }
        return date;
    }
    
}