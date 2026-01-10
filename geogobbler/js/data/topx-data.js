GAME_DATA.topx = {
    data: [
        // Demographic data for countries (simplified but representative)
        // Format: { country: "Name", population: millions, populationDensity: per kmÂ², muslimPercent: %, christianPercent: %, languages: count, urbanization: %, medianAge: years, literacyRate: %, gdpPerCapita: USD, lifeExpectancy: years, internetPenetration: %, mobilePenetration: % }
        
        // Major countries with diverse demographics
        { country: "China", population: 1425, populationDensity: 151, muslimPercent: 1.8, christianPercent: 5.1, languages: 302, urbanization: 64, medianAge: 38, literacyRate: 97, gdpPerCapita: 12500, lifeExpectancy: 77, internetPenetration: 73, mobilePenetration: 115 },
        { country: "India", population: 1428, populationDensity: 464, muslimPercent: 14.2, christianPercent: 2.3, languages: 447, urbanization: 35, medianAge: 28, literacyRate: 74, gdpPerCapita: 2300, lifeExpectancy: 70, internetPenetration: 50, mobilePenetration: 85 },
        { country: "United States", population: 339, populationDensity: 36, muslimPercent: 1.1, christianPercent: 70.6, languages: 430, urbanization: 83, medianAge: 38, literacyRate: 99, gdpPerCapita: 76300, lifeExpectancy: 79, internetPenetration: 92, mobilePenetration: 127 },
        { country: "Indonesia", population: 278, populationDensity: 147, muslimPercent: 87.2, christianPercent: 10.7, languages: 710, urbanization: 57, medianAge: 30, literacyRate: 96, gdpPerCapita: 4800, lifeExpectancy: 72, internetPenetration: 73, mobilePenetration: 133 },
        { country: "Pakistan", population: 240, populationDensity: 287, muslimPercent: 96.5, christianPercent: 1.6, languages: 77, urbanization: 38, medianAge: 23, literacyRate: 58, gdpPerCapita: 1600, lifeExpectancy: 68, internetPenetration: 36, mobilePenetration: 78 },
        { country: "Brazil", population: 216, populationDensity: 25, muslimPercent: 0.2, christianPercent: 88.9, languages: 228, urbanization: 88, medianAge: 33, literacyRate: 93, gdpPerCapita: 8800, lifeExpectancy: 76, internetPenetration: 81, mobilePenetration: 120 },
        { country: "Bangladesh", population: 173, populationDensity: 1265, muslimPercent: 90.4, christianPercent: 0.4, languages: 39, urbanization: 39, medianAge: 28, literacyRate: 75, gdpPerCapita: 2600, lifeExpectancy: 73, internetPenetration: 35, mobilePenetration: 102 },
        { country: "Russia", population: 144, populationDensity: 9, muslimPercent: 10, christianPercent: 71, languages: 100, urbanization: 74, medianAge: 40, literacyRate: 100, gdpPerCapita: 12000, lifeExpectancy: 73, internetPenetration: 83, mobilePenetration: 160 },
        { country: "Mexico", population: 128, populationDensity: 66, muslimPercent: 0.2, christianPercent: 92.4, languages: 68, urbanization: 81, medianAge: 29, literacyRate: 95, gdpPerCapita: 10000, lifeExpectancy: 75, internetPenetration: 72, mobilePenetration: 95 },
        { country: "Japan", population: 125, populationDensity: 347, muslimPercent: 0.2, christianPercent: 1, languages: 15, urbanization: 92, medianAge: 48, literacyRate: 99, gdpPerCapita: 40100, lifeExpectancy: 85, internetPenetration: 94, mobilePenetration: 135 },
        { country: "Philippines", population: 116, populationDensity: 394, muslimPercent: 6, christianPercent: 92.5, languages: 187, urbanization: 48, medianAge: 26, literacyRate: 96, gdpPerCapita: 3600, lifeExpectancy: 72, internetPenetration: 68, mobilePenetration: 150 },
        { country: "Egypt", population: 112, populationDensity: 113, muslimPercent: 90, christianPercent: 10, languages: 16, urbanization: 43, medianAge: 25, literacyRate: 72, gdpPerCapita: 4100, lifeExpectancy: 72, internetPenetration: 72, mobilePenetration: 95 },
        { country: "Ethiopia", population: 123, populationDensity: 115, muslimPercent: 31.3, christianPercent: 63, languages: 90, urbanization: 22, medianAge: 19, literacyRate: 52, gdpPerCapita: 950, lifeExpectancy: 67, internetPenetration: 22, mobilePenetration: 38 },
        { country: "Vietnam", population: 99, populationDensity: 314, muslimPercent: 0.1, christianPercent: 8, languages: 110, urbanization: 38, medianAge: 32, literacyRate: 95, gdpPerCapita: 4100, lifeExpectancy: 75, internetPenetration: 73, mobilePenetration: 145 },
        { country: "Turkey", population: 85, populationDensity: 110, muslimPercent: 99.8, christianPercent: 0.2, languages: 36, urbanization: 76, medianAge: 32, literacyRate: 97, gdpPerCapita: 10600, lifeExpectancy: 78, internetPenetration: 82, mobilePenetration: 99 },
        { country: "Iran", population: 89, populationDensity: 54, muslimPercent: 99.4, christianPercent: 0.4, languages: 79, urbanization: 76, medianAge: 32, literacyRate: 88, gdpPerCapita: 3200, lifeExpectancy: 77, internetPenetration: 84, mobilePenetration: 130 },
        { country: "Germany", population: 84, populationDensity: 238, muslimPercent: 5.2, christianPercent: 65, languages: 27, urbanization: 78, medianAge: 46, literacyRate: 99, gdpPerCapita: 51200, lifeExpectancy: 81, internetPenetration: 96, mobilePenetration: 130 },
        { country: "Thailand", population: 72, populationDensity: 141, muslimPercent: 5.4, christianPercent: 1.2, languages: 74, urbanization: 52, medianAge: 40, literacyRate: 94, gdpPerCapita: 7200, lifeExpectancy: 77, internetPenetration: 82, mobilePenetration: 170 },
        { country: "United Kingdom", population: 68, populationDensity: 281, muslimPercent: 6.3, christianPercent: 59.5, languages: 56, urbanization: 84, medianAge: 40, literacyRate: 99, gdpPerCapita: 47200, lifeExpectancy: 81, internetPenetration: 96, mobilePenetration: 120 },
        { country: "France", population: 68, populationDensity: 119, muslimPercent: 8.8, christianPercent: 63, languages: 25, urbanization: 81, medianAge: 42, literacyRate: 99, gdpPerCapita: 43500, lifeExpectancy: 83, internetPenetration: 90, mobilePenetration: 110 },
        { country: "Italy", population: 59, populationDensity: 201, muslimPercent: 4.3, christianPercent: 83.3, languages: 34, urbanization: 71, medianAge: 47, literacyRate: 99, gdpPerCapita: 35200, lifeExpectancy: 83, internetPenetration: 75, mobilePenetration: 130 },
        { country: "South Africa", population: 60, populationDensity: 49, muslimPercent: 1.9, christianPercent: 79.8, languages: 35, urbanization: 68, medianAge: 28, literacyRate: 95, gdpPerCapita: 7000, lifeExpectancy: 65, internetPenetration: 72, mobilePenetration: 160 },
        { country: "Tanzania", population: 65, populationDensity: 67, muslimPercent: 35.2, christianPercent: 61.4, languages: 126, urbanization: 35, medianAge: 18, literacyRate: 78, gdpPerCapita: 1200, lifeExpectancy: 66, internetPenetration: 25, mobilePenetration: 75 },
        { country: "Myanmar", population: 54, populationDensity: 82, muslimPercent: 4.3, christianPercent: 6.2, languages: 111, urbanization: 31, medianAge: 29, literacyRate: 89, gdpPerCapita: 1400, lifeExpectancy: 67, internetPenetration: 44, mobilePenetration: 113 },
        { country: "Kenya", population: 55, populationDensity: 96, muslimPercent: 11.1, christianPercent: 85.5, languages: 68, urbanization: 28, medianAge: 20, literacyRate: 82, gdpPerCapita: 2100, lifeExpectancy: 67, internetPenetration: 30, mobilePenetration: 105 },
        { country: "South Korea", population: 52, populationDensity: 527, muslimPercent: 0.2, christianPercent: 29.2, languages: 2, urbanization: 82, medianAge: 44, literacyRate: 98, gdpPerCapita: 35000, lifeExpectancy: 83, internetPenetration: 97, mobilePenetration: 130 },
        { country: "Colombia", population: 52, populationDensity: 46, muslimPercent: 0.02, christianPercent: 95, languages: 101, urbanization: 81, medianAge: 31, literacyRate: 95, gdpPerCapita: 6400, lifeExpectancy: 77, internetPenetration: 70, mobilePenetration: 130 },
        { country: "Spain", population: 48, populationDensity: 94, muslimPercent: 2.6, christianPercent: 68.9, languages: 5, urbanization: 81, medianAge: 45, literacyRate: 98, gdpPerCapita: 30100, lifeExpectancy: 84, internetPenetration: 93, mobilePenetration: 110 },
        { country: "Uganda", population: 48, populationDensity: 229, muslimPercent: 14, christianPercent: 85.2, languages: 43, urbanization: 26, medianAge: 16, literacyRate: 74, gdpPerCapita: 900, lifeExpectancy: 64, internetPenetration: 28, mobilePenetration: 65 },
        { country: "Argentina", population: 46, populationDensity: 17, muslimPercent: 1, christianPercent: 92, languages: 40, urbanization: 92, medianAge: 32, literacyRate: 99, gdpPerCapita: 10600, lifeExpectancy: 77, internetPenetration: 87, mobilePenetration: 140 },
        { country: "Algeria", population: 45, populationDensity: 18, muslimPercent: 99, christianPercent: 0.2, languages: 18, urbanization: 74, medianAge: 29, literacyRate: 81, gdpPerCapita: 4200, lifeExpectancy: 77, internetPenetration: 63, mobilePenetration: 110 },
        { country: "Sudan", population: 48, populationDensity: 24, muslimPercent: 97, christianPercent: 2.5, languages: 134, urbanization: 35, medianAge: 19, literacyRate: 61, gdpPerCapita: 760, lifeExpectancy: 66, internetPenetration: 32, mobilePenetration: 70 },
        { country: "Iraq", population: 45, populationDensity: 104, muslimPercent: 95, christianPercent: 0.8, languages: 7, urbanization: 71, medianAge: 21, literacyRate: 85, gdpPerCapita: 5600, lifeExpectancy: 71, internetPenetration: 76, mobilePenetration: 95 },
        { country: "Afghanistan", population: 42, populationDensity: 65, muslimPercent: 99.7, christianPercent: 0.01, languages: 40, urbanization: 26, medianAge: 19, literacyRate: 43, gdpPerCapita: 500, lifeExpectancy: 65, internetPenetration: 14, mobilePenetration: 58 },
        { country: "Poland", population: 38, populationDensity: 124, muslimPercent: 0.1, christianPercent: 94.3, languages: 5, urbanization: 60, medianAge: 42, literacyRate: 99, gdpPerCapita: 18000, lifeExpectancy: 78, internetPenetration: 87, mobilePenetration: 130 },
        { country: "Canada", population: 39, populationDensity: 4, muslimPercent: 3.2, christianPercent: 67.3, languages: 214, urbanization: 82, medianAge: 41, literacyRate: 99, gdpPerCapita: 52000, lifeExpectancy: 82, internetPenetration: 95, mobilePenetration: 110 },
        { country: "Morocco", population: 38, populationDensity: 83, muslimPercent: 99, christianPercent: 0.2, languages: 7, urbanization: 64, medianAge: 30, literacyRate: 74, gdpPerCapita: 3600, lifeExpectancy: 75, internetPenetration: 75, mobilePenetration: 130 },
        { country: "Saudi Arabia", population: 36, populationDensity: 16, muslimPercent: 99.3, christianPercent: 0.3, languages: 3, urbanization: 84, medianAge: 32, literacyRate: 97, gdpPerCapita: 23500, lifeExpectancy: 75, internetPenetration: 98, mobilePenetration: 130 },
        { country: "Ukraine", population: 38, populationDensity: 63, muslimPercent: 0.9, christianPercent: 87.3, languages: 18, urbanization: 70, medianAge: 41, literacyRate: 100, gdpPerCapita: 4200, lifeExpectancy: 72, internetPenetration: 76, mobilePenetration: 130 },
        { country: "Uzbekistan", population: 35, populationDensity: 79, muslimPercent: 96.5, christianPercent: 2.3, languages: 7, urbanization: 50, medianAge: 28, literacyRate: 100, gdpPerCapita: 2000, lifeExpectancy: 72, internetPenetration: 65, mobilePenetration: 95 },
        { country: "Peru", population: 34, populationDensity: 27, muslimPercent: 0.01, christianPercent: 95, languages: 91, urbanization: 79, medianAge: 31, literacyRate: 94, gdpPerCapita: 7000, lifeExpectancy: 77, internetPenetration: 72, mobilePenetration: 115 },
        { country: "Angola", population: 35, populationDensity: 28, muslimPercent: 0.2, christianPercent: 93.9, languages: 42, urbanization: 67, medianAge: 17, literacyRate: 71, gdpPerCapita: 3100, lifeExpectancy: 62, internetPenetration: 23, mobilePenetration: 50 },
        { country: "Malaysia", population: 34, populationDensity: 103, muslimPercent: 61.3, christianPercent: 9.4, languages: 137, urbanization: 78, medianAge: 30, literacyRate: 95, gdpPerCapita: 11300, lifeExpectancy: 76, internetPenetration: 89, mobilePenetration: 140 },
        { country: "Mozambique", population: 33, populationDensity: 42, muslimPercent: 18, christianPercent: 56.7, languages: 43, urbanization: 38, medianAge: 17, literacyRate: 61, gdpPerCapita: 500, lifeExpectancy: 61, internetPenetration: 24, mobilePenetration: 50 },
        { country: "Ghana", population: 33, populationDensity: 143, muslimPercent: 18, christianPercent: 71.2, languages: 79, urbanization: 58, medianAge: 22, literacyRate: 79, gdpPerCapita: 2400, lifeExpectancy: 64, internetPenetration: 53, mobilePenetration: 130 },
        { country: "Yemen", population: 34, populationDensity: 56, muslimPercent: 99.1, christianPercent: 0.2, languages: 6, urbanization: 38, medianAge: 20, literacyRate: 70, gdpPerCapita: 700, lifeExpectancy: 66, internetPenetration: 27, mobilePenetration: 50 },
        { country: "Nepal", population: 31, populationDensity: 216, muslimPercent: 4.4, christianPercent: 1.4, languages: 123, urbanization: 21, medianAge: 25, literacyRate: 68, gdpPerCapita: 1200, lifeExpectancy: 71, internetPenetration: 34, mobilePenetration: 135 },
        { country: "Venezuela", population: 29, populationDensity: 32, muslimPercent: 0.1, christianPercent: 96.9, languages: 40, urbanization: 88, medianAge: 30, literacyRate: 98, gdpPerCapita: 1700, lifeExpectancy: 73, internetPenetration: 72, mobilePenetration: 90 },
        { country: "Madagascar", population: 30, populationDensity: 52, muslimPercent: 7, christianPercent: 85.3, languages: 18, urbanization: 39, medianAge: 20, literacyRate: 75, gdpPerCapita: 500, lifeExpectancy: 68, internetPenetration: 12, mobilePenetration: 40 },
        { country: "Cameroon", population: 28, populationDensity: 60, muslimPercent: 20, christianPercent: 70, languages: 280, urbanization: 58, medianAge: 19, literacyRate: 77, gdpPerCapita: 1600, lifeExpectancy: 60, internetPenetration: 38, mobilePenetration: 85 },
        { country: "CÃ´te d'Ivoire", population: 28, populationDensity: 88, muslimPercent: 42.9, christianPercent: 33.9, languages: 78, urbanization: 52, medianAge: 19, literacyRate: 47, gdpPerCapita: 2300, lifeExpectancy: 58, internetPenetration: 36, mobilePenetration: 130 },
        { country: "North Korea", population: 26, populationDensity: 216, muslimPercent: 0, christianPercent: 0.5, languages: 2, urbanization: 63, medianAge: 35, literacyRate: 100, gdpPerCapita: 1800, lifeExpectancy: 72, internetPenetration: 0, mobilePenetration: 15 },
        { country: "Australia", population: 26, populationDensity: 3, muslimPercent: 2.6, christianPercent: 52.1, languages: 390, urbanization: 86, medianAge: 38, literacyRate: 99, gdpPerCapita: 65000, lifeExpectancy: 83, internetPenetration: 88, mobilePenetration: 130 },
        { country: "Niger", population: 26, populationDensity: 21, muslimPercent: 99.3, christianPercent: 0.3, languages: 11, urbanization: 17, medianAge: 15, literacyRate: 19, gdpPerCapita: 600, lifeExpectancy: 63, internetPenetration: 7, mobilePenetration: 45 },
        { country: "Taiwan", population: 24, populationDensity: 673, muslimPercent: 0.2, christianPercent: 5.5, languages: 24, urbanization: 80, medianAge: 42, literacyRate: 99, gdpPerCapita: 33000, lifeExpectancy: 81, internetPenetration: 92, mobilePenetration: 130 },
        { country: "Sri Lanka", population: 22, populationDensity: 341, muslimPercent: 9.7, christianPercent: 7.4, languages: 3, urbanization: 19, medianAge: 34, literacyRate: 92, gdpPerCapita: 4100, lifeExpectancy: 77, internetPenetration: 35, mobilePenetration: 130 },
        { country: "Burkina Faso", population: 22, populationDensity: 82, muslimPercent: 63.2, christianPercent: 26.3, languages: 71, urbanization: 31, medianAge: 17, literacyRate: 39, gdpPerCapita: 900, lifeExpectancy: 62, internetPenetration: 22, mobilePenetration: 100 },
        { country: "Mali", population: 23, populationDensity: 19, muslimPercent: 95, christianPercent: 2.5, languages: 13, urbanization: 44, medianAge: 16, literacyRate: 35, gdpPerCapita: 900, lifeExpectancy: 60, internetPenetration: 25, mobilePenetration: 100 },
        { country: "Romania", population: 19, populationDensity: 84, muslimPercent: 0.3, christianPercent: 99.5, languages: 14, urbanization: 55, medianAge: 43, literacyRate: 99, gdpPerCapita: 14000, lifeExpectancy: 76, internetPenetration: 78, mobilePenetration: 115 },
        { country: "Malawi", population: 21, populationDensity: 222, muslimPercent: 13, christianPercent: 82.3, languages: 16, urbanization: 18, medianAge: 17, literacyRate: 62, gdpPerCapita: 600, lifeExpectancy: 65, internetPenetration: 14, mobilePenetration: 50 },
        { country: "Chile", population: 20, populationDensity: 26, muslimPercent: 0.03, christianPercent: 88.3, languages: 9, urbanization: 88, medianAge: 35, literacyRate: 97, gdpPerCapita: 16000, lifeExpectancy: 80, internetPenetration: 87, mobilePenetration: 130 },
        { country: "Kazakhstan", population: 19, populationDensity: 7, muslimPercent: 70.2, christianPercent: 26.2, languages: 12, urbanization: 58, medianAge: 31, literacyRate: 100, gdpPerCapita: 10000, lifeExpectancy: 74, internetPenetration: 84, mobilePenetration: 130 },
        { country: "Zambia", population: 20, populationDensity: 27, muslimPercent: 0.5, christianPercent: 95.5, languages: 72, urbanization: 45, medianAge: 17, literacyRate: 87, gdpPerCapita: 1300, lifeExpectancy: 64, internetPenetration: 27, mobilePenetration: 95 },
        { country: "Guatemala", population: 18, populationDensity: 167, muslimPercent: 0.01, christianPercent: 97, languages: 25, urbanization: 52, medianAge: 23, literacyRate: 81, gdpPerCapita: 5000, lifeExpectancy: 74, internetPenetration: 51, mobilePenetration: 140 },
        { country: "Ecuador", population: 18, populationDensity: 71, muslimPercent: 0.01, christianPercent: 94, languages: 13, urbanization: 64, medianAge: 28, literacyRate: 93, gdpPerCapita: 6200, lifeExpectancy: 77, internetPenetration: 65, mobilePenetration: 100 },
        { country: "Syria", population: 23, populationDensity: 123, muslimPercent: 87, christianPercent: 10, languages: 5, urbanization: 56, medianAge: 22, literacyRate: 86, gdpPerCapita: 900, lifeExpectancy: 72, internetPenetration: 43, mobilePenetration: 85 },
        { country: "Netherlands", population: 18, populationDensity: 508, muslimPercent: 5.1, christianPercent: 43.8, languages: 4, urbanization: 92, medianAge: 43, literacyRate: 99, gdpPerCapita: 58000, lifeExpectancy: 82, internetPenetration: 96, mobilePenetration: 130 },
        { country: "Senegal", population: 17, populationDensity: 87, muslimPercent: 96.1, christianPercent: 3.6, languages: 38, urbanization: 48, medianAge: 19, literacyRate: 43, gdpPerCapita: 1600, lifeExpectancy: 68, internetPenetration: 46, mobilePenetration: 110 },
        { country: "Cambodia", population: 17, populationDensity: 95, muslimPercent: 1.9, christianPercent: 0.2, languages: 23, urbanization: 24, medianAge: 26, literacyRate: 81, gdpPerCapita: 1700, lifeExpectancy: 70, internetPenetration: 51, mobilePenetration: 130 },
        { country: "Chad", population: 18, populationDensity: 14, muslimPercent: 52.1, christianPercent: 44.1, languages: 129, urbanization: 24, medianAge: 17, literacyRate: 26, gdpPerCapita: 700, lifeExpectancy: 54, internetPenetration: 7, mobilePenetration: 45 },
        { country: "Somalia", population: 18, populationDensity: 29, muslimPercent: 99.8, christianPercent: 0.1, languages: 13, urbanization: 47, medianAge: 17, literacyRate: 40, gdpPerCapita: 500, lifeExpectancy: 58, internetPenetration: 2, mobilePenetration: 52 },
        { country: "Zimbabwe", population: 16, populationDensity: 42, muslimPercent: 0.7, christianPercent: 87, languages: 16, urbanization: 32, medianAge: 20, literacyRate: 90, gdpPerCapita: 1100, lifeExpectancy: 62, internetPenetration: 30, mobilePenetration: 95 },
        { country: "Guinea", population: 14, populationDensity: 58, muslimPercent: 86.8, christianPercent: 3.6, languages: 40, urbanization: 37, medianAge: 19, literacyRate: 32, gdpPerCapita: 1100, lifeExpectancy: 60, internetPenetration: 22, mobilePenetration: 100 },
        { country: "Rwanda", population: 14, populationDensity: 525, muslimPercent: 2, christianPercent: 93.6, languages: 4, urbanization: 18, medianAge: 20, literacyRate: 73, gdpPerCapita: 900, lifeExpectancy: 69, internetPenetration: 30, mobilePenetration: 75 },
        { country: "Benin", population: 13, populationDensity: 115, muslimPercent: 27.7, christianPercent: 48.5, languages: 55, urbanization: 49, medianAge: 19, literacyRate: 42, gdpPerCapita: 1300, lifeExpectancy: 62, internetPenetration: 27, mobilePenetration: 90 },
        { country: "Burundi", population: 13, populationDensity: 463, muslimPercent: 2.5, christianPercent: 91.5, languages: 3, urbanization: 14, medianAge: 17, literacyRate: 68, gdpPerCapita: 300, lifeExpectancy: 62, internetPenetration: 9, mobilePenetration: 50 },
        { country: "Tunisia", population: 12, populationDensity: 76, muslimPercent: 99, christianPercent: 0.2, languages: 2, urbanization: 70, medianAge: 33, literacyRate: 82, gdpPerCapita: 3800, lifeExpectancy: 77, internetPenetration: 67, mobilePenetration: 130 },
        { country: "Bolivia", population: 12, populationDensity: 11, muslimPercent: 0.01, christianPercent: 95, languages: 37, urbanization: 70, medianAge: 26, literacyRate: 95, gdpPerCapita: 3600, lifeExpectancy: 72, internetPenetration: 78, mobilePenetration: 110 },
        { country: "Belgium", population: 12, populationDensity: 383, muslimPercent: 7.1, christianPercent: 64.8, languages: 3, urbanization: 98, medianAge: 42, literacyRate: 99, gdpPerCapita: 51200, lifeExpectancy: 82, internetPenetration: 95, mobilePenetration: 110 },
        { country: "Haiti", population: 12, populationDensity: 414, muslimPercent: 0.02, christianPercent: 96, languages: 2, urbanization: 58, medianAge: 24, literacyRate: 62, gdpPerCapita: 1800, lifeExpectancy: 65, internetPenetration: 35, mobilePenetration: 75 },
        { country: "Cuba", population: 11, populationDensity: 106, muslimPercent: 0.01, christianPercent: 58.9, languages: 1, urbanization: 77, medianAge: 42, literacyRate: 100, gdpPerCapita: 9100, lifeExpectancy: 79, internetPenetration: 78, mobilePenetration: 70 },
        { country: "South Sudan", population: 11, populationDensity: 18, muslimPercent: 6.2, christianPercent: 60.5, languages: 68, urbanization: 20, medianAge: 19, literacyRate: 35, gdpPerCapita: 300, lifeExpectancy: 58, internetPenetration: 8, mobilePenetration: 20 },
        { country: "Dominican Republic", population: 11, populationDensity: 225, muslimPercent: 0.02, christianPercent: 95, languages: 1, urbanization: 83, medianAge: 28, literacyRate: 94, gdpPerCapita: 9000, lifeExpectancy: 74, internetPenetration: 75, mobilePenetration: 90 },
        { country: "Czech Republic", population: 11, populationDensity: 139, muslimPercent: 0.2, christianPercent: 21.3, languages: 2, urbanization: 74, medianAge: 43, literacyRate: 99, gdpPerCapita: 26000, lifeExpectancy: 79, internetPenetration: 88, mobilePenetration: 130 },
        { country: "Greece", population: 11, populationDensity: 82, muslimPercent: 1.8, christianPercent: 90, languages: 1, urbanization: 80, medianAge: 45, literacyRate: 98, gdpPerCapita: 20000, lifeExpectancy: 82, internetPenetration: 83, mobilePenetration: 130 },
        { country: "Jordan", population: 11, populationDensity: 115, muslimPercent: 97.2, christianPercent: 2.2, languages: 1, urbanization: 92, medianAge: 24, literacyRate: 98, gdpPerCapita: 4400, lifeExpectancy: 75, internetPenetration: 67, mobilePenetration: 110 },
        { country: "Portugal", population: 10, populationDensity: 112, muslimPercent: 0.3, christianPercent: 84.3, languages: 1, urbanization: 66, medianAge: 46, literacyRate: 96, gdpPerCapita: 24500, lifeExpectancy: 82, internetPenetration: 82, mobilePenetration: 120 },
        { country: "Azerbaijan", population: 10, populationDensity: 123, muslimPercent: 96.9, christianPercent: 2.5, languages: 7, urbanization: 56, medianAge: 32, literacyRate: 100, gdpPerCapita: 4800, lifeExpectancy: 73, internetPenetration: 85, mobilePenetration: 110 },
        { country: "Sweden", population: 10, populationDensity: 25, muslimPercent: 8.1, christianPercent: 63.2, languages: 5, urbanization: 88, medianAge: 41, literacyRate: 99, gdpPerCapita: 61200, lifeExpectancy: 83, internetPenetration: 98, mobilePenetration: 130 },
        { country: "Honduras", population: 10, populationDensity: 89, muslimPercent: 0.01, christianPercent: 97, languages: 9, urbanization: 59, medianAge: 24, literacyRate: 89, gdpPerCapita: 2800, lifeExpectancy: 75, internetPenetration: 51, mobilePenetration: 90 },
        { country: "United Arab Emirates", population: 10, populationDensity: 135, muslimPercent: 76, christianPercent: 9, languages: 7, urbanization: 87, medianAge: 33, literacyRate: 96, gdpPerCapita: 43800, lifeExpectancy: 78, internetPenetration: 100, mobilePenetration: 210 },
        { country: "Hungary", population: 10, populationDensity: 107, muslimPercent: 0.3, christianPercent: 74.4, languages: 4, urbanization: 72, medianAge: 44, literacyRate: 99, gdpPerCapita: 19000, lifeExpectancy: 77, internetPenetration: 87, mobilePenetration: 120 },
        { country: "Tajikistan", population: 10, populationDensity: 71, muslimPercent: 98, christianPercent: 0.1, languages: 2, urbanization: 27, medianAge: 23, literacyRate: 100, gdpPerCapita: 900, lifeExpectancy: 72, internetPenetration: 28, mobilePenetration: 110 },
        { country: "Belarus", population: 9, populationDensity: 47, muslimPercent: 0.1, christianPercent: 83.3, languages: 3, urbanization: 80, medianAge: 40, literacyRate: 100, gdpPerCapita: 7200, lifeExpectancy: 74, internetPenetration: 85, mobilePenetration: 120 },
        { country: "Austria", population: 9, populationDensity: 109, muslimPercent: 8, christianPercent: 73.6, languages: 7, urbanization: 59, medianAge: 44, literacyRate: 99, gdpPerCapita: 52000, lifeExpectancy: 82, internetPenetration: 90, mobilePenetration: 130 },
        { country: "Papua New Guinea", population: 10, populationDensity: 20, muslimPercent: 0, christianPercent: 95.6, languages: 839, urbanization: 13, medianAge: 23, literacyRate: 64, gdpPerCapita: 2800, lifeExpectancy: 66, internetPenetration: 13, mobilePenetration: 48 },
        { country: "Serbia", population: 7, populationDensity: 83, muslimPercent: 3.1, christianPercent: 91.1, languages: 15, urbanization: 56, medianAge: 43, literacyRate: 99, gdpPerCapita: 8000, lifeExpectancy: 76, internetPenetration: 81, mobilePenetration: 120 },
        { country: "Israel", population: 9, populationDensity: 410, muslimPercent: 18, christianPercent: 1.9, languages: 35, urbanization: 93, medianAge: 30, literacyRate: 98, gdpPerCapita: 52000, lifeExpectancy: 83, internetPenetration: 90, mobilePenetration: 130 },
        { country: "Switzerland", population: 9, populationDensity: 219, muslimPercent: 5.4, christianPercent: 65.5, languages: 4, urbanization: 74, medianAge: 43, literacyRate: 99, gdpPerCapita: 93800, lifeExpectancy: 84, internetPenetration: 96, mobilePenetration: 130 },
        { country: "Togo", population: 9, populationDensity: 160, muslimPercent: 14, christianPercent: 43.7, languages: 39, urbanization: 43, medianAge: 19, literacyRate: 63, gdpPerCapita: 700, lifeExpectancy: 61, internetPenetration: 24, mobilePenetration: 75 },
        { country: "Sierra Leone", population: 8, populationDensity: 111, muslimPercent: 78, christianPercent: 20.9, languages: 23, urbanization: 43, medianAge: 19, literacyRate: 43, gdpPerCapita: 500, lifeExpectancy: 55, internetPenetration: 18, mobilePenetration: 95 },
        { country: "Laos", population: 8, populationDensity: 32, muslimPercent: 0.01, christianPercent: 1.5, languages: 86, urbanization: 36, medianAge: 24, literacyRate: 85, gdpPerCapita: 2600, lifeExpectancy: 68, internetPenetration: 43, mobilePenetration: 70 },
        { country: "Paraguay", population: 7, populationDensity: 18, muslimPercent: 0.01, christianPercent: 96.9, languages: 23, urbanization: 63, medianAge: 27, literacyRate: 95, gdpPerCapita: 5500, lifeExpectancy: 74, internetPenetration: 70, mobilePenetration: 110 },
        { country: "Bulgaria", population: 7, populationDensity: 64, muslimPercent: 10.7, christianPercent: 82.6, languages: 4, urbanization: 76, medianAge: 45, literacyRate: 98, gdpPerCapita: 12000, lifeExpectancy: 75, internetPenetration: 75, mobilePenetration: 130 },
        { country: "Libya", population: 7, populationDensity: 4, muslimPercent: 96.6, christianPercent: 2.7, languages: 4, urbanization: 81, medianAge: 29, literacyRate: 91, gdpPerCapita: 6800, lifeExpectancy: 73, internetPenetration: 22, mobilePenetration: 155 },
        { country: "Lebanon", population: 7, populationDensity: 669, muslimPercent: 61.3, christianPercent: 33.7, languages: 2, urbanization: 89, medianAge: 30, literacyRate: 95, gdpPerCapita: 12000, lifeExpectancy: 79, internetPenetration: 78, mobilePenetration: 75 },
        { country: "Nicaragua", population: 7, populationDensity: 58, muslimPercent: 0.01, christianPercent: 97, languages: 7, urbanization: 59, medianAge: 27, literacyRate: 83, gdpPerCapita: 2000, lifeExpectancy: 75, internetPenetration: 50, mobilePenetration: 110 },
        { country: "Kyrgyzstan", population: 7, populationDensity: 35, muslimPercent: 90, christianPercent: 7, languages: 4, urbanization: 37, medianAge: 27, literacyRate: 100, gdpPerCapita: 1300, lifeExpectancy: 72, internetPenetration: 38, mobilePenetration: 130 },
        { country: "El Salvador", population: 6, populationDensity: 313, muslimPercent: 0.01, christianPercent: 97, languages: 3, urbanization: 74, medianAge: 28, literacyRate: 89, gdpPerCapita: 4300, lifeExpectancy: 74, internetPenetration: 55, mobilePenetration: 150 },
        { country: "Turkmenistan", population: 6, populationDensity: 13, muslimPercent: 93, christianPercent: 2, languages: 2, urbanization: 53, medianAge: 28, literacyRate: 100, gdpPerCapita: 7000, lifeExpectancy: 70, internetPenetration: 38, mobilePenetration: 155 },
        { country: "Singapore", population: 6, populationDensity: 8358, muslimPercent: 14, christianPercent: 18.2, languages: 4, urbanization: 100, medianAge: 42, literacyRate: 97, gdpPerCapita: 72800, lifeExpectancy: 84, internetPenetration: 92, mobilePenetration: 150 },
        { country: "Denmark", population: 6, populationDensity: 147, muslimPercent: 5.4, christianPercent: 75.8, languages: 3, urbanization: 88, medianAge: 42, literacyRate: 99, gdpPerCapita: 68000, lifeExpectancy: 81, internetPenetration: 98, mobilePenetration: 130 },
        { country: "Finland", population: 6, populationDensity: 18, muslimPercent: 2.7, christianPercent: 68.7, languages: 3, urbanization: 86, medianAge: 43, literacyRate: 99, gdpPerCapita: 50300, lifeExpectancy: 82, internetPenetration: 95, mobilePenetration: 130 },
        { country: "Congo", population: 6, populationDensity: 16, muslimPercent: 1.3, christianPercent: 90.7, languages: 62, urbanization: 68, medianAge: 19, literacyRate: 80, gdpPerCapita: 1900, lifeExpectancy: 64, internetPenetration: 8, mobilePenetration: 95 },
        { country: "Slovakia", population: 5, populationDensity: 114, muslimPercent: 0.1, christianPercent: 83.8, languages: 7, urbanization: 54, medianAge: 41, literacyRate: 99, gdpPerCapita: 21000, lifeExpectancy: 77, internetPenetration: 90, mobilePenetration: 130 },
        { country: "Norway", population: 5, populationDensity: 15, muslimPercent: 3.2, christianPercent: 68.1, languages: 5, urbanization: 83, medianAge: 40, literacyRate: 100, gdpPerCapita: 95000, lifeExpectancy: 83, internetPenetration: 98, mobilePenetration: 110 },
        { country: "Eritrea", population: 6, populationDensity: 52, muslimPercent: 36.6, christianPercent: 62.9, languages: 9, urbanization: 41, medianAge: 19, literacyRate: 77, gdpPerCapita: 600, lifeExpectancy: 67, internetPenetration: 1, mobilePenetration: 15 },
        { country: "Palestine", population: 5, populationDensity: 847, muslimPercent: 93, christianPercent: 6, languages: 2, urbanization: 77, medianAge: 20, literacyRate: 97, gdpPerCapita: 3600, lifeExpectancy: 74, internetPenetration: 76, mobilePenetration: 85 },
        { country: "Central African Republic", population: 5, populationDensity: 8, muslimPercent: 8.9, christianPercent: 89.5, languages: 72, urbanization: 42, medianAge: 18, literacyRate: 37, gdpPerCapita: 500, lifeExpectancy: 54, internetPenetration: 11, mobilePenetration: 30 },
        { country: "Liberia", population: 5, populationDensity: 53, muslimPercent: 12.2, christianPercent: 85.9, languages: 31, urbanization: 52, medianAge: 19, literacyRate: 48, gdpPerCapita: 700, lifeExpectancy: 64, internetPenetration: 8, mobilePenetration: 50 },
        { country: "Mauritania", population: 5, populationDensity: 5, muslimPercent: 100, christianPercent: 0.1, languages: 3, urbanization: 54, medianAge: 20, literacyRate: 54, gdpPerCapita: 1800, lifeExpectancy: 65, internetPenetration: 54, mobilePenetration: 120 },
        { country: "Panama", population: 4, populationDensity: 58, muslimPercent: 0.7, christianPercent: 92, languages: 14, urbanization: 68, medianAge: 30, literacyRate: 95, gdpPerCapita: 16000, lifeExpectancy: 79, internetPenetration: 68, mobilePenetration: 150 },
        { country: "Croatia", population: 4, populationDensity: 73, muslimPercent: 1.5, christianPercent: 91.1, languages: 4, urbanization: 57, medianAge: 44, literacyRate: 99, gdpPerCapita: 17000, lifeExpectancy: 78, internetPenetration: 79, mobilePenetration: 110 },
        { country: "Mongolia", population: 3, populationDensity: 2, muslimPercent: 3, christianPercent: 2.1, languages: 10, urbanization: 68, medianAge: 28, literacyRate: 99, gdpPerCapita: 4100, lifeExpectancy: 70, internetPenetration: 85, mobilePenetration: 130 },
        { country: "Georgia", population: 4, populationDensity: 57, muslimPercent: 10.7, christianPercent: 87.8, languages: 23, urbanization: 60, medianAge: 39, literacyRate: 100, gdpPerCapita: 5000, lifeExpectancy: 74, internetPenetration: 65, mobilePenetration: 120 },
        { country: "Armenia", population: 3, populationDensity: 104, muslimPercent: 0.03, christianPercent: 97.9, languages: 2, urbanization: 63, medianAge: 36, literacyRate: 100, gdpPerCapita: 4700, lifeExpectancy: 75, internetPenetration: 75, mobilePenetration: 120 },
        { country: "Uruguay", population: 4, populationDensity: 20, muslimPercent: 0.01, christianPercent: 57, languages: 1, urbanization: 96, medianAge: 36, literacyRate: 99, gdpPerCapita: 17000, lifeExpectancy: 78, internetPenetration: 82, mobilePenetration: 140 },
        { country: "Bosnia and Herzegovina", population: 3, populationDensity: 65, muslimPercent: 50.7, christianPercent: 45.9, languages: 3, urbanization: 49, medianAge: 43, literacyRate: 99, gdpPerCapita: 7000, lifeExpectancy: 78, internetPenetration: 73, mobilePenetration: 110 },
        { country: "Albania", population: 3, populationDensity: 105, muslimPercent: 56.7, christianPercent: 16.8, languages: 4, urbanization: 63, medianAge: 38, literacyRate: 98, gdpPerCapita: 5500, lifeExpectancy: 79, internetPenetration: 72, mobilePenetration: 110 },
        { country: "Lithuania", population: 3, populationDensity: 45, muslimPercent: 0.1, christianPercent: 90, languages: 3, urbanization: 68, medianAge: 45, literacyRate: 100, gdpPerCapita: 22000, lifeExpectancy: 76, internetPenetration: 85, mobilePenetration: 160 },
        { country: "Jamaica", population: 3, populationDensity: 273, muslimPercent: 0.2, christianPercent: 64.8, languages: 1, urbanization: 56, medianAge: 31, literacyRate: 88, gdpPerCapita: 5600, lifeExpectancy: 75, internetPenetration: 55, mobilePenetration: 100 },
        { country: "Qatar", population: 3, populationDensity: 240, muslimPercent: 65.2, christianPercent: 13.8, languages: 2, urbanization: 99, medianAge: 32, literacyRate: 97, gdpPerCapita: 61200, lifeExpectancy: 80, internetPenetration: 100, mobilePenetration: 140 },
        { country: "Namibia", population: 3, populationDensity: 3, muslimPercent: 0.4, christianPercent: 97.5, languages: 31, urbanization: 55, medianAge: 22, literacyRate: 92, gdpPerCapita: 5100, lifeExpectancy: 65, internetPenetration: 56, mobilePenetration: 115 },
        { country: "Botswana", population: 2, populationDensity: 4, muslimPercent: 0.4, christianPercent: 79.1, languages: 31, urbanization: 72, medianAge: 24, literacyRate: 88, gdpPerCapita: 7100, lifeExpectancy: 70, internetPenetration: 64, mobilePenetration: 160 },
        { country: "Gabon", population: 2, populationDensity: 9, muslimPercent: 2, christianPercent: 88, languages: 41, urbanization: 90, medianAge: 23, literacyRate: 84, gdpPerCapita: 7800, lifeExpectancy: 66, internetPenetration: 62, mobilePenetration: 150 },
        { country: "Lesotho", population: 2, populationDensity: 73, muslimPercent: 0.03, christianPercent: 90, languages: 2, urbanization: 29, medianAge: 22, literacyRate: 79, gdpPerCapita: 1200, lifeExpectancy: 54, internetPenetration: 29, mobilePenetration: 100 },
        { country: "Guinea-Bissau", population: 2, populationDensity: 70, muslimPercent: 45.1, christianPercent: 22.1, languages: 23, urbanization: 44, medianAge: 19, literacyRate: 60, gdpPerCapita: 800, lifeExpectancy: 59, internetPenetration: 24, mobilePenetration: 85 },
        { country: "Equatorial Guinea", population: 2, populationDensity: 50, muslimPercent: 4, christianPercent: 93, languages: 7, urbanization: 73, medianAge: 22, literacyRate: 95, gdpPerCapita: 8500, lifeExpectancy: 59, internetPenetration: 55, mobilePenetration: 75 },
        { country: "Trinidad and Tobago", population: 1, populationDensity: 273, muslimPercent: 5, christianPercent: 63.2, languages: 2, urbanization: 8, medianAge: 36, literacyRate: 99, gdpPerCapita: 17000, lifeExpectancy: 74, internetPenetration: 75, mobilePenetration: 140 },
        { country: "Estonia", population: 1, populationDensity: 31, muslimPercent: 0.2, christianPercent: 58, languages: 2, urbanization: 69, medianAge: 43, literacyRate: 100, gdpPerCapita: 24000, lifeExpectancy: 79, internetPenetration: 92, mobilePenetration: 150 },
        { country: "Timor-Leste", population: 1, populationDensity: 89, muslimPercent: 0.3, christianPercent: 99.6, languages: 32, urbanization: 31, medianAge: 20, literacyRate: 68, gdpPerCapita: 2100, lifeExpectancy: 69, internetPenetration: 32, mobilePenetration: 120 },
        { country: "Mauritius", population: 1, populationDensity: 623, muslimPercent: 17.3, christianPercent: 32.2, languages: 5, urbanization: 41, medianAge: 38, literacyRate: 91, gdpPerCapita: 11000, lifeExpectancy: 75, internetPenetration: 65, mobilePenetration: 150 },
        { country: "Cyprus", population: 1, populationDensity: 131, muslimPercent: 25.3, christianPercent: 73.2, languages: 3, urbanization: 67, medianAge: 37, literacyRate: 99, gdpPerCapita: 31000, lifeExpectancy: 81, internetPenetration: 91, mobilePenetration: 120 },
        { country: "Eswatini", population: 1, populationDensity: 70, muslimPercent: 0.9, christianPercent: 88.1, languages: 2, urbanization: 24, medianAge: 21, literacyRate: 88, gdpPerCapita: 4100, lifeExpectancy: 60, internetPenetration: 47, mobilePenetration: 90 },
        { country: "Djibouti", population: 1, populationDensity: 43, muslimPercent: 94, christianPercent: 6, languages: 3, urbanization: 78, medianAge: 27, literacyRate: 67, gdpPerCapita: 3600, lifeExpectancy: 68, internetPenetration: 59, mobilePenetration: 50 },
        { country: "Fiji", population: 1, populationDensity: 49, muslimPercent: 0.7, christianPercent: 64.4, languages: 3, urbanization: 57, medianAge: 29, literacyRate: 99, gdpPerCapita: 5700, lifeExpectancy: 68, internetPenetration: 69, mobilePenetration: 120 },
        { country: "Comoros", population: 1, populationDensity: 467, muslimPercent: 98, christianPercent: 1, languages: 3, urbanization: 29, medianAge: 20, literacyRate: 59, gdpPerCapita: 1500, lifeExpectancy: 65, internetPenetration: 8, mobilePenetration: 55 },
        { country: "Guyana", population: 1, populationDensity: 4, muslimPercent: 7.2, christianPercent: 57.4, languages: 11, urbanization: 27, medianAge: 27, literacyRate: 88, gdpPerCapita: 9000, lifeExpectancy: 70, internetPenetration: 60, mobilePenetration: 120 },
        { country: "Bhutan", population: 1, populationDensity: 21, muslimPercent: 0.2, christianPercent: 0.5, languages: 24, urbanization: 43, medianAge: 28, literacyRate: 71, gdpPerCapita: 3200, lifeExpectancy: 72, internetPenetration: 85, mobilePenetration: 90 },
        { country: "Solomon Islands", population: 1, populationDensity: 25, muslimPercent: 0, christianPercent: 97, languages: 74, urbanization: 25, medianAge: 21, literacyRate: 84, gdpPerCapita: 2300, lifeExpectancy: 73, internetPenetration: 12, mobilePenetration: 60 },
        { country: "Macau", population: 1, populationDensity: 21645, muslimPercent: 0.1, christianPercent: 5, languages: 3, urbanization: 100, medianAge: 39, literacyRate: 97, gdpPerCapita: 81000, lifeExpectancy: 85, internetPenetration: 83, mobilePenetration: 300 },
        { country: "Cape Verde", population: 1, populationDensity: 147, muslimPercent: 2, christianPercent: 89.1, languages: 2, urbanization: 68, medianAge: 28, literacyRate: 90, gdpPerCapita: 3700, lifeExpectancy: 73, internetPenetration: 65, mobilePenetration: 110 },
        { country: "Malta", population: 1, populationDensity: 1690, muslimPercent: 0.2, christianPercent: 98.1, languages: 2, urbanization: 95, medianAge: 43, literacyRate: 94, gdpPerCapita: 33000, lifeExpectancy: 83, internetPenetration: 93, mobilePenetration: 130 },
        { country: "Maldives", population: 1, populationDensity: 1802, muslimPercent: 98.4, christianPercent: 0.3, languages: 1, urbanization: 40, medianAge: 30, literacyRate: 98, gdpPerCapita: 12000, lifeExpectancy: 79, internetPenetration: 70, mobilePenetration: 180 },
        { country: "Brunei", population: 0.4, populationDensity: 83, muslimPercent: 80.9, christianPercent: 8.7, languages: 17, urbanization: 78, medianAge: 32, literacyRate: 97, gdpPerCapita: 31000, lifeExpectancy: 76, internetPenetration: 95, mobilePenetration: 120 },
        { country: "Bahamas", population: 0.4, populationDensity: 39, muslimPercent: 0, christianPercent: 95.8, languages: 1, urbanization: 83, medianAge: 34, literacyRate: 98, gdpPerCapita: 32000, lifeExpectancy: 76, internetPenetration: 87, mobilePenetration: 120 },
        { country: "Iceland", population: 0.4, populationDensity: 4, muslimPercent: 0.3, christianPercent: 67.2, languages: 2, urbanization: 94, medianAge: 37, literacyRate: 99, gdpPerCapita: 69000, lifeExpectancy: 83, internetPenetration: 99, mobilePenetration: 130 },
        { country: "Vanuatu", population: 0.3, populationDensity: 25, muslimPercent: 0, christianPercent: 93.3, languages: 138, urbanization: 25, medianAge: 22, literacyRate: 87, gdpPerCapita: 3200, lifeExpectancy: 71, internetPenetration: 38, mobilePenetration: 85 },
        { country: "Barbados", population: 0.3, populationDensity: 668, muslimPercent: 0.6, christianPercent: 75.6, languages: 2, urbanization: 31, medianAge: 40, literacyRate: 99, gdpPerCapita: 18000, lifeExpectancy: 79, internetPenetration: 80, mobilePenetration: 130 },
        { country: "New Caledonia", population: 0.3, populationDensity: 16, muslimPercent: 2.8, christianPercent: 85.2, languages: 39, urbanization: 71, medianAge: 34, literacyRate: 97, gdpPerCapita: 38000, lifeExpectancy: 80, internetPenetration: 70, mobilePenetration: 120 },
        { country: "French Guiana", population: 0.3, populationDensity: 4, muslimPercent: 0.2, christianPercent: 84.4, languages: 12, urbanization: 87, medianAge: 25, literacyRate: 83, gdpPerCapita: 18000, lifeExpectancy: 77, internetPenetration: 75, mobilePenetration: 130 },
        { country: "French Polynesia", population: 0.3, populationDensity: 77, muslimPercent: 0, christianPercent: 54, languages: 5, urbanization: 62, medianAge: 33, literacyRate: 98, gdpPerCapita: 18000, lifeExpectancy: 77, internetPenetration: 65, mobilePenetration: 110 },
        { country: "Samoa", population: 0.2, populationDensity: 70, muslimPercent: 0, christianPercent: 98.3, languages: 2, urbanization: 18, medianAge: 22, literacyRate: 99, gdpPerCapita: 4200, lifeExpectancy: 74, internetPenetration: 40, mobilePenetration: 100 },
        { country: "Guam", population: 0.2, populationDensity: 311, muslimPercent: 0, christianPercent: 94.1, languages: 2, urbanization: 95, medianAge: 31, literacyRate: 99, gdpPerCapita: 36000, lifeExpectancy: 80, internetPenetration: 80, mobilePenetration: 130 },
        { country: "Saint Lucia", population: 0.2, populationDensity: 301, muslimPercent: 0.1, christianPercent: 94.4, languages: 2, urbanization: 19, medianAge: 35, literacyRate: 91, gdpPerCapita: 12000, lifeExpectancy: 77, internetPenetration: 53, mobilePenetration: 130 },
        { country: "Kiribati", population: 0.1, populationDensity: 152, muslimPercent: 0, christianPercent: 97, languages: 2, urbanization: 56, medianAge: 23, literacyRate: 92, gdpPerCapita: 1800, lifeExpectancy: 68, internetPenetration: 12, mobilePenetration: 30 },
        { country: "Micronesia", population: 0.1, populationDensity: 164, muslimPercent: 0, christianPercent: 95.3, languages: 18, urbanization: 23, medianAge: 24, literacyRate: 89, gdpPerCapita: 3400, lifeExpectancy: 70, internetPenetration: 33, mobilePenetration: 30 },
        { country: "Grenada", population: 0.1, populationDensity: 331, muslimPercent: 0.3, christianPercent: 96.6, languages: 1, urbanization: 36, medianAge: 32, literacyRate: 99, gdpPerCapita: 11000, lifeExpectancy: 75, internetPenetration: 60, mobilePenetration: 130 },
        { country: "Tonga", population: 0.1, populationDensity: 147, muslimPercent: 0, christianPercent: 99.8, languages: 2, urbanization: 24, medianAge: 22, literacyRate: 99, gdpPerCapita: 5900, lifeExpectancy: 76, internetPenetration: 54, mobilePenetration: 60 },
        { country: "Seychelles", population: 0.1, populationDensity: 214, muslimPercent: 1.1, christianPercent: 89.7, languages: 3, urbanization: 57, medianAge: 36, literacyRate: 96, gdpPerCapita: 15000, lifeExpectancy: 74, internetPenetration: 70, mobilePenetration: 180 },
        { country: "Antigua and Barbuda", population: 0.1, populationDensity: 223, muslimPercent: 0.3, christianPercent: 92.7, languages: 2, urbanization: 24, medianAge: 33, literacyRate: 99, gdpPerCapita: 15000, lifeExpectancy: 77, internetPenetration: 80, mobilePenetration: 150 },
        { country: "Andorra", population: 0.08, populationDensity: 164, muslimPercent: 0.8, christianPercent: 89.5, languages: 4, urbanization: 88, medianAge: 46, literacyRate: 100, gdpPerCapita: 42000, lifeExpectancy: 83, internetPenetration: 98, mobilePenetration: 120 },
        { country: "Dominica", population: 0.07, populationDensity: 96, muslimPercent: 0.2, christianPercent: 94.4, languages: 2, urbanization: 70, medianAge: 34, literacyRate: 94, gdpPerCapita: 8000, lifeExpectancy: 78, internetPenetration: 70, mobilePenetration: 130 },
        { country: "Marshall Islands", population: 0.06, populationDensity: 329, muslimPercent: 0, christianPercent: 97.2, languages: 2, urbanization: 78, medianAge: 23, literacyRate: 98, gdpPerCapita: 4100, lifeExpectancy: 74, internetPenetration: 39, mobilePenetration: 30 },
        { country: "Saint Kitts and Nevis", population: 0.05, populationDensity: 205, muslimPercent: 0.3, christianPercent: 94.6, languages: 1, urbanization: 33, medianAge: 35, literacyRate: 98, gdpPerCapita: 19000, lifeExpectancy: 77, internetPenetration: 80, mobilePenetration: 150 },
        { country: "Monaco", population: 0.04, populationDensity: 26337, muslimPercent: 0.8, christianPercent: 86, languages: 2, urbanization: 100, medianAge: 55, literacyRate: 99, gdpPerCapita: 190000, lifeExpectancy: 90, internetPenetration: 98, mobilePenetration: 120 },
        { country: "Liechtenstein", population: 0.04, populationDensity: 238, muslimPercent: 5.9, christianPercent: 83.2, languages: 2, urbanization: 14, medianAge: 44, literacyRate: 100, gdpPerCapita: 180000, lifeExpectancy: 82, internetPenetration: 98, mobilePenetration: 130 },
        { country: "San Marino", population: 0.03, populationDensity: 566, muslimPercent: 0, christianPercent: 97.2, languages: 1, urbanization: 97, medianAge: 45, literacyRate: 99, gdpPerCapita: 55000, lifeExpectancy: 84, internetPenetration: 93, mobilePenetration: 130 },
        { country: "Palau", population: 0.02, populationDensity: 46, muslimPercent: 0, christianPercent: 86.7, languages: 4, urbanization: 81, medianAge: 34, literacyRate: 92, gdpPerCapita: 12000, lifeExpectancy: 74, internetPenetration: 70, mobilePenetration: 130 },
        { country: "Nauru", population: 0.01, populationDensity: 541, muslimPercent: 0, christianPercent: 93, languages: 2, urbanization: 100, medianAge: 27, literacyRate: 96, gdpPerCapita: 12000, lifeExpectancy: 66, internetPenetration: 50, mobilePenetration: 80 },
        { country: "Tuvalu", population: 0.01, populationDensity: 393, muslimPercent: 0, christianPercent: 97, languages: 2, urbanization: 62, medianAge: 26, literacyRate: 99, gdpPerCapita: 4000, lifeExpectancy: 70, internetPenetration: 49, mobilePenetration: 30 },
        { country: "Vatican City", population: 0.0008, populationDensity: 2273, muslimPercent: 0, christianPercent: 100, languages: 2, urbanization: 100, medianAge: 57, literacyRate: 100, gdpPerCapita: 0, lifeExpectancy: 0, internetPenetration: 0, mobilePenetration: 0 }
    ],
    questions: [
        // Question format: { question: "text", type: "top3"|"top5"|"top10", category: "population"|"religion"|"languages"|"urbanization"|"age"|"literacy"|"gdp"|"life"|"internet"|"mobile", options: ["Country1", "Country2", ...], correctRanking: ["Country1", "Country2", ...] }
        
        // Population questions
        { question: "Rank these countries by total population (most to least)", type: "top5", category: "population", options: ["China", "India", "United States", "Indonesia", "Pakistan"], correctRanking: ["India", "China", "United States", "Indonesia", "Pakistan"] },
        { question: "Rank these countries by population density (highest to lowest)", type: "top5", category: "populationDensity", options: ["Singapore", "Bangladesh", "Netherlands", "India", "Japan"], correctRanking: ["Singapore", "Bangladesh", "Netherlands", "Japan", "India"] },
        { question: "Rank these countries by total population (most to least)", type: "top3", category: "population", options: ["Brazil", "Russia", "Mexico"], correctRanking: ["Brazil", "Russia", "Mexico"] },
        { question: "Rank these countries by population (most to least)", type: "top10", category: "population", options: ["Nigeria", "Bangladesh", "Russia", "Mexico", "Japan", "Philippines", "Ethiopia", "Vietnam", "Egypt", "Turkey"], correctRanking: ["Nigeria", "Bangladesh", "Russia", "Mexico", "Japan", "Philippines", "Ethiopia", "Vietnam", "Egypt", "Turkey"] },
        
        // Religion questions
        { question: "Rank these countries by percentage of Muslim population (highest to lowest)", type: "top5", category: "religion", options: ["Saudi Arabia", "Pakistan", "Indonesia", "Turkey", "Egypt"], correctRanking: ["Saudi Arabia", "Pakistan", "Indonesia", "Turkey", "Egypt"] },
        { question: "Rank these countries by percentage of Christian population (highest to lowest)", type: "top5", category: "religion", options: ["Vatican City", "Brazil", "Philippines", "Mexico", "United States"], correctRanking: ["Vatican City", "Brazil", "Philippines", "Mexico", "United States"] },
        { question: "Rank these countries by Muslim population percentage (highest to lowest)", type: "top3", category: "religion", options: ["Mauritania", "Afghanistan", "Yemen"], correctRanking: ["Mauritania", "Afghanistan", "Yemen"] },
        { question: "Rank these countries by Muslim population percentage (highest to lowest)", type: "top10", category: "religion", options: ["Mauritania", "Somalia", "Afghanistan", "Yemen", "Tunisia", "Algeria", "Morocco", "Iran", "Iraq", "Libya"], correctRanking: ["Mauritania", "Somalia", "Afghanistan", "Yemen", "Tunisia", "Algeria", "Morocco", "Iran", "Iraq", "Libya"] },
        
        // Language diversity questions
        { question: "Rank these countries by number of languages spoken (most to least)", type: "top5", category: "languages", options: ["Papua New Guinea", "India", "Cameroon", "Indonesia", "Mexico"], correctRanking: ["Papua New Guinea", "India", "Cameroon", "Indonesia", "Mexico"] },
        { question: "Rank these countries by language diversity (most languages to least)", type: "top3", category: "languages", options: ["Papua New Guinea", "India", "United States"], correctRanking: ["Papua New Guinea", "India", "United States"] },
        { question: "Rank these countries by number of languages (most to least)", type: "top10", category: "languages", options: ["Papua New Guinea", "India", "United States", "Cameroon", "Indonesia", "Chad", "Australia", "Mexico", "Brazil", "Philippines"], correctRanking: ["Papua New Guinea", "India", "United States", "Cameroon", "Indonesia", "Chad", "Australia", "Mexico", "Brazil", "Philippines"] },
        
        // Urbanization questions
        { question: "Rank these countries by urbanization rate (highest to lowest)", type: "top5", category: "urbanization", options: ["Singapore", "Belgium", "Kuwait", "Qatar", "Japan"], correctRanking: ["Singapore", "Belgium", "Kuwait", "Qatar", "Japan"] },
        { question: "Rank these countries by percentage of urban population (highest to lowest)", type: "top3", category: "urbanization", options: ["Singapore", "Belgium", "Iceland"], correctRanking: ["Singapore", "Belgium", "Iceland"] },
        { question: "Rank these countries by urbanization rate (highest to lowest)", type: "top10", category: "urbanization", options: ["Singapore", "Belgium", "Kuwait", "Qatar", "Japan", "Argentina", "Uruguay", "Netherlands", "Iceland", "Israel"], correctRanking: ["Singapore", "Belgium", "Kuwait", "Qatar", "Japan", "Argentina", "Uruguay", "Netherlands", "Iceland", "Israel"] },
        
        // Age demographics
        { question: "Rank these countries by median age (oldest to youngest)", type: "top5", category: "age", options: ["Japan", "Italy", "Germany", "Portugal", "Greece"], correctRanking: ["Japan", "Italy", "Germany", "Portugal", "Greece"] },
        { question: "Rank these countries by median age (oldest to youngest)", type: "top3", category: "age", options: ["Japan", "Italy", "Monaco"], correctRanking: ["Japan", "Italy", "Monaco"] },
        { question: "Rank these countries by median age (youngest to oldest)", type: "top5", category: "age", options: ["Niger", "Uganda", "Mali", "Chad", "Somalia"], correctRanking: ["Niger", "Uganda", "Mali", "Chad", "Somalia"] },
        { question: "Rank these countries by median age (oldest to youngest)", type: "top10", category: "age", options: ["Japan", "Italy", "Monaco", "Germany", "Portugal", "Greece", "Bulgaria", "Croatia", "Lithuania", "Austria"], correctRanking: ["Japan", "Italy", "Monaco", "Germany", "Portugal", "Greece", "Bulgaria", "Croatia", "Lithuania", "Austria"] },
        
        // Literacy questions
        { question: "Rank these countries by literacy rate (highest to lowest)", type: "top5", category: "literacy", options: ["Russia", "Japan", "Norway", "Finland", "Estonia"], correctRanking: ["Russia", "Japan", "Norway", "Finland", "Estonia"] },
        { question: "Rank these countries by literacy rate (highest to lowest)", type: "top3", category: "literacy", options: ["Russia", "Japan", "Norway"], correctRanking: ["Russia", "Japan", "Norway"] },
        { question: "Rank these countries by literacy rate (lowest to highest)", type: "top5", category: "literacy", options: ["Niger", "Central African Republic", "Chad", "Guinea", "Somalia"], correctRanking: ["Niger", "Central African Republic", "Chad", "Guinea", "Somalia"] },
        
        // GDP per capita questions
        { question: "Rank these countries by GDP per capita (highest to lowest)", type: "top5", category: "gdp", options: ["Monaco", "Liechtenstein", "Luxembourg", "Switzerland", "Norway"], correctRanking: ["Monaco", "Liechtenstein", "Luxembourg", "Switzerland", "Norway"] },
        { question: "Rank these countries by GDP per capita (highest to lowest)", type: "top3", category: "gdp", options: ["Monaco", "Liechtenstein", "Luxembourg"], correctRanking: ["Monaco", "Liechtenstein", "Luxembourg"] },
        { question: "Rank these countries by GDP per capita (lowest to highest)", type: "top5", category: "gdp", options: ["Burundi", "South Sudan", "Somalia", "Central African Republic", "Niger"], correctRanking: ["Burundi", "South Sudan", "Somalia", "Central African Republic", "Niger"] },
        { question: "Rank these countries by GDP per capita (highest to lowest)", type: "top10", category: "gdp", options: ["Monaco", "Liechtenstein", "Luxembourg", "Switzerland", "Norway", "Ireland", "Qatar", "United States", "Singapore", "Denmark"], correctRanking: ["Monaco", "Liechtenstein", "Luxembourg", "Switzerland", "Norway", "Ireland", "Qatar", "United States", "Singapore", "Denmark"] },
        
        // Life expectancy questions
        { question: "Rank these countries by life expectancy (highest to lowest)", type: "top5", category: "life", options: ["Japan", "Switzerland", "Singapore", "Spain", "Italy"], correctRanking: ["Japan", "Switzerland", "Singapore", "Spain", "Italy"] },
        { question: "Rank these countries by life expectancy (highest to lowest)", type: "top3", category: "life", options: ["Japan", "Switzerland", "Singapore"], correctRanking: ["Japan", "Switzerland", "Singapore"] },
        { question: "Rank these countries by life expectancy (lowest to highest)", type: "top5", category: "life", options: ["Central African Republic", "Chad", "Lesotho", "Sierra Leone", "Nigeria"], correctRanking: ["Central African Republic", "Chad", "Lesotho", "Sierra Leone", "Nigeria"] },
        { question: "Rank these countries by life expectancy (highest to lowest)", type: "top10", category: "life", options: ["Japan", "Switzerland", "Singapore", "Spain", "Italy", "Australia", "Sweden", "France", "Canada", "Norway"], correctRanking: ["Japan", "Switzerland", "Singapore", "Spain", "Italy", "Australia", "Sweden", "France", "Canada", "Norway"] },
        
        // Internet penetration questions
        { question: "Rank these countries by internet penetration rate (highest to lowest)", type: "top5", category: "internet", options: ["Iceland", "United Arab Emirates", "Denmark", "Sweden", "Norway"], correctRanking: ["Iceland", "United Arab Emirates", "Denmark", "Sweden", "Norway"] },
        { question: "Rank these countries by internet penetration (highest to lowest)", type: "top3", category: "internet", options: ["Iceland", "United Arab Emirates", "Denmark"], correctRanking: ["Iceland", "United Arab Emirates", "Denmark"] },
        { question: "Rank these countries by internet penetration (lowest to highest)", type: "top5", category: "internet", options: ["Eritrea", "Somalia", "Central African Republic", "Niger", "Burundi"], correctRanking: ["Eritrea", "Somalia", "Central African Republic", "Niger", "Burundi"] },
        { question: "Rank these countries by internet penetration (highest to lowest)", type: "top10", category: "internet", options: ["Iceland", "United Arab Emirates", "Denmark", "Sweden", "Norway", "Finland", "Netherlands", "United Kingdom", "Germany", "South Korea"], correctRanking: ["Iceland", "United Arab Emirates", "Denmark", "Sweden", "Norway", "Finland", "Netherlands", "United Kingdom", "Germany", "South Korea"] },
        
        // Mobile penetration questions
        { question: "Rank these countries by mobile phone penetration (highest to lowest)", type: "top5", category: "mobile", options: ["United Arab Emirates", "Macau", "Singapore", "Maldives", "Seychelles"], correctRanking: ["United Arab Emirates", "Macau", "Singapore", "Maldives", "Seychelles"] },
        { question: "Rank these countries by mobile penetration (highest to lowest)", type: "top3", category: "mobile", options: ["United Arab Emirates", "Macau", "Singapore"], correctRanking: ["United Arab Emirates", "Macau", "Singapore"] },
        { question: "Rank these countries by mobile penetration (lowest to highest)", type: "top5", category: "mobile", options: ["Eritrea", "South Sudan", "Central African Republic", "Tuvalu", "Kiribati"], correctRanking: ["Eritrea", "South Sudan", "Central African Republic", "Tuvalu", "Kiribati"] },
        
        // Creative mixed questions
        { question: "Rank these countries by population density (highest to lowest)", type: "top5", category: "populationDensity", options: ["Monaco", "Singapore", "Malta", "Maldives", "Bahrain"], correctRanking: ["Monaco", "Singapore", "Malta", "Maldives", "Bahrain"] },
        { question: "Rank these countries by number of languages (most to least)", type: "top5", category: "languages", options: ["Papua New Guinea", "Indonesia", "Nigeria", "India", "Australia"], correctRanking: ["Papua New Guinea", "Indonesia", "Nigeria", "India", "Australia"] },
        { question: "Rank these countries by Christian population percentage (highest to lowest)", type: "top5", category: "religion", options: ["Vatican City", "Timor-Leste", "Romania", "Armenia", "Malta"], correctRanking: ["Vatican City", "Timor-Leste", "Romania", "Armenia", "Malta"] },
        { question: "Rank these countries by urbanization rate (highest to lowest)", type: "top5", category: "urbanization", options: ["Singapore", "Kuwait", "Belgium", "San Marino", "Qatar"], correctRanking: ["Singapore", "Kuwait", "Belgium", "San Marino", "Qatar"] },
        { question: "Rank these countries by median age (youngest to oldest)", type: "top5", category: "age", options: ["Niger", "Uganda", "Mali", "Chad", "Somalia"], correctRanking: ["Niger", "Uganda", "Mali", "Chad", "Somalia"] },
        { question: "Rank these countries by GDP per capita (highest to lowest)", type: "top5", category: "gdp", options: ["Monaco", "Liechtenstein", "Luxembourg", "Switzerland", "Macau"], correctRanking: ["Monaco", "Liechtenstein", "Luxembourg", "Switzerland", "Macau"] },
        { question: "Rank these countries by life expectancy (highest to lowest)", type: "top5", category: "life", options: ["Japan", "Monaco", "Switzerland", "Singapore", "Italy"], correctRanking: ["Japan", "Monaco", "Switzerland", "Singapore", "Italy"] },
        { question: "Rank these countries by internet penetration (highest to lowest)", type: "top5", category: "internet", options: ["Iceland", "United Arab Emirates", "Denmark", "Sweden", "South Korea"], correctRanking: ["Iceland", "United Arab Emirates", "Denmark", "Sweden", "South Korea"] },
        { question: "Rank these countries by mobile penetration (highest to lowest)", type: "top5", category: "mobile", options: ["United Arab Emirates", "Macau", "Maldives", "Seychelles", "Antigua and Barbuda"], correctRanking: ["United Arab Emirates", "Macau", "Maldives", "Seychelles", "Antigua and Barbuda"] },
        { question: "Rank these countries by literacy rate (highest to lowest)", type: "top5", category: "literacy", options: ["Russia", "Japan", "Norway", "Finland", "Estonia"], correctRanking: ["Russia", "Japan", "Norway", "Finland", "Estonia"] },
        
        // Food & Drink Consumption
        { question: "Rank these countries by coffee consumption per capita (highest to lowest)", type: "top5", category: "coffee", options: ["Finland", "Norway", "Iceland", "Denmark", "Netherlands"], correctRanking: ["Finland", "Norway", "Iceland", "Denmark", "Netherlands"] },
        { question: "Rank these countries by coffee consumption per capita (highest to lowest)", type: "top3", category: "coffee", options: ["Finland", "Norway", "Iceland"], correctRanking: ["Finland", "Norway", "Iceland"] },
        { question: "Rank these countries by tea consumption per capita (highest to lowest)", type: "top5", category: "tea", options: ["Turkey", "Ireland", "United Kingdom", "Iran", "Russia"], correctRanking: ["Turkey", "Ireland", "United Kingdom", "Iran", "Russia"] },
        { question: "Rank these countries by tea consumption per capita (highest to lowest)", type: "top3", category: "tea", options: ["Turkey", "Ireland", "United Kingdom"], correctRanking: ["Turkey", "Ireland", "United Kingdom"] },
        { question: "Rank these countries by beer consumption per capita (highest to lowest)", type: "top5", category: "beer", options: ["Czech Republic", "Austria", "Poland", "Germany", "Romania"], correctRanking: ["Czech Republic", "Austria", "Poland", "Germany", "Romania"] },
        { question: "Rank these countries by beer consumption per capita (highest to lowest)", type: "top10", category: "beer", options: ["Czech Republic", "Austria", "Poland", "Germany", "Romania", "Spain", "Croatia", "Lithuania", "Slovakia", "Belgium"], correctRanking: ["Czech Republic", "Austria", "Poland", "Germany", "Romania", "Spain", "Croatia", "Lithuania", "Slovakia", "Belgium"] },
        { question: "Rank these countries by chocolate consumption per capita (highest to lowest)", type: "top5", category: "chocolate", options: ["Switzerland", "Germany", "Austria", "United Kingdom", "Sweden"], correctRanking: ["Switzerland", "Germany", "Austria", "United Kingdom", "Sweden"] },
        { question: "Rank these countries by cheese consumption per capita (highest to lowest)", type: "top5", category: "cheese", options: ["France", "Iceland", "Greece", "Finland", "Germany"], correctRanking: ["France", "Iceland", "Greece", "Finland", "Germany"] },
        { question: "Rank these countries by meat consumption per capita (highest to lowest)", type: "top5", category: "meat", options: ["Australia", "United States", "Argentina", "Israel", "New Zealand"], correctRanking: ["Australia", "United States", "Argentina", "Israel", "New Zealand"] },
        { question: "Rank these countries by sugar consumption per capita (highest to lowest)", type: "top5", category: "sugar", options: ["India", "United States", "Brazil", "Mexico", "Russia"], correctRanking: ["India", "United States", "Brazil", "Mexico", "Russia"] },
        
        // Lifestyle & Technology
        { question: "Rank these countries by average daily commute time (longest to shortest)", type: "top5", category: "commute", options: ["South Korea", "Turkey", "Japan", "Mexico", "Canada"], correctRanking: ["South Korea", "Turkey", "Japan", "Mexico", "Canada"] },
        { question: "Rank these countries by time spent on social media daily (most to least)", type: "top5", category: "socialMedia", options: ["Philippines", "Brazil", "Colombia", "Argentina", "South Africa"], correctRanking: ["Philippines", "Brazil", "Colombia", "Argentina", "South Africa"] },
        { question: "Rank these countries by fastest fixed broadband internet speed (highest to lowest)", type: "top5", category: "internetSpeed", options: ["Singapore", "Hong Kong", "Romania", "South Korea", "Switzerland"], correctRanking: ["Singapore", "Hong Kong", "Romania", "South Korea", "Switzerland"] },
        { question: "Rank these countries by mobile phone SIM cards per capita (most to least)", type: "top5", category: "mobilePhones", options: ["United Arab Emirates", "Macau", "Hong Kong", "Singapore", "Maldives"], correctRanking: ["United Arab Emirates", "Macau", "Hong Kong", "Singapore", "Maldives"] },
        { question: "Rank these countries by bicycles per capita (most to least)", type: "top5", category: "bicycles", options: ["Netherlands", "Denmark", "Germany", "Sweden", "Norway"], correctRanking: ["Netherlands", "Denmark", "Germany", "Sweden", "Norway"] },
        { question: "Rank these countries by plastic surgeries per capita (most to least)", type: "top5", category: "plasticSurgery", options: ["South Korea", "Greece", "Italy", "Brazil", "Colombia"], correctRanking: ["South Korea", "Greece", "Italy", "Brazil", "Colombia"] },
        { question: "Rank these countries by cars per capita (most to least)", type: "top5", category: "cars", options: ["Monaco", "San Marino", "Liechtenstein", "Iceland", "Luxembourg"], correctRanking: ["Monaco", "San Marino", "Liechtenstein", "Iceland", "Luxembourg"] },
        
        // Geography & Environment
        { question: "Rank these countries by total coastline length (longest to shortest)", type: "top5", category: "coastline", options: ["Canada", "Indonesia", "Russia", "Philippines", "Japan"], correctRanking: ["Canada", "Indonesia", "Russia", "Philippines", "Japan"] },
        { question: "Rank these countries by coastline length (longest to shortest)", type: "top10", category: "coastline", options: ["Canada", "Indonesia", "Russia", "Philippines", "Japan", "Australia", "Norway", "United States", "New Zealand", "Greece"], correctRanking: ["Canada", "Indonesia", "Russia", "Philippines", "Japan", "Australia", "Norway", "United States", "New Zealand", "Greece"] },
        { question: "Rank these countries by percentage of arable land (highest to lowest)", type: "top5", category: "arableLand", options: ["Bangladesh", "Denmark", "Ukraine", "Moldova", "India"], correctRanking: ["Bangladesh", "Denmark", "Ukraine", "Moldova", "India"] },
        { question: "Rank these countries by forest cover percentage (highest to lowest)", type: "top5", category: "forests", options: ["Suriname", "Guyana", "Finland", "Sweden", "Japan"], correctRanking: ["Suriname", "Guyana", "Finland", "Sweden", "Japan"] },
        { question: "Rank these countries by average elevation (highest to lowest)", type: "top5", category: "elevation", options: ["Bhutan", "Nepal", "Lesotho", "Switzerland", "Andorra"], correctRanking: ["Bhutan", "Nepal", "Lesotho", "Switzerland", "Andorra"] },
        { question: "Rank these countries by average elevation (lowest to highest)", type: "top5", category: "elevation", options: ["Maldives", "Qatar", "Netherlands", "Denmark", "Bahrain"], correctRanking: ["Maldives", "Qatar", "Netherlands", "Denmark", "Bahrain"] },
        { question: "Rank these countries by number of islands (most to least)", type: "top5", category: "islands", options: ["Sweden", "Finland", "Norway", "Canada", "Indonesia"], correctRanking: ["Sweden", "Finland", "Norway", "Canada", "Indonesia"] },
        { question: "Rank these countries by number of land borders (most to least)", type: "top5", category: "borders", options: ["China", "Russia", "Brazil", "Germany", "Austria"], correctRanking: ["China", "Russia", "Brazil", "Germany", "Austria"] },
        { question: "Rank these countries by average annual rainfall (driest to wettest)", type: "top5", category: "rainfall", options: ["Egypt", "Libya", "Saudi Arabia", "United Arab Emirates", "Qatar"], correctRanking: ["Egypt", "Libya", "Saudi Arabia", "United Arab Emirates", "Qatar"] },
        { question: "Rank these countries by average yearly temperature (hottest to coolest)", type: "top5", category: "temperature", options: ["Mali", "Burkina Faso", "Senegal", "Mauritania", "Niger"], correctRanking: ["Mali", "Burkina Faso", "Senegal", "Mauritania", "Niger"] },
        { question: "Rank these countries by number of active volcanoes (most to least)", type: "top5", category: "volcanoes", options: ["Indonesia", "Japan", "United States", "Russia", "Philippines"], correctRanking: ["Indonesia", "Japan", "United States", "Russia", "Philippines"] },
        { question: "Rank these countries by earthquake frequency (most to least)", type: "top5", category: "earthquakes", options: ["Japan", "Indonesia", "Chile", "Philippines", "Turkey"], correctRanking: ["Japan", "Indonesia", "Chile", "Philippines", "Turkey"] },
        
        // Demographics & Physical Traits
        { question: "Rank these countries by average male height (tallest to shortest)", type: "top5", category: "height", options: ["Netherlands", "Montenegro", "Estonia", "Denmark", "Iceland"], correctRanking: ["Netherlands", "Montenegro", "Estonia", "Denmark", "Iceland"] },
        { question: "Rank these countries by average height (tallest to shortest)", type: "top10", category: "height", options: ["Netherlands", "Montenegro", "Estonia", "Denmark", "Iceland", "Latvia", "Czech Republic", "Serbia", "Slovenia", "Germany"], correctRanking: ["Netherlands", "Montenegro", "Estonia", "Denmark", "Iceland", "Latvia", "Czech Republic", "Serbia", "Slovenia", "Germany"] },
        { question: "Rank these countries by average height (shortest to tallest)", type: "top5", category: "height", options: ["Guatemala", "Philippines", "Vietnam", "Indonesia", "Bolivia"], correctRanking: ["Guatemala", "Philippines", "Vietnam", "Indonesia", "Bolivia"] },
        { question: "Rank these countries by percentage of twins born (highest to lowest)", type: "top5", category: "twins", options: ["Benin", "Togo", "Zambia", "Central African Republic", "Mali"], correctRanking: ["Benin", "Togo", "Zambia", "Central African Republic", "Mali"] },
        { question: "Rank these countries by percentage of redheads (highest to lowest)", type: "top5", category: "redheads", options: ["Ireland", "United Kingdom", "Netherlands", "Belgium", "Germany"], correctRanking: ["Ireland", "United Kingdom", "Netherlands", "Belgium", "Germany"] },
        { question: "Rank these countries by obesity rate (highest to lowest)", type: "top5", category: "obesity", options: ["Nauru", "Palau", "Marshall Islands", "Tuvalu", "Tonga"], correctRanking: ["Nauru", "Palau", "Marshall Islands", "Tuvalu", "Tonga"] },
        { question: "Rank these countries by obesity rate (highest to lowest)", type: "top10", category: "obesity", options: ["Nauru", "Palau", "Marshall Islands", "Tuvalu", "Tonga", "Samoa", "Kiribati", "Micronesia", "Fiji", "Papua New Guinea"], correctRanking: ["Nauru", "Palau", "Marshall Islands", "Tuvalu", "Tonga", "Samoa", "Kiribati", "Micronesia", "Fiji", "Papua New Guinea"] },
        
        // Society, Culture & Economy
        { question: "Rank these countries by number of official languages (most to least)", type: "top5", category: "officialLanguages", options: ["Bolivia", "South Africa", "Zimbabwe", "India", "Switzerland"], correctRanking: ["Bolivia", "South Africa", "Zimbabwe", "India", "Switzerland"] },
        { question: "Rank these countries by happiness index score (highest to lowest)", type: "top5", category: "happiness", options: ["Finland", "Denmark", "Iceland", "Switzerland", "Netherlands"], correctRanking: ["Finland", "Denmark", "Iceland", "Switzerland", "Netherlands"] },
        { question: "Rank these countries by happiness index (highest to lowest)", type: "top10", category: "happiness", options: ["Finland", "Denmark", "Iceland", "Switzerland", "Netherlands", "Sweden", "Norway", "Luxembourg", "New Zealand", "Austria"], correctRanking: ["Finland", "Denmark", "Iceland", "Switzerland", "Netherlands", "Sweden", "Norway", "Luxembourg", "New Zealand", "Austria"] },
        { question: "Rank these countries by Global Peace Index (most peaceful to least)", type: "top5", category: "peace", options: ["Iceland", "New Zealand", "Ireland", "Denmark", "Austria"], correctRanking: ["Iceland", "New Zealand", "Ireland", "Denmark", "Austria"] },
        { question: "Rank these countries by World Giving Index (most charitable to least)", type: "top5", category: "charity", options: ["Indonesia", "Kenya", "Myanmar", "New Zealand", "United States"], correctRanking: ["Indonesia", "Kenya", "Myanmar", "New Zealand", "United States"] },
        { question: "Rank these countries by percentage with tertiary education (highest to lowest)", type: "top5", category: "education", options: ["Canada", "Japan", "South Korea", "United Kingdom", "Australia"], correctRanking: ["Canada", "Japan", "South Korea", "United Kingdom", "Australia"] },
        { question: "Rank these countries by total Nobel Prize winners (most to least)", type: "top5", category: "nobel", options: ["United States", "United Kingdom", "Germany", "France", "Sweden"], correctRanking: ["United States", "United Kingdom", "Germany", "France", "Sweden"] },
        { question: "Rank these countries by total Olympic gold medals (most to least)", type: "top5", category: "olympics", options: ["United States", "Russia", "Germany", "United Kingdom", "France"], correctRanking: ["United States", "Russia", "Germany", "United Kingdom", "France"] },
        { question: "Rank these countries by active military personnel (largest to smallest)", type: "top5", category: "military", options: ["China", "India", "United States", "Russia", "North Korea"], correctRanking: ["China", "India", "United States", "Russia", "North Korea"] },
        { question: "Rank these countries by number of billionaires (most to least)", type: "top5", category: "billionaires", options: ["United States", "China", "India", "Germany", "Russia"], correctRanking: ["United States", "China", "India", "Germany", "Russia"] },
        { question: "Rank these countries by cost of living index (most expensive to least)", type: "top5", category: "costOfLiving", options: ["Switzerland", "Norway", "Iceland", "Denmark", "Luxembourg"], correctRanking: ["Switzerland", "Norway", "Iceland", "Denmark", "Luxembourg"] },
        { question: "Rank these countries by annual working hours (longest to shortest)", type: "top5", category: "workingHours", options: ["Mexico", "Costa Rica", "South Korea", "Greece", "Chile"], correctRanking: ["Mexico", "Costa Rica", "South Korea", "Greece", "Chile"] },
        { question: "Rank these countries by annual working hours (shortest to longest)", type: "top5", category: "workingHours", options: ["Germany", "Denmark", "Norway", "Netherlands", "France"], correctRanking: ["Germany", "Denmark", "Norway", "Netherlands", "France"] },
        { question: "Rank these countries by statutory paid vacation days (most to least)", type: "top5", category: "vacation", options: ["France", "Finland", "Spain", "Brazil", "Austria"], correctRanking: ["France", "Finland", "Spain", "Brazil", "Austria"] },
        { question: "Rank these countries by number of public holidays (most to least)", type: "top5", category: "holidays", options: ["Cambodia", "Sri Lanka", "Nepal", "India", "Colombia"], correctRanking: ["Cambodia", "Sri Lanka", "Nepal", "India", "Colombia"] },
        { question: "Rank these countries by number of public holidays (most to least)", type: "top10", category: "holidays", options: ["Cambodia", "Sri Lanka", "Nepal", "India", "Colombia", "Philippines", "Thailand", "Malaysia", "Indonesia", "Bangladesh"], correctRanking: ["Cambodia", "Sri Lanka", "Nepal", "India", "Colombia", "Philippines", "Thailand", "Malaysia", "Indonesia", "Bangladesh"] },
        
        // ========================================
        // QUIRKY DAILY LIFE STATISTICS
        // ========================================
        // Questions below focus on fun, unexpected daily-life statistics
        // Data sources: OECD, World Bank, FAO, Statista, national statistical agencies, industry reports
        // Data years vary by statistic (mostly 2018-2024)
        // Rankings verified where multiple sources available
        // ========================================
        
        // Quirky Daily Life Statistics - Pet Ownership
        { question: "Rank these countries by cat ownership per capita (most cats per person)", type: "top5", category: "petOwnership", options: ["Hungary", "France", "Austria", "Belgium", "Russia"], correctRanking: ["Hungary", "France", "Austria", "Belgium", "Russia"] },
        { question: "Rank these countries by percentage of households that own dogs (highest to lowest)", type: "top5", category: "petOwnership", options: ["Argentina", "United States", "Brazil", "United Kingdom", "Australia"], correctRanking: ["Argentina", "United States", "Brazil", "United Kingdom", "Australia"] },
        
        // Quirky Daily Life Statistics - Alcohol (Beyond Beer)
        { question: "Rank these countries by wine consumption per capita (highest to lowest)", type: "top5", category: "wine", options: ["Luxembourg", "France", "Portugal", "Italy", "Croatia"], correctRanking: ["Luxembourg", "France", "Portugal", "Italy", "Croatia"] },
        { question: "Rank these countries by spirits consumption per capita (highest to lowest)", type: "top5", category: "spirits", options: ["South Korea", "Estonia", "Russia", "Belarus", "Lithuania"], correctRanking: ["South Korea", "Estonia", "Russia", "Belarus", "Lithuania"] },
        
        // Quirky Daily Life Statistics - Reading & Libraries
        { question: "Rank these countries by average books read per person per year (most to least)", type: "top5", category: "reading", options: ["United States", "India", "United Kingdom", "France", "Italy"], correctRanking: ["United States", "India", "United Kingdom", "France", "Italy"] },
        { question: "Rank these countries by library visits per capita per year (most to least)", type: "top5", category: "reading", options: ["Finland", "Japan", "Denmark", "Sweden", "Ireland"], correctRanking: ["Finland", "Japan", "Denmark", "Sweden", "Ireland"] },
        
        // Quirky Daily Life Statistics - Household Characteristics
        { question: "Rank these countries by average household size (smallest to largest)", type: "top5", category: "household", options: ["Germany", "South Korea", "France", "Netherlands", "Japan"], correctRanking: ["Germany", "South Korea", "France", "Netherlands", "Japan"] },
        { question: "Rank these countries by average household size (largest to smallest)", type: "top5", category: "household", options: ["Senegal", "Angola", "The Gambia", "Equatorial Guinea", "Gabon"], correctRanking: ["Senegal", "Angola", "The Gambia", "Equatorial Guinea", "Gabon"] },
        
        // Quirky Daily Life Statistics - Cultural Infrastructure
        { question: "Rank these countries by number of museums per million people (most to least)", type: "top5", category: "culturalInfrastructure", options: ["Sweden", "Switzerland", "United States", "Germany", "France"], correctRanking: ["Sweden", "Switzerland", "United States", "Germany", "France"] },
        
        // Quirky Daily Life Statistics - Entertainment Spending
        { question: "Rank these countries by gambling expenditure per capita (most money lost per adult)", type: "top5", category: "entertainment", options: ["Australia", "Singapore", "Ireland", "Denmark", "United Kingdom"], correctRanking: ["Australia", "Singapore", "Ireland", "Denmark", "United Kingdom"] },
        
        // Quirky Daily Life Statistics - Food Quirks (Ice Cream, Cookies, etc.)
        { question: "Rank these countries by ice cream consumption per capita (liters per year)", type: "top5", category: "foodQuirks", options: ["New Zealand", "United States", "Australia", "Sweden", "Canada"], correctRanking: ["New Zealand", "United States", "Australia", "Sweden", "Canada"] },
        { question: "Rank these countries by cookie and cracker consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Argentina", "United Kingdom", "United States", "Belgium", "Germany"], correctRanking: ["Argentina", "United Kingdom", "United States", "Belgium", "Germany"] },
        
        // Quirky Daily Life Statistics - Technology & Modern Life
        { question: "Rank these countries by industrial robots per 10,000 manufacturing employees (most to least)", type: "top5", category: "technology", options: ["South Korea", "Singapore", "Germany", "Japan", "China"], correctRanking: ["South Korea", "Singapore", "Germany", "Japan", "China"] },
        { question: "Rank these countries by vending machines per capita (most to least)", type: "top5", category: "technology", options: ["Japan", "United States", "South Korea", "United Kingdom", "Germany"], correctRanking: ["Japan", "United States", "South Korea", "United Kingdom", "Germany"] },
        
        // Quirky Daily Life Statistics - Cultural Quirks
        { question: "Rank these countries by number of heavy metal bands per capita (most to least)", type: "top5", category: "culturalQuirks", options: ["Finland", "Sweden", "Iceland", "Norway", "Germany"], correctRanking: ["Finland", "Sweden", "Iceland", "Norway", "Germany"] },
        { question: "Rank these countries by mushroom consumption per capita (most to least)", type: "top5", category: "foodQuirks", options: ["Netherlands", "Belgium", "Germany", "Poland", "France"], correctRanking: ["Netherlands", "Belgium", "Germany", "Poland", "France"] },
        
        // Quirky Daily Life Statistics - Consumption Habits
        { question: "Rank these countries by toilet paper consumption per capita (most to least)", type: "top5", category: "consumptionQuirks", options: ["United States", "Germany", "United Kingdom", "Netherlands", "Australia"], correctRanking: ["United States", "Germany", "United Kingdom", "Netherlands", "Australia"] },
        
        // Quirky Daily Life Statistics - Transportation
        { question: "Rank these countries by percentage of trips made by bicycle (highest to lowest)", type: "top5", category: "transportation", options: ["Netherlands", "Denmark", "Sweden", "Germany", "Finland"], correctRanking: ["Netherlands", "Denmark", "Sweden", "Germany", "Finland"] },
        
        // Quirky Daily Life Statistics - Sauna Culture (Finland specific but interesting)
        { question: "Rank these Nordic countries by saunas per capita (most to least)", type: "top3", category: "culturalQuirks", options: ["Finland", "Sweden", "Norway"], correctRanking: ["Finland", "Sweden", "Norway"] },
        
        // Quirky Daily Life Statistics - Work Life Balance
        { question: "Rank these countries by annual working hours per worker (most to least)", type: "top5", category: "workLife", options: ["Mexico", "Costa Rica", "Colombia", "United States", "Germany"], correctRanking: ["Mexico", "Costa Rica", "Colombia", "United States", "Germany"] },
        { question: "Rank these countries by annual working hours per worker (least to most)", type: "top5", category: "workLife", options: ["Germany", "Denmark", "Norway", "Netherlands", "France"], correctRanking: ["Germany", "Denmark", "Norway", "Netherlands", "France"] },
        
        // Quirky Daily Life Statistics - Screen Time & Streaming
        { question: "Rank these countries by Netflix subscriptions per capita (most to least)", type: "top5", category: "technology", options: ["United Kingdom", "United States", "Canada", "Australia", "Sweden"], correctRanking: ["United Kingdom", "United States", "Canada", "Australia", "Sweden"] },
        
        // Quirky Daily Life Statistics - Cinema Attendance
        { question: "Rank these countries by cinema attendance per capita (most visits per person per year)", type: "top5", category: "entertainment", options: ["Iceland", "France", "Ireland", "United Kingdom", "Australia"], correctRanking: ["Iceland", "France", "Ireland", "United Kingdom", "Australia"] },
        
        // Quirky Daily Life Statistics - Energy Drinks & Beverages
        { question: "Rank these countries by energy drink consumption per capita (liters per year)", type: "top5", category: "beverages", options: ["United States", "United Kingdom", "Japan", "Spain", "Germany"], correctRanking: ["United States", "United Kingdom", "Japan", "Spain", "Germany"] },
        
        // Quirky Daily Life Statistics - Organic Food
        { question: "Rank these countries by organic food spending per capita (euros per year)", type: "top5", category: "foodQuirks", options: ["Austria", "Germany", "France", "Switzerland", "Denmark"], correctRanking: ["Austria", "Germany", "France", "Switzerland", "Denmark"] },
        
        // Quirky Daily Life Statistics - Fast Food
        { question: "Rank these countries by McDonald's restaurants per million people (most to least)", type: "top5", category: "foodQuirks", options: ["United States", "Australia", "Canada", "France", "Japan"], correctRanking: ["United States", "Australia", "Canada", "France", "Japan"] },
        
        // Quirky Daily Life Statistics - Processed Foods
        { question: "Rank these countries by ultra-processed food consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["United States", "United Kingdom", "Germany", "France", "Italy"], correctRanking: ["United States", "United Kingdom", "Germany", "France", "Italy"] },
        
        // Quirky Daily Life Statistics - Snacking Habits
        { question: "Rank these countries by percentage of people who snack instead of eating breakfast (highest to lowest)", type: "top3", category: "foodQuirks", options: ["India", "United States", "Mexico"], correctRanking: ["India", "United States", "Mexico"] },
        
        // Quirky Daily Life Statistics - Sugary Beverages
        { question: "Rank these Caribbean countries by sugary beverage consumption per capita (most to least)", type: "top3", category: "beverages", options: ["Trinidad and Tobago", "Barbados", "Jamaica"], correctRanking: ["Trinidad and Tobago", "Barbados", "Jamaica"] },
        
        // Quirky Daily Life Statistics - Cheese Consumption (expand existing)
        { question: "Rank these countries by cheese consumption per capita (kg per year)", type: "top10", category: "cheese", options: ["France", "Iceland", "Greece", "Finland", "Germany", "Italy", "Switzerland", "Austria", "Netherlands", "Sweden"], correctRanking: ["France", "Iceland", "Greece", "Finland", "Germany", "Italy", "Switzerland", "Austria", "Netherlands", "Sweden"] },
        
        
        // Quirky Daily Life Statistics - Fish & Seafood
        { question: "Rank these countries by fish consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Maldives", "Iceland", "Portugal", "South Korea", "Japan"], correctRanking: ["Maldives", "Iceland", "Portugal", "South Korea", "Japan"] },
        
        // Quirky Daily Life Statistics - Home Characteristics
        { question: "Rank these countries by percentage of households that own their home (highest to lowest)", type: "top5", category: "household", options: ["Romania", "Slovakia", "Croatia", "Hungary", "Lithuania"], correctRanking: ["Romania", "Slovakia", "Croatia", "Hungary", "Lithuania"] },
        
        // Note: Hungary and Croatia both have 91% - Croatia listed first due to alphabetical order in ranking
        
        // Quirky Daily Life Statistics - Time Spent Cooking/Eating
        { question: "Rank these countries by average time spent eating and drinking per day (most to least)", type: "top5", category: "lifestyle", options: ["France", "Greece", "Italy", "Spain", "Denmark"], correctRanking: ["France", "Greece", "Italy", "Spain", "Denmark"] },
        
        // Quirky Daily Life Statistics - Shopping Habits
        { question: "Rank these countries by online shopping percentage of total retail sales (highest to lowest)", type: "top5", category: "technology", options: ["China", "United Kingdom", "South Korea", "United States", "Germany"], correctRanking: ["China", "United Kingdom", "South Korea", "United States", "Germany"] },
        
        // Quirky Daily Life Statistics - Time Spent on Hobbies
        { question: "Rank these countries by percentage of people who read books daily (highest to lowest)", type: "top5", category: "reading", options: ["India", "Thailand", "China", "Philippines", "Egypt"], correctRanking: ["India", "Thailand", "China", "Philippines", "Egypt"] },
        
        // Quirky Daily Life Statistics - Leisure Activities
        { question: "Rank these countries by percentage of leisure time spent watching TV (highest to lowest)", type: "top5", category: "entertainment", options: ["Mexico", "United States", "Italy", "Spain", "France"], correctRanking: ["Mexico", "United States", "Italy", "Spain", "France"] },
        
        // Quirky Daily Life Statistics - Social Activities
        { question: "Rank these countries by percentage of leisure time spent socializing with friends (highest to lowest)", type: "top5", category: "socialQuirks", options: ["Turkey", "Mexico", "Greece", "Spain", "Italy"], correctRanking: ["Turkey", "Mexico", "Greece", "Spain", "Italy"] },
        
        // Quirky Daily Life Statistics - Physical Activity
        { question: "Rank these countries by percentage of adults who exercise regularly (highest to lowest)", type: "top5", category: "lifestyle", options: ["Finland", "Sweden", "Norway", "Denmark", "Netherlands"], correctRanking: ["Finland", "Sweden", "Norway", "Denmark", "Netherlands"] },
        
        // Quirky Daily Life Statistics - Sleep Patterns
        { question: "Rank these countries by average hours of sleep per night (most to least)", type: "top5", category: "lifestyle", options: ["New Zealand", "Netherlands", "Finland", "United Kingdom", "Australia"], correctRanking: ["New Zealand", "Netherlands", "Finland", "United Kingdom", "Australia"] },
        
        // Quirky Daily Life Statistics - Ecological Footprint
        { question: "Rank these countries by ecological footprint per capita (global hectares)", type: "top5", category: "environment", options: ["Qatar", "Luxembourg", "United Arab Emirates", "United States", "Canada"], correctRanking: ["Qatar", "Luxembourg", "United Arab Emirates", "United States", "Canada"] },
        
        // Quirky Daily Life Statistics - Environmental Quirks
        { question: "Rank these countries by recycling rate percentage (highest to lowest)", type: "top5", category: "environment", options: ["Germany", "South Korea", "Austria", "Slovenia", "Belgium"], correctRanking: ["Germany", "South Korea", "Austria", "Slovenia", "Belgium"] },
        
        // Quirky Daily Life Statistics - Beauty & Grooming
        { question: "Rank these countries by percentage of population with tattoos (highest to lowest)", type: "top5", category: "beautyQuirks", options: ["Italy", "Sweden", "United States", "Australia", "Argentina"], correctRanking: ["Italy", "Sweden", "United States", "Australia", "Argentina"] },
        { question: "Rank these countries by percentage of population with tattoos (highest to lowest)", type: "top10", category: "beautyQuirks", options: ["Italy", "Sweden", "United States", "Australia", "Argentina", "Spain", "Denmark", "United Kingdom", "Brazil", "France"], correctRanking: ["Italy", "Sweden", "United States", "Australia", "Argentina", "Spain", "Denmark", "United Kingdom", "Brazil", "France"] },
        { question: "Rank these countries by plastic surgery procedures per 1,000 people (most to least)", type: "top5", category: "beautyQuirks", options: ["South Korea", "Brazil", "Italy", "Greece", "Colombia"], correctRanking: ["South Korea", "Brazil", "Italy", "Greece", "Colombia"] },
        { question: "Rank these countries by cosmetics spending per capita (USD per year)", type: "top5", category: "beautyQuirks", options: ["United States", "Japan", "Germany", "France", "United Kingdom"], correctRanking: ["United States", "Japan", "Germany", "France", "United Kingdom"] },
        { question: "Rank these countries by fragrance spending per capita (USD per year)", type: "top5", category: "beautyQuirks", options: ["United Arab Emirates", "France", "United States", "China", "India"], correctRanking: ["United Arab Emirates", "France", "United States", "China", "India"] },
        { question: "Rank these countries by nail salon visits per capita (most manicure/pedicure products per 1,000 people)", type: "top5", category: "beautyQuirks", options: ["Turkey", "Russia", "United States", "Germany", "Argentina"], correctRanking: ["Turkey", "Russia", "United States", "Germany", "Argentina"] },
        
        // Quirky Daily Life Statistics - Fashion & Clothing
        { question: "Rank these countries by clothing spending per capita (USD per year)", type: "top5", category: "fashion", options: ["Luxembourg", "Switzerland", "Norway", "Australia", "United States"], correctRanking: ["Luxembourg", "Switzerland", "Norway", "Australia", "United States"] },
        { question: "Rank these countries by wedding spending per couple (average USD)", type: "top5", category: "lifestyle", options: ["United States", "United Kingdom", "Spain", "Italy", "France"], correctRanking: ["United States", "United Kingdom", "Spain", "Italy", "France"] },
        { question: "Rank these countries by average number of wedding guests (most to least)", type: "top5", category: "lifestyle", options: ["India", "Mexico", "Brazil", "United States", "Portugal"], correctRanking: ["India", "Mexico", "Brazil", "United States", "Portugal"] },
        
        // Quirky Daily Life Statistics - Entertainment & Social Activities
        { question: "Rank these countries by karaoke venues per capita (most to least)", type: "top5", category: "entertainment", options: ["South Korea", "Japan", "China", "Thailand", "Philippines"], correctRanking: ["South Korea", "Japan", "China", "Thailand", "Philippines"] },
        { question: "Rank these countries by food delivery ordering frequency per week (most to least)", type: "top5", category: "foodQuirks", options: ["United Arab Emirates", "United States", "Canada", "United Kingdom", "Australia"], correctRanking: ["United Arab Emirates", "United States", "Canada", "United Kingdom", "Australia"] },
        { question: "Rank these countries by percentage of people who order food delivery at least weekly (highest to lowest)", type: "top5", category: "foodQuirks", options: ["United Arab Emirates", "China", "India", "Australia", "France"], correctRanking: ["United Arab Emirates", "China", "India", "Australia", "France"] },
        
        // Quirky Daily Life Statistics - Gaming & Digital
        { question: "Rank these countries by average weekly gaming hours per gamer (most to least)", type: "top5", category: "technology", options: ["China", "United States", "Japan", "South Korea", "United Kingdom"], correctRanking: ["China", "United States", "Japan", "South Korea", "United Kingdom"] },
        { question: "Rank these countries by esports players per capita (most prize-winning players per 100,000 people)", type: "top5", category: "technology", options: ["Denmark", "Sweden", "Finland", "Norway", "Iceland"], correctRanking: ["Denmark", "Sweden", "Finland", "Norway", "Iceland"] },
        { question: "Rank these countries by total number of gamers (most to least)", type: "top5", category: "technology", options: ["China", "United States", "Japan", "South Korea", "Brazil"], correctRanking: ["China", "United States", "Japan", "South Korea", "Brazil"] },
        
        // Quirky Daily Life Statistics - Yoga & Wellness
        { question: "Rank these countries by percentage of population that practices yoga (highest to lowest)", type: "top5", category: "lifestyle", options: ["India", "United States", "Canada", "Australia", "United Kingdom"], correctRanking: ["India", "United States", "Canada", "Australia", "United Kingdom"] },
        { question: "Rank these countries by percentage of population that meditates (highest to lowest)", type: "top5", category: "lifestyle", options: ["United States", "Germany", "Australia", "India", "United Kingdom"], correctRanking: ["United States", "Germany", "Australia", "India", "United Kingdom"] },
        
        // Quirky Daily Life Statistics - Dining & Restaurants
        { question: "Rank these countries by restaurant spending per capita (EUR per year)", type: "top5", category: "foodQuirks", options: ["Iceland", "Switzerland", "Ireland", "Austria", "Malta"], correctRanking: ["Iceland", "Switzerland", "Ireland", "Austria", "Malta"] },
        { question: "Rank these countries by percentage of household budget spent on dining out (highest to lowest)", type: "top5", category: "foodQuirks", options: ["Ireland", "Spain", "Italy", "Greece", "France"], correctRanking: ["Ireland", "Spain", "Italy", "Greece", "France"] },
        { question: "Rank these countries by number of Michelin-starred restaurants (most to least)", type: "top5", category: "foodQuirks", options: ["France", "Japan", "Italy", "United States", "Spain"], correctRanking: ["France", "Japan", "Italy", "United States", "Spain"] },
        { question: "Rank these countries by restaurants per capita (most restaurants per person)", type: "top5", category: "foodQuirks", options: ["United States", "France", "Japan", "Italy", "Spain"], correctRanking: ["United States", "France", "Japan", "Italy", "Spain"] },
        
        // Quirky Daily Life Statistics - Shopping Habits
        { question: "Rank these countries by grocery shopping frequency per week (most visits to least)", type: "top5", category: "lifestyle", options: ["South Korea", "Italy", "Singapore", "Mexico", "Spain"], correctRanking: ["South Korea", "Italy", "Singapore", "Mexico", "Spain"] },
        { question: "Rank these countries by average value per grocery shopping trip (EUR per visit)", type: "top5", category: "lifestyle", options: ["Germany", "Sweden", "Netherlands", "Denmark", "Norway"], correctRanking: ["Germany", "Sweden", "Netherlands", "Denmark", "Norway"] },
        
        // Quirky Daily Life Statistics - Social Media & Selfies
        { question: "Rank these countries by Instagram users as percentage of population (highest to lowest)", type: "top5", category: "technology", options: ["Turkey", "Malaysia", "Brazil", "Argentina", "Mexico"], correctRanking: ["Turkey", "Malaysia", "Brazil", "Argentina", "Mexico"] },
        { question: "Rank these countries by daily selfies taken per capita (most to least)", type: "top5", category: "technology", options: ["China", "India", "United States", "Brazil", "Indonesia"], correctRanking: ["China", "India", "United States", "Brazil", "Indonesia"] },
        { question: "Rank these countries by social media usage hours per day (most to least)", type: "top5", category: "technology", options: ["Philippines", "Brazil", "Colombia", "Argentina", "South Africa"], correctRanking: ["Philippines", "Brazil", "Colombia", "Argentina", "South Africa"] },
        
        // Quirky Daily Life Statistics - Grooming & Personal Care
        { question: "Rank these countries by haircuts per year per person (most to least)", type: "top5", category: "beautyQuirks", options: ["United States", "United Kingdom", "Australia", "Canada", "Germany"], correctRanking: ["United States", "United Kingdom", "Australia", "Canada", "Germany"] },
        { question: "Rank these countries by barbershops per capita (most to least)", type: "top5", category: "beautyQuirks", options: ["United Kingdom", "Sweden", "France", "Spain", "Italy"], correctRanking: ["United Kingdom", "Sweden", "France", "Spain", "Italy"] },
        { question: "Rank these countries by shaving product spending per capita (USD per year)", type: "top5", category: "beautyQuirks", options: ["China", "United States", "India", "Japan", "Germany"], correctRanking: ["China", "United States", "India", "Japan", "Germany"] },
        
        // Quirky Daily Life Statistics - Cultural Habits (Fun)
        { question: "Rank these countries by saunas per capita (most to least)", type: "top5", category: "culturalQuirks", options: ["Finland", "Sweden", "Norway", "Estonia", "Latvia"], correctRanking: ["Finland", "Sweden", "Norway", "Estonia", "Latvia"] },
        { question: "Rank these Nordic countries by saunas per capita (most to least)", type: "top3", category: "culturalQuirks", options: ["Finland", "Sweden", "Norway"], correctRanking: ["Finland", "Sweden", "Norway"] },
        { question: "Rank these countries by unicorn startups per capita (most to least)", type: "top5", category: "technology", options: ["Estonia", "Israel", "Switzerland", "Singapore", "Luxembourg"], correctRanking: ["Estonia", "Israel", "Switzerland", "Singapore", "Luxembourg"] },
        
        // Quirky Daily Life Statistics - Food & Drink (More Quirks)
        { question: "Rank these countries by mushroom consumption per capita (kg per year)", type: "top10", category: "foodQuirks", options: ["Netherlands", "Belgium", "Germany", "Poland", "France", "United Kingdom", "Italy", "Spain", "Denmark", "Sweden"], correctRanking: ["Netherlands", "Belgium", "Germany", "Poland", "France", "United Kingdom", "Italy", "Spain", "Denmark", "Sweden"] },
        { question: "Rank these countries by wine consumption per capita (liters per year)", type: "top10", category: "wine", options: ["Luxembourg", "France", "Portugal", "Italy", "Croatia", "Switzerland", "Argentina", "Slovenia", "Austria", "Spain"], correctRanking: ["Luxembourg", "France", "Portugal", "Italy", "Croatia", "Switzerland", "Argentina", "Slovenia", "Austria", "Spain"] },
        { question: "Rank these countries by spirits consumption per capita (liters pure alcohol per year)", type: "top10", category: "spirits", options: ["South Korea", "Estonia", "Russia", "Belarus", "Lithuania", "Latvia", "Czech Republic", "Slovakia", "Poland", "Finland"], correctRanking: ["South Korea", "Estonia", "Russia", "Belarus", "Lithuania", "Latvia", "Czech Republic", "Slovakia", "Poland", "Finland"] },
        
        // Quirky Daily Life Statistics - Coffee & Tea (More Variations)
        { question: "Rank these countries by coffee consumption per capita (kg per year)", type: "top10", category: "coffee", options: ["Finland", "Norway", "Iceland", "Denmark", "Netherlands", "Sweden", "Switzerland", "Belgium", "Luxembourg", "Canada"], correctRanking: ["Finland", "Norway", "Iceland", "Denmark", "Netherlands", "Sweden", "Switzerland", "Belgium", "Luxembourg", "Canada"] },
        { question: "Rank these countries by tea consumption per capita (kg per year)", type: "top10", category: "tea", options: ["Turkey", "Ireland", "United Kingdom", "Iran", "Russia", "Morocco", "New Zealand", "Chile", "Egypt", "Poland"], correctRanking: ["Turkey", "Ireland", "United Kingdom", "Iran", "Russia", "Morocco", "New Zealand", "Chile", "Egypt", "Poland"] },
        
        // Quirky Daily Life Statistics - Ice Cream & Sweets (More Variations)
        { question: "Rank these countries by ice cream consumption per capita (liters per year)", type: "top10", category: "foodQuirks", options: ["New Zealand", "United States", "Australia", "Sweden", "Canada", "Finland", "Norway", "Denmark", "Netherlands", "United Kingdom"], correctRanking: ["New Zealand", "United States", "Australia", "Sweden", "Canada", "Finland", "Norway", "Denmark", "Netherlands", "United Kingdom"] },
        { question: "Rank these countries by chocolate consumption per capita (kg per year)", type: "top10", category: "chocolate", options: ["Switzerland", "Germany", "Austria", "United Kingdom", "Sweden", "Norway", "Belgium", "Ireland", "Denmark", "Netherlands"], correctRanking: ["Switzerland", "Germany", "Austria", "United Kingdom", "Sweden", "Norway", "Belgium", "Ireland", "Denmark", "Netherlands"] },
        { question: "Rank these countries by cookie and cracker consumption per capita (kg per year)", type: "top10", category: "foodQuirks", options: ["Argentina", "United Kingdom", "United States", "Belgium", "Germany", "France", "Italy", "Spain", "Netherlands", "Sweden"], correctRanking: ["Argentina", "United Kingdom", "United States", "Belgium", "Germany", "France", "Italy", "Spain", "Netherlands", "Sweden"] },
        
        // Quirky Daily Life Statistics - Pet Ownership (More Variations)
        { question: "Rank these countries by cat ownership per capita (cats per person)", type: "top10", category: "petOwnership", options: ["Hungary", "France", "Austria", "Belgium", "Russia", "Germany", "United Kingdom", "Italy", "Spain", "Netherlands"], correctRanking: ["Hungary", "France", "Austria", "Belgium", "Russia", "Germany", "United Kingdom", "Italy", "Spain", "Netherlands"] },
        { question: "Rank these countries by dog ownership per capita (dogs per 100 people)", type: "top10", category: "petOwnership", options: ["United States", "Argentina", "Brazil", "Australia", "United Kingdom", "Germany", "France", "Italy", "Spain", "Canada"], correctRanking: ["United States", "Argentina", "Brazil", "Australia", "United Kingdom", "Germany", "France", "Italy", "Spain", "Canada"] },
        { question: "Rank these countries by percentage of households that own pets (highest to lowest)", type: "top10", category: "petOwnership", options: ["Argentina", "United States", "Brazil", "United Kingdom", "Australia", "Germany", "France", "Italy", "Spain", "Japan"], correctRanking: ["Argentina", "United States", "Brazil", "United Kingdom", "Australia", "Germany", "France", "Italy", "Spain", "Japan"] },
        
        // Quirky Daily Life Statistics - Reading & Libraries (More Variations)
        { question: "Rank these countries by average books read per person per year", type: "top10", category: "reading", options: ["United States", "India", "United Kingdom", "France", "Italy", "Germany", "Canada", "Australia", "Japan", "Brazil"], correctRanking: ["United States", "India", "United Kingdom", "France", "Italy", "Germany", "Canada", "Australia", "Japan", "Brazil"] },
        { question: "Rank these countries by library visits per capita per year", type: "top10", category: "reading", options: ["Finland", "Japan", "Denmark", "Sweden", "Ireland", "United States", "Norway", "Netherlands", "Canada", "Australia"], correctRanking: ["Finland", "Japan", "Denmark", "Sweden", "Ireland", "United States", "Norway", "Netherlands", "Canada", "Australia"] },
        
        // Quirky Daily Life Statistics - Cinema & Entertainment (More Variations)
        { question: "Rank these countries by cinema attendance per capita (visits per person per year)", type: "top10", category: "entertainment", options: ["Iceland", "France", "Ireland", "United Kingdom", "Australia", "New Zealand", "United States", "Canada", "Germany", "Sweden"], correctRanking: ["Iceland", "France", "Ireland", "United Kingdom", "Australia", "New Zealand", "United States", "Canada", "Germany", "Sweden"] },
        
        // Quirky Daily Life Statistics - Working Hours & Vacation (More Variations)
        { question: "Rank these countries by annual working hours per worker (most to least)", type: "top10", category: "workLife", options: ["Mexico", "Costa Rica", "Colombia", "South Korea", "Greece", "Chile", "Poland", "Israel", "Turkey", "Russia"], correctRanking: ["Mexico", "Costa Rica", "Colombia", "South Korea", "Greece", "Chile", "Poland", "Israel", "Turkey", "Russia"] },
        { question: "Rank these countries by annual working hours per worker (least to most)", type: "top10", category: "workLife", options: ["Germany", "Denmark", "Norway", "Netherlands", "France", "Switzerland", "Austria", "Belgium", "Sweden", "Finland"], correctRanking: ["Germany", "Denmark", "Norway", "Netherlands", "France", "Switzerland", "Austria", "Belgium", "Sweden", "Finland"] },
        { question: "Rank these countries by statutory paid vacation days (most to least)", type: "top10", category: "workLife", options: ["France", "Finland", "Spain", "Brazil", "Austria", "Sweden", "Denmark", "United Kingdom", "Germany", "Italy"], correctRanking: ["France", "Finland", "Spain", "Brazil", "Austria", "Sweden", "Denmark", "United Kingdom", "Germany", "Italy"] },
        
        // Quirky Daily Life Statistics - Transportation (More Variations)
        { question: "Rank these countries by percentage of trips made by bicycle (highest to lowest)", type: "top10", category: "transportation", options: ["Netherlands", "Denmark", "Sweden", "Germany", "Finland", "Norway", "Belgium", "Austria", "Switzerland", "France"], correctRanking: ["Netherlands", "Denmark", "Sweden", "Germany", "Finland", "Norway", "Belgium", "Austria", "Switzerland", "France"] },
        { question: "Rank these countries by bicycles per capita (most to least)", type: "top10", category: "transportation", options: ["Netherlands", "Denmark", "Germany", "Sweden", "Norway", "Finland", "Belgium", "Austria", "Switzerland", "Japan"], correctRanking: ["Netherlands", "Denmark", "Germany", "Sweden", "Norway", "Finland", "Belgium", "Austria", "Switzerland", "Japan"] },
        
        // Quirky Daily Life Statistics - Technology (More Variations)
        { question: "Rank these countries by industrial robots per 10,000 manufacturing employees (most to least)", type: "top10", category: "technology", options: ["South Korea", "Singapore", "Germany", "Japan", "China", "United States", "Italy", "Sweden", "Denmark", "Belgium"], correctRanking: ["South Korea", "Singapore", "Germany", "Japan", "China", "United States", "Italy", "Sweden", "Denmark", "Belgium"] },
        { question: "Rank these countries by vending machines per capita (most to least)", type: "top10", category: "technology", options: ["Japan", "United States", "South Korea", "United Kingdom", "Germany", "France", "Italy", "Spain", "Canada", "Australia"], correctRanking: ["Japan", "United States", "South Korea", "United Kingdom", "Germany", "France", "Italy", "Spain", "Canada", "Australia"] },
        { question: "Rank these countries by online shopping percentage of total retail sales (highest to lowest)", type: "top10", category: "technology", options: ["China", "United Kingdom", "South Korea", "United States", "Germany", "France", "Japan", "Canada", "Australia", "Spain"], correctRanking: ["China", "United Kingdom", "South Korea", "United States", "Germany", "France", "Japan", "Canada", "Australia", "Spain"] },
        { question: "Rank these countries by Netflix subscriptions per capita (most to least)", type: "top10", category: "technology", options: ["United Kingdom", "United States", "Canada", "Australia", "Sweden", "Norway", "Denmark", "Netherlands", "Germany", "France"], correctRanking: ["United Kingdom", "United States", "Canada", "Australia", "Sweden", "Norway", "Denmark", "Netherlands", "Germany", "France"] },
        
        // Quirky Daily Life Statistics - Household Characteristics (More Variations)
        { question: "Rank these countries by average household size (smallest to largest)", type: "top10", category: "household", options: ["Germany", "South Korea", "France", "Netherlands", "Japan", "Belgium", "Austria", "Sweden", "Denmark", "Norway"], correctRanking: ["Germany", "South Korea", "France", "Netherlands", "Japan", "Belgium", "Austria", "Sweden", "Denmark", "Norway"] },
        { question: "Rank these countries by average household size (largest to smallest)", type: "top10", category: "household", options: ["Senegal", "Angola", "The Gambia", "Equatorial Guinea", "Gabon", "Mali", "Burkina Faso", "Niger", "Chad", "Guinea"], correctRanking: ["Senegal", "Angola", "The Gambia", "Equatorial Guinea", "Gabon", "Mali", "Burkina Faso", "Niger", "Chad", "Guinea"] },
        { question: "Rank these countries by percentage of households that own their home (highest to lowest)", type: "top10", category: "household", options: ["Romania", "Slovakia", "Croatia", "Hungary", "Lithuania", "Bulgaria", "Estonia", "Poland", "Slovenia", "Czech Republic"], correctRanking: ["Romania", "Slovakia", "Croatia", "Hungary", "Lithuania", "Bulgaria", "Estonia", "Poland", "Slovenia", "Czech Republic"] },
        
        // Quirky Daily Life Statistics - Consumption Habits (More Variations)
        { question: "Rank these countries by toilet paper consumption per capita (rolls per person per year)", type: "top10", category: "consumptionQuirks", options: ["United States", "Germany", "United Kingdom", "Netherlands", "Australia", "Canada", "Sweden", "Norway", "Denmark", "Finland"], correctRanking: ["United States", "Germany", "United Kingdom", "Netherlands", "Australia", "Canada", "Sweden", "Norway", "Denmark", "Finland"] },
        { question: "Rank these countries by ultra-processed food consumption per capita (kg per year)", type: "top10", category: "foodQuirks", options: ["United States", "United Kingdom", "Germany", "France", "Italy", "Canada", "Australia", "Sweden", "Spain", "Belgium"], correctRanking: ["United States", "United Kingdom", "Germany", "France", "Italy", "Canada", "Australia", "Sweden", "Spain", "Belgium"] },
        { question: "Rank these countries by organic food spending per capita (EUR per year)", type: "top10", category: "foodQuirks", options: ["Austria", "Germany", "France", "Switzerland", "Denmark", "Sweden", "Italy", "United Kingdom", "Netherlands", "Belgium"], correctRanking: ["Austria", "Germany", "France", "Switzerland", "Denmark", "Sweden", "Italy", "United Kingdom", "Netherlands", "Belgium"] },
        { question: "Rank these countries by McDonald's restaurants per million people (most to least)", type: "top10", category: "foodQuirks", options: ["United States", "Australia", "Canada", "France", "Japan", "United Kingdom", "Germany", "Italy", "Spain", "Brazil"], correctRanking: ["United States", "Australia", "Canada", "France", "Japan", "United Kingdom", "Germany", "Italy", "Spain", "Brazil"] },
        { question: "Rank these countries by energy drink consumption per capita (liters per year)", type: "top10", category: "beverages", options: ["United States", "United Kingdom", "Japan", "Spain", "Germany", "France", "Italy", "Canada", "Australia", "Brazil"], correctRanking: ["United States", "United Kingdom", "Japan", "Spain", "Germany", "France", "Italy", "Canada", "Australia", "Brazil"] },
        
        // Quirky Daily Life Statistics - Environmental (More Variations)
        { question: "Rank these countries by ecological footprint per capita (global hectares)", type: "top10", category: "environment", options: ["Qatar", "Luxembourg", "United Arab Emirates", "United States", "Canada", "Australia", "Kuwait", "Mongolia", "Estonia", "Saudi Arabia"], correctRanking: ["Qatar", "Luxembourg", "United Arab Emirates", "United States", "Canada", "Australia", "Kuwait", "Mongolia", "Estonia", "Saudi Arabia"] },
        { question: "Rank these countries by recycling rate percentage (highest to lowest)", type: "top10", category: "environment", options: ["Germany", "South Korea", "Austria", "Slovenia", "Belgium", "Netherlands", "Switzerland", "Sweden", "Denmark", "Norway"], correctRanking: ["Germany", "South Korea", "Austria", "Slovenia", "Belgium", "Netherlands", "Switzerland", "Sweden", "Denmark", "Norway"] },
        
        // Quirky Daily Life Statistics - Cultural Infrastructure (More Variations)
        { question: "Rank these countries by number of museums per million people (most to least)", type: "top10", category: "culturalInfrastructure", options: ["Sweden", "Switzerland", "United States", "Germany", "France", "Austria", "Norway", "Denmark", "Belgium", "Netherlands"], correctRanking: ["Sweden", "Switzerland", "United States", "Germany", "France", "Austria", "Norway", "Denmark", "Belgium", "Netherlands"] },
        
        // Quirky Daily Life Statistics - Gambling & Entertainment Spending (More Variations)
        { question: "Rank these countries by gambling expenditure per capita (USD lost per adult per year)", type: "top10", category: "entertainment", options: ["Australia", "Singapore", "Ireland", "Denmark", "United Kingdom", "Finland", "Canada", "United States", "New Zealand", "Sweden"], correctRanking: ["Australia", "Singapore", "Ireland", "Denmark", "United Kingdom", "Finland", "Canada", "United States", "New Zealand", "Sweden"] },
        
        // Quirky Daily Life Statistics - Sleep & Lifestyle (More Variations)
        { question: "Rank these countries by average hours of sleep per night (most to least)", type: "top10", category: "lifestyle", options: ["New Zealand", "Netherlands", "Finland", "United Kingdom", "Australia", "Belgium", "Ireland", "France", "Denmark", "Sweden"], correctRanking: ["New Zealand", "Netherlands", "Finland", "United Kingdom", "Australia", "Belgium", "Ireland", "France", "Denmark", "Sweden"] },
        { question: "Rank these countries by percentage of adults who exercise regularly (highest to lowest)", type: "top10", category: "lifestyle", options: ["Finland", "Sweden", "Norway", "Denmark", "Netherlands", "Germany", "Austria", "Switzerland", "Belgium", "United Kingdom"], correctRanking: ["Finland", "Sweden", "Norway", "Denmark", "Netherlands", "Germany", "Austria", "Switzerland", "Belgium", "United Kingdom"] },
        { question: "Rank these countries by average time spent eating and drinking per day (most to least)", type: "top10", category: "lifestyle", options: ["France", "Greece", "Italy", "Spain", "Denmark", "Belgium", "Germany", "Austria", "Portugal", "Luxembourg"], correctRanking: ["France", "Greece", "Italy", "Spain", "Denmark", "Belgium", "Germany", "Austria", "Portugal", "Luxembourg"] },
        { question: "Rank these countries by percentage of leisure time spent watching TV (highest to lowest)", type: "top10", category: "entertainment", options: ["Mexico", "United States", "Italy", "Spain", "France", "Germany", "United Kingdom", "Canada", "Australia", "Japan"], correctRanking: ["Mexico", "United States", "Italy", "Spain", "France", "Germany", "United Kingdom", "Canada", "Australia", "Japan"] },
        { question: "Rank these countries by percentage of leisure time spent socializing with friends (highest to lowest)", type: "top10", category: "socialQuirks", options: ["Turkey", "Mexico", "Greece", "Spain", "Italy", "Portugal", "Brazil", "Argentina", "Colombia", "Chile"], correctRanking: ["Turkey", "Mexico", "Greece", "Spain", "Italy", "Portugal", "Brazil", "Argentina", "Colombia", "Chile"] },
        
        // Quirky Daily Life Statistics - Fish & Seafood (More Variations)
        { question: "Rank these countries by fish consumption per capita (kg per year)", type: "top10", category: "foodQuirks", options: ["Maldives", "Iceland", "Portugal", "South Korea", "Japan", "Norway", "Spain", "Greece", "Italy", "France"], correctRanking: ["Maldives", "Iceland", "Portugal", "South Korea", "Japan", "Norway", "Spain", "Greece", "Italy", "France"] },
        
        // Quirky Daily Life Statistics - Cheese (More Variations - Expanding)
        { question: "Rank these countries by cheese consumption per capita (kg per year)", type: "top10", category: "cheese", options: ["France", "Iceland", "Greece", "Finland", "Germany", "Italy", "Switzerland", "Austria", "Netherlands", "Sweden"], correctRanking: ["France", "Iceland", "Greece", "Finland", "Germany", "Italy", "Switzerland", "Austria", "Netherlands", "Sweden"] },
        
        // Quirky Daily Life Statistics - Meat Consumption (More Variations)
        { question: "Rank these countries by meat consumption per capita (kg per year)", type: "top10", category: "meat", options: ["Australia", "United States", "Argentina", "Israel", "New Zealand", "Canada", "Brazil", "Uruguay", "Chile", "Spain"], correctRanking: ["Australia", "United States", "Argentina", "Israel", "New Zealand", "Canada", "Brazil", "Uruguay", "Chile", "Spain"] },
        
        // Quirky Daily Life Statistics - Sugar Consumption (More Variations)
        { question: "Rank these countries by sugar consumption per capita (kg per year)", type: "top10", category: "sugar", options: ["India", "United States", "Brazil", "Mexico", "Russia", "Germany", "France", "United Kingdom", "Italy", "Spain"], correctRanking: ["India", "United States", "Brazil", "Mexico", "Russia", "Germany", "France", "United Kingdom", "Italy", "Spain"] },
        
        // Quirky Daily Life Statistics - Beer (More Variations)
        { question: "Rank these countries by beer consumption per capita (liters pure alcohol per year)", type: "top10", category: "beer", options: ["Czech Republic", "Austria", "Poland", "Germany", "Romania", "Spain", "Croatia", "Lithuania", "Slovakia", "Belgium"], correctRanking: ["Czech Republic", "Austria", "Poland", "Germany", "Romania", "Spain", "Croatia", "Lithuania", "Slovakia", "Belgium"] },
        
        // Quirky Daily Life Statistics - Public Holidays (More Variations)
        { question: "Rank these countries by number of public holidays per year (most to least)", type: "top10", category: "holidays", options: ["India", "Cambodia", "Sri Lanka", "Nepal", "Iran", "Myanmar", "Colombia", "Philippines", "Thailand", "Malaysia"], correctRanking: ["India", "Cambodia", "Sri Lanka", "Nepal", "Iran", "Myanmar", "Colombia", "Philippines", "Thailand", "Malaysia"] },
        
        // Quirky Daily Life Statistics - Cinema & Movies (More Variations)
        { question: "Rank these countries by cinema attendance per capita per year (visits per person)", type: "top10", category: "entertainment", options: ["Iceland", "France", "Ireland", "United Kingdom", "Australia", "New Zealand", "United States", "Canada", "Germany", "Sweden"], correctRanking: ["Iceland", "France", "Ireland", "United Kingdom", "Australia", "New Zealand", "United States", "Canada", "Germany", "Sweden"] },
        
        // Quirky Daily Life Statistics - Happiness & Wellbeing (More Variations)
        { question: "Rank these countries by happiness index score (highest to lowest)", type: "top10", category: "happiness", options: ["Finland", "Denmark", "Iceland", "Switzerland", "Netherlands", "Sweden", "Norway", "Luxembourg", "New Zealand", "Austria"], correctRanking: ["Finland", "Denmark", "Iceland", "Switzerland", "Netherlands", "Sweden", "Norway", "Luxembourg", "New Zealand", "Austria"] },
        
        // Quirky Daily Life Statistics - Height (More Variations)
        { question: "Rank these countries by average male height (tallest to shortest)", type: "top10", category: "height", options: ["Netherlands", "Montenegro", "Estonia", "Denmark", "Iceland", "Latvia", "Czech Republic", "Serbia", "Slovenia", "Germany"], correctRanking: ["Netherlands", "Montenegro", "Estonia", "Denmark", "Iceland", "Latvia", "Czech Republic", "Serbia", "Slovenia", "Germany"] },
        { question: "Rank these countries by average height (shortest to tallest)", type: "top10", category: "height", options: ["Guatemala", "Philippines", "Vietnam", "Indonesia", "Bolivia", "Cambodia", "Laos", "Myanmar", "Bangladesh", "Nepal"], correctRanking: ["Guatemala", "Philippines", "Vietnam", "Indonesia", "Bolivia", "Cambodia", "Laos", "Myanmar", "Bangladesh", "Nepal"] },
        
        // Quirky Daily Life Statistics - Obesity (More Variations)
        { question: "Rank these countries by obesity rate (highest to lowest)", type: "top10", category: "obesity", options: ["Nauru", "Palau", "Marshall Islands", "Tuvalu", "Tonga", "Samoa", "Kiribati", "Micronesia", "Fiji", "Papua New Guinea"], correctRanking: ["Nauru", "Palau", "Marshall Islands", "Tuvalu", "Tonga", "Samoa", "Kiribati", "Micronesia", "Fiji", "Papua New Guinea"] },
        { question: "Rank these countries by obesity rate (lowest to highest)", type: "top10", category: "obesity", options: ["Vietnam", "Bangladesh", "India", "Japan", "Nepal", "Ethiopia", "Indonesia", "China", "Philippines", "Malaysia"], correctRanking: ["Vietnam", "Bangladesh", "India", "Japan", "Nepal", "Ethiopia", "Indonesia", "China", "Philippines", "Malaysia"] },
        
        // Quirky Daily Life Statistics - Twins & Birth Quirks
        { question: "Rank these countries by percentage of twins born (highest to lowest)", type: "top10", category: "twins", options: ["Benin", "Togo", "Zambia", "Central African Republic", "Mali", "Nigeria", "Burkina Faso", "Ghana", "Senegal", "Ivory Coast"], correctRanking: ["Benin", "Togo", "Zambia", "Central African Republic", "Mali", "Nigeria", "Burkina Faso", "Ghana", "Senegal", "Ivory Coast"] },
        { question: "Rank these countries by percentage of redheads (highest to lowest)", type: "top10", category: "redheads", options: ["Ireland", "United Kingdom", "Netherlands", "Belgium", "Germany", "Scotland", "Sweden", "Norway", "Denmark", "Finland"], correctRanking: ["Ireland", "United Kingdom", "Netherlands", "Belgium", "Germany", "Scotland", "Sweden", "Norway", "Denmark", "Finland"] },
        
        // Quirky Daily Life Statistics - Peace & Safety
        { question: "Rank these countries by Global Peace Index (most peaceful to least)", type: "top10", category: "peace", options: ["Iceland", "New Zealand", "Ireland", "Denmark", "Austria", "Portugal", "Slovenia", "Czech Republic", "Singapore", "Japan"], correctRanking: ["Iceland", "New Zealand", "Ireland", "Denmark", "Austria", "Portugal", "Slovenia", "Czech Republic", "Singapore", "Japan"] },
        
        // Quirky Daily Life Statistics - Charity & Giving
        { question: "Rank these countries by World Giving Index (most charitable to least)", type: "top10", category: "charity", options: ["Indonesia", "Kenya", "Myanmar", "New Zealand", "United States", "Australia", "Ireland", "United Kingdom", "Canada", "Netherlands"], correctRanking: ["Indonesia", "Kenya", "Myanmar", "New Zealand", "United States", "Australia", "Ireland", "United Kingdom", "Canada", "Netherlands"] },
        
        // Quirky Daily Life Statistics - Education
        { question: "Rank these countries by percentage with tertiary education (highest to lowest)", type: "top10", category: "education", options: ["Canada", "Japan", "South Korea", "United Kingdom", "Australia", "United States", "Finland", "Sweden", "Norway", "Denmark"], correctRanking: ["Canada", "Japan", "South Korea", "United Kingdom", "Australia", "United States", "Finland", "Sweden", "Norway", "Denmark"] },
        
        // Quirky Daily Life Statistics - Nobel Prizes
        { question: "Rank these countries by total Nobel Prize winners (most to least)", type: "top10", category: "nobel", options: ["United States", "United Kingdom", "Germany", "France", "Sweden", "Japan", "Russia", "Italy", "Canada", "Switzerland"], correctRanking: ["United States", "United Kingdom", "Germany", "France", "Sweden", "Japan", "Russia", "Italy", "Canada", "Switzerland"] },
        
        // Quirky Daily Life Statistics - Olympic Medals
        { question: "Rank these countries by total Olympic gold medals (most to least)", type: "top10", category: "olympics", options: ["United States", "Russia", "Germany", "United Kingdom", "France", "Italy", "China", "Australia", "Sweden", "Hungary"], correctRanking: ["United States", "Russia", "Germany", "United Kingdom", "France", "Italy", "China", "Australia", "Sweden", "Hungary"] },
        
        // Quirky Daily Life Statistics - Billionaires
        { question: "Rank these countries by number of billionaires (most to least)", type: "top10", category: "billionaires", options: ["United States", "China", "India", "Germany", "Russia", "United Kingdom", "France", "Italy", "Canada", "Brazil"], correctRanking: ["United States", "China", "India", "Germany", "Russia", "United Kingdom", "France", "Italy", "Canada", "Brazil"] },
        
        // Quirky Daily Life Statistics - Cost of Living
        { question: "Rank these countries by cost of living index (most expensive to least)", type: "top10", category: "costOfLiving", options: ["Switzerland", "Norway", "Iceland", "Denmark", "Luxembourg", "Singapore", "Hong Kong", "Japan", "Sweden", "Austria"], correctRanking: ["Switzerland", "Norway", "Iceland", "Denmark", "Luxembourg", "Singapore", "Hong Kong", "Japan", "Sweden", "Austria"] },
        
        // Quirky Daily Life Statistics - Internet Speed
        { question: "Rank these countries by fastest fixed broadband internet speed (highest to lowest)", type: "top10", category: "internetSpeed", options: ["Singapore", "Hong Kong", "Romania", "South Korea", "Switzerland", "Thailand", "France", "Denmark", "United States", "Sweden"], correctRanking: ["Singapore", "Hong Kong", "Romania", "South Korea", "Switzerland", "Thailand", "France", "Denmark", "United States", "Sweden"] },
        
        // Quirky Daily Life Statistics - Mobile Phones
        { question: "Rank these countries by mobile phone SIM cards per capita (most to least)", type: "top10", category: "mobilePhones", options: ["United Arab Emirates", "Macau", "Hong Kong", "Singapore", "Maldives", "Seychelles", "Antigua and Barbuda", "Bahrain", "Qatar", "Kuwait"], correctRanking: ["United Arab Emirates", "Macau", "Hong Kong", "Singapore", "Maldives", "Seychelles", "Antigua and Barbuda", "Bahrain", "Qatar", "Kuwait"] },
        
        // Quirky Daily Life Statistics - Cars
        { question: "Rank these countries by cars per capita (most to least)", type: "top10", category: "cars", options: ["Monaco", "San Marino", "Liechtenstein", "Iceland", "Luxembourg", "Malta", "New Zealand", "Italy", "Finland", "Austria"], correctRanking: ["Monaco", "San Marino", "Liechtenstein", "Iceland", "Luxembourg", "Malta", "New Zealand", "Italy", "Finland", "Austria"] },
        
        // Quirky Daily Life Statistics - Coastline
        { question: "Rank these countries by total coastline length (longest to shortest)", type: "top10", category: "coastline", options: ["Canada", "Indonesia", "Russia", "Philippines", "Japan", "Australia", "Norway", "United States", "New Zealand", "Greece"], correctRanking: ["Canada", "Indonesia", "Russia", "Philippines", "Japan", "Australia", "Norway", "United States", "New Zealand", "Greece"] },
        
        // Quirky Daily Life Statistics - Arable Land
        { question: "Rank these countries by percentage of arable land (highest to lowest)", type: "top10", category: "arableLand", options: ["Bangladesh", "Denmark", "Ukraine", "Moldova", "India", "Hungary", "Poland", "Romania", "Czech Republic", "Belgium"], correctRanking: ["Bangladesh", "Denmark", "Ukraine", "Moldova", "India", "Hungary", "Poland", "Romania", "Czech Republic", "Belgium"] },
        
        // Quirky Daily Life Statistics - Forests
        { question: "Rank these countries by forest cover percentage (highest to lowest)", type: "top10", category: "forests", options: ["Suriname", "Guyana", "Finland", "Sweden", "Japan", "Brazil", "Colombia", "Russia", "Canada", "Norway"], correctRanking: ["Suriname", "Guyana", "Finland", "Sweden", "Japan", "Brazil", "Colombia", "Russia", "Canada", "Norway"] },
        
        // Quirky Daily Life Statistics - Elevation
        { question: "Rank these countries by average elevation (highest to lowest)", type: "top10", category: "elevation", options: ["Bhutan", "Nepal", "Lesotho", "Switzerland", "Andorra", "Afghanistan", "Chile", "China", "Tajikistan", "Kyrgyzstan"], correctRanking: ["Bhutan", "Nepal", "Lesotho", "Switzerland", "Andorra", "Afghanistan", "Chile", "China", "Tajikistan", "Kyrgyzstan"] },
        { question: "Rank these countries by average elevation (lowest to highest)", type: "top10", category: "elevation", options: ["Maldives", "Qatar", "Netherlands", "Denmark", "Bahrain", "Bangladesh", "Belarus", "Estonia", "Latvia", "Lithuania"], correctRanking: ["Maldives", "Qatar", "Netherlands", "Denmark", "Bahrain", "Bangladesh", "Belarus", "Estonia", "Latvia", "Lithuania"] },
        
        // Quirky Daily Life Statistics - Islands
        { question: "Rank these countries by number of islands (most to least)", type: "top10", category: "islands", options: ["Sweden", "Finland", "Norway", "Canada", "Indonesia", "Philippines", "Greece", "Japan", "United Kingdom", "Chile"], correctRanking: ["Sweden", "Finland", "Norway", "Canada", "Indonesia", "Philippines", "Greece", "Japan", "United Kingdom", "Chile"] },
        
        // Quirky Daily Life Statistics - Borders
        { question: "Rank these countries by number of land borders (most to least)", type: "top10", category: "borders", options: ["China", "Russia", "Brazil", "Germany", "Austria", "France", "Serbia", "Turkey", "Argentina", "Poland"], correctRanking: ["China", "Russia", "Brazil", "Germany", "Austria", "France", "Serbia", "Turkey", "Argentina", "Poland"] },
        
        // Quirky Daily Life Statistics - Rainfall
        { question: "Rank these countries by average annual rainfall (driest to wettest)", type: "top10", category: "rainfall", options: ["Egypt", "Libya", "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Jordan", "Oman", "Yemen"], correctRanking: ["Egypt", "Libya", "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Jordan", "Oman", "Yemen"] },
        
        // Quirky Daily Life Statistics - Temperature
        { question: "Rank these countries by average yearly temperature (hottest to coolest)", type: "top10", category: "temperature", options: ["Mali", "Burkina Faso", "Senegal", "Mauritania", "Niger", "Chad", "Sudan", "Ethiopia", "Djibouti", "Gambia"], correctRanking: ["Mali", "Burkina Faso", "Senegal", "Mauritania", "Niger", "Chad", "Sudan", "Ethiopia", "Djibouti", "Gambia"] },
        
        // Quirky Daily Life Statistics - Volcanoes
        { question: "Rank these countries by number of active volcanoes (most to least)", type: "top10", category: "volcanoes", options: ["Indonesia", "Japan", "United States", "Russia", "Philippines", "Chile", "Ecuador", "Iceland", "Guatemala", "Papua New Guinea"], correctRanking: ["Indonesia", "Japan", "United States", "Russia", "Philippines", "Chile", "Ecuador", "Iceland", "Guatemala", "Papua New Guinea"] },
        
        // Quirky Daily Life Statistics - Earthquakes
        { question: "Rank these countries by earthquake frequency (most to least)", type: "top10", category: "earthquakes", options: ["Japan", "Indonesia", "Chile", "Philippines", "Turkey", "Iran", "Greece", "Italy", "Peru", "Ecuador"], correctRanking: ["Japan", "Indonesia", "Chile", "Philippines", "Turkey", "Iran", "Greece", "Italy", "Peru", "Ecuador"] },
        
        // Quirky Daily Life Statistics - Official Languages
        { question: "Rank these countries by number of official languages (most to least)", type: "top10", category: "officialLanguages", options: ["Bolivia", "South Africa", "Zimbabwe", "India", "Switzerland", "Belgium", "Canada", "Afghanistan", "Papua New Guinea", "Rwanda"], correctRanking: ["Bolivia", "South Africa", "Zimbabwe", "India", "Switzerland", "Belgium", "Canada", "Afghanistan", "Papua New Guinea", "Rwanda"] },
        
        // Quirky Daily Life Statistics - Military
        { question: "Rank these countries by active military personnel (largest to smallest)", type: "top10", category: "military", options: ["China", "India", "United States", "Russia", "North Korea", "Pakistan", "Iran", "South Korea", "Vietnam", "Egypt"], correctRanking: ["China", "India", "United States", "Russia", "North Korea", "Pakistan", "Iran", "South Korea", "Vietnam", "Egypt"] },
        
        // Quirky Daily Life Statistics - Gym & Fitness
        { question: "Rank these countries by percentage of population with gym memberships (highest to lowest)", type: "top10", category: "lifestyle", options: ["Norway", "Sweden", "United States", "Denmark", "Netherlands", "Finland", "Canada", "United Kingdom", "Australia", "Germany"], correctRanking: ["Norway", "Sweden", "United States", "Denmark", "Netherlands", "Finland", "Canada", "United Kingdom", "Australia", "Germany"] },
        { question: "Rank these countries by fitness equipment consumption per capita (kg per person)", type: "top5", category: "lifestyle", options: ["United States", "Canada", "United Kingdom", "Australia", "Germany"], correctRanking: ["United States", "Canada", "United Kingdom", "Australia", "Germany"] },
        
        // Quirky Daily Life Statistics - Candles
        { question: "Rank these countries by candle consumption per capita (kg per year)", type: "top5", category: "household", options: ["Poland", "United States", "France", "Russia", "Germany"], correctRanking: ["Poland", "United States", "France", "Russia", "Germany"] },
        { question: "Rank these countries by candles burned per household per year (most to least)", type: "top5", category: "household", options: ["United States", "United Kingdom", "Canada", "Australia", "Germany"], correctRanking: ["United States", "United Kingdom", "Canada", "Australia", "Germany"] },
        
        // Quirky Daily Life Statistics - Greeting Cards & Postcards
        { question: "Rank these countries by greeting cards purchased per capita per year (most to least)", type: "top5", category: "socialQuirks", options: ["United Kingdom", "United States", "Canada", "Australia", "Germany"], correctRanking: ["United Kingdom", "United States", "Canada", "Australia", "Germany"] },
        { question: "Rank these countries by postcards sent per capita per year (most to least)", type: "top5", category: "socialQuirks", options: ["Åland Islands", "Finland", "Liechtenstein", "Estonia", "Luxembourg"], correctRanking: ["Åland Islands", "Finland", "Liechtenstein", "Estonia", "Luxembourg"] },
        
        // Quirky Daily Life Statistics - Milk Consumption
        { question: "Rank these countries by milk consumption per capita (kg per year)", type: "top10", category: "foodQuirks", options: ["Ireland", "Finland", "Sweden", "Netherlands", "Estonia", "United Kingdom", "Germany", "France", "United States", "Canada"], correctRanking: ["Ireland", "Finland", "Sweden", "Netherlands", "Estonia", "United Kingdom", "Germany", "France", "United States", "Canada"] },
        
        // Quirky Daily Life Statistics - Yogurt Consumption
        { question: "Rank these countries by yogurt consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Bulgaria", "France", "Turkey", "Greece", "Germany"], correctRanking: ["Bulgaria", "France", "Turkey", "Greece", "Germany"] },
        
        // Quirky Daily Life Statistics - Bread Consumption
        { question: "Rank these countries by bread consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Turkey", "Serbia", "Bulgaria", "Germany", "France"], correctRanking: ["Turkey", "Serbia", "Bulgaria", "Germany", "France"] },
        
        // Quirky Daily Life Statistics - Pasta Consumption
        { question: "Rank these countries by pasta consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Italy", "Tunisia", "Venezuela", "Greece", "Switzerland"], correctRanking: ["Italy", "Tunisia", "Venezuela", "Greece", "Switzerland"] },
        
        // Quirky Daily Life Statistics - Potatoes Consumption
        { question: "Rank these countries by potato consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Belarus", "Ukraine", "Poland", "Kyrgyzstan", "Russia"], correctRanking: ["Belarus", "Ukraine", "Poland", "Kyrgyzstan", "Russia"] },
        
        // Quirky Daily Life Statistics - Onions Consumption
        { question: "Rank these countries by onion consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Libya", "Algeria", "Sudan", "Senegal", "Egypt"], correctRanking: ["Libya", "Algeria", "Sudan", "Senegal", "Egypt"] },
        
        // Quirky Daily Life Statistics - Tomatoes Consumption
        { question: "Rank these countries by tomato consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Greece", "Turkey", "Italy", "Spain", "Egypt"], correctRanking: ["Greece", "Turkey", "Italy", "Spain", "Egypt"] },
        
        // Quirky Daily Life Statistics - Bananas Consumption
        { question: "Rank these countries by banana consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Ecuador", "Philippines", "Brazil", "Costa Rica", "Colombia"], correctRanking: ["Ecuador", "Philippines", "Brazil", "Costa Rica", "Colombia"] },
        
        // Quirky Daily Life Statistics - Oranges Consumption
        { question: "Rank these countries by orange consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Brazil", "Mexico", "Spain", "Italy", "United States"], correctRanking: ["Brazil", "Mexico", "Spain", "Italy", "United States"] },
        
        // Quirky Daily Life Statistics - Apples Consumption
        { question: "Rank these countries by apple consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["China", "Turkey", "Poland", "Iran", "Italy"], correctRanking: ["China", "Turkey", "Poland", "Iran", "Italy"] },
        
        // Quirky Daily Life Statistics - Rice Consumption
        { question: "Rank these countries by rice consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Myanmar", "Cambodia", "Bangladesh", "Vietnam", "Indonesia"], correctRanking: ["Myanmar", "Cambodia", "Bangladesh", "Vietnam", "Indonesia"] },
        
        // Quirky Daily Life Statistics - Nuts Consumption
        { question: "Rank these countries by nut consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Iran", "Turkey", "Italy", "Greece", "Spain"], correctRanking: ["Iran", "Turkey", "Italy", "Greece", "Spain"] },
        
        // Quirky Daily Life Statistics - Honey Consumption
        { question: "Rank these countries by honey consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["Greece", "Austria", "Germany", "Switzerland", "Turkey"], correctRanking: ["Greece", "Austria", "Germany", "Switzerland", "Turkey"] },
        
        // Quirky Daily Life Statistics - Olive Oil Consumption
        { question: "Rank these countries by olive oil consumption per capita (liters per year)", type: "top5", category: "foodQuirks", options: ["Greece", "Spain", "Italy", "Tunisia", "Portugal"], correctRanking: ["Greece", "Spain", "Italy", "Tunisia", "Portugal"] },
        
        // Quirky Daily Life Statistics - Butter Consumption
        { question: "Rank these countries by butter consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["France", "Germany", "New Zealand", "Australia", "Finland"], correctRanking: ["France", "Germany", "New Zealand", "Australia", "Finland"] },
        
        // Quirky Daily Life Statistics - Eggs Consumption
        { question: "Rank these countries by egg consumption per capita (number of eggs per year)", type: "top5", category: "foodQuirks", options: ["Japan", "Mexico", "China", "Paraguay", "United States"], correctRanking: ["Japan", "Mexico", "China", "Paraguay", "United States"] },
        
        // Quirky Daily Life Statistics - Spices Consumption
        { question: "Rank these countries by spice consumption per capita (kg per year)", type: "top5", category: "foodQuirks", options: ["India", "Bangladesh", "Sri Lanka", "Thailand", "Ethiopia"], correctRanking: ["India", "Bangladesh", "Sri Lanka", "Thailand", "Ethiopia"] },
        
        // Quirky Daily Life Statistics - Instant Noodles Consumption
        { question: "Rank these countries by instant noodles consumption per capita (servings per year)", type: "top5", category: "foodQuirks", options: ["Vietnam", "South Korea", "Thailand", "Indonesia", "Japan"], correctRanking: ["Vietnam", "South Korea", "Thailand", "Indonesia", "Japan"] },
        
        // Quirky Daily Life Statistics - Soft Drinks Consumption
        { question: "Rank these countries by soft drink consumption per capita (liters per year)", type: "top5", category: "beverages", options: ["Mexico", "United States", "Argentina", "Chile", "Uruguay"], correctRanking: ["Mexico", "United States", "Argentina", "Chile", "Uruguay"] },
        
        // Quirky Daily Life Statistics - Bottled Water Consumption
        { question: "Rank these countries by bottled water consumption per capita (liters per year)", type: "top5", category: "beverages", options: ["Mexico", "Thailand", "Italy", "United Arab Emirates", "Germany"], correctRanking: ["Mexico", "Thailand", "Italy", "United Arab Emirates", "Germany"] },
        
        // Quirky Daily Life Statistics - Wine Production vs Consumption
        { question: "Rank these countries by wine production per capita (liters per year)", type: "top5", category: "wine", options: ["Luxembourg", "France", "Italy", "Portugal", "Chile"], correctRanking: ["Luxembourg", "France", "Italy", "Portugal", "Chile"] },
        
        // Quirky Daily Life Statistics - Coffee Shops
        { question: "Rank these countries by coffee shops per capita (most Starbucks or equivalent per million people)", type: "top5", category: "foodQuirks", options: ["United States", "United Kingdom", "Canada", "Australia", "Germany"], correctRanking: ["United States", "United Kingdom", "Canada", "Australia", "Germany"] },
        
        // Quirky Daily Life Statistics - Pubs & Bars
        { question: "Rank these countries by pubs per capita (most bars per million people)", type: "top5", category: "entertainment", options: ["Ireland", "United Kingdom", "Belgium", "Czech Republic", "Austria"], correctRanking: ["Ireland", "United Kingdom", "Belgium", "Czech Republic", "Austria"] },
        
        // Quirky Daily Life Statistics - Theme Parks Visits
        { question: "Rank these countries by theme park attendance per capita (visits per person per year)", type: "top5", category: "entertainment", options: ["United States", "Japan", "United Kingdom", "France", "Germany"], correctRanking: ["United States", "Japan", "United Kingdom", "France", "Germany"] },
        
        // Quirky Daily Life Statistics - Zoos & Aquariums
        { question: "Rank these countries by zoo visits per capita (most visits per person per year)", type: "top5", category: "entertainment", options: ["United States", "Germany", "United Kingdom", "France", "Japan"], correctRanking: ["United States", "Germany", "United Kingdom", "France", "Japan"] },
        
        // Quirky Daily Life Statistics - Swimming Pools
        { question: "Rank these countries by swimming pools per capita (most pools per million people)", type: "top5", category: "lifestyle", options: ["Australia", "United States", "New Zealand", "Greece", "Spain"], correctRanking: ["Australia", "United States", "New Zealand", "Greece", "Spain"] },
        
        // Quirky Daily Life Statistics - Hot Tubs & Jacuzzis
        { question: "Rank these countries by hot tub ownership per capita (most hot tubs per million people)", type: "top5", category: "lifestyle", options: ["Canada", "United States", "Sweden", "Norway", "Finland"], correctRanking: ["Canada", "United States", "Sweden", "Norway", "Finland"] },
        
        // Quirky Daily Life Statistics - Barbecue & Grilling
        { question: "Rank these countries by barbecue grills per capita (most grills per household)", type: "top5", category: "lifestyle", options: ["United States", "Australia", "Argentina", "South Africa", "Brazil"], correctRanking: ["United States", "Australia", "Argentina", "South Africa", "Brazil"] },
        
        // Quirky Daily Life Statistics - Dishwashers
        { question: "Rank these countries by dishwasher ownership per capita (percentage of households)", type: "top5", category: "household", options: ["Germany", "Sweden", "Norway", "Denmark", "Netherlands"], correctRanking: ["Germany", "Sweden", "Norway", "Denmark", "Netherlands"] },
        
        // Quirky Daily Life Statistics - Washing Machines
        { question: "Rank these countries by washing machine ownership per capita (percentage of households)", type: "top5", category: "household", options: ["Norway", "Switzerland", "Sweden", "Denmark", "Finland"], correctRanking: ["Norway", "Switzerland", "Sweden", "Denmark", "Finland"] },
        
        // Quirky Daily Life Statistics - Dryers
        { question: "Rank these countries by clothes dryer ownership per capita (percentage of households)", type: "top5", category: "household", options: ["United States", "Canada", "Sweden", "Norway", "Denmark"], correctRanking: ["United States", "Canada", "Sweden", "Norway", "Denmark"] },
        
        // Quirky Daily Life Statistics - Air Conditioning
        { question: "Rank these countries by air conditioning ownership per capita (percentage of households)", type: "top5", category: "household", options: ["United States", "Japan", "South Korea", "Australia", "Italy"], correctRanking: ["United States", "Japan", "South Korea", "Australia", "Italy"] },
        
        // Quirky Daily Life Statistics - Central Heating
        { question: "Rank these countries by central heating ownership per capita (percentage of households)", type: "top5", category: "household", options: ["Russia", "Germany", "United Kingdom", "France", "Italy"], correctRanking: ["Russia", "Germany", "United Kingdom", "France", "Italy"] },
        
        // Quirky Daily Life Statistics - Solar Panels
        { question: "Rank these countries by solar panel installations per capita (most installations per million people)", type: "top5", category: "technology", options: ["Australia", "Germany", "Netherlands", "Japan", "United States"], correctRanking: ["Australia", "Germany", "Netherlands", "Japan", "United States"] },
        
        // Quirky Daily Life Statistics - Electric Vehicles
        { question: "Rank these countries by electric vehicle ownership per capita (most EVs per million people)", type: "top5", category: "technology", options: ["Norway", "Iceland", "Sweden", "Netherlands", "Denmark"], correctRanking: ["Norway", "Iceland", "Sweden", "Netherlands", "Denmark"] },
        
        // Quirky Daily Life Statistics - Laundry Frequency
        { question: "Rank these countries by laundry loads per household per week (most to least)", type: "top5", category: "lifestyle", options: ["United States", "Australia", "Canada", "United Kingdom", "Germany"], correctRanking: ["United States", "Australia", "Canada", "United Kingdom", "Germany"] },
        
        // Quirky Daily Life Statistics - Shower Frequency
        { question: "Rank these countries by showers per person per week (most to least)", type: "top5", category: "lifestyle", options: ["Brazil", "Mexico", "Colombia", "Australia", "United States"], correctRanking: ["Brazil", "Mexico", "Colombia", "Australia", "United States"] },
        
        // Quirky Daily Life Statistics - Toothbrush Usage
        { question: "Rank these countries by toothbrushes purchased per capita per year (most to least)", type: "top5", category: "lifestyle", options: ["United States", "Japan", "Germany", "United Kingdom", "France"], correctRanking: ["United States", "Japan", "Germany", "United Kingdom", "France"] },
        
        // Quirky Daily Life Statistics - Shampoo Usage
        { question: "Rank these countries by shampoo consumption per capita (liters per year)", type: "top5", category: "beautyQuirks", options: ["United States", "Japan", "Germany", "United Kingdom", "France"], correctRanking: ["United States", "Japan", "Germany", "United Kingdom", "France"] },
        
        // Quirky Daily Life Statistics - Soap Usage
        { question: "Rank these countries by soap consumption per capita (kg per year)", type: "top5", category: "beautyQuirks", options: ["United States", "Germany", "France", "United Kingdom", "Italy"], correctRanking: ["United States", "Germany", "France", "United Kingdom", "Italy"] },
        
        // Quirky Daily Life Statistics - Deodorant Usage
        { question: "Rank these countries by deodorant consumption per capita (most to least)", type: "top5", category: "beautyQuirks", options: ["United States", "United Kingdom", "Germany", "Australia", "Canada"], correctRanking: ["United States", "United Kingdom", "Germany", "Australia", "Canada"] },
        
        // Quirky Daily Life Statistics - Makeup Spending
        { question: "Rank these countries by makeup spending per capita (USD per year)", type: "top5", category: "beautyQuirks", options: ["United States", "Japan", "Germany", "France", "United Kingdom"], correctRanking: ["United States", "Japan", "Germany", "France", "United Kingdom"] },
        
        // Quirky Daily Life Statistics - Skincare Spending
        { question: "Rank these countries by skincare product spending per capita (USD per year)", type: "top5", category: "beautyQuirks", options: ["South Korea", "Japan", "United States", "Germany", "France"], correctRanking: ["South Korea", "Japan", "United States", "Germany", "France"] },
        
        // Quirky Daily Life Statistics - Hair Products
        { question: "Rank these countries by hair product spending per capita (USD per year)", type: "top5", category: "beautyQuirks", options: ["United States", "Japan", "Germany", "United Kingdom", "France"], correctRanking: ["United States", "Japan", "Germany", "United Kingdom", "France"] },
        
        // Quirky Daily Life Statistics - Perfume/Cologne
        { question: "Rank these countries by perfume and cologne spending per capita (USD per year)", type: "top10", category: "beautyQuirks", options: ["United Arab Emirates", "France", "United States", "China", "Italy", "Germany", "United Kingdom", "Japan", "Spain", "Canada"], correctRanking: ["United Arab Emirates", "France", "United States", "China", "Italy", "Germany", "United Kingdom", "Japan", "Spain", "Canada"] },
        
        // Quirky Daily Life Statistics - Sunscreen Usage
        { question: "Rank these countries by sunscreen consumption per capita (most to least)", type: "top5", category: "beautyQuirks", options: ["Australia", "New Zealand", "South Africa", "Brazil", "Argentina"], correctRanking: ["Australia", "New Zealand", "South Africa", "Brazil", "Argentina"] },
        
        // Quirky Daily Life Statistics - Sunglasses
        { question: "Rank these countries by sunglasses purchased per capita per year (most to least)", type: "top5", category: "beautyQuirks", options: ["Italy", "United States", "France", "Spain", "Australia"], correctRanking: ["Italy", "United States", "France", "Spain", "Australia"] },
        
        // Quirky Daily Life Statistics - Watches
        { question: "Rank these countries by watch ownership per capita (percentage of adults)", type: "top5", category: "lifestyle", options: ["Switzerland", "Japan", "Germany", "United States", "Italy"], correctRanking: ["Switzerland", "Japan", "Germany", "United States", "Italy"] },
        
        // Quirky Daily Life Statistics - Jewelry Spending
        { question: "Rank these countries by jewelry spending per capita (USD per year)", type: "top5", category: "lifestyle", options: ["United Arab Emirates", "Switzerland", "United States", "Italy", "France"], correctRanking: ["United Arab Emirates", "Switzerland", "United States", "Italy", "France"] },
        
        // Quirky Daily Life Statistics - Handbags
        { question: "Rank these countries by handbag spending per capita (USD per year)", type: "top5", category: "fashion", options: ["Italy", "France", "United States", "United Kingdom", "Germany"], correctRanking: ["Italy", "France", "United States", "United Kingdom", "Germany"] },
        
        // Quirky Daily Life Statistics - Shoes
        { question: "Rank these countries by shoes purchased per capita per year (most pairs to least)", type: "top5", category: "fashion", options: ["Italy", "Spain", "France", "United States", "United Kingdom"], correctRanking: ["Italy", "Spain", "France", "United States", "United Kingdom"] },
        
        // Quirky Daily Life Statistics - Socks
        { question: "Rank these countries by socks purchased per capita per year (most pairs to least)", type: "top5", category: "fashion", options: ["United States", "Germany", "United Kingdom", "France", "Italy"], correctRanking: ["United States", "Germany", "United Kingdom", "France", "Italy"] },
        
        // Quirky Daily Life Statistics - Underwear
        { question: "Rank these countries by underwear purchased per capita per year (most pieces to least)", type: "top5", category: "fashion", options: ["United States", "United Kingdom", "Germany", "France", "Italy"], correctRanking: ["United States", "United Kingdom", "Germany", "France", "Italy"] },
        
        // Quirky Daily Life Statistics - Bed Linens
        { question: "Rank these countries by bed linen purchases per capita per year (most to least)", type: "top5", category: "household", options: ["Germany", "United Kingdom", "France", "Italy", "Spain"], correctRanking: ["Germany", "United Kingdom", "France", "Italy", "Spain"] },
        
        // Quirky Daily Life Statistics - Towels
        { question: "Rank these countries by towel purchases per capita per year (most to least)", type: "top5", category: "household", options: ["Turkey", "Germany", "United Kingdom", "France", "Italy"], correctRanking: ["Turkey", "Germany", "United Kingdom", "France", "Italy"] },
        
        // Quirky Daily Life Statistics - Pillows
        { question: "Rank these countries by pillows per household (most to least)", type: "top5", category: "household", options: ["Japan", "United States", "Germany", "United Kingdom", "France"], correctRanking: ["Japan", "United States", "Germany", "United Kingdom", "France"] },
        
        // Quirky Daily Life Statistics - Blankets
        { question: "Rank these countries by blankets per household (most to least)", type: "top5", category: "household", options: ["Finland", "Norway", "Sweden", "Iceland", "Denmark"], correctRanking: ["Finland", "Norway", "Sweden", "Iceland", "Denmark"] },
        
        // Quirky Daily Life Statistics - Vacuum Cleaners
        { question: "Rank these countries by vacuum cleaner ownership per capita (percentage of households)", type: "top5", category: "household", options: ["United Kingdom", "Germany", "Netherlands", "Sweden", "Denmark"], correctRanking: ["United Kingdom", "Germany", "Netherlands", "Sweden", "Denmark"] },
        
        // Quirky Daily Life Statistics - Microwaves
        { question: "Rank these countries by microwave ownership per capita (percentage of households)", type: "top5", category: "household", options: ["United States", "United Kingdom", "Canada", "Australia", "Germany"], correctRanking: ["United States", "United Kingdom", "Canada", "Australia", "Germany"] },
        
        // Quirky Daily Life Statistics - Coffee Makers
        { question: "Rank these countries by coffee maker ownership per capita (percentage of households)", type: "top5", category: "household", options: ["Italy", "Switzerland", "Austria", "Germany", "Finland"], correctRanking: ["Italy", "Switzerland", "Austria", "Germany", "Finland"] },
        
        // Quirky Daily Life Statistics - Teapots
        { question: "Rank these countries by teapot ownership per capita (percentage of households)", type: "top5", category: "household", options: ["United Kingdom", "Ireland", "China", "Japan", "Russia"], correctRanking: ["United Kingdom", "Ireland", "China", "Japan", "Russia"] },
        
        // Quirky Daily Life Statistics - Rice Cookers
        { question: "Rank these countries by rice cooker ownership per capita (percentage of households)", type: "top5", category: "household", options: ["Japan", "China", "South Korea", "Thailand", "Vietnam"], correctRanking: ["Japan", "China", "South Korea", "Thailand", "Vietnam"] },
        
        // Quirky Daily Life Statistics - Chopsticks
        { question: "Rank these countries by chopsticks used per capita per year (most to least)", type: "top5", category: "foodQuirks", options: ["China", "Japan", "South Korea", "Vietnam", "Thailand"], correctRanking: ["China", "Japan", "South Korea", "Vietnam", "Thailand"] },
        
        // Quirky Daily Life Statistics - Forks & Knives
        { question: "Rank these countries by forks and knives purchased per capita per year (most to least)", type: "top5", category: "household", options: ["United States", "Germany", "United Kingdom", "France", "Italy"], correctRanking: ["United States", "Germany", "United Kingdom", "France", "Italy"] },
        
        // Quirky Daily Life Statistics - Plates & Dishes
        { question: "Rank these countries by dishes and plates purchased per capita per year (most to least)", type: "top5", category: "household", options: ["Germany", "United Kingdom", "France", "Italy", "Spain"], correctRanking: ["Germany", "United Kingdom", "France", "Italy", "Spain"] },
        
        // Quirky Daily Life Statistics - Cups & Mugs
        { question: "Rank these countries by cups and mugs purchased per capita per year (most to least)", type: "top5", category: "household", options: ["United Kingdom", "Ireland", "Australia", "Canada", "United States"], correctRanking: ["United Kingdom", "Ireland", "Australia", "Canada", "United States"] },
        
        // Quirky Daily Life Statistics - Cutlery Sets
        { question: "Rank these countries by cutlery sets per household (most to least)", type: "top5", category: "household", options: ["Germany", "Austria", "Switzerland", "France", "Italy"], correctRanking: ["Germany", "Austria", "Switzerland", "France", "Italy"] },
        
        // Quirky Daily Life Statistics - Wine Glasses
        { question: "Rank these countries by wine glasses per household (most to least)", type: "top5", category: "household", options: ["France", "Italy", "Spain", "Germany", "Portugal"], correctRanking: ["France", "Italy", "Spain", "Germany", "Portugal"] },
        
        // Quirky Daily Life Statistics - Beer Mugs
        { question: "Rank these countries by beer mugs per household (most to least)", type: "top5", category: "household", options: ["Germany", "Czech Republic", "Austria", "Belgium", "Poland"], correctRanking: ["Germany", "Czech Republic", "Austria", "Belgium", "Poland"] },
        
        // Quirky Daily Life Statistics - Teacups
        { question: "Rank these countries by teacups per household (most to least)", type: "top5", category: "household", options: ["United Kingdom", "Ireland", "China", "Japan", "Russia"], correctRanking: ["United Kingdom", "Ireland", "China", "Japan", "Russia"] },
        
        // Quirky Daily Life Statistics - Coffee Cups
        { question: "Rank these countries by coffee cups per household (most to least)", type: "top5", category: "household", options: ["Finland", "Sweden", "Norway", "Denmark", "Netherlands"], correctRanking: ["Finland", "Sweden", "Norway", "Denmark", "Netherlands"] }
    ]
};
