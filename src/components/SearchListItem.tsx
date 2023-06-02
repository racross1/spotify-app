import React from 'react';
import '../App.css';

interface SearchListItemProps {
    name: string;
    type: string;
    imageUrl: string;
  }

  const SearchListItem: React.FC<SearchListItemProps> = ({ name, type, imageUrl }) => {
    return (
    <tr className='list-item'>
        <td><img src={imageUrl} alt={name} width="50" height="50"/></td>
        <td data-title={name}>{name}</td>
        <td>{type}</td>
      </tr>
    );
  }
  
  export default SearchListItem;
