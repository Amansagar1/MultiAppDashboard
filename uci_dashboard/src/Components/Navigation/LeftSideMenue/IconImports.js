import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import * as TbIcons from 'react-icons/tb';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as DiIcons from 'react-icons/di';
import * as HiIcons from 'react-icons/hi';
import * as Hi2Icons from 'react-icons/hi2';
import * as VscIcons from 'react-icons/vsc';
import * as RiIcons from 'react-icons/ri';

const allIcons = {
  ...FaIcons,
  ...MdIcons,
  ...GiIcons,
  ...TbIcons,
  ...BsIcons,
  ...AiIcons,
  ...DiIcons,
  ...HiIcons,
  ...Hi2Icons,
  ...VscIcons,
  ...RiIcons
};

const IconMapper = ({ name, className }) => {
  const IconComponent = allIcons[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};

export default IconMapper;
