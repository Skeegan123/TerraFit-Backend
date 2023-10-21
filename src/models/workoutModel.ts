export interface Workout {
    workout_id: string;
    user_id: string;
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
