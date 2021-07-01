import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Axios from 'axios';

import BackBtn from './BackBtn';

export default function Update({ getData }) {
  const [member, setMember] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [work, setWork] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [children, setChildren] = useState('');
  const [comment, setComment] = useState('');

  let { id } = useParams();
  let history = useHistory();

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(
        `http://localhost:3005/update/${id}`,
        {
          name,
          email,
          work,
          phone,
          gender,
          children,
          comment,
        },
        { headers: { 'Content-Type': 'application/json' } }
      ).then(() => {
        getData();
        history.goBack();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (e) => {
    e.preventDefault();
    try {
      await Axios.delete(`http://localhost:3005/delete/${id}`).then(() => {
        getData();
        history.goBack();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMember = async () => {
      const res = await Axios.get(`http://localhost:3005/member/${id}`);
      setMember(Object.assign({}, ...res.data));
    };

    getMember();
  }, [id]);

  useEffect(() => {
    setName(member.name);
    setEmail(member.email);
    setWork(member.work);
    setPhone(member.phone);
    setGender(member.gender);
    setChildren(member.children);
    setComment(member.comment);
  }, [member]);

  return (
    <div className="update">
      <BackBtn />
      <form onSubmit={updateData}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="work"
          placeholder="Work"
          value={work || ''}
          onChange={(e) => setWork(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone || ''}
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
          value={children || ''}
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
          value={comment || ''}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <button type="submit">Edit</button>
        <button className="delete" onClick={deleteData}>
          Delete
        </button>
      </form>
    </div>
  );
}
