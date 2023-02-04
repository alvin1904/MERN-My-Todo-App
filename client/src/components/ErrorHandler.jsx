const ErrorHandler = ({ error }) => {
  return (
    <div className="errorPrinter">
      <div>{error || "We ran into some problem..."}</div>
    </div>
  );
};

export default ErrorHandler;
