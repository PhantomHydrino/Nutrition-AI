import React from 'react';

type Props = {
  logs: any[];
};

const HistoryList: React.FC<Props> = ({ logs }) => {

  console.log(logs);

  if (!logs.length) return <div>No history yet.</div>;
  return (
    <div className="history-grid">
      {logs.map((l, index) => (
        <div key={index} style={{
            border:"#7341e0 1px solid",
            padding:"1em",
            justifyContent:"center",
            display:"flex",
            gap:"10px",
            flexDirection:"column",
            borderRadius:"1em"
          }}>
          <div style={{
            border:"#d3c3f5 2px solid",
            padding:"10px",
            borderRadius:"0.6em",
            fontWeight:"200",
          }}
          >{l.Food}</div>
          <div 
            style={{
              color:"#000000"
            }}
          >
            {l.Calories} kcal<br/>{l.Protein}g Protien<br/>{l.Carbs}g Carbs<br/>{l.Fats}g Fats
          </div>
          <div style={{}}>{new Date(l.CreatedAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;