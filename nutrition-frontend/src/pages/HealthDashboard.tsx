import { useEffect, useState } from "react";

import BMIChart from "../components/BMIChart";
import BMIIndicator from "../components/BMIIndicator";
import DietSuggestionCard from "../components/DietSuggestionCard";
import FitnessScoreCard from "../components/FitnessScoreCard";
import MacroRecommendation from "../components/MacroRecommendation";
import MetabolismCard from "../components/MetabolismCard";
import WorkoutSuggestionCard from "../components/WorkoutSuggestionCard";

import { getHealthSummary } from "../api/health";

export default function HealthDashboard() {

    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<any>(null);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const data = await getHealthSummary();

                setSummary(data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        loadDashboard();

    }, []);

    if (loading) {

        return <h2>Loading Health Dashboard...</h2>;

    }

    if (!summary) {

        return <h2>Unable to load dashboard.</h2>;

    }

    return (

        
        <div
            className="health-dashboard"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                padding: "20px",
            }}
        >

            {/* Metabolism */}

            <MetabolismCard
                bmr={summary.metabolism.bmr}
                tdee={summary.metabolism.tdee}
                metabolism={summary.metabolism.interpretation}
            />

            {/* BMI */}

            <BMIIndicator
                bmi={summary.bmi.bmi}
                category={summary.bmi.category}
                position={summary.bmi.chart_position_percent}
            />

            <BMIChart
                bmi={summary.bmi.bmi}
            />
            
            
            {/* Macronutrients */}

            <MacroRecommendation
                summary={summary}
            />
            
            

            {/* Diet */}

            <DietSuggestionCard
                summary={summary}
            />

            
            {/* Workout */}

            
            <WorkoutSuggestionCard
                summary={summary}
            />
            
            {/* Fitness */}

            <FitnessScoreCard
                summary={summary}
            />
            
        </div>
    );

}