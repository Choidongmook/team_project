import styled from "styled-components";

const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr 1fr 1fr;
  background-color: #ecf0f1;
  border-radius: 10px;
  div {
    text-align: center;
    padding: 7px 0;
    font-size: 13px;
  }
`;

const CategoryDiv = styled.div`
  display: flex;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
    width: fit-content;
    background-color: ${(props) =>
      props.$categoryColor === "mean" ? "#d35400" : "#2980b9"};
    padding: 3px 4px;
    border-radius: 5px;
    color: #fff;
    font-weight: 500;
  }
`;

const WordDiv = styled.div`
  font-weight: ${(props) => (props.$fontBold === "word" ? "bold" : null)};
`;

const MeanDiv = styled.div`
  font-weight: ${(props) => (props.$fontBold === "mean" ? "bold" : null)};
`;

const WordRow = ({ category, mean, word, day, count }) => {
  return (
    <Row>
      <div>{count}</div>
      <CategoryDiv $categoryColor={category}>
        <div>{category === "mean" ? "뜻" : "영단어"}</div>
      </CategoryDiv>
      <div>{day}</div>
      <WordDiv $fontBold={category}>{word}</WordDiv>
      <MeanDiv $fontBold={category}>{mean}</MeanDiv>
    </Row>
  );
};

export default WordRow;
