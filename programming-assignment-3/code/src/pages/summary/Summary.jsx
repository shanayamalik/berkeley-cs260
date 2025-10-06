import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function Summary({ luggageData }) {
  const [showVisuals, setShowVisuals] = useState(false);
  // If no luggage data is provided, show loading or empty state
  if (!luggageData) {
    return (
      <div className="summary">
        <h1>Summary</h1>
        <p>No luggage data available.</p>
      </div>
    );
  }

  const {
    personalItemItems,
    carryOnItems,
    checkedBagItems,
    checkedBag2Items,
    weightUnit,
    cabinClass
  } = luggageData;

  // Function to convert weight to consistent unit (lbs) for calculation
  const convertToLbs = (weight, unit) => {
    if (unit === "kg") {
      return weight * 2.20462; // 1 kg = 2.20462 lbs
    }
    return weight; // already in lbs
  };

  // Function to convert weight from lbs to display unit
  const convertFromLbs = (weightInLbs, targetUnit) => {
    if (targetUnit === "kg") {
      return weightInLbs / 2.20462; // Convert lbs to kg
    }
    return weightInLbs; // keep in lbs
  };

  // Calculate total weight across all bags
  const calculateTotalWeight = () => {
    let totalWeightInLbs = 0;

    // Add up all items from all bags
    const allItems = [
      ...personalItemItems,
      ...carryOnItems,
      ...checkedBagItems,
      ...checkedBag2Items
    ];

    allItems.forEach(item => {
      totalWeightInLbs += convertToLbs(parseFloat(item.weight) || 0, item.unit);
    });

    // Convert back to user's preferred unit
    return convertFromLbs(totalWeightInLbs, weightUnit);
  };

  // Calculate weight for a specific bag
  const calculateBagWeight = (items) => {
    let bagWeightInLbs = 0;
    items.forEach(item => {
      bagWeightInLbs += convertToLbs(parseFloat(item.weight) || 0, item.unit);
    });
    return convertFromLbs(bagWeightInLbs, weightUnit);
  };

  // Function to get checked bag limit based on cabin class
  const getCheckedBagLimit = () => {
    switch (cabinClass) {
      case "business":
      case "first":
        return 2;
      case "basic-economy":
      case "premium-economy":
      default:
        return 1;
    }
  };

  const totalWeight = calculateTotalWeight();

  // Simple weight distribution data (only for doughnut chart)
  const getChartData = () => {
    const weights = [
      { label: 'Personal Item', weight: calculateBagWeight(personalItemItems) },
      { label: 'Carry-On', weight: calculateBagWeight(carryOnItems) },
      { label: 'Checked Bag', weight: calculateBagWeight(checkedBagItems) },
      ...(getCheckedBagLimit() === 2 ? [{ label: 'Checked Bag 2', weight: calculateBagWeight(checkedBag2Items) }] : [])
    ].filter(item => item.weight > 0);

    return {
      labels: weights.map(item => item.label),
      datasets: [
        {
          data: weights.map(item => item.weight),
          backgroundColor: [
            '#FF69B4', // Bright pink
            '#40E0D0', // Turquoise
            '#98FB98', // Mint green
            '#DDA0DD', // Light purple/plum
            '#87CEEB', // Sky blue
          ],
          borderWidth: 0,
          cutout: '60%',
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed.toFixed(1)} ${weightUnit}`;
          }
        }
      }
    },
  };

  return (
    <div className="summary">
      <h1>Summary</h1>
      
      <div className="summary-sections">
        <div className="bag-section summary-weight-section">
          <h2>Total Weight Across All Bags</h2>
          <div className="weight-summary">
            <div className="total-weight">
              {totalWeight.toFixed(1)} {weightUnit}
            </div>
          </div>
        </div>

        <div className="bag-section summary-breakdown-section">
          <h2>Bag Breakdown</h2>
          <div className="summary-items-list">
            <div className="summary-item">
              <div className="summary-item-info">
                <span className="summary-item-name">Personal Item</span>
                <span className="summary-item-details">
                  {personalItemItems.length} items • {calculateBagWeight(personalItemItems).toFixed(1)} {weightUnit}
                </span>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-item-info">
                <span className="summary-item-name">Carry-on</span>
                <span className="summary-item-details">
                  {carryOnItems.length} items • {calculateBagWeight(carryOnItems).toFixed(1)} {weightUnit}
                </span>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-item-info">
                <span className="summary-item-name">Checked Bag {getCheckedBagLimit() > 1 ? '1' : ''}</span>
                <span className="summary-item-details">
                  {checkedBagItems.length} items • {calculateBagWeight(checkedBagItems).toFixed(1)} {weightUnit}
                </span>
              </div>
            </div>
            {getCheckedBagLimit() === 2 && (
              <div className="summary-item">
                <div className="summary-item-info">
                  <span className="summary-item-name">Checked Bag 2</span>
                  <span className="summary-item-details">
                    {checkedBag2Items.length} items • {calculateBagWeight(checkedBag2Items).toFixed(1)} {weightUnit}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual Insights Toggle - separate from sections for proper positioning */}
      {totalWeight > 0 && (
        <div className="visual-toggle-section">
          <button 
            className="visual-toggle-btn"
            onClick={() => setShowVisuals(!showVisuals)}
          >
            {showVisuals ? '✕ Hide Chart' : '📈 View Chart'}
          </button>
          
          {showVisuals && (
            <div className="simple-chart-container">
              <div className="chart-wrapper-simple">
                <Doughnut data={getChartData()} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}