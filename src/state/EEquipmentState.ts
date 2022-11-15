import BaseState from "./BaseState";
import EEquipmentService from "../service/EEquipmentService";
import { EQUIPMENTType } from "../type/Backend";
import Equipment from "../model/Equipment";

// import ODataModel from "sap/ui/model/odata/v4/ODataModel";
type equipmentManData = {
    equipment: Equipment
}

/**
 * @namespace com.eliagroup.pm.pmeequipments.state
 */
export default class EEquipmentState extends BaseState {
    protected data: equipmentManData;
    constructor(service: EEquipmentService) {
        super();
        this.service = service;
        this.data = {
            equipment: new Equipment()
        }
    }

    public async getEquipmentByID(id:string): Promise<EQ> {
        try { 
            // sap.ui.getCore().getMessageManager().removeAllMessages();         
            const wo = await this.getService().getEquipmentByID(id)
            void this.setEquipment(wo);
        } catch (error) {
            throw error;
        } 
    }

    private setEquipment(equipment: EQUIPMENTType) {
        this.getData().equipment = new Equipment(equipment);       
    
        this.updateModel();
    }

    public getData(): equipmentManData {
        return this.data;
    }



}