
export type PersonEntitySet = { results: Array<PersonEnity> };
export type SkillEntitySet = { results: Array<SkillEntity> };

export interface SkillEntity {
    SkillId: number,
    description: string,
    score: number
}

export interface PersonEnity extends Record<string,unknown> {
    personId: number,
    skillId: number,
    firstName: string,
    lastName: string,
    company: string,
    birthDate: Date,
    skills: Array<SkillEntity>
}

