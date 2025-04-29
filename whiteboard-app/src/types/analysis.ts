export interface AnalysisResult {
    id: string;
    title: string;
    content: string;
    confidenceScore: number;
}

export interface AnalysisData {
    results: AnalysisResult[];
    timestamp: Date;
}