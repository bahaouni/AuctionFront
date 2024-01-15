import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactElement } from 'react';

interface IProps {
  children: ReactElement;
  activeClassName: string;
  href: string;
}

const ActiveLink = ({ children, activeClassName, href }: IProps) => {

  const childClassName = children.props.className ?? '';
  const className = href
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link href={href} legacyBehavior>
      {React.cloneElement(children, {
        className: className ?? null,
      })}
    </Link>
  );
};

export default ActiveLink;