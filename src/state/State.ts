import BaseState from "./BaseState";
import MainService from "../service/MainService";
import { PersonEnity } from "../type/Backend";
import Equipment from "../model/Person";


type equipmentManData = {
    equipment: Equipment
}

/**
 * @namespace be.thevaluechain.fioriadvanced.state
 */
export default class State extends BaseState {
    protected data: equipmentManData;

    constructor(service: MainService) {
        super();
        this.service = service;
        this.data = {
            equipment: new Equipment()
        }
    }

    public async getPersonById(id:string): Promise<Equipment> {
        try { 
            // sap.ui.getCore().getMessageManager().removeAllMessages();         
            const equipmentoData = await this.getService().getPersonById(id);
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