import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // or your actual auth context
import {
  getAllFeedback,
  getFeedbackStats,
  getPapularFeedback,
} from "../service/opreations/feedbackAPIContect"; // replace with your path
import FeedbackStatsChart from "../component/FeedbackStatsChart";
import PapularChart from "../component/PapularChart";
import { useSocket } from "../context/SocketContext";

type Feedback = {
  productId: string;
  maxFeedback?: number;
  minFeedback?: number;
  averageRating?: number;
  totalfeedbacks?: number;
  name?: string;
  feedback?: string;
  rating?: string;
};

const FeedbackTabs = () => {
  const [activeTab, setActiveTab] = useState("All Feedback");
  const [data, setData] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "count">("rating"); // default sort type for popular
  const { token } = useAuth();
  const socket = useSocket();

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      let response;

      if (activeTab === "All Feedback") {
        if (!token) throw new Error("No auth token found.");
        response = await getAllFeedback(token);
      }

      if (activeTab === "Feedback Stats") {
        if (!token) throw new Error("No auth token found.");
        response = await getFeedbackStats(token);
      }

      if (activeTab === "Popular Feedback") {
        if (!token) throw new Error("No auth token found.");
        response = await getPapularFeedback(sortBy, token);
      }

      setData(response?.data?.data || []);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.on("newFeedback", (newFeedback) => {
      if (activeTab === "All Feedback") {
        setData((prev) => [newFeedback, ...prev]);
      } else {
        fetchFeedback();
      }
    });

    return () => {
      socket.off("newFeedback");
    };
  }, [activeTab]);

  console.log(data);

  useEffect(() => {
    fetchFeedback();
  }, [activeTab, sortBy]);

  return (
    <div className="mt-[110px]">
      {/* Tabs */}
      <div className="flex space-x-4 mb-4 max-w-[680px] mx-auto justify-between">
        {["All Feedback", "Feedback Stats", "Popular Feedback"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-xl ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-[680px] mx-auto">
        {activeTab === "Popular Feedback" && (
          <div className="mb-4">
            <label className="mr-2 font-medium">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "rating" | "count")}
              className="border px-3 py-1 rounded bg-gray-900"
            >
              <option value="rating">Rating</option>
              <option value="count">Count</option>
            </select>
          </div>
        )}

        {loading ? (
          <div className="loader-container">
            <span className="loader"></span>
          </div>
        ) : (
          <div>
            {activeTab.length === 0 ? (
              <div className="text-2xl font-semibold">Not Data Found</div>
            ) : (
              <div>
                {activeTab === "All Feedback" && !loading && (
                  <div className="flex flex-col gap-4 mb-10 mt-10">
                    <div className=" grid grid-cols-2 gap-4">
                      {data.map((feedback, index) => (
                        <div
                          className="bg-gray-800 px-4 py-5 rounded-2xl shadow shadow-gray-700"
                          key={index}
                        >
                          <p className="text-[12px]">{feedback.productId}</p>
                          <p> Name : {feedback.name}</p>
                          <p> Review : {feedback.feedback}</p>
                          <p> Rating : {feedback.rating}</p>
                          <p> </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Feedback Stats" && !loading && (
                  <div className="flex flex-col gap-4 mb-10 mt-10">
                    <h2 className="text-center text-xl mb-4">
                      Below See graph
                    </h2>
                    <div className=" grid grid-cols-2 gap-4">
                      {data.map((feedback, index) => (
                        <div
                          className="bg-gray-800 px-4 py-5 rounded-2xl shadow shadow-gray-700"
                          key={index}
                        >
                          <p className="text-[12px]">{feedback.productId}</p>
                          <p> Total Feedback = {feedback.totalfeedbacks}</p>
                          <p> Maximum = {feedback.maxFeedback}</p>
                          <p> Minimum = {feedback.minFeedback}</p>
                          <p> Average = {feedback.averageRating}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h1 className="mt-4 text-center text-xl font-semibold">
                        Here see Graph between AVG and Total
                      </h1>
                      <FeedbackStatsChart
                        data={data.map((feedback) => ({
                          ...feedback,
                          averageRating: feedback.averageRating ?? 0,
                          maxFeedback: feedback.maxFeedback ?? 0,
                          minFeedback: feedback.minFeedback ?? 0,
                          totalfeedbacks: feedback.totalfeedbacks ?? 0,
                        }))}
                      />
                    </div>
                  </div>
                )}

                {activeTab === "Popular Feedback" && !loading && (
                  <div className="flex flex-col gap-4 mb-10 mt-10">
                    <div className=" grid grid-cols-2 gap-4">
                      {data.map((feedback, index) => (
                        <div
                          className="bg-gray-800 px-4 py-5 rounded-2xl shadow shadow-gray-700"
                          key={index}
                        >
                          <p className="text-[12px]">{feedback.productId}</p>
                          <p> Total Feedback = {feedback.totalfeedbacks}</p>
                          <p> Average = {feedback.averageRating}</p>
                        </div>
                      ))}
                    </div>

                    <>
                      <h1 className="mt-4 text-xl font-semibold capitalize">
                        Short By Pie Chart :{" "}
                        {sortBy === "count" ? "count" : "rating"}
                      </h1>

                      <PapularChart
                        data={data.map((feedback) => ({
                          ...feedback,
                          averageRating: feedback.averageRating ?? 0,
                          totalfeedbacks: feedback.totalfeedbacks ?? 0,
                        }))}
                        show={sortBy === "count" ? "count" : "rating"}
                      />
                    </>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackTabs;
