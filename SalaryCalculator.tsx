import React, { useState, useEffect } from "react";
import { X, DollarSign, TrendingUp } from "lucide-react";
import { SalaryForm } from "./SalaryForm";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface SalaryCalculatorProps {
  onClose: () => void;
}

export function SalaryCalculator({ onClose }: SalaryCalculatorProps) {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [currency, setCurrency] = useState<string>("USD"); // Default currency
  const [exchangeRate, setExchangeRate] = useState<number>(1); // Default conversion rate

  // Function to fetch exchange rates
  const fetchExchangeRate = async (toCurrency: string) => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      const data = await response.json();
      setExchangeRate(data.rates[toCurrency] || 1);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      setExchangeRate(1);
    }
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setCurrency(data.currency); // Capture selected currency
    await fetchExchangeRate(data.currency); // Fetch exchange rate for conversion

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setPrediction(result.predicted_salary * exchangeRate);
        setChartData([
          { name: "Industry Avg", salary: (result.industry_avg_salary || 80000) * exchangeRate },
          { name: "Your Prediction", salary: result.predicted_salary * exchangeRate },
          { name: "Experienced Avg", salary: (result.experienced_avg_salary || 100000) * exchangeRate },
        ]);
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-blue-600" />
              Salary Calculator
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Enter Your Details
              </h3>
              <SalaryForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Prediction Result</h3>
              {isLoading ? (
                <p className="text-center text-gray-500">Calculating salary prediction...</p>
              ) : prediction ? (
                <div className="text-center bg-blue-50 rounded-lg p-6">
                  <p className="text-lg text-gray-600 mb-4">Estimated Annual Salary:</p>
                  <p className="text-5xl font-bold text-blue-600 mb-4">
                    {currency} {prediction.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    This estimation is based on current market trends and may vary by location and other factors.
                  </p>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-700">Salary Comparison</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#4A5568" />
                        <YAxis stroke="#4A5568" />
                        <Tooltip />
                        <Bar dataKey="salary" fill="#4299E1" barSize={50} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="text-center bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-500">Fill out the form to get your salary prediction</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}