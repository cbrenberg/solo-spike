import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import Axios from 'axios';

class OrderTable extends Component {

  getOrders = () => {
    Axios.get('/orders')
      .then(response => {
        this.props.dispatch({ type: 'GET_ORDERS', payload: response.data })
      })
      .catch(error => console.log('Error getting orders:', error))
  }

  getDetails = (id) => {
    alert(`You have requested details for id: ${id}`);
  }

  componentDidMount() {
    this.getOrders();
  }

  render() {
    return (
      <div className="orderTable">
        <h1>Manage Orders</h1>
        <ReactTable
          data={this.props.orders}
          columns={[
            {
              Header: "First Name",
              accessor: "first_name",
            },
            {
              Header: "Last Name",
              accessor: "last_name",
            },
            {
              Header: "Quantity",
              accessor: "quantity",
              Cell: row => (
                <span>{row.value} oz.</span>
              )
            },
            {
              Header: "Bean Type",
              accessor: "name",
            },
            {
              Header: "Roast Level",
              accessor: "roast",
            },
            {
              Header: "Status",
              accessor: "status",
              Cell: row => (
                <span style={{textTransform: 'capitalize'}}>
                  <span style={{
                    color: row.value === 'Unprocessed' ? '#ff2e00'
                      : row.value === 'In progress' ? '#ffbf00'
                        : '#57d500'
                  }}> 
                    &#x25cf;
                  </span>  
                   {' ' + row.value}
                </span>
              )
            },
            {
              Header: "Details",
              accessor: "id",
              Cell: row => (
                <button onClick={() => this.getDetails(row.value)}>More Details</button>
              )

            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        >

        </ReactTable>

        <pre>{JSON.stringify(this.props.orders, null, 2)}</pre>
      </div>
    );
  }
}

const mapStateToProps = ({ orders }) => ({ orders })

export default connect(mapStateToProps)(OrderTable);