import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FeedbackStat {
  productId: string;
  averageRating: number;
  totalfeedbacks: number;
  maxFeedback: number;
  minFeedback: number;
}

const FeedbackStatsChart = ({ data }: { data: FeedbackStat[] }) => {
  return (
    <div className="w-ful h-96 mt-14">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="productId" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="averageRating" fill="#8884d8" />
          <Bar dataKey="totalfeedbacks" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeedbackStatsChart;
