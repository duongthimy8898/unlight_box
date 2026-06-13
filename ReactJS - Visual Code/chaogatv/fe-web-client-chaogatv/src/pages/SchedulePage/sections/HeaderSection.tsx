import type { Sport } from "../../../shared/types/Sport";
const HeaderSection = ({ sport }: { sport: Sport }) => {
  return (
    <header className="flex flex-row gap-1 text-brand">
      <h1 className="text-xl font-semibold uppercase">CẬP NHẬT LỊCH THI ĐẤU {sport.name} HÔM NAY MỚI NHẤT 24H</h1>
    </header>
  );
};

export default HeaderSection;
