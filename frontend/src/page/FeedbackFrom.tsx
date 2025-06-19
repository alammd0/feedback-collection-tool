import React, { useEffect, useState } from "react";
import { getAllProduct } from "../service/opreations/productAPIContect";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useSocket } from "../context/SocketContext";

interface formData {
  productId: string;
  name: string;
  email: string;
  review: string;
  rating: number;
}

interface Product {
  id: string;
  name: string;
}

export const FeedbackFrom = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

//   const socket = useSocket();

  const [from, setFrom] = useState<formData>({
    productId: "",
    name: "",
    email: "",
    review: "",
    rating: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getAllProduct();

        if (response) {
          setProduct(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchProduct();
  }, []);

  console.log(product);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();

    const { name, value } = e.target;

    setFrom((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const submitFrom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(from);
  };

  console.log("formData - ", from);

  console;

  return (
    <div className="flex justify-center items-center h-screen max-w-[540px] mx-auto">
      <form onSubmit={submitFrom} className="w-full">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Khalid Alam"
              value={from.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="khalid@gmail.com"
              value={from.email}
              onChange={handleChange}
              name="email"
            />
          </div>
        </div>

        <div className="flex gap-4 flex-col mb-6">
          <label
            htmlFor="productId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>

          <select
            id="productId"
            value={from.productId}
            name="productId"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {product.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              component="legend"
              className="text-sm font-medium text-gray-900 dark:text-white"
            >
              Rate of this Product
            </Typography>

            <Rating
              name="rating"
              className="w-full flex gap-10 pl-6"
              value={from.rating}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setFrom((prev) => ({
                    ...prev,
                    rating: newValue,
                  }));
                }
              }}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#facc15",
                  // Tailwind yellow-400
                },
                "& .MuiRating-iconEmpty": {
                  color: "#d1d5db",
                  // Tailwind gray-300
                },
              }}
            />

            <Typography className="text-sm text-gray-600">
              {from.rating}/5
            </Typography>
          </Box>
        </div>

        <div className="mb-6">
          <label
            htmlFor="review"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="review"
            name="review"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            onChange={handleChange}
            value={from.review}
            ></textarea>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
