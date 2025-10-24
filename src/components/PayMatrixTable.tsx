import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Card } from "@/components/ui/card";

interface PayMatrixRow {
  [key: string]: string | number;
}

export function PayMatrixTable() {
  const [data, setData] = useState<PayMatrixRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    fetch("/Pay-matrix.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const result = Papa.parse(csvText, { header: true });
        setData(result.data as PayMatrixRow[]);
        setHeaders(result.meta.fields || []);
      })
      .catch((err) => console.error("Error loading CSV:", err));
  }, []);

  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        Loading Pay Matrix Table...
      </div>
    );
  }

  return (
    <Card className="p-4 sm:p-6 mt-10 bg-white border border-gray-200 rounded-xl shadow-sm max-w-6xl mx-auto overflow-x-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-4">
        Central Pay Matrix (7th CPC)
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4">
        Reference table showing levels and pay bands for various grades.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-3 py-2 border-b border-gray-200 text-left font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-3 py-2 border-b border-gray-100 text-gray-700"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
