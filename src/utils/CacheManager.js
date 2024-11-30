class CacheManager {
    constructor(fetchFunction) {
        this.cache = null; // 캐싱된 데이터
        this.isFetching = false; // 현재 요청 중인지 상태
        this.fetchFunction = fetchFunction; // 데이터 fetch 함수
    }

    // SessionStorage 활용이 더 좋을듯?
    async getCache() {
        console.log("getCache start");
        if (this.cache) return this.cache; // 캐시된 데이터 반환
        console.log("not found cachedData... loading...")
        if (this.isFetching) {
            // 이미 요청 중이면 기다림
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (this.cache) {
                        clearInterval(interval);
                        resolve(this.cache);
                    }
                }, 100); // 100ms 간격으로 캐시 확인
            });
        }

        this.isFetching = true; // 요청 상태 활성화
        try {
            this.cache = await this.fetchFunction(); // fetchFunction 실행
            return this.cache;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        } finally {
            this.isFetching = false; // 요청 상태 비활성화
        }
    }

    clearCache() {
        this.cache = null; // 캐시 초기화
    }
}

export default CacheManager;
