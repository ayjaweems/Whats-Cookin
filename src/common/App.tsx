import React from 'react';
import '../layout/App.css';
import {Header} from './Header';


export const App: React.FunctionComponent<{}> = () =>  {
  return (
    <div className="App">
      <Header />
    </div>
  );
}