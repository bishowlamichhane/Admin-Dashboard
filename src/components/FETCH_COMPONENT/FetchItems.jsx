import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsAction } from "../../store/itemsSlice";
import items from "../../store/items";
const FetchItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(itemsAction.addItems(items));
  }, []);

  return <div></div>;
};

export default FetchItems;
