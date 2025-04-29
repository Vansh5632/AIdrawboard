export interface User {
    id: string;
    name: string;
    isActive: boolean;
}

export interface CollaborationState {
    users: User[];
    isCollaborating: boolean;
    lastUpdated: Date;
}