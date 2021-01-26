import React from 'react'
import { Table, Alert, Button } from 'reactstrap'
import { format } from 'date-fns'

export const TablesData = ({ optionsData, handleRemoveData, handleEditData }) => {

    const sumAllData = () => {
        return optionsData.reduce((acc, item) => acc + item.sum, 0)
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Sum</th>
                    <th style={{ textAlign: "center" }} >Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    optionsData.length ?
                        optionsData.map((bet, i) => (
                            <tr key={bet._id}>
                                <th scope="row">{++i}</th>
                                <td>
                                    {format(new Date(bet.date), "dd MMMM yyyy")}
                                </td>
                                <td>
                                    {bet.time}
                                </td>
                                <td
                                    style={{ color: bet.plus === 'Neg' ? '#dc3545' : bet.plus === 'Pos' ? 'green' : 'black', fontWeight: 'bold' }}
                                >
                                    {bet.sum}
                                </td>
                                <td style={{ display: "flex", justifyContent: 'center' }} className="actions">
                                    <Button onClick={() => handleEditData(bet._id)} color="warning" style={{ marginRight: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <i className="material-icons">edit</i>
                                    </Button>
                                    <Button onClick={() => handleRemoveData(bet._id)} color="danger" style={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <i className="material-icons">delete</i>
                                    </Button>
                                </td>
                            </tr>
                        )) :
                        <tr>
                            <Alert style={{ width: "100%" }} color="primary">
                                This is a primary alert — check it out!
                            </Alert>
                        </tr>
                }
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        {
                            optionsData.length
                        }
                    </td>
                    <td></td>
                    <td></td>
                    <td
                        style={{ color: sumAllData().toFixed(2) > 0 ? 'green' : '#dc3545', fontWeight: 'bold' }}
                    >
                        {
                            sumAllData().toFixed(2)
                        }
                    </td>
                    <td></td>
                </tr>
            </tfoot>
        </Table>
    )
}

export default TablesData