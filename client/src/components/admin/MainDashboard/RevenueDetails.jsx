import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../../utils/api";
import RevenueDataChart from "./Charts/RevenueDataChart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RevenueDetails = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [chartData, setChartData] = useState();

  const fetchData = async () => {
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      const res = await axios.get(`${BASE_URL}/bookings/revenueData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRevenueData(res.data);

      console.log(res.data);

      const formattedChartData = Object.values(
        res.data.reduce((acc, item) => {
          const state = item._id.state;

          // if we haven't seen this state yet, initialize it
          if (!acc[state]) {
            acc[state] = {
              state,
              bookings: 0,
              amount: 0,
            };
          }

          // accumulate bookings and revenue
          acc[state].bookings += item.totalBookings;
          acc[state].amount += item.totalRevenue;

          return acc;
        }, {}) // start with empty lookup object
      );
      setChartData(formattedChartData);

      console.log(formattedChartData);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <RevenueDataChart data={{ chartData: chartData , mess : "state" }} />

      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S.NO.</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RevenueDetails;
