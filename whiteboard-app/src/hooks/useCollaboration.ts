import { useState, useEffect } from 'react';
import { User, CollaborationState } from '../types/collaboration';
import { getUserPresence, updateCollaborationState } from '../services/collaborationService';

const useCollaboration = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [collaborationState, setCollaborationState] = useState<CollaborationState | null>(null);

    useEffect(() => {
        const fetchUserPresence = async () => {
            const userPresence = await getUserPresence();
            setUsers(userPresence);
        };

        fetchUserPresence();
    }, []);

    const updateState = (newState: CollaborationState) => {
        setCollaborationState(newState);
        updateCollaborationState(newState);
    };

    return {
        users,
        collaborationState,
        updateState,
    };
};

export default useCollaboration;