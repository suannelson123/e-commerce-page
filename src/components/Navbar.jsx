import { useContext, useEffect, useRef, useState } from "react";
import IconCart from "../assets/svg/IconCart";
import IconMenu from "../assets/svg/IconMenu";
import Logo from "../assets/svg/Logo";
import { imageAvatar, navbarLinks } from "../constant";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import IconCLose from "../assets/svg/IconClose";
import { ProductItem } from "../context/Context";
import Sidebar from "./Sidebar/Sidebar";
const Navbar = () => {
  const { productCart } = useContext(ProductItem);

  const [navbarActive, setNavbarActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setScrolled(true) : setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav
      ref={navRef}
      className={`${
        scrolled ? "bg-color-white" : "bg-color-white"
      } p-5 fixed top-0 left-0 w-full  font-ksans z-[9999] transition-colors lg:p-10 lg:px-[100px]`}
    >
      <ul className="flex justify-between items-center lg:lg:border-b border-b-color-grayishBlue lg:pb-10">
        <div className="flex items-center gap-5">
          <div
            className="block lg:hidden"
            onClick={() => {
              setNavbarActive(!navbarActive);
              disablePageScroll(navRef.current);
            }}
          >
            <IconMenu />
          </div>

          <div>
            <Logo />
          </div>
          {/* desktop navlinks */}
          <div className="hidden lg:flex gap-5 ml-5">
            {navbarLinks.map((navlink) => (
              <li
                className="text-color-grayBLue text-[1.2rem] cursor-pointer lg:hover:border-b-2 border-color-orange lg:pb-2"
                key={navlink.id}
              >
                {navlink.name}
              </li>
            ))}
          </div>
        </div>

        <div className="lg:relative flex items-center gap-5 lg:gap-10">
          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart(!showCart)}
          >
            {productCart.length > 0 && (
              <span className="absolute right-[-50%] top-[-70%] bg-color-orange text-color-white rounded-lg  h-[15px] flex items-center justify-center px-2 py-2">
                {productCart.length > 0 &&
                  productCart.map((item) => item.quantity)}
              </span>
            )}
            <IconCart />
          </div>
          <div>
            <img
              className="w-[25px] h-[25px] object-cover lg:w-[50px] lg:h-[50px] cursor-pointer hover:outline outline-color-orange outline-3 rounded-full"
              src={imageAvatar}
              alt="avatar"
            />
          </div>

          {/* cart_dropdown */}

          <div
            className={`${
              showCart ? "flex" : " flex opacity-0 collapse"
            }  w-[95%] bg-color-white absolute top-[100%] left-[50%] translate-x-[-50%] mt-5 rounded-lg  flex-col transition-all lg:w-[400px] lg:left-[-50%] lg:drop-shadow-2xl`}
          >
            <div className="p-5 border-b-[1px]">
              <h1 className="h6 text-color-black font-bold">Cart</h1>
            </div>
            <div className=" flex flex-1 ">
              {productCart.length > 0 ? (
                <Sidebar products={productCart} />
              ) : (
                <h2 className=" h6 text-color-grayBLue m-auto px-5 py-10">
                  {" "}
                  Your cart is empty
                </h2>
              )}
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setNavbarActive(false);
            enablePageScroll(navRef.current);
          }}
          className={`${navbarActive ? "block" : "hidden"} aft_overlay`}
        ></div>

        <div
          className={`${
            navbarActive ? "fadeToleft" : "fadeOutleft "
          } absolute top-0 left-0 bg-color-white  w-3/5 p-5 z-[100] min-h-[200vh] lg:hidden`}
        >
          <div
            className="mb-10"
            onClick={() => {
              setNavbarActive(false);
              enablePageScroll(navRef.current);
            }}
          >
            <IconCLose />
          </div>
          <div>
            {navbarLinks.map((navlink) => (
              <li
                onClick={() => {
                  setNavbarActive(false);
                  enablePageScroll(navRef.current);
                }}
                className="text-black mb-5 font-bold"
                key={navlink.id}
              >
                {navlink.name}
              </li>
            ))}
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
