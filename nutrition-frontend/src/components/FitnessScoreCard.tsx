import { cardStyle } from "./MacroRecommendation";

interface Props {
    summary: any;
}

export default function FitnessScoreCard({ summary }: Props) {
    const fitnessScore = summary.fitness_score;

    if (!fitnessScore) return null;

    return (
        <div style={cardStyle}>
            <h2>💪 Fitness Score</h2>

            <div style={{ textAlign: "center", margin: "20px 0" }}>
                <h1 style={{ fontSize: "3rem", margin: 0 }}>
                    {fitnessScore.score}/100
                </h1>

                <h3>{fitnessScore.rating}</h3>
            </div>
        </div>
    );
}