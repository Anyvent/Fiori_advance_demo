import Object from "sap/ui/base/Object";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";

/**
 * @namespace com.eliagroup.pm.pmeequipments.service
 */
export default class BaseServiceV4 extends Object {
    protected model: ODataModel;

    constructor(model: ODataModel) {
        super();
        if (model) {
            this.setModel(model);
        }
    }

    public setModel(model: ODataModel): void {
        this.model = model;
    }

    public getModel(): ODataModel {
        return this.model;
    }
}
