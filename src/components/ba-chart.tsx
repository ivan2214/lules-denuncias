"use client";
import {ResponsiveBar} from "@nivo/bar";
import {type HTMLAttributes} from "react";

import {cn} from "@/lib/utils";
import {type ComplaintExtends} from "@/actions/complaints/get-filtered-complaints";

interface BaChartProp {
  data: ComplaintExtends[];
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export function BarChart({data, className}: BaChartProp) {
  const dataParsed = data.map((complaint) => {
    return {
      name: complaint.categories.map((category) => category.name).join(", "),
      count: complaint.categories.length,
    };
  });

  return (
    <div className={cn("flex flex-col", className)}>
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
        data={dataParsed}
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
