import styled from "styled-components";

const SubmitInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  margin: 0;
  padding: 0.5rem 1rem;

  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 4px;

  display: inline-block;
  width: auto;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  background-color: #2f3640;
  color: #fff;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    outline: 0;
    background: #576175;
  }
`;

const Button = ({ text, onClick }) => {
  return (
    <SubmitInput
      onClick={onClick ? onClick : null}
      type="submit"
      value={text}
    />
  );
};

export default Button;
