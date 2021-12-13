import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/order");

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {console.log(orders)}
          {orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to={`/transaction/${order._id}`}
                >
                  <img
                    component={Link}
                    to={`/transaction/${order._id}`}
                    src={order.user.img}
                    alt="widgetLg"
                    className="widgetLgImg"
                  />
                </Link>
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to={`/transaction/${order._id}`}
                >
                  <span className="widgetLgName ">{order.userId}</span>
                </Link>
              </td>
              <td className="widgetLgDate">
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to={`/transaction/${order._id}`}
                >
                  {format(order.createdAt)}
                </Link>
              </td>
              <td className="widgetLgAmount">
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to={`/transaction/${order._id}`}
                >{`฿${order.amount}`}</Link>
              </td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
