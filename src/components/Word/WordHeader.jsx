import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr 1fr 1fr;
  padding-top: 10px;
  div {
    text-align: center;
    padding: 4px 0;
    font-size: 18px;
    font-weight: 500;
  }
`;

const WordHeader = () => {
  return (
    <>
      <Header>
        <div>번호</div>
        <div>형식</div>
        <div>Day</div>
        <div>영단어</div>
        <div>뜻</div>
      </Header>
    </>
  );
};

export default WordHeader;
