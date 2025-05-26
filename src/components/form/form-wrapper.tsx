export interface FormWrapperProps {
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-[5] justify-center md:items-center max-h-svh overflow-y-auto">
      <div className="flex flex-col gap-4 p-4 sm:px-8 sm:py-6 w-full max-w-md min-h-max">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
