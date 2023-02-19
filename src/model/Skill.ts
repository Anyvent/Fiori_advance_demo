import { SkillEntity } from "../type/Backend";
import BaseObject from "../core/BaseObject";

/**
 * @namespace be.thevaluechain.fioriadvanced.model
 */
export default class Skill extends BaseObject implements SkillEntity {
  
   
    constructor(data?: SkillEntity) {
        super(data); 

    }

    
    isNotEmpty(): boolean {
        return this.description !== "" && this.score >= 0;
    }


    getJSON() {
        let oDataProperties: unknown;
        let skillEntity = oDataProperties as SkillEntity;
        
        
        
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
    skillId: number;
    description: string;
    score: number;
}