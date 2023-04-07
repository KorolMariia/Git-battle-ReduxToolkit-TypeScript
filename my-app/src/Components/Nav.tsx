import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks: readonly string[] = ['Home', 'Popular', 'Battle'];

const Nav: FC = (): JSX.Element => (
  <ul className="nav">
    {navLinks.map((link: string, index: number): JSX.Element => (
      <li key={index}>
        <NavLink to={link === 'Home' ? '/' : link.toLowerCase()}>
          {link as ReactNode}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default Nav;