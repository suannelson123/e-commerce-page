import IconCLose from "../../assets/svg/IconClose";
import ButtonLeft from "../Buttons/ButtonLeft";
import ButtonRight from "../Buttons/ButtonRight";
const LightBox = ({ products, thumbnails, slide, setSlide, isPopedUp }) => {
  const prevBtn = () => {
    setSlide((prev) => (prev > 0 ? prev - 1 : products.length - 1));
  };

  const nextBtn = () => {
    setSlide((prev) => (prev < products.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-color-overlay z-[9999]">
      <div className="flex flex-col items-center">
        <div className="grid grid-rows-1 grid-cols-1 relative">
          <div
            onClick={() => isPopedUp(false)}
            className="absolute top-5 right-5"
          >
            <IconCLose style="fill-[#69707D] hover:fill-color-grayishBlue transition-colors" />
          </div>
          {products.map((image, index) => (
            <img
              className={`${
                slide !== index ? "opacity-0 collapse" : "opacity-1 visible"
              } max-w-[600px] max-h-[600px] lg:rounded-2xl transition-all cursor-pointer object-cover row-span-full col-span-full`}
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
            />
          ))}
          <div onClick={() => prevBtn()}>
            <ButtonLeft />
          </div>
          <div onClick={() => nextBtn()}>
            <ButtonRight />
          </div>
        </div>

        <div className="hidden lg:flex gap-5 mt-10">
          {thumbnails.map((image, index) => (
            <div key={index}>
              <img
                className={`${
                  slide !== index
                    ? " rounded-2xl opacity-[0.5]"
                    : "outline outline-color-orange"
                } w-[75px] h-[75px] object-cover lg:rounded-xl cursor-pointer hover:opacity-50 transition-all`}
                src={image}
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LightBox;
