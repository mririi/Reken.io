import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { VictoryPie } from "victory-native";

const CustomPie = (props) => {
  const { data, colors } = props;

  return (
    <VictoryPie
      innerRadius={25}
      data={data}
      colorScale={colors}
      height={260}
      labelRadius={35}
      labels={({ datum }) => `${datum.y}%`}
      style={{
        labels: { fontSize: 12, fontWeight: "bold" },
      }}
    />
  );
};

export default CustomPie;
