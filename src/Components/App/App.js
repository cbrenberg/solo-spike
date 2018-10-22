import React, { Component } from 'react';
import './App.css';
import OrderTable from '../OrderTable/OrderTable';
import InventoryTable from '../InventoryTable/InventoryTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <OrderTable />
        <InventoryTable />
      </div>
    );
  }
}

export default App;
