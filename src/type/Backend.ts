
export type PersonEntitySet = { results: Array<PersonEnity> };
export type SkillEntitySet = { results: Array<SkillEntity> };

export interface SkillEntity {
    SkillId: number,
    description: string,
    score: number
}

export interface PersonEnity {
    PersonId: number,
    SkillId: number,
    FirstName: string,
    LastName: string,
    Company: string,
    BirthDate: Date,
    skills: Array<SkillEntity>
}

