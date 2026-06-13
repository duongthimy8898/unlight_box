import adButtons from "../data/adButtons";
export function useHandleGlobalBetButtonClick() {
  return () => {
    console.log("Global Bet Button Clicked!");
    const url = adButtons.GLOBAL.href;
    window.open(url, "_blank");
  };
}
