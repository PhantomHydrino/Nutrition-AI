import { cardStyle } from "./MacroRecommendation";

interface Props {
    summary: any;
}

export default function WorkoutSuggestionCard({ summary }: Props) {

    let fitness = summary.fitness;

    if (!fitness) return null;

    return (

        <div style={cardStyle}>

            <h2>🏋 Weekly Workout Plan</h2>

            <br/>
            <div style={{
                border:"solid 0.2em",
                borderColor:"#be82e14b",
                padding:"0.9em",
                borderRadius:"1em"
            }}>

                <div>
                    <strong>Level</strong>
                    <p>{fitness.fitness_level}</p>
                </div>

                <div>
                    <strong>Weekly Burn</strong>
                    <p>{fitness.estimated_weekly_calorie_burn} kcal</p>
                </div>

            </div>

            <br/>

            {summary.ai_insights.weekly_plan.map((day: any) => (

                <div
                    key={day.day}
                    className="workout-day"
                >

                    <div className="day-header">

                        <h3>{day.day}</h3>

                        <span>

                            {day.rest_day
                                ? "😴 Rest Day"
                                : `${day.duration_minutes} min`}

                        </span>

                    </div>

                    <p>

                        <strong>{day.focus}</strong>

                    </p>

                    <ul>

                        {day.exercises.map((exercise: string) => (

                            <li key={exercise}>

                                {exercise}

                            </li>

                        ))}

                    </ul>

                </div>

            ))}

        </div>

    );

}