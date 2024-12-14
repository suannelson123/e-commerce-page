import { iconPrevious } from "../../constant";
const ButtonLeft = () => {
  return (
    <div>
      <button className=" absolute top-2/4 left-5 -translate-y-2/4 flex items-center justify-center rounded-full w-[50px] h-[50px] bg-color-white">
        <img
          className="object-cover w-[15px] h-[15px]"
          src={iconPrevious}
          alt="prev"
        />
      </button>
    </div>
  );
};

export default ButtonLeft;
