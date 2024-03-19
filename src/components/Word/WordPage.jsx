import styled from "styled-components";

const Wrapper = styled.div`
  background-color: blue;
  color: white;
`;

const WordPage = ({ meanList, wordList, currentPage, forPrintRef }) => {
  return (
    <Wrapper ref={forPrintRef}>
      <span>인쇄할 부분</span>
    </Wrapper>
  );
};

export default WordPage;
