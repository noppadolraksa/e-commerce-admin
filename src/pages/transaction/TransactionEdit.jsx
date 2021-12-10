import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../../requestMethods";
import { Box } from "@mui/system";
import { Modal, Typography } from "@mui/material";
import { mobile } from "../../responsive";
import { Link, useLocation } from "react-router-dom";

const Text = styled.p``;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f2f2f2",
  opacity: "0.95",
  border: "1px solid #808080",
  boxShadow: 24,
  p: 4,
};

const Container = styled.div`
  flex: 4;
  margin: 10px;
`;

const UserContainer = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
`;

const UserImg = styled.img`
  width: 120px;
  height: 120px;
  margin: 10px;
  padding: 5px;
  border: 1px solid lightgray;
`;

const Topic = styled.p`
  font-size: 12px;
  font-weight: bold;
  display: flex;

  color: gray;
`;

const UserDetail = styled.div``;

const UserText = styled.span`
  font-size: 12px;
  flex: 5;
  color: gray;
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  justify-content: space-between;
`;

const OrderAddressContainer = styled.div``;
const OrderAddress = styled.p`
  font-size: 12px;
  margin: 5px;
`;

const OrderWrapper = styled.div`
  border: 1px solid lightgray;
  box-shadow: 0px 0px 7px 0px rgba(46, 46, 46, 0.11);
  margin-bottom: 20px;
`;

const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
`;

const OrderHeaderText = styled.p`
  margin: 5px;
  font-size: 14px;
  border-radius: 10px;
  background-color: teal;
  padding: 5px;
  color: white;
  ${mobile({ fontSize: "8px" })}
`;

const OrderStatus = styled.span``;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextStatus = styled.p`
  font-size: 12px;
  font-weight: 500;
  border-radius: 10px;
  background-color: ${(props) => props.status === "success" && "teal"}
    ${(props) => props.status === "cancel" && "#9b1b1b3b"}
    ${(props) => props.status === "pending" && "#727259"};

  color: ${(props) => props.status === "success" && "white"}
    ${(props) => props.status === "cancel" && "#9b1b1bf4"}
    ${(props) => props.status === "pending" && "white"};
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  ${mobile({ fontSize: "8px" })}
`;

const OrderProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
`;

const OrderProductLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Desc = styled.div``;

const DescTitle = styled.p`
  font-size: 11px;
  color: #4d4d4d;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  ${mobile({ fontSize: "9px", lineHeight: "10px", height: "10px", margin: 2 })}
`;

const DescOption = styled.p`
  font-size: 11px;
  font-weight: 300;
  color: gray;
  ${mobile({ fontSize: "9px", lineHeight: "10px", height: "10px", margin: 2 })}
`;

const DescQuantity = styled.p`
  font-size: 11px;
  font-weight: 300;
  color: gray;
  ${mobile({ fontSize: "9px", lineHeight: "10px", height: "10px", margin: 2 })}
`;

const OrderProductRight = styled.div``;

const ProductPrice = styled.p`
  font-size: 14px;

  margin: 0px 10px 0px 10px;
  ${mobile({ fontSize: "10px", margin: "0px 5px 0px 3px" })}
`;

const ImgContainer = styled.div`
  margin: 5px 15px 5px 15px;
  padding: 5px 5px 5px 5px;
  border: 1px solid lightgray;
  ${mobile({ margin: 5 })}
`;

const Img = styled.img`
  height: 90px;
  width: 90px;
  border-radius: 5px;

  ${mobile({ height: 40, width: 40 })}
`;

const OrderFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-top: 1px solid lightgray;
  background-color: #d3d3d32f;
`;

const TotalPrice = styled.div`
  font-size: 12px;
  margin: 5px;
  ${mobile({ fontSize: "10px", margin: 0 })}
`;

const OrderTimestamp = styled.p`
  font-size: 12px;
  margin: 5px;
  ${mobile({ fontSize: "10px", margin: 0 })}
`;

const NoItemWrapper = styled.div`
  height: 60vh;
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoItemText = styled.p`
  color: lightgray;
  font-size: 24px;
`;

const TransactionEdit = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const _id = location.pathname.split("/")[2];

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleStatus = async (e) => {
    try {
      const res = await userRequest.put(`/order/${_id}`, { status: e });
      setOrders([res.data]);
      setOpen(false);
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

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/order/findorder/${_id}`);

        setOrders([res.data]);
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
  }, [_id]);

  const handleClick = () => handleOpen();
  return (
    <Container>
      <UserContainer>
        <UserImg src={orders?.[0]?.user?.img} alt="userImage" />
        <UserDetail>
          <UserHeader>
            <Topic>ID: </Topic>
            <UserText>{orders?.[0]?.user?._id}</UserText>
          </UserHeader>
          <UserHeader>
            <Topic>Username: </Topic>
            <UserText>{orders?.[0]?.user?.username}</UserText>
          </UserHeader>
          <UserHeader>
            <Topic>FirstName: </Topic>
            <UserText>{orders?.[0]?.user?.firstname}</UserText>
          </UserHeader>
          <UserHeader>
            <Topic>LastName: </Topic>
            <UserText>{orders?.[0]?.user?.lastname}</UserText>
          </UserHeader>
          <UserHeader>
            <Topic>Email: </Topic>
            <UserText>{orders?.[0]?.user?.email}</UserText>
          </UserHeader>
          <UserHeader>
            <Topic>Phone: </Topic>
            <UserText>{orders?.[0]?.user?.phone}</UserText>
          </UserHeader>
          <UserHeader>
            <Topic>Address: </Topic>
            <UserText>{orders?.[0]?.user?.address}</UserText>
          </UserHeader>
        </UserDetail>
      </UserContainer>

      {orders?.map((order, index) => (
        <OrderWrapper key={order._id}>
          <OrderHeader>
            <OrderHeaderText>
              <b>#{index + 1}</b> Order id: {order._id}
            </OrderHeaderText>
            <OrderStatus>
              <TextStatus status={order.status} onClick={() => handleClick()}>
                {order.status}
              </TextStatus>
            </OrderStatus>
          </OrderHeader>
          {order.products?.map((product) => (
            <OrderProduct key={product._id}>
              <OrderProductLeft>
                <ImgContainer>
                  <Link to={`/product/${product._id}`}>
                    <Img alt="product" src={product.product[0].img} />
                  </Link>
                </ImgContainer>
                <Desc>
                  <DescTitle>{product.product[0].title}</DescTitle>
                  <DescOption>
                    ตัวเลือก : {product.item.filterProductsOne},{" "}
                    {product.item.filterProductsTwo &&
                      product.item.filterProductsTwo}
                  </DescOption>
                  <DescQuantity>ชิ้นละ {product.item.price} ฿</DescQuantity>
                  <DescQuantity>จำนวน x {product.quantity}</DescQuantity>
                </Desc>
              </OrderProductLeft>
              <OrderProductRight>
                <ProductPrice>
                  {product.item.price * product.quantity} ฿
                </ProductPrice>
              </OrderProductRight>
            </OrderProduct>
          ))}
          <OrderAddressContainer>
            <OrderAddress>{`ที่อยู่จัดส่ง: ${order.address.city}, ${order.address.line1}, ${order.address.line2}, ${order.address.postal_code}, ${order.address.country}`}</OrderAddress>
          </OrderAddressContainer>
          <OrderFooter>
            <OrderTimestamp>{order.createdAt.substring(0, 19)}</OrderTimestamp>
            <TotalPrice>
              Total:<b> {order.amount} ฿</b>
            </TotalPrice>
          </OrderFooter>
        </OrderWrapper>
      ))}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Text>Select Status..</Text>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <StatusContainer>
                <TextStatus
                  status="success"
                  onClick={() => handleStatus("success")}
                >
                  success
                </TextStatus>
                <TextStatus
                  status="cancel"
                  onClick={() => handleStatus("cancel")}
                >
                  cancel
                </TextStatus>
                <TextStatus
                  status="pending"
                  onClick={() => handleStatus("pending")}
                >
                  pending
                </TextStatus>
              </StatusContainer>
            </Typography>
          </Box>
        </Modal>
      </div>
    </Container>
  );
};

export default TransactionEdit;
