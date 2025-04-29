import { useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../../components/Layout/MainLayout';
import { useCanvas } from '../../hooks/useCanvas';
import { useCollaboration } from '../../hooks/useCollaboration';
import { useAIAnalysis } from '../../hooks/useAIAnalysis';

const WhiteboardPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { canvasState, updateCanvas } = useCanvas();
    const { collaborationState, updateCollaboration } = useCollaboration();
    const { analysisResults, fetchAnalysis } = useAIAnalysis();

    useEffect(() => {
        if (id) {
            // Fetch initial data based on the whiteboard ID
            fetchAnalysis(id);
        }
    }, [id, fetchAnalysis]);

    return (
        <MainLayout>
            {/* Render Canvas, AI Analysis, and Collaboration components here */}
        </MainLayout>
    );
};

export default WhiteboardPage;