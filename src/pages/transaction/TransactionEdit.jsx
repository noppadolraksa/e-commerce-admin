import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 4;
  margin: 10px;
`;

const Title = styled.h1`
  color: #555;
  font-weight: 500;
  font-size: 30px;
  margin-left: 20px;
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

const TransactionEdit = ({ status }) => {
  const [orders, setOrders] = useState(null);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/order/find/${user._id}`);
        status !== "all"
          ? setOrders(res.data.filter((item) => item.status === status))
          : setOrders(res.data);
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
  }, [status, user._id]);
  console.log(orders);
  return (
    <Container>
      <Title>{status[0].toUpperCase() + status.substring(1)} Order</Title>
      {orders?.map((order, index) => (
        <OrderWrapper key={order._id}>
          <OrderHeader>
            <OrderHeaderText>
              <b>#{index + 1}</b> Order id: {order._id}
            </OrderHeaderText>
            <OrderStatus>
              <TextStatus status={order.status}>{order.status}</TextStatus>
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
          <OrderFooter>
            <OrderTimestamp>{order.createdAt.substring(0, 19)}</OrderTimestamp>
            <TotalPrice>
              Total:<b> {order.amount} ฿</b>
            </TotalPrice>
          </OrderFooter>
        </OrderWrapper>
      ))}
      {orders?.length === 0 && (
        <NoItemWrapper>
          <NoItemText>There is no {status} order..</NoItemText>
        </NoItemWrapper>
      )}
    </Container>
  );
};

export default TransactionEdit;
