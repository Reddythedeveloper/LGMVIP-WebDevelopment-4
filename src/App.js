import React, { useState } from 'react';
import { create, all } from 'mathjs';
import styled, { ThemeProvider } from 'styled-components';

const math = create(all);

const themes = {
  light: {
    background: '#f5f5f5',
    calculatorBackground: '#fff',
    buttonBackground: '#f0f0f0',
    buttonColor: '#333',
  },
  dark: {
    background: '#333',
    calculatorBackground: '#444',
    buttonBackground: '#555',
    buttonColor: '#fff',
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.buttonColor};
  transition: background-color 0.3s, color 0.3s;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, #3498db, #8e44ad);
  z-index: -1;
`;

const CalculatorWrapper = styled.div`
  background-color: ${(props) => props.theme.calculatorBackground};
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
  transition: background-color 0.3s;
`;

const Heading = styled.h1`
  font-size: 35px;
  margin-bottom: 15px;
`;

const Display = styled.div`
  font-size: 36px;
  text-align: right;
  padding: 10px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  font-size: 24px;
  padding: 15px 20px;
  border: none;
  background-color: ${(props) => props.theme.buttonBackground};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #a9a9a9;
  }
`;

const ThemeToggle = styled.div`
  margin-top: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.buttonColor};
`;

const App = () => {
  const [expression, setExpression] = useState('');
  const [theme, setTheme] = useState('light');

  const handleClick = (value) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const handleClear = () => {
    setExpression('');
  };

  const handleResult = () => {
    try {
      const result = math.evaluate(expression);
      setExpression(result.toString());
    } catch (error) {
      setExpression('Error');
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <Container>
        <Background />
        <Heading>Web Calculator</Heading>
        <CalculatorWrapper>
          <Display>{expression}</Display>
          <ButtonGrid>
            <Button onClick={() => handleClick('7')}>7</Button>
            <Button onClick={() => handleClick('8')}>8</Button>
            <Button onClick={() => handleClick('9')}>9</Button>
            <Button onClick={() => handleClick('+')}>+</Button>
            <Button onClick={() => handleClick('4')}>4</Button>
            <Button onClick={() => handleClick('5')}>5</Button>
            <Button onClick={() => handleClick('6')}>6</Button>
            <Button onClick={() => handleClick('-')}>-</Button>
            <Button onClick={() => handleClick('1')}>1</Button>
            <Button onClick={() => handleClick('2')}>2</Button>
            <Button onClick={() => handleClick('3')}>3</Button>
            <Button onClick={() => handleClick('*')}>*</Button>
            <Button onClick={() => handleClick('.')}>.</Button>
            <Button onClick={() => handleClick('0')}>0</Button>
            <Button onClick={() => handleClick('/')}>/</Button>
            <Button onClick={handleResult}>=</Button>
            <Button onClick={handleClear}>C</Button>
          </ButtonGrid>
          <ThemeToggle onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </ThemeToggle>
        </CalculatorWrapper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
