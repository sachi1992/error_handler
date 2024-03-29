import { useEffect } from "react";

const Timeout = (): JSX.Element => {
  useEffect(() => {
    setTimeout(() => {
      throw new Error("Time out with page crashing error");
    }, 2);
  }, []);

  return <div className="py-4">Timeout Error</div>;
};

export default Timeout;
