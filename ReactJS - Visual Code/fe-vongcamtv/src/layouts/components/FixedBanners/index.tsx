import Left from "./Left";
import Popup from "./Popup";
import Right from "./Right";

const FixedBanners = () => {
  return (
    <section className="hidden fixed inset-0 z-900 select-none pointer-events-none">
      <Left />
      <Right />
      <Popup/>
    </section>
  );
};

export default FixedBanners;
