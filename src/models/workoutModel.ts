export interface Workout {
    workout_id: string;
    user_id: number;
    workoutTitle: string;
    estimatedTime: string;
    requiredEquipment: string[];
    plan: {
        title: string;
        sets?: number;
        reps?: number;
        time?: string;
        equipment: string;
        notes: string;
    }[];
}
