import React from 'react';
import { Link } from 'react-router-dom';

export default function Read({ data }) {
  return (
    <div>
      <div className="add-member">
        <Link to="/add">Add a member</Link>
      </div>

      {data.length === 0 ? (
        <p>No data</p>
      ) : (
        <ul>
          {data.map((d) => (
            <li key={d.id}>
              <Link to={`/member/${d.id}`}>{d.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
