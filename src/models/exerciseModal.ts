export interface Exercise {
    exercise_id: string;
    name: string;
    description: string;
    muscleGroup: string[];
    equipment: string[];
    tips: string[];
    images: string[];
    video: string;
    difficulty: string;
    type: string;
    notes: string;
    alternatives: string[];
    instructions: {
        instruction: string;
        description: string;
        images: string[];
        subInstructions: {
            instruction: string;
            description: string;
        }[];
    }[];
}
