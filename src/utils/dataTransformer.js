/**
 * File: src/utils/dataTransformer.js
 * Chứa các hàm logic để chuyển đổi cấu trúc dữ liệu sự kiện.
 */

// Các trường bài hát chi tiết cần được gom lại và xóa khỏi đối tượng gốc
const SONG_FIELDS_TO_PROCESS = [
    'nhapLeSong', 'dapCaSong', 'alleluiaSong', 
    'dangLeSong', 'hiepLeSong', 'ketLeSong', 'ducMeSong',
];

/**
 * Hàm hỗ trợ định dạng chuỗi bài hát: "Title - Songbook (Page)"
 * @param {object} song - Đối tượng bài hát (nhapLeSong, dapCaSong,...)
 * @returns {string|null} Chuỗi đã định dạng (ví dụ: "Hãy sẵn sàng - Hát Cộng Đồng (1)").
 */
export const formatSong = (song) => {
    // Kiểm tra xem dữ liệu bài hát có hợp lệ không
    if (!song || typeof song !== 'object') return null;
    
    // Kiểm tra và định dạng số trang
    const page = song.songbook_page ? `tr.${song.songbook_page}` : ''; 
    
    // Ghép lại thành chuỗi theo yêu cầu
    return `${song.title} - ${page} ${song.songbook} `.trim();
};

/**
 * Hàm chuyển đổi một đối tượng sự kiện đơn lẻ.
 * * Quan trọng: Hàm này tạo ra một bản sao sâu (deep copy) của event 
 * để đảm bảo không làm thay đổi dữ liệu gốc (state) của React.
 * * @param {object} event - Đối tượng sự kiện đơn lẻ.
 * @returns {object} Đối tượng sự kiện đã chuyển đổi (có trường 'program').
 */
export const transformSingleEvent = (event) => {
    // Luôn tạo bản sao sâu để tránh side effects
    const transformedEvent = JSON.parse(JSON.stringify(event)); 
    const program = {};

    SONG_FIELDS_TO_PROCESS.forEach(key => {
        const songData = transformedEvent[key]; 

        if (songData) {
            // Định dạng chuỗi và thêm vào đối tượng 'program'
            program[key] = formatSong(songData);
        }

        // Xóa trường bài hát chi tiết khỏi transformedEvent
        delete transformedEvent[key];
    });

    // Gán đối tượng 'program' đã tạo vào sự kiện đã chuyển đổi
    transformedEvent.program = program;

    return transformedEvent;
};

/**
 * Hàm chuyển đổi toàn bộ mảng dữ liệu sự kiện (Sử dụng cho xử lý dữ liệu API).
 * @param {Array<object>} events - Mảng các đối tượng sự kiện gốc.
 * @returns {Array<object>} Mảng các đối tượng sự kiện đã chuyển đổi.
 */
export const transformEventData = (events) => {
    if (!Array.isArray(events)) return [];
    return events.map(transformSingleEvent);
};