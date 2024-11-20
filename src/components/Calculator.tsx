import React, { useEffect, useState } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator: React.FC = () => {
  const [value, setValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);


  const handleDigitClick = (digit: string) => {
    setValue((prev) => (prev === '0' ? digit : prev + digit));
  };

  const handleOperatorClick = (op: string) => {
    setPreviousValue(value);
    setOperator(op);
    setValue('0');
  };

  const handleEqualsClick = () => {
    if (previousValue && operator) {
      const prev = parseFloat(previousValue);
      const current = parseFloat(value);
      let result = 0;

      switch (operator) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          result = prev / current;
          break;
      }

      const resultString = result.toString();
      setValue(resultString);
      setPreviousValue(null);
      setOperator(null);

      const newHistory = [...history, `${previousValue} ${operator} ${value} = ${resultString}`];
      setHistory(newHistory);
      localStorage.setItem('history', JSON.stringify(newHistory));
    }
  };

  const handleClearClick = () => {
    setValue('0');
    setPreviousValue(null);
    setOperator(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('history');
  };

  return (
    <div className="calculator">
      <Display value={value} />
      <div className="button-grid">
        <Button label="C" onClick={handleClearClick} type="operation" />
        <Button label="±" onClick={() => {}} type="operation" />
        <Button label="%" onClick={() => {}} type="operation" />
        <Button label="÷" onClick={() => handleOperatorClick('/')} type="operation" />

        <Button label="7" onClick={() => handleDigitClick('7')} />
        <Button label="8" onClick={() => handleDigitClick('8')} />
        <Button label="9" onClick={() => handleDigitClick('9')} />
        <Button label="×" onClick={() => handleOperatorClick('*')} type="operation" />

        <Button label="4" onClick={() => handleDigitClick('4')} />
        <Button label="5" onClick={() => handleDigitClick('5')} />
        <Button label="6" onClick={() => handleDigitClick('6')} />
        <Button label="-" onClick={() => handleOperatorClick('-')} type="operation" />

        <Button label="1" onClick={() => handleDigitClick('1')} />
        <Button label="2" onClick={() => handleDigitClick('2')} />
        <Button label="3" onClick={() => handleDigitClick('3')} />
        <Button label="+" onClick={() => handleOperatorClick('+')} type="operation" />

        <Button label="0" onClick={() => handleDigitClick('0')} type="zero" />
        <Button label="." onClick={() => handleDigitClick('.')} />
        <Button label="=" onClick={handleEqualsClick} type="operation" />
      </div>

      <div className="history">
        <h2>Riwayat</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Riwayat kosong</p>
        )}
        <button onClick={handleClearHistory}>Hapus Riwayat</button>
      </div>
    </div>
  );
};

export default Calculator;
