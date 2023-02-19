import BaseObject from "../core/BaseObject";
import { PersonEnity, SkillEntity } from "../type/Backend";
import Skill from "./Skill";

/**
 * @namespace be.thevaluechain.fioriadvanced.model
 */
export class Person extends BaseObject implements PersonEnity {

    private _skills: Skill[];

    constructor(data?: PersonEnity) {
        super(data); //should copy the oData values to the object

    }
 


    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(value: string) {
        return this.firstName = value;
    }

    addEmptySkill() {
        let skill = new Skill({ description: "", score: 0});
        this._skills.push(skill);
    }

    getSkills() {
        return this._skills.filter( skill => skill.isNotEmpty()).map((skill) => skill.getJSON());
    }

    public getJSON():Record<string, unknown> {
        return this.capitalizeProperties(this as PersonEnity);

               

        // return {
        //     Id: this.Id || 0,
        //     PersonId: this.PersonId || 0,
        //     SkillName: this.SkillName || "",
        //     Score: this.Score || 0
        // };
    }



    /**
     *  Genereated by implementing the Interface
     */
    // V1
    //     PersonId: number;
    //     SkillId: number;
    //     FirstName: string;
    //     LastName: string;
    //     Company: string;
    //     BirthDate: Date;
    //     skills: SkillEntity[];

    [x: string]: unknown;
    personId?: number;
    skillId?: number;
    firstName?: string;
    lastName?: string;
    company?: string;
    birthDate?: Date;
    skills?: SkillEntity[];

}