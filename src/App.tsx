import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { cities } from './data/cities';
import { calculateTax } from './data/taxes';
import { CitySelector } from './components/CitySelector';
import { SalaryInput } from './components/SalaryInput';
import { FilingStatusSelector } from './components/FilingStatusSelector';
import { BudgetPieChart } from './components/BudgetPieChart';

const defaultBudgetCategories = [
  { name: '401(k)', percentage: 6, color: '#14B8A6', isFixed: true },
  { name: 'Rent', percentage: 28, color: '#4F46E5' },
  { name: 'Food', percentage: 15, color: '#10B981' },
  { name: 'Entertainment', percentage: 10, color: '#F59E0B' },
  { name: 'Investing', percentage: 18, color: '#6366F1' },
  { name: 'Saving', percentage: 13, color: '#8B5CF6' },
  { name: 'Travel', percentage: 10, color: '#EC4899' },
];

function App() {
  const [currentCity, setCurrentCity] = useState('San Francisco');
  const [targetCity, setTargetCity] = useState('Dallas');
  const [salary, setSalary] = useState(100000);
  const [isMarried, setIsMarried] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(defaultBudgetCategories);
  const [targetBudget, setTargetBudget] = useState(defaultBudgetCategories);

  const currentCityData = cities.find((city) => city.name === currentCity)!;
  const targetCityData = cities.find((city) => city.name === targetCity)!;
  const adjustedSalary =
    salary * (targetCityData.factor / currentCityData.factor);

  // Calculate 401k contribution
  const current401k = (salary * currentBudget[0].percentage) / 100;
  const target401k = (adjustedSalary * targetBudget[0].percentage) / 100;

  // Calculate tax on remaining amount after 401k
  const currentTaxableSalary = salary - current401k;
  const targetTaxableSalary = adjustedSalary - target401k;

  const currentTax = calculateTax(currentTaxableSalary, isMarried);
  const targetTax = calculateTax(targetTaxableSalary, isMarried);

  const currentAfterTax = currentTaxableSalary - currentTax;
  const targetAfterTax = targetTaxableSalary - targetTax;

  const handleBudgetChange = (
    index: number,
    newPercentage: number,
    isCurrentCity: boolean
  ) => {
    const setBudget = isCurrentCity ? setCurrentBudget : setTargetBudget;
    const currentCategories = isCurrentCity ? currentBudget : targetBudget;

    // Calculate the total of other percentages (excluding the one being changed)
    const otherTotal = currentCategories.reduce(
      (sum, cat, i) => (i === index ? sum : sum + cat.percentage),
      0
    );

    // Ensure the new total doesn't exceed 100%
    if (otherTotal + newPercentage <= 100) {
      setBudget((prev) =>
        prev.map((cat, i) =>
          i === index ? { ...cat, percentage: newPercentage } : cat
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Building2 className="w-10 h-10 text-indigo-600" />
            Salary & Budget Comparisons
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Moving to a new city? I built an app to help you understand how cost-of-living differences impact your salary and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <CitySelector
                  value={currentCity}
                  onChange={setCurrentCity}
                  label="Current City"
                />
                <SalaryInput value={salary} onChange={setSalary} />
              </div>
              <FilingStatusSelector
                isMarried={isMarried}
                onChange={setIsMarried}
              />
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Annual Gross Income:</span>
                  <span className="font-medium">
                    ${salary.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">401(k) Contribution:</span>
                  <span className="font-medium text-teal-600">
                    -$
                    {current401k.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Tax:</span>
                  <span className="font-medium text-red-600">
                    -$
                    {currentTax.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t">
                  <span>Monthly After-Tax:</span>
                  <span className="text-green-600">
                    $
                    {(currentAfterTax / 12).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </div>
            <BudgetPieChart
              categories={currentBudget}
              salary={currentAfterTax}
              onPercentageChange={(index, value) =>
                handleBudgetChange(index, value, true)
              }
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div className="space-y-4">
              <CitySelector
                value={targetCity}
                onChange={setTargetCity}
                label="Target City"
              />
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Adjusted Gross Income:</span>
                  <span className="font-medium">
                    ${adjustedSalary.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">401(k) Contribution:</span>
                  <span className="font-medium text-teal-600">
                    -$
                    {target401k.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Tax:</span>
                  <span className="font-medium text-red-600">
                    -$
                    {targetTax.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t">
                  <span>Monthly After-Tax:</span>
                  <span className="text-green-600">
                    $
                    {(targetAfterTax / 12).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </div>
            <BudgetPieChart
              categories={targetBudget}
              salary={targetAfterTax}
              onPercentageChange={(index, value) =>
                handleBudgetChange(index, value, false)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
