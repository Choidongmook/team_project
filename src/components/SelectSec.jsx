import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryState, sectionState } from "../atoms";
import Button from "./Button";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 35px;
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
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 50px;
`;

const RowDiv = styled.div`
  display: flex;
  align-items: center;
`;

const CircleButton = styled.div`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  font-size: 13px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 50%;
  padding-bottom: 1px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;

  background-color: #2f3640;
  color: #fff;

  cursor: pointer;
`;

const TextBox = styled.input`
  -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
  appearance: none; // 기본 브라우저에서 기본 스타일 제거
  font-size: 15px;
  color: #222222;
  width: 40px;
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 10px;
  text-align: center;
  position: relative;
  background: none;

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: ${(props) =>
      props.autobg === "SELECT"
        ? "0 0 0 30px #f5f6fa inset"
        : "0 0 0 30px #dcdde1 inset"};
    /* -webkit-box-shadow: 0 0 0 30px #fff inset; */
    -webkit-text-fill-color: #000;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const SelectSec = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [currentSection, setCurrentSection] = useRecoilState(sectionState);
  const setCategory = useSetRecoilState(categoryState);
  const [meanCount, setMeanCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const onValid = (data) => {
    const mean = data.mean ? +data.mean : 0;
    const word = data.word ? +data.word : 0;
    //총 단어 개수 보다는 적어야 함
    setCategory({
      mean,
      word,
    });
    setCurrentSection("LIST");
    //db통신
  };

  const onClick = (event) => {
    event.preventDefault();
    setCurrentSection("RANGE");
  };

  const minusCount = (state) => {
    if (state === "mean") {
      setMeanCount((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    } else {
      setWordCount((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    }
  };

  const plusCount = (state) => {
    const MAX = 1000;
    if (state === "mean") {
      setMeanCount((prev) => (prev + 1 <= MAX ? prev + 1 : MAX));
    } else {
      setWordCount((prev) => (prev + 1 <= MAX ? prev + 1 : MAX));
    }
  };

  const changeValue = (state) => {
    console.log(watch());
    if (state === "mean") {
      setMeanCount(watch(state));
      setValue("mean", meanCount);
    } else {
      setWordCount(watch(state));
      setValue("word", wordCount);
    }
  };

  useEffect(() => {
    setValue("mean", meanCount);
    setValue("word", wordCount);
  }, [meanCount, wordCount, setValue]);

  return (
    <>
      <Wrapper>
        <Title>STEP 2</Title>
        <Content>
          <Form onSubmit={handleSubmit(onValid)}>
            <RowDiv>
              <label htmlFor="mean">뜻</label>
              <CircleButton onClick={() => minusCount("mean")}>-</CircleButton>
              <TextBox
                onChange={() => changeValue("mean")}
                id="mean"
                {...register("mean")}
                min={0}
                type="number"
                autobg={currentSection}
              />
              <CircleButton onClick={() => plusCount("mean")}>+</CircleButton>개
            </RowDiv>
            <RowDiv>
              <label htmlFor="word">단어</label>
              <CircleButton onClick={() => minusCount("word")}>-</CircleButton>
              <TextBox
                onChange={() => changeValue("mean")}
                id="word"
                {...register("word")}
                min={0}
                type="number"
                autobg={currentSection}
              />
              <CircleButton onClick={() => plusCount("word")}>+</CircleButton>개
            </RowDiv>
            {/* <button onClick={onClick}>이전</button>
        <input type="submit" value="다음" /> */}
            <Button onClick={onClick} text={"이전"} />
            <Button text={"다음"} />
          </Form>
        </Content>
      </Wrapper>
    </>
  );
};

export default SelectSec;
