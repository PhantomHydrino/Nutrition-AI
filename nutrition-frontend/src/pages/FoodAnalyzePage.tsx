import React from 'react';
import FoodForm from '../components/FoodForm';
import Card from '../components/Card';

const FoodAnalyzePage: React.FC = () => {
  return (
    <div className="page">
      <Card title="Analyze Your Food">
        <FoodForm />
      </Card>
    </div>
  );
};

export default FoodAnalyzePage;