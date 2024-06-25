import React, { useState, useEffect } from 'react';
import { Bar, Pie, Doughnut, Line, Radar, Scatter, Bubble, PolarArea } from 'react-chartjs-2';
import axios from 'axios';
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

const CourseCharts = ({ courseId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/reviews/course/${courseId}/statistics`)
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching statistics:', error);
      });
  }, [courseId]);

  if (!stats) return <div>Loading...</div>;

  const {
    totalReviews,
    emotionCounts,
    emotionByGender,
    emotionByDate,
  } = stats;

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

  const genderData = {
    labels: ['Male Anger', 'Male Fear', 'Male Disgust', 'Male Neutral', 'Male Happy', 'Male Sad', 'Male Surprise', 'Female Anger', 'Female Fear', 'Female Disgust', 'Female Neutral', 'Female Happy', 'Female Sad', 'Female Surprise'],
    datasets: [
      {
        label: 'Number of Reviews by Gender',
        data: [
          ...Object.values(emotionByGender.male),
          ...Object.values(emotionByGender.female)
        ],
        backgroundColor: [
          '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40', '#c9cbcf',
          '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40', '#c9cbcf'
        ],
      },
    ],
  };

  const dates = Object.keys(emotionByDate);
  const emotionsByDateData = {
    labels: dates,
    datasets: ['anger', 'fear', 'disgust', 'neutral', 'happy', 'sad', 'surprise'].map((emotion, index) => ({
      label: emotion.charAt(0).toUpperCase() + emotion.slice(1),
      data: dates.map(date => emotionByDate[date][emotion]),
      backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40', '#c9cbcf'][index],
      fill: false,
      borderColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40', '#c9cbcf'][index]
    }))
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
            <Line data={emotionsByDateData} options={options} />
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
            <Bar data={genderData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCharts;
