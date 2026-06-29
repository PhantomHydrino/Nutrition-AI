import { cardStyle } from "./MacroRecommendation";

interface Props{
    bmr:number;
    tdee:number;
    metabolism:string;
}

export default function MetabolismCard({bmr,tdee,metabolism}:Props){

    return(

        <div style={cardStyle}>

            <h2>🔥 Metabolism</h2>

            <p>BMR : {bmr} kcal/day</p>

            <p>TDEE : {tdee} kcal/day</p>

            <p>Status : {metabolism}</p>

        </div>

    )

}