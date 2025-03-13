import { useDispatch } from "react-redux";
import orders from "../../store/orders";
import { useEffect } from "react";
import { orderAction } from "../../store/ordersSlice";

const FetchOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(orderAction.addOrder(orders));

    return () => controller.abort;
  }, []);
  return <div></div>;
};

export default FetchOrders;
