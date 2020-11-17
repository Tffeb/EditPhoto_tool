import React, { Fragment, useState } from 'react';
import Header from './header'
import Imgbar from './imgbar'
import Imgedit from './imgedit'
import Operate from './operate'
import 'antd/dist/antd.css';
import '../assets/index.css'

function App() {
  return (
    <Fragment>
      <Header
      />
      <div className="show_body">
        <Imgbar />
        <Imgedit />
        <Operate
        />
      </div>
    </Fragment>
  );
}

export default App;
