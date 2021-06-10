import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components'

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth'

import { SingInSocialButton } from '../../components/SingInSocialButton'

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SingInTitle,
  Footer,
  FooterWrapper,
 } from './styles'

export function SingIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { singInWithGoogle, singInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSingInWithGoogle(){
   try {
     setIsLoading(true);
     return await singInWithGoogle();
    } catch(error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google')
      setIsLoading(false);
    } 
  }

  async function handleSingInWithApple(){
   try {
     setIsLoading(true);
     return await singInWithApple();
    } catch(error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Apple')
      setIsLoading(false);
    }
  }


  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>


        </TitleWrapper>

        <SingInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo 
        </SingInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SingInSocialButton 
          title="Entrar com Google"
          svg={GoogleSvg}
          onPress={handleSingInWithGoogle}
          />

         {
           Platform.OS === 'ios' &&
          <SingInSocialButton 
          title="Entrar com Apple"
          svg={AppleSvg}
          onPress={handleSingInWithApple}
          />
          }

        </FooterWrapper>

        { isLoading &&
         <ActivityIndicator 
          color={theme.colors.shape} 
          style={{ marginTop: 18}}
          /> 
         }
      </Footer>
    </Container>
  );
}