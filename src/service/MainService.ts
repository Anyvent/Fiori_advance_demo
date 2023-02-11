// import BaseService from "./BaseServiceV4";
//import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import BaseService from "./BaseServiceV2";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Filter from "sap/ui/model/Filter";
import { PersonEnity, PersonEntitySet, SkillEntity, SkillEntitySet } from "../type/Backend";

/**
 * @namespace be.thevaluechain.fioriadvanced.service
 */

export default class MainService extends BaseService {
    constructor(model: ODataModel) {
        super(model);
    }

     /**
    * ===============================================================
    *      oData V4 examples
    * ===============================================================
    */
    // public getEquipmentByID = async (id:string):Promise<EQUIPMENTType> => {     
    //     const equipmentBinding = this.model.bindContext(`/Equipment('${id}')`,null,{});  
    //     return await equipmentBinding.requestObject() as EQUIPMENTType;
    // }

    /**
    * ===============================================================
    *      oData V2 examples
    * ===============================================================
    */
    public getPersonList(filters: Array<Filter>) {
        return this.odata("/Person").get<PersonEntitySet>({ filters: filters });
    }

    public getPersonById(id: number, expanded: boolean = true) {
        const odataPath = this.model.createKey("/Person", { id: id });
        if (!expanded) {
            return this.odata(odataPath).get<PersonEnity>();
        } else {
            return this.odata(odataPath).get<PersonEnity>({ urlParameters: { "$expand": "to_Skills" } });
        }
    }
}