import React from 'react';
import { useHistory } from 'react-router-dom';

export default function BackBtn() {
  let history = useHistory();
  return (
    <div className="back-btn" onClick={history.goBack}>
      Back
    </div>
  );
}
