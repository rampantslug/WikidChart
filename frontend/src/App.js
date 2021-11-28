import Header from './components/Header';
import Footer from './components/Footer';
import PageSelector from './components/PageSelector';
import AxesSelector from './components/AxesSelector';
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

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [showAxesSelector, setShowAxesSelector] = useState(true);
  const [showChart, setShowChart] = useState(false);


  /*  const onClick = (e) => {
    const activePoints = myChart.getElementsAtEventForMode(e, 'nearest', {
      intersect: true
    }, false)
    const [{
      index
    }] = activePoints;
    console.log(sampleData[[index]);
  };  */

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
    const data = await res.json();
    const parsedJson = JSON.parse(data);
    console.log('Parsed Json', parsedJson);


    setTableData(parsedJson);

    

    // Get table headers and assign to axes selector

    // Show axes selection
    setShowAxesSelector(true);

    const json_getAllKeys = data => (
      data.reduce((keys, obj) => (
        keys.concat(Object.keys(obj).filter(key => (
          keys.indexOf(key) === -1))
        )
      ), [])
    )

    //setChartData(parsedJson);
    console.log(json_getAllKeys(tableData));
  }

  const axesSelected = (selectedAxes) => {
    
    // Get table headers and assign to axes selector

    console.log(tableData);

    // Get selected x & y axes
    //const parsedJson = JSON.parse(tableData);
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
  }


  return (
    <Router>
      <div className='App'>
        <Header title='Wikid Chart' />
        <Routes>
          <Route path='/' exact element={(
            <>
              <PageSelector onGetTable={getTable} />
              {showAxesSelector && <AxesSelector tableHeaders={['the', 'cat', 'sat', 'on']} onAxesSelected={axesSelected}/>}
              {showChart && <Bar options={options} data={data} /* onClick={onClick} */ />}
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
