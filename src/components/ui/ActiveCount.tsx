interface ActiveCountProps {
  count: number;
}

const ActiveCount = ({ count }: ActiveCountProps) => {
  return <p>{count} items left</p>;
};

export default ActiveCount;
