"use client";
import {ResponsiveBar} from "@nivo/bar";

export function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        ariaLabel="A bar chart showing data"
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        colors={["#2563eb"]}
        data={[
          {name: "Jan", count: 111},
          {name: "Feb", count: 157},
          {name: "Mar", count: 129},
          {name: "Apr", count: 150},
          {name: "May", count: 119},
          {name: "Jun", count: 72},
        ]}
        enableLabel={false}
        gridYValues={4}
        indexBy="name"
        keys={["count"]}
        margin={{top: 0, right: 0, bottom: 40, left: 40}}
        padding={0.3}
        role="application"
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({id}) => `${id.toString()}:`}
      />
    </div>
  );
}
