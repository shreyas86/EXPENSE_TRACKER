import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import CustomTooltip from './CustomTooltip.jsx';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
  data,
  label,
  totalamount,
  colors,
  showTextAnchor,
}) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={90}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Styled center content */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            marginBottom: '4px',
            fontSize: '14px',
            color: '#666',
          }}
        >
          {label || 'Label'}
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#333',
            fontWeight: 600,
          }}
        >
          {totalamount || 'Amount'}
        </div>
      </div>
    </div>
  );
};

export default CustomPieChart;
