import { useContext, useEffect, useRef, useState } from "react";
import { iconCart, iconMinus, iconPlus } from "../constant";
import { ProductItem } from "../context/Context";
import Navbar from "./Navbar";
import LightBox from "./LightBox/LightBox";
import ButtonLeft from "./Buttons/ButtonLeft";
import ButtonRight from "./Buttons/ButtonRight";

const LandingPage = () => {
  const { products, thumnails, addToCart, productCart, incrementDecrement } =
    useContext(ProductItem);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPopup, setIsShowPopup] = useState(false);
  const productRef = useRef(null);

  const prevBtn = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : products.length - 1));
  };

  const nextBtn = () => {
    setCurrentSlide((prev) => (prev < products.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const { current } = productRef;

    if (current) {
      current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  return (
    <>
      <Navbar />
      <header className="text-black mt-[4rem] lg:mt-[100px] font-ksans lg:flex items-center justify-center lg:gap-5">
        <div className="relative h-full lg:hidden lg:flex-1">
          {/* products */}
          <div ref={productRef} className={`flex transition-all w-full`}>
            {products.map((image, index) => (
              <img
                className="object-cover"
                key={index}
                src={image}
                alt={`product${index}`}
              />
            ))}
          </div>

          <div onClick={() => prevBtn()}>
            <ButtonLeft />
          </div>

          <div onClick={() => nextBtn()}>
            <ButtonRight />
          </div>

          <div className="absolute bottom-5 left-[50%] translate-x-[-50%] flex gap-5">
            {products.map((_, index) => (
              <button
                onClick={() => setCurrentSlide(index)}
                className={`${
                  currentSlide === index
                    ? "bg-color-grayBLue"
                    : "bg-color-lightGrayBlue"
                } rounded-full w-[25px] h-[25px] transition-all`}
                key={index}
              ></button>
            ))}
          </div>
        </div>

        {/* desktop images */}
        <div className="hidden relative lg:grid grid-cols-1 grid-rows-1 lg:flex-1 gap-5">
          {products.map((image, index) => (
            <img
              onClick={() => setIsShowPopup(!isPopup)}
              className={`${
                currentSlide === index
                  ? "opacity-1 visible"
                  : "opacity-0 collapse"
              } object-cover row-span-full col-span-full max-w-[500px] max-h-[500px] lg:justify-self-center lg:rounded-2xl transition-all cursor-pointer`}
              key={index}
              src={image}
              alt={`product${index}`}
            />
          ))}
          <div className="hidden lg:flex lg:justify-self-center gap-5">
            {thumnails.map((image, index) => (
              <div
                className={`${
                  currentSlide === index
                    ? "outline outline-color-orange rounded-2xl"
                    : ""
                }`}
                key={index}
              >
                <img
                  onClick={() => setCurrentSlide(index)}
                  className={`${
                    currentSlide === index ? "opacity-[0.5]" : ""
                  }  w-[75px] h-[75px] object-cover lg:rounded-xl cursor-pointer lg:hover:opacity-[0.5] transition-all`}
                  src={image}
                  alt={`${image}${index}`}
                />
              </div>
            ))}
          </div>
          {isPopup && (
            <LightBox
              products={products}
              thumbnails={thumnails}
              slide={currentSlide}
              setSlide={setCurrentSlide}
              isPopedUp={setIsShowPopup}
            />
          )}
        </div>

        <div className="p-5 lg:flex-1 lg:p-10">
          <div className="flex flex-col gap-3 mb-5">
            <h2 className="text-color-grayBLue font-bold tracking-wider caption">
              SNEAKER COMPANY
            </h2>
            <h1 className="h2 font-bold text-color-black">
              Fall Limited Edition Sneakers
            </h1>
            <p className="text-color-grayBLue leading-7 lg:text-[1.2rem] lg:leading-8">
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they’ll withstand
              everything the weather can offer.
            </p>
          </div>

          <div className="flex lg:flex-col">
            <div className="flex items-center">
              <span className="h2 font-bold mr-3">$125.00</span>{" "}
              <span className="bg-color-black text-color-white px-2 py-[0.5px] font-bold rounded-md">
                50%
              </span>{" "}
            </div>
            <span className="ml-auto font-bold text-color-grayBLue line-through lg:ml-0 lg:text-[1.2rem]">
              $250.00
            </span>
          </div>

          <div className="my-10 flex flex-col gap-5 lg:flex-row">
            <div className="flex justify-between bg-color-lightGrayBlue p-5 rounded-lg lg:w-[50%]">
              <button
                onClick={() => incrementDecrement(false)}
                className="w-[25px]"
              >
                <img
                  className="object-cover mx-auto"
                  src={iconMinus}
                  alt="minus"
                />
              </button>
              <span className="font-bold">
                {productCart.length > 0
                  ? productCart.map((item) => item.quantity)
                  : 0}
              </span>
              <button onClick={() => addToCart()} className="w-[25px]">
                <img
                  className="object-cover mx-auto"
                  src={iconPlus}
                  alt="plus"
                />
              </button>
            </div>

            <div
              onClick={() => addToCart()}
              className=" bg-color-orange p-5 rounded-lg flex justify-center cursor-pointer lg:w-full  lg:hover:bg-color-2 transition-colors"
            >
              <button className="flex justify-center items-center font-bold select-none">
                <img className="object-cover mr-3" src={iconCart} alt="cart" />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default LandingPage;
