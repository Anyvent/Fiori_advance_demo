
export type PersonEntitySet = { results: Array<PersonEnity> };
export type SkillEntitySet = { results: Array<SkillEntity> };

export interface SkillEntity {
    skillId?: number,
    description?: string,
    score?: number
}

// export interface PersonEnity {
//     PersonId: number,
//     SkillId: number,
//     FirstName: string,
//     LastName: string,
//     Company: string,
//     BirthDate: Date,
//     Skills: Array<SkillEntity>
// }


export interface PersonEnity extends Record<string,unknown> {
    personId?: number,
    skillId?: number,
    firstName?: string,
    lastName?: string,
    company?: string,
    birthDate?: Date,
    skills?: Array<SkillEntity>
}
