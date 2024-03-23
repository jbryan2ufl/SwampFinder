import './styles/MoreInfo.css';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Collapse from 'react-collapse';
import {useParams} from 'react-router-dom';

const MoreInfo = () => {
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
          {/* Content to collapse/expand */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </Collapse>
    </div>
    </div>
  );
}

export default MoreInfo;
