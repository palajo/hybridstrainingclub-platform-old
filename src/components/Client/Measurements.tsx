import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Measurements: React.FC = () => {
  const [measurements, setMeasurements] = useState([
    {
      date: '2024-01-01',
      values: {
        weight: { value: 75, unit: 'kg' },
        body_fat_percentage: { value: 15, unit: '%' },
        muscle_mass: { value: 65, unit: 'kg' },
        chest: { value: 100, unit: 'cm' },
        waist: { value: 85, unit: 'cm' },
        hip: { value: 100, unit: 'cm' },
        bicep: { value: 35, unit: 'cm' },
        thigh: { value: 60, unit: 'cm' },
      },
    },
    {
      date: '2024-02-01',
      values: {
        weight: { value: 78, unit: 'kg' },
        body_fat_percentage: { value: 12, unit: '%' },
        muscle_mass: { value: 68, unit: 'kg' },
        chest: { value: 103, unit: 'cm' },
        waist: { value: 87, unit: 'cm' },
        hip: { value: 103, unit: 'cm' },
        bicep: { value: 37, unit: 'cm' },
        thigh: { value: 62, unit: 'cm' },
      },
    },
    {
      date: '2024-03-01',
      values: {
        weight: { value: 82, unit: 'kg' },
        body_fat_percentage: { value: 10, unit: '%' },
        muscle_mass: { value: 70, unit: 'kg' },
        chest: { value: 106, unit: 'cm' },
        waist: { value: 89, unit: 'cm' },
        hip: { value: 105, unit: 'cm' },
        bicep: { value: 38, unit: 'cm' },
        thigh: { value: 65, unit: 'cm' },
      },
    },
    {
      date: '2024-04-01',
      values: {
        weight: { value: 84, unit: 'kg' },
        body_fat_percentage: { value: 8, unit: '%' },
        muscle_mass: { value: 72, unit: 'kg' },
        chest: { value: 110, unit: 'cm' },
        waist: { value: 90, unit: 'cm' },
        hip: { value: 108, unit: 'cm' },
        bicep: { value: 42, unit: 'cm' },
        thigh: { value: 67, unit: 'cm' },
      },
    },
  ]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Extracting labels and datasets from measurements
    const labels = measurements.map(entry => dayjs(entry.date).format('MMMM'));
    const datasets = Object.keys(measurements[0].values).map(key => {
      return {
        label: key,
        data: measurements.map(entry => entry.values[key].value),
        fill: false,
        borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // Random color
      };
    });

    setChartData({ labels, datasets });
  }, [measurements]);

  return (
    <Row>
      <Col lg={24}>
        <Line data={chartData}/>
      </Col>
    </Row>
  );
};

export default Measurements;