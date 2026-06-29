import { cardStyle } from "./MacroRecommendation";

interface Props {
    summary: any;
}

export default function DietSuggestionCard({ summary }: Props) {


    let diet = summary.diet;

    if (!diet) return null;

    return (

        <div style={cardStyle}>

            <h2>🥗 Diet Recommendation</h2>

            <div className="diet-summary">

                <div className="stat">
                    <h4>Calories</h4>
                    <p>{diet.target_calories.toFixed(0)} kcal</p>
                </div>

                <div className="stat">
                    <h4>Protein</h4>
                    <p>{diet.macros.protein_g} g</p>
                </div>

                <div className="stat">
                    <h4>Carbs</h4>
                    <p>{diet.macros.carbs_g} g</p>
                </div>

                <div className="stat">
                    <h4>Fats</h4>
                    <p>{diet.macros.fats_g} g</p>
                </div>

            </div>

            <hr />

            <h3>🍽 Daily Meal Plan</h3>

            {summary.ai_insights.meal_plan.map((meal: any) => (

                <div
                    key={meal.meal}
                    className="meal-card"
                >

                    <div className="meal-header">

                        <h4>{meal.meal}</h4>

                        <span>{meal.calories} kcal</span>

                    </div>

                    <small>{meal.timing}</small>

                    <ul>

                        {meal.foods.map((food: string) => (

                            <li key={food}>{food}</li>

                        ))}

                    </ul>

                </div>

            ))}

            <hr />

            <h3>🥦 Recommended Food Groups</h3>

            {Object.entries(summary.ai_insights.recommended_food_groups).map(

                ([group, foods]: any) => (

                    <div key={group}>

                        <strong>

                            {group
                                .replace("_", " ")
                                .replace(/\b\w/g, c => c.toUpperCase())}

                        </strong>

                        <p>

                            {foods.join(", ")}

                        </p>

                    </div>

                )

            )}

            {/* TIPS */}
            <div style={{
                    background: "#fff",
                    padding: 20,
                    borderRadius: 15,
                    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                    marginBottom: 25,
                }}>
                <h2>Diet Tips</h2>

                <ul>
                    {summary.ai_insights.tips.map((tip: string) => (
                        <li key={tip}>{tip}</li>
                    ))}
                </ul>
            </div>

        </div>

    );

}