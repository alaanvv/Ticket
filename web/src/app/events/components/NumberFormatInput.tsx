import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import NumberFormat, { NumberFormatValues } from "react-number-format";

interface NumberFormatInputProps {
  value: number;
  onValueChange: (values: NumberFormatValues) => void;
  thousandSeparator?: string;
  decimalSeparator?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const NumberFormatInput = forwardRef<HTMLInputElement, NumberFormatInputProps>(
  ({ value, onValueChange, thousandSeparator, decimalSeparator, prefix, suffix, className }, ref) => (
    <NumberFormat
      getInputRef={ref}
      value={value}
      onValueChange={onValueChange}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      prefix={prefix}
      suffix={suffix}
      customInput={Input} // Use o Input do Shadcn UI como input base
      className={className}
    />
  )
);

NumberFormatInput.displayName = "NumberFormatInput";

export default NumberFormatInput;
