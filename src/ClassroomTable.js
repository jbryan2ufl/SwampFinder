import React, { useState } from 'react';
import { Collapse } from 'react-collapse';


const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

const ClassroomList = ({classroom}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="classrooms">
      <div className="collapse" onClick={() => setIsOpen(!isOpen)}>
        {classroom.name+' '+classroom.room_number}
      </div>
      <Collapse isOpened={isOpen}>
        <div>
          <table className="availability-table">
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
                  <td>Period {period.id}: {period.start}-{period.end}</td>
                  {classroom.availability_matrix && classroom.availability_matrix[rowIndex].map((cellData, columnIndex) => (
                    <td key={columnIndex} style={{ backgroundColor: cellData==="false" ? 'green' : 'red' }}>
                    </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Collapse>
    </div>
    )};

export default ClassroomList;