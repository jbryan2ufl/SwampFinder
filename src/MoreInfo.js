import './styles/MoreInfo.css';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Collapse from 'react-collapse';
import {useParams} from 'react-router-dom';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = [
    { id: '1', start:  '7:25 a.m.', end:  '8:15 a.m.' },
    { id: '2', start:  '8:30 a.m.', end:  '9:20 a.m.' },
    { id: '3', start:  '9:35 a.m.', end: '10:25 a.m.' },
    { id: '4', start: '10:40 a.m.', end: '11:30 a.m.' },
    { id: '5', start: '11:45 a.m.', end: '12:35 p.m.' },
    { id: '6', start: '12:50 p.m.', end:  '1:40 p.m.' },
    { id: '7', start:  '1:55 p.m.', end:  '2:45 p.m.' },
    { id: '8', start:  '3:00 p.m.', end:  '3:50 p.m.' },
    { id: '9', start:  '4:05 p.m.', end:  '4:55 p.m.' },
    { id: '10', start: '5:10 p.m.', end:  '6:00 p.m.' },
    { id: '11', start: '6:15 p.m.', end:  '7:05 p.m.' },
    { id: 'E1', start: '7:20 p.m.', end:  '8:10 p.m.' },
    { id: 'E2', start: '8:20 p.m.', end:  '9:10 p.m.' },
    { id: 'E3', start: '9:20 p.m.', end: '10:10 p.m.'}
]

function timeToMinutes(timeStr) {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    
    // Adjust for PM hours
    if (period === 'p.m.' && hours !== 12) {
      totalMinutes += 12 * 60;
    }
  
    return totalMinutes;
  }

  function dateToMinutes(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours * 60 + minutes;
  }

function getCurrentPeriod(){
    const currentTime = new Date();
    const currentTimeMinutes = dateToMinutes(currentTime);

    periods.forEach(period => {
        const periodStart = timeToMinutes(period.start);
        const periodEnd = timeToMinutes(period.end);
        if (currentTimeMinutes > periodStart-15 && currentTimeMinutes < periodEnd)
        {
            console.log("you are in period "+period.id);
        }
    });
}

const MoreInfo = () => {
    useEffect(() => {

        const fetchData = async () => {
            try {
                // Make a GET request to the server
                const response = await axios.post('http://localhost:5000/api/getBuildingInfo', {
                    params: {
                        buildingId: buildingName
                    }
                });
                // Assuming the response data contains building information
            } catch (error) {
                // Handle errors
                console.log(error);
            }
        };

        getCurrentPeriod();
        fetchData();


    }, []);

    const {buildingName}=useParams();
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
        <h1>{buildingName}</h1>
    <div className="classrooms">
      <div className="collapse" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Collapse' : 'Expand'}
      </div>
      <Collapse isOpened={isOpen}>
        <div>
        {/* <table className="availability-table">
            <thead>
            <tr>
                <th></th>
                {weekdays.map((day, index) => (
                <th key={index}>{day}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {periods.map((period, rowIndex) => (
                <tr key={rowIndex}>
                <td>Period {period.id}</td>
                {availability[rowIndex].map((cellData, columnIndex) => (
                    <td key={columnIndex} style={{ backgroundColor: cellData ? 'green' : 'red' }}></td>
                ))}
                </tr>
            ))}
            </tbody>
        </table> */}
    </div>
      </Collapse>
    </div>
    </div>
  );
}

export default MoreInfo;
