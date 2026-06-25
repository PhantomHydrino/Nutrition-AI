
import React from 'react';

type Props = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

const Card: React.FC<Props> = ({ title, subtitle, children }) => {
  return (
    <section className="card">
      {title && <h3 className="card-title">{title}</h3>}
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      <div className="card-content">{children}</div>
    </section>
  );
};

export default Card;