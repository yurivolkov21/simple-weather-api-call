// Lấy các elements từ DOM
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const weatherResult = document.getElementById('weatherResult');
const errorMessage = document.getElementById('errorMessage');

// Elements để hiển thị dữ liệu thời tiết
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Hàm để ẩn tất cả các sections
function hideAllSections() {
    loading.style.display = 'none';
    weatherResult.style.display = 'none';
    errorMessage.style.display = 'none';
}

// Hàm hiển thị loading
function showLoading() {
    hideAllSections();
    loading.style.display = 'block';
}

// Hàm hiển thị lỗi
function showError(message) {
    hideAllSections();
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Hàm hiển thị kết quả
function showWeather(data) {
    hideAllSections();

    cityName.textContent = data.city;
    temperature.textContent = `${data.temperature} °C`;
    description.textContent = data.description;
    humidity.textContent = `${data.humidity}%`;
    windSpeed.textContent = `${data.windSpeed} m/s`;

    weatherResult.style.display = 'block';
}

// Hàm fetch weather data từ server
async function fetchWeather(city) {
    try {
        showLoading();

        // Gọi API server (không gọi trực tiếp OpenWeatherMap!)
        const response = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`);

        // Kiểm tra phản hồi từ server
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi khi lấy dữ liệu thời tiết');
        }

        // Parse JSON và hiển thị
        const data = await response.json();
        showWeather(data);

    } catch (error) {
        showError(`${error.message}`);
        console.error('Error fetching weather data:', error);
    }
}

// Event listener cho button
searchBtn.addEventListener('click', () => {
    const city = cityInput.ariaValueMax.trim();

    if (!city) {
        showError('Vui lòng nhập tên thành phố.');
        return;
    }

    fetchWeather(city);
});

// Event listener cho Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

cityInput.focus();