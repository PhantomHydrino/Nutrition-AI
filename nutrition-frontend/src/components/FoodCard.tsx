
import React from 'react';
import Card from './Card';

type Props = {
  log: any;
};

const FoodCard: React.FC<Props> = ({ log }) => {
  return (
    <Card title={log.food} subtitle={new Date(log.created_at).toLocaleString()}>
      <div>Calories: {log.calories}</div>
      <div>Protein: {log.protein}g</div>
      <div>Carbs: {log.carbs}g</div>
      <div>Fats: {log.fats}g</div>
      {log.advice && <div>Advice: {log.advice}</div>}
    </Card>
  );
};

export default FoodCard;