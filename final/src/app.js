// Main SilverLink Application
let weatherService;

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
    weatherService = new WeatherService();
    showWelcome();
    console.log('SilverLink app initialized');
});

function showWelcome() {
    setActiveButton('Home');
    const content = `
        <div class="welcome-content">
            <h2>Welcome to SilverLink</h2>
            <p>Your friendly companion for everyday support. Choose an option from the menu to get started.</p>
            
            <div class="card">
                <h3 style="margin-bottom: 1rem; color: #4a5568;">What would you like to do today?</h3>
                <p style="color: #718096; margin-bottom: 1.5rem;">Select from the menu on the left, or click one of these quick options:</p>
                
                <button class="btn btn-primary" onclick="showWeather()" style="margin-right: 1rem;">
                    ☀️ Check Weather
                </button>
                <button class="btn btn-secondary" onclick="showInstructions()">
                    📖 Get Help
                </button>
            </div>
        </div>
    `;
    document.getElementById('app-content').innerHTML = content;
}

function showWeather() {
    setActiveButton('Weather');
    const content = `
        <div class="content-header">
            <h2>Weather Check</h2>
            <p>Get a friendly weather update to help you decide what to wear today</p>
        </div>
        
        <div class="card">
            <h3 style="margin-bottom: 1rem; color: #1e293b;">How would you like to check the weather?</h3>
            <p style="color: #64748b; margin-bottom: 1.5rem;">Choose your preferred method:</p>
            
            <div class="weather-options" style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
                <button class="btn btn-primary" onclick="getWeatherByLocation()">
                    📍 Use My Current Location
                </button>
                <button class="btn btn-secondary" onclick="showCityInput()">
                    🏙️ Enter a City Name
                </button>
            </div>
            
            <div id="weather-input-area"></div>
            <div id="weather-result-area"></div>
        </div>
    `;
    document.getElementById('app-content').innerHTML = content;
}

function showCityInput() {
    const inputArea = document.getElementById('weather-input-area');
    inputArea.innerHTML = `
        <div style="border-top: 1px solid rgba(147, 197, 253, 0.3); padding-top: 1.5rem; margin-top: 1.5rem;">
            <h4 style="margin-bottom: 1rem; color: #1e293b;">Enter Your City</h4>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
                <input 
                    type="text" 
                    id="city-input" 
                    placeholder="e.g., San Francisco, CA" 
                    style="flex: 1; padding: 0.75rem; border: 1px solid rgba(147, 197, 253, 0.4); border-radius: 8px; font-size: 1rem;"
                    onkeypress="if(event.key==='Enter') getWeatherByCity()"
                >
                <button class="btn btn-primary" onclick="getWeatherByCity()">
                    Get Weather
                </button>
            </div>
            <p style="font-size: 0.9rem; color: #64748b; margin-top: 0.5rem;">
                You can enter just the city name or include state/country (e.g., "London, UK")
            </p>
        </div>
    `;
    setTimeout(() => {
        document.getElementById('city-input').focus();
    }, 100);
}

async function getWeatherByLocation() {
    const resultArea = document.getElementById('weather-result-area');
    resultArea.innerHTML = `
        <div style="text-align: center; padding: 2rem; border-top: 1px solid rgba(147, 197, 253, 0.3); margin-top: 1.5rem;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">🌤️</div>
            <p style="color: #64748b;">Getting your location and checking the weather...</p>
        </div>
    `;
    
    try {
        const location = await weatherService.getCurrentLocation();
        const weatherData = await weatherService.getWeatherByCoordinates(location.latitude, location.longitude);
        const weatherResponse = weatherService.generateFriendlyResponse(weatherData);
        displayWeatherResult(weatherResponse, weatherData.location);
    } catch (error) {
        displayWeatherError(error.message);
    }
}

async function getWeatherByCity() {
    const cityInput = document.getElementById('city-input');
    const cityName = cityInput.value.trim();
    
    if (!cityName) {
        displayWeatherError('Please enter a city name.');
        return;
    }
    
    const resultArea = document.getElementById('weather-result-area');
    resultArea.innerHTML = `
        <div style="text-align: center; padding: 2rem; border-top: 1px solid rgba(147, 197, 253, 0.3); margin-top: 1.5rem;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">🌤️</div>
            <p style="color: #64748b;">Checking the weather for ${cityName}...</p>
        </div>
    `;
    
    try {
        const weatherData = await weatherService.getWeatherByCity(cityName);
        const weatherResponse = weatherService.generateFriendlyResponse(weatherData);
        displayWeatherResult(weatherResponse, weatherData.location);
    } catch (error) {
        displayWeatherError(error.message);
    }
}

function displayWeatherResult(weatherData, locationName) {
    const resultArea = document.getElementById('weather-result-area');
    resultArea.innerHTML = `
        <div style="border-top: 1px solid rgba(147, 197, 253, 0.3); margin-top: 1.5rem; padding-top: 1.5rem;">
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem;">
                <div style="text-align: center; margin-bottom: 1rem;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">☀️</div>
                    <h3 style="color: #1e293b; margin: 0;">${locationName}</h3>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.8); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
                    <p style="font-size: 1.1rem; color: #1e293b; margin: 0; line-height: 1.6;">
                        ${weatherData.mainMessage}
                    </p>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.8); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
                    <h4 style="color: #1e293b; margin: 0 0 0.5rem 0; font-size: 1rem;">👔 What to Wear</h4>
                    <p style="color: #374151; margin: 0; line-height: 1.5;">
                        ${weatherData.clothingAdvice}
                    </p>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.8); border-radius: 8px; padding: 1rem;">
                    <h4 style="color: #1e293b; margin: 0 0 0.5rem 0; font-size: 1rem;">💡 Suggestion</h4>
                    <p style="color: #374151; margin: 0; line-height: 1.5;">
                        ${weatherData.activitySuggestion}
                    </p>
                </div>
            </div>
            
            <div style="text-align: center;">
                <button class="btn btn-secondary" onclick="showWeather()">
                    🔄 Check Another Location
                </button>
            </div>
        </div>
    `;
}

function displayWeatherError(errorMessage) {
    const resultArea = document.getElementById('weather-result-area');
    resultArea.innerHTML = `
        <div style="border-top: 1px solid rgba(147, 197, 253, 0.3); margin-top: 1.5rem; padding-top: 1.5rem;">
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 1rem; text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">😔</div>
                <p style="color: #dc2626; margin: 0 0 1rem 0; font-weight: 500;">
                    ${errorMessage}
                </p>
                <button class="btn btn-primary" onclick="showWeather()">
                    Try Again
                </button>
            </div>
        </div>
    `;
}

function showInstructions() {
    setActiveButton('Instructions');
    const content = `
        <div class="content-header">
            <h2>Simplify Instructions</h2>
            <p>Take a photo of any manual or instructions, and I'll make them easier to understand</p>
        </div>
        
        <div class="card">
            <h3 style="margin-bottom: 1rem; color: #4a5568;">Instructions Feature</h3>
            <p style="color: #718096; margin-bottom: 1.5rem;">This feature is coming soon! We'll help you simplify complex instructions.</p>
            
            <button class="btn btn-primary">
                📷 Upload Photo (Coming Soon)
            </button>
        </div>
    `;
    document.getElementById('app-content').innerHTML = content;
}

function showConnect() {
    setActiveButton('Connect');
    const content = `
        <div class="content-header">
            <h2>Connect with Friends</h2>
            <p>Find a friendly volunteer who shares your interests for a nice chat</p>
        </div>
        
        <div class="card">
            <h3 style="margin-bottom: 1rem; color: #4a5568;">Connect Feature</h3>
            <p style="color: #718096; margin-bottom: 1.5rem;">This feature is coming soon! We'll help you connect with friendly volunteers.</p>
            
            <button class="btn btn-primary">
                👥 Find a Friend (Coming Soon)
            </button>
        </div>
    `;
    document.getElementById('app-content').innerHTML = content;
}

function setActiveButton(buttonText) {
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-button').forEach(btn => {
        if (btn.textContent.trim().includes(buttonText)) {
            btn.classList.add('active');
        }
    });
}
