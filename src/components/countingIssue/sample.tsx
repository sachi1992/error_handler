import { ErrorHandler } from "../../errorHandler";

import Ex1 from "./ex1";
import Ex2 from "./ex2";

const Sample = (): JSX.Element => {
  const Person = {
    fn: "a",
    ln: "b",
  };

  return (
    <div>
      <ErrorHandler>
        <Ex1 Person={Person} />
        <Ex2 />
      </ErrorHandler>
    </div>
  );
};

export default Sample;
