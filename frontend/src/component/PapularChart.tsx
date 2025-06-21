import { PieChart } from "@mui/x-charts/PieChart";

interface PopularFeedbackData {
  productId: string;
  averageRating: number;
  totalfeedbacks: number;
}

interface Props {
  data: PopularFeedbackData[];
  show: "rating" | "count";
}

export default function PapularChart({ data, show }: Props) {
  return (
    <PieChart
      series={[
        {
          data: data.map((item, index) => ({
            id: index,
            value: show === "count" ? item.totalfeedbacks : item.averageRating,
            label: `Product ${item.productId}`,
          })),
        },
      ]}
      width={200}
      height={200}
    />
  );
}
