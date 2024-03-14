import React from 'react'
import DataTable from 'react-data-table-component'

const DataTables = ({ columns, data }) => {
    const customStyles = {
        rows: {
            style: {
                minHeight: '50px', // override the row height
            },
        },

        cells: {
            style: {
                border:'1px solid lightgrey',
                borderRight:'1px solid lightgrey',
            },
        },
    };
    return (
        <DataTable 
            columns={columns}
            data={data}
            customStyles={customStyles}>
        </DataTable>
    )
}

export default DataTables