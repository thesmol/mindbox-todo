import React from "react";

interface ActiveCountProps {
  count: number;
}

const ActiveCount: React.FC<ActiveCountProps> = ({
  count,
}: ActiveCountProps) => {
  return <p>{count} items left</p>;
};

export default ActiveCount;
