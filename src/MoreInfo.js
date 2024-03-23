import './styles/MoreInfo.css';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Collapse from 'react-collapse';

function MoreInfo() {
    const [isOpen, setIsOpen] = useState(false);
  return (
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
  );
}

export default MoreInfo;
