import React from 'react';

function BanList({ banList, removeFromBanList }) {
  const handleRemoveFromBanList = (item) => {
    removeFromBanList(item);
  };

  return (
    <div className="ban-list">
      <h3 className = "ban-list-title">Ban List</h3>
      <ul>
        {banList.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleRemoveFromBanList(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BanList;

