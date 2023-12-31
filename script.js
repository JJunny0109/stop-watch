// Get HTML Elements
const stopwatchDisplay = document.querySelector("#stopwatchDisplay");
const resetBtn = document.querySelector("#resetBtn");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");

// 변수 설정
let startTime = 0; // 시간 값이다. 초기값은 0
let intervalId; // 타이머 간격을 저장할 변수
let isPaused = false; //스톱워치가 시작되어있는지를 확인하는 변수
let pausedTime = 0; // pause 버튼을 눌렀을 때 스톱워치 시간 값. 초기값은 0


// 이벤트 핸들러 추가
// start 버튼 클릭 시
startBtn.addEventListener("click", () => {
  // 스톱워치 함수 구현
  if (isPaused) { // 재시작 시, 저장된 일시정지 시간을 사용하여 스톱워치 시작
    startTime = Date.now() - pausedTime; // 버튼 클릭 시점의 시간으로 설정
  } else { // 처음 시작 시
    startTime = Date.now();
  }
  intervalId = setInterval(updateTime, 10); // 1초마다 updateTime 함수 호출
  isPaused = false; // 스톱워치가 활성화 된 것을 변수로 저장

  // 버튼 상태 변경 :  시작 버튼 -> 일시정지 버튼
  startBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
  resetBtn.disabled = false; // 리셋버튼 활성화
});

// pause 버튼 클릭 시
pauseBtn.addEventListener("click", () => {
  clearInterval(intervalId); // 타이머 간격 제거 == 스톱워치 일시정지
  pausedTime = Date.now() - startTime; // 일시정지된 시간 저장
  isPaused = true; // 스톱워치가 비활성화 된 것을 변수로 저장

  // 버튼 상태 변경 : 일시정지 버튼 -> 시작 버튼
  pauseBtn.style.display = "none";
  startBtn.style.display = "inline-block";
});

// reset 버튼 클릭 시
resetBtn.addEventListener("click", () => {
  clearInterval(intervalId); // 타이머 간격 제거하여 스톱워치 멈춤
  isPaused = false; // 스톱워치가 비활성화 된 것을 변수로 저장
  startTime = 0; //시작 시간을 0으로 초기화
  stopwatchDisplay.innerHTML = `00:00:00.00` // 스톱워치 초기화

  // 버튼 상태 변경
  resetBtn.disabled = true; // 리셋버튼 비활성화
    if (!isPaused) { // if the stopwatch is running, hide pause-btn and show start-btn
      pauseBtn.style.display = "none";
      startBtn.style.display = "inline-block";
    }
});



// 시간 업데이트 함수
function updateTime() {
  const currentTime = Date.now(); // 현재 시각을 가져옴
  const elapsedTime = currentTime - startTime; // 경과된 시간 계산
  // console.log(startTime);
  // console.log(elapsedTime);

  // elapsedTime를 화면에 표시하기 위해 분:초 형식으로 변환 후 화면 업데이트
  formatElapsedTime(elapsedTime);
}

// 밀리초를 시, 분, 초, 밀리초로 변환하는 함수
function formatElapsedTime(Elapsed_Time) {
  const hours = parseInt(Elapsed_Time / 3600000);
  const minutes = parseInt((Elapsed_Time % 3600000) / 60000);
  const seconds = parseInt((Elapsed_Time % 60000) / 1000);
  const milliseconds = Elapsed_Time % 1000;
  // console.log(formatTime(hours, minutes, seconds, milliseconds));

  // 시간 형식 표시
  stopwatchDisplay.innerHTML = formatTime(hours, minutes, seconds, milliseconds);
}

// 시, 분, 초, 밀리초를 입력 받아 -> 00:00:00.00 형식으로 출력하는 함수
function formatTime(Hours, Minutes, Seconds, Milliseconds) {
  const formattedHours = Hours.toString().padStart(2, '0');
  const formattedMinutes = Minutes.toString().padStart(2, '0');
  const formattedSeconds = Seconds.toString().padStart(2, '0');
  
  // 밀리초가 3자리 수 이므로 이를 다시 2자리 수로 변환
  const formattedMilliseconds0 = Milliseconds.toString().padStart(2, '0');
  const formattedMilliseconds = formattedMilliseconds0.substr(0, 2);

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}