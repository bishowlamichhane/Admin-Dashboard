import { MdOutlineIncompleteCircle } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { FcShipped } from "react-icons/fc";

const OrderItems = ({ item }) => {
  let mark = "";

  switch (item.orderStatus) {
    case "Pending":
      mark = <MdOutlineIncompleteCircle color="orange" />;
      break;
    case "Delivered":
      mark = <IoCheckmarkDoneCircleSharp color="blue" />;
      break;

    case "Canceled":
      mark = <FcCancel color="red" />;
      break;
    case "Shipped":
      mark = <FcShipped color="" />;
      break;
    default:
      console.log("Mark unidentified");
  }
  return (
    <tr className="text-center cursor-pointer">
      <td className="border border-slate-600 p-2">
        <input type="checkbox" />
      </td>
      <td className="border border-slate-600 p-2">{item.orderId}</td>

      <td className="border border-slate-600">{item.customerName}</td>
      <td className="border border-slate-600 ">
        <div className="flex items-center justify-around">
          {mark}
          {item.orderStatus}
        </div>
      </td>
      <td className="border border-slate-600 p-2">{item.date}</td>
      <td className="border border-slate-600">${item.totalAmount}</td>
      <td className="border border-slate-600">
        <div className="w-20">
          <button className="  text-white font-regular px-2 rounded-lg py-1 text-sm bg-blue-500 ">
            open
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderItems;
