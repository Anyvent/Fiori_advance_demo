import BaseState from "../core/BaseState";
import Service from "../service/Service";
import { PersonEnity } from "../type/Backend";
import { Person } from "../model/Person";
import { ViewProperties } from "../type/Frontend";


type stateData = {
    detailView: ViewProperties,
    person: Person
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
            person: null
        }
    }



    public async getPersonById(id: string): Promise<Person> {
        // this.setDetailScreenBusy(true);
        // const personData = await this.getService().getPersonById(id);
        // this.getData().Person = new Person(personData.data);
        // this.setDetailScreenBusy(false);
        // this.updateModel();
        // return this.getData().Person;

        this.setDetailScreenBusy(true);
        const personData = await this.getService().getPersonById(id);
        this.data.person = new Person(personData);
        this.setDetailScreenBusy(false);
        this.updateModel();
        return this.data.person;
    }

   
 
    public getData(): stateData {
        return this.data;
    }

    public setDetailScreenBusy(busy: boolean):void {
        this.data.detailView.busy = busy;
        this.updateModel();
    }
    

    public makeNewPerson(): Person  {
       let person = new Person();
       person.addEmptySkill();

       this.data.person = person;
       this.updateModel();

       this.createPerson(person)

       return person;

    }

    public createPerson(person: Person){
        this.service.createPerson(person.getJSON());
    }

  
 


}