const CustomizedLabel = ({ x, y, stroke, value }: any) => {
  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={'1rem'} textAnchor='middle'>
      {value}
    </text>
  );
};

export default CustomizedLabel;
