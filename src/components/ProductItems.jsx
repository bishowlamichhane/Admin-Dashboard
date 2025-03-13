import { useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { itemsAction } from "../store/itemsSlice";

const ProductItems = ({ item, isEdit, setisEdit, editProduct }) => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const removeItem = (itemId) => {
    dispatch(itemsAction.removeItems(itemId));
  };

  return (
    <tr className="text-center">
      {isEdit ? (
        <td className="border border-slate-600">
          <input type="checkbox" />
        </td>
      ) : (
        <td className="border border-slate-600 text-sm p-3">{item.id}</td>
      )}

      <td className="border border-slate-600">
        <img
          className="w-20 h-20 object-contain"
          src={item.image}
          alt={item.name}
        />
      </td>

      <td className="border border-slate-600">{item.name}</td>
      <td className="border border-slate-600">{item.category}</td>
      <td className="border border-slate-600">{item.stock}</td>
      <td className="border border-slate-600">${item.price}</td>

      <td className="border border-slate-600 ">
        <div className="flex items-center space-x-2">
          {isEdit ? (
            <div className="flex items-cente justify-around">
              <button onClick={editProduct} className="w-8 flex justify-center">
                <FaCheck color="green" />
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className=" w-8 text-center flex justify-center"
              >
                <MdDeleteForever color="red" />
              </button>
            </div>
          ) : (
            <button
              className="flex items-center bg-yellow-500 text-white px-1 text-sm cursor-pointer"
              onClick={editProduct}
            >
              <FaEdit />
              Edit
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ProductItems;
