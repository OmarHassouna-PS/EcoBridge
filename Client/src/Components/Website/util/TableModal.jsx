import React, { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Modal } from 'react-bootstrap';
import { useTable } from 'react-table';


const App = ({ materialTypeList }) => {
    const [items, setItems] = useState(materialTypeList);
    const [isOpen, setIsOpen] = useState(false);

    const columns = useMemo(
        () => [
            {
                Header: 'Material Type',
                accessor: 'materialType',
            },
            {
                Header: 'price',
                accessor: 'price',
            },
            {
                Header: 'Weight Unit',
                accessor: 'weightUnit',
            }
        ],
        []
    );

    const tableInstance = useTable({ columns, data: items });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}
            >
                <div className="md-button Table-modal">
                    <button onClick={() => setIsOpen(true)} className="button p-0 modal-button"  >
                        Show Prices
                    </button>
                </div>
            </div>
            <Modal show={isOpen} size='xl' onHide={() => setIsOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
                        React Scrollable Table Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id='scrollableDiv' style={{ height: '80vh', overflow: 'auto' }}>
                        <InfiniteScroll
                            dataLength={items.length}
                            hasMore={true}
                            scrollableTarget='scrollableDiv'
                        >
                            <table {...getTableProps()} className='table table-striped'>
                                <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps()}>
                                                    {column.render('Header')}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row, i) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td {...cell.getCellProps()}>
                                                            {cell.render('Cell')}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </InfiniteScroll>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default App;