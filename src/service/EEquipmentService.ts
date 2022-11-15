import BaseService from "./BaseServiceV4";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import { EQUIPMENTType } from "../type/Backend";

/**
 * @namespace com.eliagroup.pm.WoManager.service
 */

 export default class WOManagerService extends BaseService {
    constructor(model: ODataModel) {
        super(model);
        // this.workOrderBinding = this.model.bindList("/WO",null,[],[],{$expand:'_Operations($expand=_Services),_Assets,_Outages,_Statusses,_Materials',$$updateGroupId : "UpdateGroup"});
    }

    public getEquipmentByID = async (id:string):Promise<EQUIPMENTType> => {     
        const equipmentBinding = this.model.bindContext(`/Equipment('${id}')`,null,{});  
        return await equipmentBinding.requestObject() as EQUIPMENTType;
    }
 }