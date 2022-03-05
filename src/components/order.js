import {useState, useEffect } from "react";

import orderApi from "../api/order";
const Orders = () => {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
        getOrders();
    }
    , []);

    const getOrders = async () => {
        await orderApi.getAll().then((res) => {
            setOrders(res.data);
        });
    }

    return (
        <div className="uk-container uk-container-small">
            <div className="uk-card uk-card-default uk-card-body">
                <h3 className="uk-card-title">Orders</h3>
                <table className="uk-table uk-table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td></td>
                                    <td>{order.total}</td>
                                    <td>{order.status}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.updatedAt}</td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Orders;