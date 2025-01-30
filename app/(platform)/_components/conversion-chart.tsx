"use client";

import React from "react";
import { LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const dummyData = [
    { date: "2023/08/01", incomplete: 10, complete: 20, rate: 66 },
    { date: "2023/08/08", incomplete: 5, complete: 30, rate: 85 },
    { date: "2023/08/15", incomplete: 15, complete: 25, rate: 62 },
    { date: "2023/09/08", incomplete: 14, complete: 36, rate: 72 },
    { date: "2023/09/15", incomplete: 10, complete: 40, rate: 80 },
];

export function ConversionChart() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Conversion Rate over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dummyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="incomplete" stroke="#FF0000" name="Incomplete Verifications" />
                    <Line type="monotone" dataKey="complete" stroke="#00FF00" name="Completed Verifications" />
                    <Line type="monotone" dataKey="rate" stroke="#0000FF" name="Verifications Rate" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}