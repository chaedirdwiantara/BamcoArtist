import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {CopilotStep, walkthroughable} from 'react-native-copilot';

interface CartBoxProps {
  children: ReactNode;
  order: number;
  name: string;
  text: string;
  ref?: any;
}

const WalkthroughableView = walkthroughable(View);
export const StepCopilot: React.FC<CartBoxProps> = ({
  children,
  order,
  name,
  text,
  ref,
}) => {
  return (
    <View>
      <CopilotStep order={order} name={name} text={text}>
        <WalkthroughableView
          copilot={{
            ref,
            onLayout: undefined,
          }}>
          {children}
        </WalkthroughableView>
      </CopilotStep>
    </View>
  );
};
