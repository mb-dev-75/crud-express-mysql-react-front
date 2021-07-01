import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';

import Loader from './components/Loader';
const Create = React.lazy(() => import('./components/Create'));
const Read = React.lazy(() => import('./components/Read'));
const Update = React.lazy(() => import('./components/Update'));

export default function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await Axios.get(`http://localhost:3005/members`);
      await setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Router>
      <React.Suspense fallback={<Loader />}>
        <Switch>
          <Route
            path="/home"
            render={(props) => <Read {...props} data={data} />}
          />
          <Route
            path="/add"
            render={(props) => <Create {...props} getData={getData} />}
          />
          <Route
            path="/member/:id"
            render={(props) => (
              <Update {...props} data={data} getData={getData} />
            )}
          />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </React.Suspense>
    </Router>
  );
}
