// export const generateTotalList = (arr, numbers) => {
//   // 주어진 숫자 배열에서 각각 1을 뺀 값을 새로운 배열에 저장
//   const modifiedNumbers = numbers.map((num) => num - 1);

//   // 새로운 배열에 있는 값들을 사용하여 'day'에 해당하는 객체들을 하나의 배열로 묶기
//   const combinedWords = modifiedNumbers.reduce((accumulator, currentValue) => {
//     const key = `day${currentValue + 1}`;
//     const foundItem = arr.find((item) =>
//       Object.prototype.hasOwnProperty.call(item, key)
//     );
//     if (foundItem) {
//       accumulator.push(...foundItem[key]);
//     }
//     return accumulator;
//   }, []);

//   return combinedWords;
// };

export function generateTotalList(arr, numbers) {
  const result = [];
  numbers.forEach((number) => {
    const index = number - 1;
    if (index >= 0 && index < arr.length) {
      result.push(arr[index]);
    }
  });
  return result;
}

// export function getRandomWords(arr, num) {
//   const result = [];
//   for (let i = 0; i < num; i++) {
//     const randomCategoryIndex = Math.floor(Math.random() * arr.length);
//     const randomWordIndex = Math.floor(
//       Math.random() * arr[randomCategoryIndex].list.length
//     );
//     const randomWord = arr[randomCategoryIndex].list[randomWordIndex];
//     result.push(randomWord);
//   }
//   result.sort((a, b) => a.day - b.day);
//   return result;
// }

export function getRandomWords(arr, num) {
  const result = [];
  const selectedIndexes = new Set(); // 중복 체크를 위한 Set

  while (result.length < num) {
    const randomCategoryIndex = Math.floor(Math.random() * arr.length);
    const randomWordIndex = Math.floor(
      Math.random() * arr[randomCategoryIndex].list.length
    );
    const randomWord = arr[randomCategoryIndex].list[randomWordIndex];
    const wordIndex = `${randomCategoryIndex}-${randomWordIndex}`; // 요소 인덱스 생성

    // 중복 체크
    if (!selectedIndexes.has(wordIndex)) {
      result.push(randomWord);
      selectedIndexes.add(wordIndex); // 선택된 요소 인덱스 추가
    }
  }

  //result.sort((a, b) => a.day - b.day);
  return result;
}

export const generateRandomList = (arr, count) => {
  // 배열이 비어있거나 count가 0보다 작으면 빈 배열 반환
  if (count <= 0) {
    return [];
  }

  // 배열의 길이보다 count가 더 크면 배열의 길이로 count를 조정
  if (count > arr.length) {
    count = arr.length;
  }

  const shuffledArray = arr.slice().sort(() => Math.random() - 0.5); // 배열을 무작위로 섞음
  return shuffledArray.slice(0, count); // 섞인 배열에서 count만큼 요소를 선택하여 반환
};

export const getCurrentList = (arr, count) => {
  const foundItem = arr.find((item) => item.id === count);
  if (!foundItem) {
    console.log("getCurrent", arr, count);

    return [];
  }
  return foundItem.list;
};
