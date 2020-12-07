interface IProps {
  title: string;
  children: JSX.Element;
}
const Nav = ({ title, children }: IProps): JSX.Element => {
  return (
    <div className="max-w-4xl mx-auto bg-gray-100">
      <div className="relative bg-gradient-to-r from-cyan-600 via-cyan-600 to-cyan-700 h-36">
        <div className="w-full h-full flex items-center justify-center">
          <p className="font-bold pb-3 text-gray-200 shadow-2xl text-3xl md:text-5xl opacity-40 ">
            {title}
          </p>
        </div>
        <div className="absolute bottom-2 left-2 my-2 flex items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Nav;
