import React from 'react';
import {BaseProvider} from './base.context';
import {ProfileProvider} from './profile.context';
interface WithChildrenProps {
  children: React.ReactNode;
}

type PackComponentType<T extends WithChildrenProps = WithChildrenProps> =
  React.ElementType<T>;

function pack(
  children: React.ReactNode = null,
  ...components: PackComponentType[]
) {
  if (!components.length) {
    return children as JSX.Element;
  }

  const [Component, ...rest] = components;

  return <Component>{pack(children, ...rest)}</Component>;
}

function createPack(...components: PackComponentType[]) {
  return function PackComponent({children}: WithChildrenProps) {
    return pack(children, ...components);
  };
}

export const AppProvider = createPack(BaseProvider, ProfileProvider);
