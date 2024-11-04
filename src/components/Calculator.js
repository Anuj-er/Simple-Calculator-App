import React, { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

const Calculator = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isScreenLandscape = useMediaQuery({ orientation: 'landscape' });

  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if (!isNaN(key)) {
        handleNumber(key);
      } else if (key === '+') {
        handleOperation('+');
      } else if (key === '-') {
        handleOperation('-');
      } else if (key === '*') {
        handleOperation('×');
      } else if (key === '/') {
        handleOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape') {
        handleClear();
      } else if (key === '.') {
        handleDecimal();
      } else if (key === '%') {
        handlePercent();
      } else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [display, firstNumber, operation, newNumber]);

  // Calculator functions remain the same
  const handleNumber = (num) => {
    if (display === '0' || newNumber) {
      setDisplay(num.toString());
      setNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperation = (op) => {
    if (operation && !newNumber) {
      calculate();
    }
    setFirstNumber(parseFloat(display));
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (firstNumber === null || operation === null || newNumber) return;

    const second = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = firstNumber + second;
        break;
      case '-':
        result = firstNumber - second;
        break;
      case '×':
        result = firstNumber * second;
        break;
      case '÷':
        result = firstNumber / second;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setFirstNumber(result);
    setNewNumber(true);
  };

  const handleScientific = (operation) => {
    const current = parseFloat(display);
    let result;

    switch (operation) {
      case 'sin':
        result = Math.sin(current);
        break;
      case 'cos':
        result = Math.cos(current);
        break;
      case 'tan':
        result = Math.tan(current);
        break;
      case 'sqrt':
        result = Math.sqrt(current);
        break;
      case 'square':
        result = current * current;
        break;
      case 'cube':
        result = current * current * current;
        break;
      case 'log':
        result = Math.log10(current);
        break;
      case 'ln':
        result = Math.log(current);
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case '1/x':
        result = 1 / current;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handlePercent = () => {
    const current = parseFloat(display);
    setDisplay((current / 100).toString());
  };

  const handlePlusMinus = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ label, onClick, className, wide }) => (
    <button
      onClick={onClick}
      className={`${wide ? 'col-span-2 w-full' : 'w-full'} 
        ${isLandscape ? 'h-12 text-lg' : 'h-16 text-2xl'} 
        rounded-full font-light focus:outline-none active:opacity-75 ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-br from-blue-900 to-slate-900 text-white">
      <div className="h-full w-full flex flex-col lg:flex-row">
        {/* Left Section - Header Content */}
        <div className="w-full lg:w-1/3 p-8 flex flex-col justify-center">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            QuickCalc
          </h1>
          <h2 className="text-2xl lg:text-3xl text-gray-300 mb-6">
            Smart Calculations Made Simple
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl max-w-xl">
            Experience the perfect blend of simplicity and power with QuickCalc.
            Toggle between basic and scientific modes by rotating the calculator,
            designed to handle everything from simple arithmetic to complex calculations.
          </p>
        </div>

        {/* Right Section - Calculator */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative">
          {/* Rotate Button */}
          <button
            onClick={() => setIsLandscape(!isLandscape)}
            className="absolute top-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            aria-label="Toggle calculator mode"
          >
            <RotateCw size={24} />
          </button>

          {/* Calculator Container */}
          <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className={`transition-all duration-500 ease-in-out transform
              ${!isMobile ? (
                isLandscape ? 'scale-90' : 'scale-75 lg:scale-90'
              ) : (
                isLandscape ? 'scale-75 rotate-90' : 'scale-75'
              )}
            `}>
              {/* iPhone Frame */}
              <div className={`bg-gray-800 p-4 relative shadow-2xl transition-all duration-500 
                ${isLandscape || (isMobile && isScreenLandscape)
                  ? 'w-[800px] h-96 rounded-[45px]'
                  : 'w-96 h-[800px] rounded-[60px]'
                }`}>
                {/* Notch */}
                <div className={`absolute bg-black flex items-center justify-center 
                  ${isLandscape || (isMobile && isScreenLandscape)
                    ? 'top-0 left-1/2 -translate-x-1/2 w-32 h-5 rounded-b-2xl'
                    : 'top-0 left-1/2 -translate-x-1/2 w-40 h-7 rounded-b-3xl'
                  }`}>
                  <div className={`bg-gray-900 rounded-full 
                    ${isLandscape || (isMobile && isScreenLandscape) ? 'w-16 h-3' : 'w-20 h-4'}`}>
                  </div>
                </div>

                {/* Screen */}
                <div className={`w-full h-full bg-black overflow-hidden 
                  ${isLandscape || (isMobile && isScreenLandscape) ? 'rounded-[35px]' : 'rounded-[48px]'}`}>
                  {/* Calculator Content */}
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className={`w-full ${isLandscape || (isMobile && isScreenLandscape) ? 'px-3 pb-2' : 'px-6 pb-4'}`}>
                      <div className="h-20 flex items-end justify-end">
                        <span className="text-white text-4xl md:text-6xl font-light truncate">
                          {display}
                        </span>
                      </div>

                      <div className={`grid ${isLandscape || (isMobile && isScreenLandscape)
                        ? 'grid-cols-8 gap-1.5'
                        : 'grid-cols-4 gap-2'}`}>

                        {isLandscape ? (
                          <>
                            <Button label="sin" onClick={() => handleScientific('sin')} className="bg-gray-500 text-white h-12" />
                            <Button label="cos" onClick={() => handleScientific('cos')} className="bg-gray-500 text-white h-12" />
                            <Button label="tan" onClick={() => handleScientific('tan')} className="bg-gray-500 text-white h-12" />
                            <Button label="√" onClick={() => handleScientific('sqrt')} className="bg-gray-500 text-white h-12" />
                            <Button label="AC" onClick={handleClear} className="bg-gray-300 text-black h-12" />
                            <Button label="±" onClick={handlePlusMinus} className="bg-gray-300 text-black h-12" />
                            <Button label="%" onClick={handlePercent} className="bg-gray-300 text-black h-12" />
                            <Button label="÷" onClick={() => handleOperation('÷')} className="bg-orange-500 text-white h-12" />

                            <Button label="x²" onClick={() => handleScientific('square')} className="bg-gray-500 text-white h-12" />
                            <Button label="x³" onClick={() => handleScientific('cube')} className="bg-gray-500 text-white h-12" />
                            <Button label="log" onClick={() => handleScientific('log')} className="bg-gray-500 text-white h-12" />
                            <Button label="ln" onClick={() => handleScientific('ln')} className="bg-gray-500 text-white h-12" />
                            {[7, 8, 9].map((num) => (
                              <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white h-12" />
                            ))}
                            <Button label="×" onClick={() => handleOperation('×')} className="bg-orange-500 text-white h-12" />

                            <Button label="π" onClick={() => handleScientific('pi')} className="bg-gray-500 text-white h-12" />
                            <Button label="e" onClick={() => handleScientific('e')} className="bg-gray-500 text-white h-12" />
                            <Button label="(" onClick={() => { }} className="bg-gray-500 text-white h-12" />
                            <Button label=")" onClick={() => { }} className="bg-gray-500 text-white h-12" />
                            {[4, 5, 6].map((num) => (
                              <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white h-12" />
                            ))}
                            <Button label="-" onClick={() => handleOperation('-')} className="bg-orange-500 text-white h-12" />

                            <Button label="1/x" onClick={() => handleScientific('1/x')} className="bg-gray-500 text-white h-12" />
                            <Button label="x!" onClick={() => { }} className="bg-gray-500 text-white h-12" />
                            <Button label="EE" onClick={() => { }} className="bg-gray-500 text-white h-12" />
                            <Button label="Rad" onClick={() => { }} className="bg-gray-500 text-white h-12" />
                            {[1, 2, 3].map((num) => (
                              <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white h-12" />
                            ))}
                            <Button label="+" onClick={() => handleOperation('+')} className="bg-orange-500 text-white h-12" />

                            <Button label="MC" onClick={() => setMemory(0)} className="bg-gray-500 text-white h-12" />
                            <Button label="MR" onClick={() => setDisplay(memory.toString())} className="bg-gray-500 text-white h-12" />
                            <Button label="M+" onClick={() => setMemory(memory + parseFloat(display))} className="bg-gray-500 text-white h-12" />
                            <Button label="M-" onClick={() => setMemory(memory - parseFloat(display))} className="bg-gray-500 text-white h-12" />
                            <Button label="0" onClick={() => handleNumber(0)} className="bg-gray-700 text-white h-12" />
                            <Button label="." onClick={handleDecimal} className="bg-gray-700 text-white h-12" />
                            <Button label="=" onClick={calculate} className="bg-orange-500 text-white col-span-2 h-12" />
                          </>
                        ) : (
                          <>
                            <Button label="AC" onClick={handleClear} className="bg-gray-300 text-black h-16" />
                            <Button label="±" onClick={handlePlusMinus} className="bg-gray-300 text-black h-16" />
                            <Button label="%" onClick={handlePercent} className="bg-gray-300 text-black h-16" />
                            <Button label="÷" onClick={() => handleOperation('÷')} className="bg-orange-500 text-white h-16" />

                            {[7, 8, 9].map((num) => (
                              <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white h-16" />
                            ))}
                            <Button label="×" onClick={() => handleOperation('×')} className="bg-orange-500 text-white h-16" />

                            {[4, 5, 6].map((num) => (
                              <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white h-16" />
                            ))}
                            <Button label="-" onClick={() => handleOperation('-')} className="bg-orange-500 text-white h-16" />

                            {[1, 2, 3].map((num) => (
                              <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white h-16" />
                            ))}
                            <Button label="+" onClick={() => handleOperation('+')} className="bg-orange-500 text-white h-16" />

                            <Button label="0" onClick={() => handleNumber(0)} className="col-span-2 bg-gray-700 text-white h-16" />
                            <Button label="." onClick={handleDecimal} className="bg-gray-700 text-white h-16" />
                            <Button label="=" onClick={calculate} className="bg-orange-500 text-white h-16" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;