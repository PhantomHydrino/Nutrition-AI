import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { analyzeFood } from '../api/food';
import Card from './Card';

type Props = {
  onLog?: (log: any) => void;
};

const FoodForm: React.FC<Props> = ({ onLog }) => {
  const [food, setFood] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const submit = async () => {
    if (!food.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeFood(food);
      setResult(data);
      console.log(data);
      onLog?.(data);
    } catch (e) {
      setError('Failed to analyze food');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Analyze Food">
      <div className="form-grid">
        
        <Input value={food} onChange={setFood} placeholder="e.g., 1 bowl of oats" />
        
        <Button onClick={submit} variant="primary">{loading ? 'Analyzing...' : 'Analyze'}</Button>
        
      </div>
      {error && <div className="error">{error}</div>}
      {result && (
        <div className="result">
          <div>Calories: {result.Calories}</div>
          <div>Protein: {result.Protein}</div>
          <div>Carbs: {result.Carbs}</div>
          <div>Fats: {result.Fats}</div>
          <div>Advice: {result.Advice}</div>
        </div>
      )}
    </Card>
  );
};

export default FoodForm;
