interface Props {
    bmi: number;
    category: string;
    position: number;
}

export default function BMIIndicator({
    bmi,
    category,
    position,
}: Props) {

    return (

        <div
            style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "Arial, Helvetica, sans-serif"
            }}
        >

            {/* Heading */}

            <div
                style={{
                    marginBottom: "30px"
                }}
            >

                <h2
                    style={{
                        margin: 0,
                        fontSize: "30px",
                        fontWeight: 700,
                        color: "#222"
                    }}
                >
                    BMI Indicator
                </h2>

                <p
                    style={{
                        marginTop: "6px",
                        color: "#666",
                        fontSize: "16px"
                    }}
                >
                    Body Mass Index
                </p>

            </div>

            {/* BMI Number */}

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "60px"
                }}
            >

                <h1
                    style={{
                        margin: 0,
                        fontSize: "72px",
                        color: "#16a34a"
                    }}
                >

                    {bmi.toFixed(1)}

                </h1>

                <p
                    style={{
                        fontSize: "22px",
                        fontWeight: 600,
                        marginTop: "10px"
                    }}
                >
                    {category}
                </p>

            </div>

            {/* Indicator */}

            <div
                style={{
                    position: "relative",
                    marginBottom: "20px"
                }}
            >

                {/* Arrow */}

                <div

                    style={{
                        position: "absolute",
                        left: `${position}%`,
                        top: "-32px",
                        transform: "translateX(-50%)",
                        fontSize: "34px",
                        transition: "all 0.7s ease"
                    }}

                >

                    ▼

                </div>

                {/* Gradient Bar */}

                <div
                    style={{
                        width: "100%",
                        height: "22px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        display: "flex"
                    }}
                >

                    <div
                        style={{
                            width: "18.5%",
                            background: "#60A5FA"
                        }}
                    />

                    <div
                        style={{
                            width: "31.5%",
                            background: "#22C55E"
                        }}
                    />

                    <div
                        style={{
                            width: "20%",
                            background: "#FACC15"
                        }}
                    />

                    <div
                        style={{
                            flex: 1,
                            background: "#EF4444"
                        }}
                    />

                </div>

            </div>

            {/* Labels */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    marginTop: "18px",
                    fontWeight: 600,
                    color: "#555",
                    fontSize: "15px"
                }}
            >

                <div
                    style={{
                        textAlign: "left"
                    }}
                >
                    Underweight
                </div>

                <div
                    style={{
                        textAlign: "center"
                    }}
                >
                    Normal
                </div>

                <div
                    style={{
                        textAlign: "center"
                    }}
                >
                    Overweight
                </div>

                <div
                    style={{
                        textAlign: "right"
                    }}
                >
                    Obese
                </div>

            </div>

            {/* Scale */}

            <div

                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "12px",
                    fontSize: "13px",
                    color: "#777"
                }}

            >

                <span>0</span>

                <span>18.5</span>

                <span>25</span>

                <span>30</span>

                <span>40+</span>

            </div>

        </div>

    )

}