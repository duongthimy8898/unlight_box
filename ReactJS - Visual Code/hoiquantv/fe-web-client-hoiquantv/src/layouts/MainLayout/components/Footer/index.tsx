const Footer = () => {
  return (
    <div className="mt-8 w-full flex justify-around items-center flex-wrap gap-4 py-12 px-4 bg-[#1e293b]">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <a className="w-32 opacity-75" href="/">
          <img src="/logo.png" alt="" />
        </a>
        <p className="text-xs text-gray-400">Copyright © 2025, All rights reserved.</p>
      </div>
      <div className="flex flex-wrap space-x-6 justify-center items-center">
        <img className="w-auto h-10" src="/assets/imgs/league1.png" alt="" />
        <img className="w-auto h-10" src="/assets/imgs/league2.png" alt="" />
        <img className="w-auto h-10" src="/assets/imgs/league3.png" alt="" />
        <img className="w-auto h-10" src="/assets/imgs/league4.png" alt="" />
        <img className="w-auto h-10" src="/assets/imgs/league5.png" alt="" />
        <img className="w-auto h-10" src="/assets/imgs/league6.png" alt="" />
      </div>
    </div>
  );
};

export default Footer;
