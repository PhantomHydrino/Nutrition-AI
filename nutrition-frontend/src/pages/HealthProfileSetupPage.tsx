import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

import { updateHealthProfile } from "../api/health";

export default function HealthProfileSetupPage() {

    const navigate = useNavigate();

    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const [activity, setActivity] = useState("");


    const submit = async () => {

        await updateHealthProfile({

            age: Number(age),

            gender: gender.toLowerCase(),

            height: Number(height),

            weight: Number(weight),

            activity_level: activity.toLowerCase()

        });

        navigate("/dashboard");

    };

    return (

        <div className="auth-page">

            <h2>Complete Your Health Profile</h2>

            <Input
                label="Age"
                value={age}
                onChange={setAge}
                type="number"
            />

            <Input
                label="Gender"
                value={gender}
                onChange={setGender}
            />

            <Input
                label="Height (cm)"
                value={height}
                onChange={setHeight}
                type="number"
            />

            <Input
                label="Weight (kg)"
                value={weight}
                onChange={setWeight}
                type="number"
            />

            <Input
                label="Activity Level"
                value={activity}
                onChange={setActivity}
            />

            <Button
                onClick={submit}
                variant="primary"
            >
                Save Profile
            </Button>

        </div>

    );

}