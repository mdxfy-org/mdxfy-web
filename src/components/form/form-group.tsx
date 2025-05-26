export interface FormGroupProps {
  label?: string;
  children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, children }) => {
  return (
    <div className="form-group">
      <span className="flex flex-1 justify-between items-center gap-4 col-span-full mb-2 w-full min-w-max">
        <p className="min-w-max text-foreground text-lg">{label}</p>
        <hr className="bg-default-200 border-none rounded-sm outline-none w-full h-[2px]" />
      </span>
      <div className="gap-4 w-full min-h-max form-body">{children}</div>
    </div>
  );
};

export default FormGroup;
