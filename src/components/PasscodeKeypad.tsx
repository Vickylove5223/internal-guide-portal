
import React from 'react';
import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';

interface PasscodeKeypadProps {
  onNumberPress: (number: string) => void;
  onBackspace: () => void;
  onClear: () => void;
}

const PasscodeKeypad: React.FC<PasscodeKeypadProps> = ({
  onNumberPress,
  onBackspace,
  onClear
}) => {
  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['Clear', '0', 'Delete']
  ];

  const handlePress = (value: string) => {
    if (value === 'Delete') {
      onBackspace();
    } else if (value === 'Clear') {
      onClear();
    } else {
      onNumberPress(value);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {numbers.flat().map((value) => (
        <Button
          key={value}
          type="button"
          variant="outline"
          size="lg"
          className="h-12 w-full text-lg font-medium hover:bg-gray-50"
          onClick={() => handlePress(value)}
        >
          {value === 'Delete' ? (
            <Delete className="h-5 w-5" />
          ) : (
            value
          )}
        </Button>
      ))}
    </div>
  );
};

export default PasscodeKeypad;
