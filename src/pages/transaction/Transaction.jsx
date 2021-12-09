import { DataGrid } from "@material-ui/data-grid";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { userRequest } from "../../requestMethods";

const Container = styled.div`
  flex: 4;
`;

const TimeText = styled.p``;

const Transactions = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/order");

        setOrders(res.data);
      } catch (err) {
        if (err.response.data === "Token is not valid!") {
          alert(
            `Error status : ${err.response.status} ${err.response.data} Please sign in again..`
          );
        } else {
          alert(`Error status : ${err.response.status} ${err.response.data}`);
        }
      }
    };
    getOrders();
  }, []);

  const columns = [
    { field: "_id", headerName: "Order ID", width: 150 },
    // {
    //   field: "product",
    //   headerName: "Product",
    //   width: 200,
    //   renderCell: (params) => {
    //     return (
    //       <div className="productListItem">
    //         <img
    //           className="productListImg"
    //           src={params.row.user.img}
    //           alt="product list"
    //         />
    //         {params.row.title}
    //       </div>
    //     );
    //   },
    // },
    { field: "amount", headerName: "Amount", width: 120 },
    {
      field: "createdAt",
      headerName: "Purchase date",
      width: 180,
      renderCell: (params) => {
        return <TimeText> {params.row.createdAt.substring(0, 10)}</TimeText>;
      },
    },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Link to={"/transaction/" + params.row._id}>
            <button className="productListEdit">Edit</button>
          </Link>
        );
      },
    },
  ];

  return (
    <Container>
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
      />
    </Container>
  );
};
export default Transactions;
