import BaseState from "./BaseState";
import MainService from "../service/MainService";
import { PersonEnity } from "../type/Backend";
import Equipment from "../model/Person";

// import ODataModel from "sap/ui/model/odata/v4/ODataModel";
type equipmentManData = {
    equipment: Equipment
}

/**
 * @namespace be.thevaluechain.fioriadvanced.state
 */
export default class EEquipmentState extends BaseState {
    protected data: equipmentManData;

    constructor(service: MainService) {
        super();
        this.service = service;
        this.data = {
            equipment: new Equipment()
        }
    }

    public async getEquipmentByID(id:string): Promise<Equipment> {
        try { 
            // sap.ui.getCore().getMessageManager().removeAllMessages();         
            const equipmentoData = await this.getService().getEquipmentByID(id);
            void this.setEquipment(equipmentoData);
            return this.data.equipment;
        } catch (error) {
            // throw error;
        } 
    }

    private setEquipment(equipmentoData: EQUIPMENTType) {
        this.getData().equipment = new Equipment(equipmentoData);       
    
        this.updateModel();
    }

    public getData(): equipmentManData {
        return this.data;
    }



}