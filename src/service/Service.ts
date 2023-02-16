// import BaseService from "./BaseServiceV4";
//import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import BaseService, { Parameters } from "../core/BaseServiceV2";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Filter from "sap/ui/model/Filter";
import { PersonEnity, PersonEntitySet, SkillEntity, SkillEntitySet } from "../type/Backend";

/**
 * @namespace be.thevaluechain.fioriadvanced.service
 */

export default class Service extends BaseService {
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

 
    
    public async getPersonById(id: string, expanded: boolean = false):Promise<PersonEnity> {
        const odataPath = this.model.createKey("/Person", { PersonId: id });
        let parameters: Parameters<PersonEnity> = {};
        
        if (expanded) {
            parameters = { urlParameters: { "$expand": "to_Skills" } };
        }

        const oDataPerson = await this.odata(odataPath).get(parameters);
        const personEntity: PersonEnity = this.camelizeProperties(oDataPerson);
        return personEntity;
    }
}