import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    bmi: number;
}

export default function BMIChart({ bmi }: Props) {

    const data = {
        labels: [
            "Underweight",
            "Normal",
            "Overweight",
            "Your BMI"
        ],

        datasets: [
            {
                label: "BMI Value",

                data: [
                    18.5,
                    24.9,
                    29.9,
                    bmi
                ],

                backgroundColor: [
                    "#60A5FA",
                    "#22C55E",
                    "#FACC15",
                    "#EF4444"
                ],

                borderRadius: 8
            }
        ]
    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                display: false

            },

            title: {

                display: true,

                text: "BMI Classification",

                font: {

                    size: 22

                },

                color: "#222"

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                suggestedMax: 40,

                ticks: {

                    stepSize: 5

                }

            }

        }

    };

    return (

        <div

            style={{

                background: "#ffffff",

                padding: "30px",

                borderRadius: "20px",

                boxShadow: "0px 8px 25px rgba(0,0,0,0.12)",

                marginTop: "30px",

                width: "100%",

                boxSizing: "border-box"

            }}

        >

            <h2

                style={{

                    margin: 0,

                    marginBottom: "25px",

                    fontSize: "28px",

                    color: "#222"

                }}

            >

                BMI Comparison Chart

            </h2>

            <p

                style={{

                    color: "#666",

                    marginTop: 0,

                    marginBottom: "30px",

                    fontSize: "16px"

                }}

            >

                Compare your BMI against the standard BMI ranges.

            </p>

            <div

                style={{

                    width: "100%",

                    height: "420px"

                }}

            >

                <Bar

                    data={data}

                    options={options}

                />

            </div>

            <div

                style={{

                    marginTop: "25px",

                    display: "flex",

                    justifyContent: "space-between",

                    flexWrap: "wrap",

                    gap: "15px"

                }}

            >

                <div>

                    <strong>Underweight</strong>

                    <br />

                    &lt; 18.5

                </div>

                <div>

                    <strong>Normal</strong>

                    <br />

                    18.5 - 24.9

                </div>

                <div>

                    <strong>Overweight</strong>

                    <br />

                    25 - 29.9

                </div>

                <div>

                    <strong>Obese</strong>

                    <br />

                    30+

                </div>

            </div>

        </div>

    );

}