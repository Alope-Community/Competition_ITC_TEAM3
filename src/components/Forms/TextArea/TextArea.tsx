interface InputAreaProps {
  rows: number;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<InputAreaProps> = ({
  rows,
  placeholder,
  value,
  readOnly,
  onChange,
}) => {
  return (
    <textarea
      value={value}
      readOnly={readOnly}
      rows={rows}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    ></textarea>
  );
};

export default TextArea;
