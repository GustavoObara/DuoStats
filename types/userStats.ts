export interface UserStats {
    joinedClassroomIds: number[];
    streak: number;
    motivation: string;
    acquisitionSurveyReason: string;
    shouldForceConnectPhoneNumber: boolean;
    picture: string;
    learningLanguage: string;
    hasFacebookId: boolean;
    shakeToReportEnabled: boolean | null;
    canUseModerationTools: boolean;
    id: number;
    betaStatus: string;
    hasGoogleId: boolean;
    fromLanguage: string;
    hasRecentActivity15: boolean;
    observedClassroomIds: number[];
    username: string;
    bio: string;
    profileCountry: string | null;
    currentCourseId: string;
    hasPhoneNumber: boolean;
    creationDate: number;
    achievements: any[]; 
    hasPlus: boolean;
    name: string;
    roles: string[];
    classroomLeaderboardsEnabled: boolean;
    emailVerified: boolean;
    courses: Course[];
    totalXp: number;
    streakData: StreakData;
}

export interface Course {
    preload: boolean;
    placementTestAvailable: boolean;
    authorId: string;
    title: string;
    learningLanguage: string;
    xp: number;
    healthEnabled: boolean;
    fromLanguage: string;
    crowns: number;
    id: string;
}

export interface StreakData {
    currentStreak: {
        startDate: string;
        length: number;
        endDate: string;
    };
}