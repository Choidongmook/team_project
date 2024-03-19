import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryState,
  dbWordList,
  meanListState,
  numberState,
  sectionState,
  wordListState,
} from "../atoms";
import styled from "styled-components";
import Button from "./Button";
import WordHeader from "./Word/WordHeader";
import WordRow from "./Word/WordRow";
import { useEffect, useRef, useState } from "react";
import { getCurrentList, getRandomWords } from "../utils/randomSelect";
import { useReactToPrint } from "react-to-print";
import WordPage from "./Word/WordPage";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 25px;
  border: #6f7071 solid 2px;
  width: fit-content;
  padding: 5px;
  font-weight: bold;
  color: #f5f6fa;
  background-color: #e1b12c;
  border-radius: 10px;

  ${(props) =>
    props.$current === "LIST"
      ? `
      transform: scale(1.1); 
      `
      : null}
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  /* background-color: red; */
  padding-top: 20px;
  /* padding-left: 15px; */
`;

const WordContainer = styled.div`
  /* background-color: blue; */
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 5px;
  padding-top: 20px;
  box-sizing: border-box;
`;

const WordOption = styled.div``;

const WordList = styled.div`
  /* background-color: green; */
  width: 100%;
  height: 90%;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 5px;
`;

const WordRows = styled.div`
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const WordSelect = styled.div`
  display: flex;
  gap: 5px;
`;

const WordSelectButton = styled.div`
  cursor: pointer;
  font-weight: 600;
`;

const PrintDiv = styled.div`
  display: none;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ListSec = () => {
  const [currentSection, setCurrentSection] = useRecoilState(sectionState);
  const category = useRecoilValue(categoryState);
  const number = useRecoilValue(numberState);
  const [currentPage, setCurrentPage] = useState(1);
  const dbList = useRecoilValue(dbWordList);
  const [meanList, setMeanList] = useRecoilState(meanListState);
  const [wordList, setWordList] = useRecoilState(wordListState);
  let rowCount = 1;

  const componentRef = useRef();

  useEffect(() => {
    if (dbList.length === 0) {
      return;
    }
    let totalMeanList = [];
    for (let page = 0; page < category.page; page++) {
      const meanObject = {
        id: page,
        list: getRandomWords(dbList, category.mean),
      };
      totalMeanList.push(meanObject);
    }
    setMeanList(totalMeanList);
    let totalWordList = [];
    for (let page = 0; page < category.page; page++) {
      const wordObject = {
        id: page,
        list: getRandomWords(dbList, category.word),
      };
      totalWordList.push(wordObject);
    }
    setWordList(totalWordList);
  }, [dbList, category, setMeanList, setWordList]);

  if (currentSection === "LIST") {
    console.log("List: ", category);
    console.log("List: ", number);
  }

  const pageInc = () => {
    if (currentPage + 1 > category.page) return;
    setCurrentPage(currentPage + 1);
  };

  const pageDec = () => {
    setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1);
  };

  const prevSection = (event) => {
    event.preventDefault();
    setCurrentSection("SELECT");
  };

  // select 태그의 onChange 이벤트 핸들러
  const handleSelectChange = (event) => {
    setCurrentPage(event.target.value); // 선택된 값 업데이트
  };

  const renderOptions = (count) => {
    const options = [];
    for (let i = 1; i <= count; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const printPage = () => {
    handlePrint();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "파일명",
  });

  return (
    <>
      <Wrapper>
        <Title $current={currentSection}>STEP 3</Title>
        <Content>
          <WordContainer>
            <WordOption>
              <select value={currentPage} onChange={handleSelectChange}>
                {renderOptions(category.page)}
              </select>
            </WordOption>
            <WordList>
              <WordHeader />
              <WordRows>
                {meanList.length === 0
                  ? null
                  : getCurrentList(meanList, currentPage - 1).map(
                      (item, index) => {
                        return (
                          <WordRow
                            count={rowCount++}
                            key={index}
                            category={"mean"}
                            mean={item.meaning}
                            word={item.word}
                            day={item.day}
                          />
                        );
                      }
                    )}
                {wordList.length === 0
                  ? null
                  : getCurrentList(wordList, currentPage - 1).map(
                      (item, index) => {
                        return (
                          <WordRow
                            count={rowCount++}
                            key={index}
                            category={"word"}
                            mean={item.meaning}
                            word={item.word}
                            day={item.day}
                          />
                        );
                      }
                    )}
              </WordRows>
            </WordList>
            <WordSelect>
              <WordSelectButton onClick={pageDec}>{"<"}</WordSelectButton>
              <div>{currentPage}</div>
              <WordSelectButton onClick={pageInc}>{">"}</WordSelectButton>
            </WordSelect>
          </WordContainer>

          <ButtonDiv>
            <Button onClick={prevSection} text={"이전"} />
            <Button onClick={printPage} text={"출력"} />
          </ButtonDiv>
        </Content>
      </Wrapper>
      <PrintDiv>
        <WordPage
          meanList={meanList}
          wordList={wordList}
          currentPage={currentPage}
          forPrintRef={componentRef}
        />
      </PrintDiv>
    </>
  );
};

export default ListSec;
