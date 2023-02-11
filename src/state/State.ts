import BaseState from "../core/BaseState";
import Service from "../service/Service";
import { PersonEnity } from "../type/Backend";
import Person from "../model/Person";


type stateData = {
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
            person: new Person()
        }
    }



    public async getPersonById(id: string): Promise<Person> {
        const personData = await this.getService().getPersonById(id);
        this.getData().person = new Person(personData.data);
        this.updateModel();
        return this.getData().person;
    }

    private setPerson(equipmentoData: Person) {
        this.getData().person = new Person(equipmentoData);

    }

    public getData(): stateData {
        return this.data;
    }



}