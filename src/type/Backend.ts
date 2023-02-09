
export type PersonEntitySet = { results: Array<PersonEnity> };
export type SkillEntitySet = { results: Array<SkillEntity> };

export interface SkillEntity {
    SkillId: number,
    description: string
}

export interface PersonEnity {
    PersonId: number,
    SkillId: number,
    FirstName: string,
    LastName: string,
    Company: string,
    Birthdate: Date,
    skills: Array<SkillEntity>
}

