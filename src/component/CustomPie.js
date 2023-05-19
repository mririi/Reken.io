
import React from "react";
import { VictoryPie } from "victory-native";

const CustomPie = (props) => {
  const { data, colors } = props;
  console.log(data)
  return (
    <VictoryPie
      innerRadius={45}
      data={data? data : [{x:"10",y:"10"}]}
      colorScale={colors}
      height={360}
      labelRadius={65}
      labels={({ datum }) => `${datum.y}%`}
      style={{
        labels: { fontSize: 12, fontWeight: "bold" },
      }}
    />
  );
};

export default CustomPie;