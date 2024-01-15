
interface IProps {
  onClickAway(): void;
}

const ClickAwayButton = ({ onClickAway }: IProps) => {
  return (
    <button
      className="fixed inset-0 h-full w-full outline-none"
      onClick={onClickAway}
      tabIndex={-1}
    ></button>
  );
};

export default ClickAwayButton;