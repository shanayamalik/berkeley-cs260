// API and Data Services for SilverLink using Open-Meteo (free weather API)

class WeatherService {
    constructor() {
        // Using Open-Meteo API (completely free, no registration required!)
        this.weatherUrl = 'https://api.open-meteo.com/v1/forecast';
        this.geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
    }

    // Get user's current location using browser geolocation
    async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser.'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    let errorMessage = 'Unable to get your location.';
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = 'Location access was denied. Please allow location access and try again.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Location information is unavailable.';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Location request timed out.';
                            break;
                    }
                    reject(new Error(errorMessage));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        });
    }

    // Get coordinates for a city name using Open-Meteo geocoding
    async getCityCoordinates(cityName) {
        try {
            const url = `${this.geocodingUrl}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const data = await response.json();
            if (!data.results || data.results.length === 0) {
                throw new Error('City not found');
            }
            
            const result = data.results[0];
            return {
                latitude: result.latitude,
                longitude: result.longitude,
                cityName: result.name,
                country: result.country || result.admin1 || '',
                timezone: result.timezone || 'UTC'
            };
        } catch (error) {
            throw new Error(`Unable to find "${cityName}". Please check the spelling and try again.`);
        }
    }

    // Get weather data using coordinates from Open-Meteo
    async getWeatherByCoordinates(latitude, longitude) {
        try {
            const url = `${this.weatherUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Weather data unavailable');
            }
            
            const data = await response.json();
            return this.processWeatherData(data);
        } catch (error) {
            throw new Error('Unable to get weather information right now. Please try again later.');
        }
    }

    // Get weather data using city name
    async getWeatherByCity(cityName) {
        try {
            const coordinates = await this.getCityCoordinates(cityName);
            const weather = await this.getWeatherByCoordinates(coordinates.latitude, coordinates.longitude);
            return {
                ...weather,
                location: coordinates.country ? `${coordinates.cityName}, ${coordinates.country}` : coordinates.cityName
            };
        } catch (error) {
            throw error;
        }
    }

    // Process raw weather data from Open-Meteo into friendly format
    processWeatherData(data) {
        const current = data.current;
        const weatherCode = current.weather_code;
        const isDay = current.is_day;
        
        return {
            temperature: Math.round(current.temperature_2m),
            feelsLike: Math.round(current.apparent_temperature),
            condition: this.getWeatherCondition(weatherCode, isDay),
            description: this.getWeatherDescription(weatherCode, isDay),
            humidity: Math.round(current.relative_humidity_2m),
            windSpeed: Math.round(current.wind_speed_10m),
            precipitation: current.precipitation || 0,
            isDay: isDay === 1,
            location: 'Current Location' // Will be updated by calling function
        };
    }

    // Convert Open-Meteo weather codes to readable conditions
    getWeatherCondition(code, isDay) {
        if (code === 0) return 'clear';
        if (code <= 3) return 'cloudy';
        if (code <= 48) return 'foggy';
        if (code <= 67) return 'rainy';
        if (code <= 77) return 'snowy';
        if (code <= 82) return 'rainy';
        if (code <= 86) return 'snowy';
        if (code <= 99) return 'stormy';
        return 'unknown';
    }

    // Convert Open-Meteo weather codes to readable descriptions
    getWeatherDescription(code, isDay) {
        const descriptions = {
            0: isDay ? 'clear sky' : 'clear night',
            1: 'mainly clear',
            2: 'partly cloudy',
            3: 'overcast',
            45: 'foggy',
            48: 'depositing rime fog',
            51: 'light drizzle',
            53: 'moderate drizzle',
            55: 'dense drizzle',
            56: 'light freezing drizzle',
            57: 'dense freezing drizzle',
            61: 'slight rain',
            63: 'moderate rain',
            65: 'heavy rain',
            66: 'light freezing rain',
            67: 'heavy freezing rain',
            71: 'slight snow fall',
            73: 'moderate snow fall',
            75: 'heavy snow fall',
            77: 'snow grains',
            80: 'slight rain showers',
            81: 'moderate rain showers',
            82: 'violent rain showers',
            85: 'slight snow showers',
            86: 'heavy snow showers',
            95: 'thunderstorm',
            96: 'thunderstorm with slight hail',
            99: 'thunderstorm with heavy hail'
        };
        
        return descriptions[code] || 'unknown weather';
    }

    // Generate friendly, conversational weather responses for seniors
    generateFriendlyResponse(weatherData) {
        const { temperature, feelsLike, condition, description } = weatherData;
        
        let greeting = this.getTimeBasedGreeting();
        let temperatureAdvice = this.getTemperatureAdvice(temperature, feelsLike);
        let clothingAdvice = this.getClothingAdvice(temperature, condition);
        let activitySuggestion = this.getActivitySuggestion(temperature, condition);
        
        return {
            mainMessage: `${greeting} It's ${temperature}°F today with ${description}. ${temperatureAdvice}`,
            clothingAdvice: clothingAdvice,
            activitySuggestion: activitySuggestion,
            location: weatherData.location
        };
    }

    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning!";
        if (hour < 17) return "Good afternoon!";
        return "Good evening!";
    }

    getTemperatureAdvice(temp, feelsLike) {
        if (Math.abs(feelsLike - temp) > 3) {
            if (feelsLike > temp) {
                return `It feels warmer though - more like ${feelsLike}°F.`;
            } else {
                return `It feels a bit cooler though - more like ${feelsLike}°F.`;
            }
        }
        return "The temperature feels just about right.";
    }

    getClothingAdvice(temperature, condition) {
        let advice = "";
        
        if (temperature >= 75) {
            advice = "Light, comfortable clothes would be perfect today.";
        } else if (temperature >= 65) {
            advice = "A light sweater or cardigan would be just right.";
        } else if (temperature >= 50) {
            advice = "You'll want a jacket today - it's a bit chilly.";
        } else {
            advice = "Bundle up today! You'll need a warm coat.";
        }

        if (condition.includes('rain')) {
            advice += " Don't forget an umbrella!";
        } else if (condition.includes('snow')) {
            advice += " Watch out for slippery conditions.";
        } else if (condition === 'clear') {
            advice += " Perfect weather to enjoy some sunshine.";
        }

        return advice;
    }

    getActivitySuggestion(temperature, condition) {
        if (condition.includes('rain') || condition.includes('storm')) {
            return "A great day to stay cozy inside with a good book or movie.";
        }
        
        if (temperature >= 70 && condition === 'clear') {
            return "Beautiful weather for a walk outside or sitting in the garden.";
        } else if (temperature >= 60) {
            return "Nice weather for a short walk or some fresh air on the porch.";
        } else if (temperature < 40) {
            return "Perfect day to stay warm inside with a hot cup of tea.";
        } else {
            return "Good day for indoor activities or a quick trip outside.";
        }
    }
}
