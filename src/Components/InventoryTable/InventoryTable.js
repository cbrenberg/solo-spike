import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import Axios from 'axios';

class InventoryTable extends Component {
  state = {
    data: [],
  };

  getInventory = () => {
    Axios.get('/inventory')
      .then(response => {
        this.props.dispatch({ type: 'GET_INVENTORY', payload: response.data })
        this.setState({data: response.data})
      })
      .catch(error => console.log('Error getting orders:', error))
  }

  getDetails = (id) => {
    alert(`You have requested details for id: ${id}`);
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.inventory];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
          this.props.dispatch({
            type: 'EDIT INVENTORY',
            payload: data,
          })
          Axios({
            method: 'PUT',
            url: '/inventory',
            data: {
              id: cellInfo.row.id,
              value: e.target.innerHTML,
              column: cellInfo.column.id,
            }
          })
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  componentDidMount() {
    this.getInventory();
  }

  render() {
    const {data} = this.state;
    return (
      <div className="orderTable">
        <h1>Manage Inventory</h1>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Origin",
              accessor: "name",
              Cell: this.renderEditable,
            },
            {
              Header: "Description",
              accessor: "origin_description",
              Cell: this.renderEditable,
            },
            {
              Header: "Quantity",
              accessor: "quantity",
              Cell: row => (
                <span>{row.value} oz.</span>
              )
            },
            {
              Header: "Suggested Roasts",
              accessor: "roasts",
              Cell: row => (
                <span>{row.value.join(', ')}</span>
              )
            },
            {
              Header: "Flavor Description",
              accessor: "flavor_description",
              Cell: this.renderEditable,
            },
            {
              Header: "Other Notes",
              accessor: "roasting_notes",
              Cell: this.renderEditable,
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

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

const mapStateToProps = ({ inventory }) => ({ inventory })

export default connect(mapStateToProps)(InventoryTable);