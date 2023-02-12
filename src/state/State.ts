import BaseState from "../core/BaseState";
import Service from "../service/Service";
import Person from "../model/Person";
import { PersonEnity } from "../type/Backend";
import { ViewProperties } from "../type/Frontend";


type stateData = {
    detailView: ViewProperties,
    Person: Person
}

/**
 * @namespace be.thevaluechain.fioriadvanced.state
 */
export default class State extends BaseState {
    protected data: stateData;

    constructor(service: Service) {
        super();
        this.service = service;
        this.data = {
            detailView:{
                busy : false,
			    delay: 0
            },
            Person: new Person()
        }
    }



    public async getPersonById(id: string): Promise<Person> {
        this.setDetailScreenBusy(true);
        const personData = await this.getService().getPersonById(id);
        this.getData().Person = new Person(personData.data);
        this.setDetailScreenBusy(false);
        this.updateModel();
        return this.getData().Person;
    }

    private setPerson(equipmentoData: Person) {
        this.getData().Person = new Person(equipmentoData);

    }

    public getData(): stateData {
        return this.data;
    }

    public setDetailScreenBusy(busy: boolean):void {
        this.data.detailView.busy = busy;
        this.updateModel();
    }
    

    // public createPerson():  {
    //    this.data.person = new Person();

    // }

  
 


}