import React from 'react';

const HomePage = ({ handleClick }) => (
<div>
  <h1>Welcome to Sight Words Helper</h1>
  <table id='menu'>
    <thead>
      <tr>
        <th id='lists' onClick = {(e) => {handleClick(e.target)}}>| Sight Word Lists |</th>
        <th id='create' onClick = {(e) => {handleClick(e.target)}}>| Create Custom List |</th>
      </tr>
    </thead>
  </table>
</div>
);


export default HomePage;