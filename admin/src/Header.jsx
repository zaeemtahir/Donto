import React from 'react';
import { BsJustify } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTooth, faUser } from '@fortawesome/free-solid-svg-icons';

function Header({ OpenSidebar }) {
  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <span>
          <FontAwesomeIcon icon={faTooth} size="2x" /> DONTO
        </span>
      </div>
      <div className='header-le'>
        {/* Replace the notification and envelope icons with the user image */}
        <FontAwesomeIcon icon={faUser} className='icon' title='Dr. John Doe' />
      </div>
    </header>
  );
}

export default Header;
