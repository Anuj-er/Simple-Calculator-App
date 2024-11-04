import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [memory, setMemory] = useState(0);

  // Calculator functions remain the same...
  // (Previous calculator logic remains unchanged for brevity)
  // All calculator functions remain the same
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

  // Scientific calculator functions
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
      className={`${wide ? 'col-span-2 w-full' : 'w-16'} h-16 rounded-full text-2xl font-light focus:outline-none active:opacity-75 ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Rotate Button */}
      <button
        onClick={() => setIsLandscape(!isLandscape)}
        className="fixed top-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <RotateCw size={24} />
      </button>

      {/* iPhone Frame Container */}
      <div className="transition-all duration-500 ease-in-out">
        {/* iPhone Outer Frame */}
        <div className={`bg-gray-800 p-4 relative shadow-2xl transition-all duration-500 ${
          isLandscape 
            ? 'w-[800px] h-96 rounded-[45px]' 
            : 'w-96 h-[800px] rounded-[60px]'
        }`}>
          {/* Power Button */}
          <div className={`absolute bg-gray-700 ${
            isLandscape
              ? 'left-12 top-0 w-8 h-1 rounded-b-lg'
              : 'right-12 top-0 w-8 h-1 rounded-b-lg'
          }`}></div>
          
          {/* Volume Buttons */}
          <div className={`absolute bg-gray-700 ${
            isLandscape
              ? 'top-0 right-24 w-8 h-1 rounded-b-lg'
              : 'left-0 top-24 h-8 w-1 rounded-r-lg'
          }`}></div>
          <div className={`absolute bg-gray-700 ${
            isLandscape
              ? 'top-0 right-36 w-8 h-1 rounded-b-lg'
              : 'left-0 top-36 h-8 w-1 rounded-r-lg'
          }`}></div>
          
          {/* Notch */}
          <div className={`absolute bg-black flex items-center justify-center ${
            isLandscape
              ? 'top-0 left-1/2 -translate-x-1/2 w-32 h-5 rounded-b-2xl'
              : 'top-0 left-1/2 -translate-x-1/2 w-40 h-7 rounded-b-3xl'
          }`}>
            <div className={`bg-gray-900 rounded-full ${
              isLandscape ? 'w-16 h-3' : 'w-20 h-4'
            }`}></div>
          </div>
          
          {/* Screen */}
          <div className={`w-full h-full bg-black overflow-hidden ${
            isLandscape ? 'rounded-[35px]' : 'rounded-[48px]'
          }`}>
            {/* Calculator Content */}
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className={`bg-black rounded-3xl overflow-hidden ${isLandscape ? 'w-full' : 'w-72'}`}>
                <div className="h-24 flex items-end justify-end px-6 pb-4">
                  <span className="text-white text-6xl font-light">{display}</span>
                </div>
                
                <div className={`grid gap-2 p-2 ${isLandscape ? 'grid-cols-8' : 'grid-cols-4'}`}>
                  {isLandscape ? (
                    <>
                      {/* Scientific Calculator Buttons */}
                      <Button label="sin" onClick={() => handleScientific('sin')} className="bg-gray-500 text-white text-lg" />
                      <Button label="cos" onClick={() => handleScientific('cos')} className="bg-gray-500 text-white text-lg" />
                      <Button label="tan" onClick={() => handleScientific('tan')} className="bg-gray-500 text-white text-lg" />
                      <Button label="√" onClick={() => handleScientific('sqrt')} className="bg-gray-500 text-white" />
                      <Button label="AC" onClick={handleClear} className="bg-gray-300 text-black" />
                      <Button label="±" onClick={handlePlusMinus} className="bg-gray-300 text-black" />
                      <Button label="%" onClick={handlePercent} className="bg-gray-300 text-black" />
                      <Button label="÷" onClick={() => handleOperation('÷')} className="bg-orange-500 text-white" />
                      
                      
                      <Button label="x²" onClick={() => handleScientific('square')} className="bg-gray-500 text-white" />
                      <Button label="x³" onClick={() => handleScientific('cube')} className="bg-gray-500 text-white" />
                      <Button label="log" onClick={() => handleScientific('log')} className="bg-gray-500 text-white text-lg" />
                      <Button label="ln" onClick={() => handleScientific('ln')} className="bg-gray-500 text-white text-lg" />
                      {[7, 8, 9].map((num) => (
                        <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white" />
                      ))}
                      <Button label="×" onClick={() => handleOperation('×')} className="bg-orange-500 text-white" />
                      
                      <Button label="π" onClick={() => handleScientific('pi')} className="bg-gray-500 text-white" />
                      <Button label="e" onClick={() => handleScientific('e')} className="bg-gray-500 text-white" />
                      <Button label="(" onClick={() => {}} className="bg-gray-500 text-white" />
                      <Button label=")" onClick={() => {}} className="bg-gray-500 text-white" />
                      {[4, 5, 6].map((num) => (
                        <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white" />
                      ))}
                      <Button label="-" onClick={() => handleOperation('-')} className="bg-orange-500 text-white" />
                      
                      <Button label="1/x" onClick={() => handleScientific('1/x')} className="bg-gray-500 text-white text-lg" />
                      <Button label="x!" onClick={() => {}} className="bg-gray-500 text-white" />
                      <Button label="EE" onClick={() => {}} className="bg-gray-500 text-white text-lg" />
                      <Button label="Rad" onClick={() => {}} className="bg-gray-500 text-white text-lg" />
                      {[1, 2, 3].map((num) => (
                        <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white" />
                      ))}
                      <Button label="+" onClick={() => handleOperation('+')} className="bg-orange-500 text-white" />
                      
                      <Button label="MC" onClick={() => setMemory(0)} className="bg-gray-500 text-white text-lg" />
                      <Button label="MR" onClick={() => setDisplay(memory.toString())} className="bg-gray-500 text-white text-lg" />
                      <Button label="M+" onClick={() => setMemory(memory + parseFloat(display))} className="bg-gray-500 text-white text-lg" />
                      <Button label="M-" onClick={() => setMemory(memory - parseFloat(display))} className="bg-gray-500 text-white text-lg" />
                      <Button label="0" onClick={() => handleNumber(0)} className="bg-gray-700 text-white" />
                      <Button label="." onClick={handleDecimal} className="bg-gray-700 text-white" />
                      <Button label="=" onClick={calculate} className="bg-orange-500 text-white" wide />
                    </>
                  ) : (
                    <>
                      {/* Portrait Mode Buttons */}
                      <Button label="AC" onClick={handleClear} className="bg-gray-300 text-black" />
                      <Button label="±" onClick={handlePlusMinus} className="bg-gray-300 text-black" />
                      <Button label="%" onClick={handlePercent} className="bg-gray-300 text-black" />
                      <Button label="÷" onClick={() => handleOperation('÷')} className="bg-orange-500 text-white" />
                      
                      {[7, 8, 9].map((num) => (
                        <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white" />
                      ))}
                      <Button label="×" onClick={() => handleOperation('×')} className="bg-orange-500 text-white" />
                      
                      {[4, 5, 6].map((num) => (
                        <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white" />
                      ))}
                      <Button label="-" onClick={() => handleOperation('-')} className="bg-orange-500 text-white" />
                      
                      {[1, 2, 3].map((num) => (
                        <Button key={num} label={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white" />
                      ))}
                      <Button label="+" onClick={() => handleOperation('+')} className="bg-orange-500 text-white" />
                      
                      <Button label="0" onClick={() => handleNumber(0)} className="col-span-2 w-full bg-gray-700 text-white" />
                      <Button label="." onClick={handleDecimal} className="bg-gray-700 text-white" />
                      <Button label="=" onClick={calculate} className="bg-orange-500 text-white" />
                    </>
                  )}
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