import { MdForum, MdHome } from 'react-icons/md';
import { RiPencilRulerFill } from 'react-icons/ri';

export const routes = [
  {
    path: '/',
    name: 'Home',
    icon: <MdHome />,
  },
  {
    path: '/forum',
    name: 'Forum',
    icon: <MdForum />,
  },
  {
    path: '/quiz',
    name: 'Test',
    icon: <RiPencilRulerFill />,
  },
];
