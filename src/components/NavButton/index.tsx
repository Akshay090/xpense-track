import Link from 'next/link';
import { IconType } from 'react-icons';

interface Props {
  linkTo: string;
  text: string;
  Icon: IconType;
}

const NavButton = ({ linkTo, text, Icon }: Props): JSX.Element => {
  return (
    <Link href={linkTo}>
      <button className="ml-2 outline-none focus:outline-none p-2 rounded-md flex items-center font-medium text-xs text-white tracking-wider bg-blue-500 border-2 border-cyan-400">
        <Icon size="18" /> <span className="ml-2">{text}</span>
      </button>
    </Link>
  );
};

export default NavButton;
