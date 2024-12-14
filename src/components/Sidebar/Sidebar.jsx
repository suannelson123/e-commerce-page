import { useContext } from "react";
import { iconDelete } from "../../constant";
import { ProductItem } from "../../context/Context";
const Sidebar = ({ products }) => {
    const { removeToCart } = useContext(ProductItem);
    return (
        <div className="text-color-black m-auto my-5 w-[90%]">
            {products.map(item => (
                <div className="flex items-center gap-2" key={item.title}>
                    <img className="w-[50px] h-[50px] object-cover rounded-lg" src={item.imgSrc} alt={item.title} />
                    <div className="flex flex-col">
                        <h1 className=" font-bold text-[16px] text-color-grayBLue">{item.title}</h1>
                        <div className="flex gap-2">
                            <span className="text-color-grayBLue">${item.price.toFixed(2)}</span>
                            <span className="text-color-grayBLue">x{item.quantity}</span>
                            <span className="font-bold text-color-black">${item.price * item.quantity}</span>
                        </div>
                    </div>
                    <button onClick={() => removeToCart(item.title)} className="p-2">
                        <img className="w-[20px] h-[20px] object-cover" src={iconDelete} alt="delete" />
                    </button>
                </div>
            ))}
            <button className="bg-color-orange w-full p-5 rounded-lg mt-5 font-bold">Checkout</button>
        </div>
    );
};

export default Sidebar;
