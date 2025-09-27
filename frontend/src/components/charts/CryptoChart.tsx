"use client";

import { useEffect, useState, useRef } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CryptoData } from '@/services/cryptoService';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CryptoChartProps {
  cryptoData: CryptoData;
  timeframe?: '1D' | '1W' | '1M';
  height?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  className?: string;
}

const CryptoChart = ({ 
  cryptoData, 
  timeframe = '1D',
  height = 240,
  showXAxis = true, 
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  className = '' 
}: CryptoChartProps) => {
  const chartRef = useRef<ChartJS<'line'>>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        borderColor: '',
        backgroundColor: '',
        tension: 0.4,
        fill: true,
      }
    ]
  });
  
  useEffect(() => {
    if (!cryptoData || !cryptoData.chartData || cryptoData.chartData.length === 0) return;
    
    // Format data for the chart
    const labels: string[] = cryptoData.chartData.map(point => {
      const date = new Date(point.timestamp);
      return timeframe === '1D' ? date.getHours() + ':00' : 
             timeframe === '1W' ? date.toLocaleDateString(undefined, { weekday: 'short' }) : 
             date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    });
    
    const prices: number[] = cryptoData.chartData.map(point => point.price);
    
    // Choose colors based on price trend
    const isPositive = cryptoData.priceChangePercentage24h >= 0;
    
    // Special colors for BlockDAG
    const mainColor = cryptoData.id === "blockdag" 
      ? '#184FC7' 
      : isPositive 
        ? '#10B981' 
        : '#EF4444';
    
    // Create a simple gradient effect with rgba
    const gradientColor = cryptoData.id === "blockdag"
      ? 'rgba(24, 79, 199, 0.2)'
      : isPositive 
        ? 'rgba(16, 185, 129, 0.2)' 
        : 'rgba(239, 68, 68, 0.2)';
    
    setChartData({
      labels,
      datasets: [
        {
          label: cryptoData.symbol,
          data: prices,
          borderColor: mainColor,
          backgroundColor: gradientColor,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.4, // Smooth curves
          fill: true,
        }
      ]
    });
    
  }, [cryptoData, timeframe]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend
      },
      tooltip: {
        enabled: showTooltip,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(10, 22, 56, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        titleFont: {
          family: 'Inter, sans-serif',
          size: 12,
          weight: 'bold'
        },
        bodyFont: {
          family: 'Inter, sans-serif',
          size: 12
        },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            return `${cryptoData.name} (${cryptoData.symbol})`;
          },
          label: (context) => {
            return `$${context.raw as number}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: showXAxis,
        grid: {
          display: showGrid,
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 10
          },
          maxRotation: 0,
          maxTicksLimit: 6
        }
      },
      y: {
        display: showYAxis,
        position: 'right',
        grid: {
          display: showGrid,
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 10
          },
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 3,
      }
    }
  };

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default CryptoChart;