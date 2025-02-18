import React, { useState } from "react";
import { Card, Typography, Spinner } from "@material-tailwind/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../auth/hook/useAxiosSecure";
import useAuth from "../../auth/hook/useAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // State for Pagination
  const [page, setPage] = useState(1);
  const [payrolls, setPayrolls] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Load More Data
  const fetchPayrolls = async () => {
    const { data } = await axiosSecure.get(`/payrolls?email=${user.email}&page=${page}&limit=5`);
    setPayrolls((prev) => [...prev, ...data.payrolls]); // Append new data
    setPage(page + 1); // Increase page
    if (payrolls.length + data.payrolls.length >= data.total) {
      setHasMore(false); // Stop further requests
    }
  };

  return (
    <div className="">
      <div className="text-center py-4">
        <Typography variant="h2" color="blue-gray" className="font-montserrat">
          Payment History
        </Typography>
      </div>

      <Card className="max-w-2xl mx-auto">
        <InfiniteScroll
          dataLength={payrolls.length}
          next={fetchPayrolls}
          hasMore={hasMore}
          loader={
            <div className="flex items-center justify-center my-4">
              <Spinner />
            </div>
          }
        >
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="rounded-2xl">
                {["Month & Year", "Amount", "Transaction Id"].map((head) => (
                  <th key={head} className="p-4 bg-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payrolls.map((item) => (
                <tr key={item?._id} className="font-montserrat">
                  {/* Month & Year */}
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {new Date(`${item.month}-01`).toLocaleString("en-US", { month: "long", year: "numeric" })}
                    </Typography>
                  </td>
                  {/* Amount */}
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.salary}
                    </Typography>
                  </td>
                  {/* Transaction ID */}
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.transactionId ? item.transactionId : "Pending"}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </Card>
    </div>
  );
};

export default PaymentHistory;