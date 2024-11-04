// 모달의 정렬을 조정하는 유틸리티 함수
export function adjustModalAlignment(modalOverlay, modalContent) {
    console.log("Adjusting modal alignment...");
    console.log("Window height:", window.innerHeight);
    console.log("Modal height:", modalContent.offsetHeight);

    const windowHeight = window.innerHeight;
    const modalHeight = modalContent.offsetHeight;

    // 모달 높이가 윈도우 높이를 넘는 경우 align-items: flex-start로 설정
    if (modalHeight > windowHeight) {
        modalOverlay.style.setProperty('align-items', 'flex-start', 'important');
    } else {
        modalOverlay.style.setProperty('align-items', 'center', 'important');
    }
}

// 모달 정렬을 관리하는 이벤트 리스너 추가
export function addModalAlignmentListener(modalOverlay, modalContent) {
    function handleResize() {
        adjustModalAlignment(modalOverlay, modalContent);
    }

    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}