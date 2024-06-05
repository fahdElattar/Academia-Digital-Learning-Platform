import React, { useState } from 'react';
import StarterPage from '../Components/StarterPage';
import '../Css/CourseDetails.css';
import { Bar, Pie, Doughnut, Line, Radar, Scatter, Bubble, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
} from 'chart.js';

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
);

const CourseCharts = ({ pageName = 'Course Charts' }) => {
  const [activeSection, setActiveSection] = useState('course-visualisation');

  const generateFakeData = () => {
    const emotions = ['anger', 'fear', 'disgust', 'neutral', 'happy', 'sad', 'surprise'];
    const reviews = [];

    for (let i = 0; i < 100; i++) {
      const emotion = emotions[Math.floor(Math.random() * emotions.length)];
      reviews.push({ studentId: i + 1, emotion });
    }

    return reviews;
  };

  const reviews = generateFakeData();

  const aggregateData = (reviews) => {
    const emotionCounts = {
      anger: 0,
      fear: 0,
      disgust: 0,
      neutral: 0,
      happy: 0,
      sad: 0,
      surprise: 0,
    };

    reviews.forEach(review => {
      emotionCounts[review.emotion]++;
    });

    return emotionCounts;
  };

  const emotionCounts = aggregateData(reviews);

  const data = {
    labels: ['Anger', 'Fear', 'Disgust', 'Neutral', 'Happy', 'Sad', 'Surprise'],
    datasets: [
      {
        label: 'Number of Reviews',
        data: Object.values(emotionCounts),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40', '#c9cbcf'],
      },
    ],
  };

  const radarData = {
    labels: ['Anger', 'Fear', 'Disgust', 'Neutral', 'Happy', 'Sad', 'Surprise'],
    datasets: [
      {
        label: 'Emotion Distribution',
        data: Object.values(emotionCounts),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: 'Emotion Distribution',
        data: Object.values(emotionCounts).map((count, index) => ({ x: index, y: count })),
        backgroundColor: '#36a2eb',
      },
    ],
  };

  const bubbleData = {
    datasets: [
      {
        label: 'Emotion Distribution',
        data: Object.values(emotionCounts).map((count, index) => ({
          x: index,
          y: count,
          r: count * 2,
        })),
        backgroundColor: '#ff6384',
      },
    ],
  };

  const polarAreaData = {
    labels: ['Anger', 'Fear', 'Disgust', 'Neutral', 'Happy', 'Sad', 'Surprise'],
    datasets: [
      {
        label: 'Emotion Distribution',
        data: Object.values(emotionCounts),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40', '#c9cbcf'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Emotion Distribution in Course Reviews',
      },
    },
  };

  return (
    
    <div className="row">
      <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <Scatter data={scatterData} options={options} />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <Bubble data={bubbleData} options={options} />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <Radar data={radarData} options={options} />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <PolarArea data={polarAreaData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCharts;
