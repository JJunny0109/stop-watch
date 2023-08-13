// Get HTML Elements
const stopwatchDisplay = document.querySelector("#stopwatchDisplay");
const resetBtn = document.querySelector("#resetBtn");
const startPauseBtn = document.querySelector("#startPauseBtn");

// 변수 설정
let startTime = 0; // 시간 값, 초기값은 0
let intervalId; // 타이머 간격을 저장할 변수
let isRunning = false; //스톱워치가 시작되어있는지를 확인하는 변수

// 이벤트 핸들러 추가
// startPause 버튼 클릭 시
startPauseBtn.addEventListener("click", () => {
  if (isRunning == false) {
    startStopwatch(); // 스톱워치 시작
    // 버튼 상태 변경: 시작 버튼 -> 일시정지 버튼, 리셋버튼 활성화
  } else {
    clearInterval(intervalId); // 타이머 간격 제거 == 스톱워치 일시정지
    // 버튼 상태 변경 : 일시정지 버튼 -> 시작 버튼
  }
});

// reset 버튼 클릭 시
resetBtn.addEventListener("click", () => {
  clearInterval(intervalId); // 타이머 간격 제거하여 스톱워치 멈춤
  // 스톱워치 초기화 및 버튼 상태 변경
});


// 스톱워치 함수 구현
function startStopwatch() {
  startTime = Date.now(); // 버튼 클릭 시점의 시간으로 설정
  intervalId = setInterval(updateTime, 1000); // 1초마다 updateTime 함수 호출
}

// 시간 업데이트 함수
function updateTime() {
  const currentTime = Date.now(); // 현재 시간을 가져옴
  const elapsedTime = currentTime - startTime; // 경과된 시간 계산
  console.log(elapsedTime);
  // elapsedTime를 화면에 표시하기 위해 분:초 형식으로 변환 후 화면 업데이트
}