'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import { useState, useRef, useEffect } from 'react';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const CustomizedDot = (props: any) => {
  const { cx, cy, chartHeight } = props;

  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={chartHeight}
        stroke="#517df0" // line
        strokeDasharray="3 3"
      />
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#517df0" // dot
        stroke="#517df0" // dot
        strokeWidth={2}
      />
    </g>
  );
};

export default function CompletedChart({
  monthlyCompleted,
}: {
  monthlyCompleted: { month: string; completed: number }[];
}) {
  const chartRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(0);

  useEffect(() => {
    if (chartRef.current) {
      const height = (chartRef.current as { offsetHeight: any }).offsetHeight;
      setChartHeight(height);
    }
  }, []);

  return (
    <div className="">
      <Card className="w-full h-full bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold font-satoshi leading-6">
            Completed requests
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[438px]" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyCompleted}
              margin={{ top: 15, right: 10, left: 10, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis width={0} axisLine={false} tickLine={false} tick={false} />
              <Tooltip
                cursor={false}
                content={({ active, payload }: any) => {
                  if (
                    active &&
                    payload &&
                    payload.length > 0 &&
                    payload[0].value !== undefined
                  ) {
                    return (
                      <div className="rounded-full bg-primary px-4 font-semibold shadow-sm">
                        <span className="text-white">{+payload[0].value}</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                strokeWidth={1.5}
                stroke="#000000"
                dot={<CustomizedDot chartHeight={chartHeight} />}
                activeDot={{
                  r: 5,
                  fill: '#6BBF47', //hover
                  stroke: '#6BBF47', //hover
                  strokeWidth: 2,
                }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
