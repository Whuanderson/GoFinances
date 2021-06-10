import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import {
  Button,
  ImageContainer,
  Text,
} from './styled';

interface Props extends RectButtonProps {
  title: String;
  svg: React.FC<SvgProps>
}

export function SingInSocialButton({
  title,
  svg: Svg,
  ...rest
}: Props){
  return(
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Text>
        {title}
      </Text>
    </Button>
  );
}
