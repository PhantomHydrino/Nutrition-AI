import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    summary: any;
}


export const cardStyle: React.CSSProperties = {
        background: "#fff",
        padding: 20,
        borderRadius: 15,
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
        marginBottom: 25,
};

export default function MacroRecommendation({ summary }: Props) {
    if (!summary) return <div>Loading...</div>;

    const macros = summary.diet.macros;

    const pieData = {
        labels: ["Protein", "Carbs", "Fats"],
        datasets: [
            {
                data: [
                    macros.protein_calories,
                    macros.carbs_calories,
                    macros.fats_calories,
                ],
                backgroundColor: [
                    "#4CAF50",
                    "#2196F3",
                    "#FFC107",
                ],
            },
        ],
    };

    

    return (
        <div style={{ width:"100%"}}>


            {/* BMI */}
            <div style={cardStyle}>
                <p>
                    <strong>Category:</strong> {summary.bmi.category}
                </p>

                <p>
                    <strong>Health Risk:</strong> {summary.bmi.health_risk}
                </p>

                <h3>Ideal Weight Range</h3>

                <p>
                    {summary.bmi.ideal_weight_range.min_kg} kg -{" "}
                    {summary.bmi.ideal_weight_range.max_kg} kg
                </p>

            </div>

            {/* MACROS */}
            <div style={cardStyle}>
                <h2>Nutrition</h2>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 30,
                    }}
                >
                    <div style={{ width: 320 }}>
                        <Pie data={pieData} />
                    </div>

                    <div style={{ flex: 1 }}>
                        <h1 style={{ color: "#1976d2" }}>
                            {summary.diet.target_calories.toFixed(0)} kcal
                        </h1>

                        <table width="100%">
                            <thead>
                                <tr>
                                    <th align="left">Macro</th>
                                    <th>Grams</th>
                                    <th>Calories</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Protein</td>
                                    <td align="center">{macros.protein_g}</td>
                                    <td align="center">
                                        {macros.protein_calories}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Carbs</td>
                                    <td align="center">{macros.carbs_g}</td>
                                    <td align="center">
                                        {macros.carbs_calories}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Fats</td>
                                    <td align="center">{macros.fats_g}</td>
                                    <td align="center">
                                        {macros.fats_calories}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            

           

            

        </div>
    );
}