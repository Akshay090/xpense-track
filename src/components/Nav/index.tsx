const Nav = (): JSX.Element => {
  return (
    <nav className="w-full z-10">
      <div className="w-full md:max-w-4xl mx-auto flex justify-between items-center flex-wrap mt-0 py-4">
        <div className="pl-4">
          <div className="text-gray-900 no-underline hover:no-underline font-medium text-2xl">
            Xpense Tracker
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
