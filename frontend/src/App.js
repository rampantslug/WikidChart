import Header from './components/Header';
import Footer from './components/Footer';
import PageSelector from './components/PageSelector';
import AxesSelector from './components/AxesSelector';
import DetailedInfo from './components/DetailedInfo';
import About from './components/About';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart title goes here',
    },
  },
};


var data;
var tableData;

const App = () => {
  //const [tableData, setTableData] = useState([]);
  const [showAxesSelector, setShowAxesSelector] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showDetailedInfo, setShowDetailedInfo] = useState(false);


  // Get Table
  const getTable = async (wikiUrl) => {
    const res = await fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(wikiUrl),
    })

    // Get table from response
    const resData = await res.json();
    tableData = JSON.parse(resData);
    console.log('Parsed Json', tableData);

    // Get table headers and assign to axes selector
    /* const json_getAllKeys = resData => (
      resData.reduce((keys, obj) => (
        keys.concat(Object.keys(obj).filter(key => (
          keys.indexOf(key) === -1))
        )
      ), [])
    ); */
    
    // Show axes selection
    setShowAxesSelector(true);

    // Ideally updateChartAxes would be triggered by selecting the axes in AxesSelector
    // but it didnt quite work out that way..
    updateChartAxes();
  }

  // Update chart axes
  const updateChartAxes = (selectedAxes) => {
    
    console.log('TableData in updateChartAxes',tableData);

    // Take the selectedAxes and then use those to update the chart data
    // Currently we are just using mark and date from the sample data
    const marks = tableData.RecordProgression.map((item) => item.mark);
    const labels = tableData.RecordProgression.map((item) => item.date);

    data = {
      labels,
      datasets: [
        {
          label: 'Data',
          data: marks,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ],
    };

    setShowChart(true);
    setShowDetailedInfo(true);
  }

  // This shouold be updated based on click on the appropriate column of the chart
  const selectedRow = { "mark":"1.46" , "athlete":"Nancy Voorhees" , "date":"20 May 1922", "venue":"Simsbury"};

  // Update current detailed info based on chart click
    /*  const onClick = (e) => {
    const activePoints = myChart.getElementsAtEventForMode(e, 'nearest', {
      intersect: true
    }, false)
    const [{
      index
    }] = activePoints;
    console.log(sampleData[[index]);
  };  */

  return (
    <Router>
      <div className='.container'>
        <Header title='Wikid Chart' />
        <Routes>
          <Route path='/' exact element={(
            <>
              <PageSelector onGetTable={getTable} />
              {showAxesSelector && <AxesSelector tableHeaders={['the', 'cat', 'sat', 'on']} onAxesSelected={updateChartAxes}/>}
              {showChart && <Bar options={options} data={data} /* onClick={onClick} */ />}
              {showDetailedInfo && <DetailedInfo rowData={selectedRow}/>}
            </>
          )} />
          <Route path='/about' element={About()} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
