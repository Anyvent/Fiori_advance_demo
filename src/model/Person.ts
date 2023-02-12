import { PersonEnity, SkillEntity } from "../type/Backend";
import BaseObject from "../core/BaseObject";

/**
 * @namespace be.thevaluechain.fioriadvanced.model
 */
export default class Person extends BaseObject implements PersonEnity {



    constructor(data?: PersonEnity) {
        super(data); //should copy the oData values to the object

    }



    getFirstName(): string {
        return this.FirstName;
    }

    setFirstName(value: string) {
        return this.FirstName = value;
    }





    /**
     *  Genereated by implementing the Interface
     */
    PersonId: number;
    SkillId: number;
    FirstName: string;
    LastName: string;
    Company: string;
    BirthDate: Date;
    skills: SkillEntity[];
}