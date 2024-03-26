import PropTypes from "prop-types";

import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, numberState } from "../../atoms";
import { useEffect, useState } from "react";
import { getCurrentList } from "../../utils/randomSelect";

const Wrapper = styled.div`
  height: 100vh;
`;

const PageContainer = styled.div`
  width: 100%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  box-sizing: border-box;
  page-break-after: always;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const PageTitle = styled.h1`
  font-size: 30px;
`;

const PageName = styled.div`
  width: 100%;
  text-align: end;
  font-size: 18px;
`;

const PageProblem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-size: 20px;
`;

const ProblemDiv = styled.div`
  width: 55%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProblemLeft = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const ProblemNum = styled.span`
  font-size: 18px;
`;

const Problem = styled.span``;

const ProblemLine = styled.span`
  font-size: 20px;
`;

const WordPage = ({ meanList, wordList, forPrintRef }) => {
  const number = useRecoilValue(numberState);
  const category = useRecoilValue(categoryState);

  let count = 0;

  return (
    <Wrapper ref={forPrintRef}>
      {Array.from({ length: category.page }).map((_, page) => (
        <PageContainer key={page}>
          <PageHeader>
            <PageTitle>단어 테스트 Day</PageTitle>
            <PageName>
              이름 :
              &#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;
            </PageName>
          </PageHeader>
          <PageProblem>
            {category.mean !== 0
              ? getCurrentList(meanList, page)?.map((item, index) => {
                  return (
                    <ProblemDiv key={index}>
                      <ProblemLeft>
                        <ProblemNum>
                          {count + 1 > category.mean + category.word
                            ? (count = 1)
                            : ++count}
                          .
                        </ProblemNum>
                        <Problem>{item.word}</Problem>
                      </ProblemLeft>
                      <ProblemLine>
                        &#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;
                      </ProblemLine>
                    </ProblemDiv>
                  );
                })
              : null}

            {category.word !== 0
              ? getCurrentList(wordList, page).map((item, index) => {
                  return (
                    <ProblemDiv key={index}>
                      <ProblemLeft>
                        <ProblemNum>
                          {count + 1 > category.mean + category.word
                            ? (count = 1)
                            : ++count}
                          .
                        </ProblemNum>
                        <Problem>{item.meaning}</Problem>
                      </ProblemLeft>
                      <ProblemLine>
                        &#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;
                      </ProblemLine>
                    </ProblemDiv>
                  );
                })
              : null}
          </PageProblem>
        </PageContainer>
      ))}
    </Wrapper>
  );
};

// WordPage.propTypes = {
//   //수정필요
//   meanList: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       list: PropTypes.arrayOf(PropTypes.number).isRequired,
//     })
//   ).isRequired,
//   //수정필요
//   wordList: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       list: PropTypes.arrayOf(PropTypes.number).isRequired,
//     })
//   ).isRequired,
//   currentPage: PropTypes.number.isRequired,
//   forPrintRef: PropTypes.object.isRequired,
// };

export default WordPage;
