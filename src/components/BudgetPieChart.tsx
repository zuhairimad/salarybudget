import React from 'react';
import { PieChart } from 'lucide-react';

interface BudgetCategory {
  name: string;
  percentage: number;
  color: string;
  isFixed?: boolean;
}

interface BudgetPieChartProps {
  categories: BudgetCategory[];
  salary: number;
  onPercentageChange?: (index: number, value: number) => void;
}

export function BudgetPieChart({ categories, salary, onPercentageChange }: BudgetPieChartProps) {
  const monthlyIncome = salary / 12;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          Monthly Budget Breakdown
        </h3>
        <p className="text-sm text-gray-600">
          Monthly Income: ${monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </p>
      </div>
      <div className="space-y-4">
        {categories.map((category, index) => {
          const monthlyAmount = (monthlyIncome * category.percentage) / 100;
          return (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: category.color }}>
                  {category.name}
                </span>
                <span className="text-sm text-gray-600">
                  ${monthlyAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  {' '}({category.percentage}%)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={category.percentage}
                onChange={(e) => onPercentageChange?.(index, parseInt(e.target.value, 10))}
                className="w-full"
                style={{ accentColor: category.color }}
                disabled={category.isFixed}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}