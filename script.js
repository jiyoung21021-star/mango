// 웹 페이지 요소가 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', () => {
    const cardWrapper = document.getElementById('cardWrapper');
    const toggleBtn = document.getElementById('toggleBtn');
    const cardShine = document.getElementById('cardShine');

    // 1. 전환 버튼 클릭 이벤트 (3D 카드 뒤집기)
    toggleBtn.addEventListener('click', () => {
        cardWrapper.classList.toggle('flipped');
        
        // 뒤집힐 때 마우스 틸트 효과 리셋
        resetTilt();
        
        // 모바일 터치 진동 피드백 (지원 기기만)
        if (navigator.vibrate) {
            navigator.vibrate(15); 
        }
    });

    // 2. 3D 마우스 틸트 & 광택 효과 (PC 데스크톱 환경용)
    cardWrapper.addEventListener('mousemove', (e) => {
        // 이력서 보기 상태(flipped)일 때는 틸트 및 광택 효과를 차단합니다.
        if (cardWrapper.classList.contains('flipped')) return;

        // 마우스 무브 반응을 빠르게 하기 위해 transition 임시 제거
        cardWrapper.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1), height 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.08s ease-out';

        const rect = cardWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left; // 카드 내 마우스 X 좌표
        const y = e.clientY - rect.top;  // 카드 내 마우스 Y 좌표
        
        const width = rect.width;
        const height = rect.height;

        // 카드 중심 기준으로 각도 계산 (-12도 ~ 12도 범위 기울기)
        const rotateX = ((y / height) - 0.5) * -16;
        const rotateY = ((x / width) - 0.5) * 16;

        // CSS 커스텀 변수를 업데이트하여 광택 그래디언트 위치 제어
        cardWrapper.style.setProperty('--shine-x', `${(x / width) * 100}%`);
        cardWrapper.style.setProperty('--shine-y', `${(y / height) * 100}%`);

        // 카드 회전 및 섀도우를 위한 약간의 부유(scale) 효과 부여
        cardWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    // 마우스가 카드를 나갈 때 원래대로 부드럽게 리셋
    cardWrapper.addEventListener('mouseleave', () => {
        resetTilt();
    });

    // 리셋 공통 함수
    function resetTilt() {
        // 복귀 시에는 부드러운 애니메이션이 적용되도록 transition 복구
        cardWrapper.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1), height 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        if (cardWrapper.classList.contains('flipped')) {
            // 이력서 모드인 경우 기본 180도 뒤집어진 상태 유지
            cardWrapper.style.transform = 'rotateY(180deg)';
        } else {
            // 명함 모드인 경우 0도 및 축소(1배) 복귀
            cardWrapper.style.transform = 'rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
        }
    }
});
