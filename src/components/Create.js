import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import BackBtn from './BackBtn';

export default function Create({ getData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [work, setWork] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [children, setChildren] = useState('');
  const [comment, setComment] = useState('');

  let history = useHistory();

  const createData = async (e) => {
    e.preventDefault();
    try {
      Axios.post(`http://localhost:3005/create`, {
        name,
        email,
        work,
        phone,
        gender,
        children,
        comment,
      }).then(() => {
        console.log('success');
        getData();
        history.goBack();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create">
      <BackBtn />
      <form onSubmit={createData}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="work"
          placeholder="Work"
          value={work}
          onChange={(e) => setWork(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="non-binary"
                value="Non-Binary"
                checked={gender === 'Non-Binary'}
                onChange={(e) => setGender(e.target.value)}
              />
              Non-Binary
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="female"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="male"
                value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
          </div>
        </div>
        <br />

        <select
          name="children"
          value={children}
          onChange={(e) => setChildren(e.target.value)}
        >
          <option value="" disabled>
            Select number of children
          </option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="more than 5">More</option>
        </select>
        <br />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
