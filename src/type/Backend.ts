
export type PersonEntitySet = { results: Array<PersonEnity> };
export type SkillEntitySet = { results: Array<SkillEntity> };

export interface SkillEntity {
    SkillId: number,
    description: string,
    score: number
}