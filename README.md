# 🥗 Nutrition AI Frontend

A modern React + TypeScript frontend for the Nutrition AI platform. This application allows users to analyze food items using AI-powered nutrition insights, track food history, and visualize daily and weekly nutrition analytics.

## 🚀 Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Persistent Sessions using Local Storage

### Food Analysis

* Submit food descriptions for AI analysis
* View estimated:

  * Calories
  * Protein
  * Carbohydrates
  * Fats
* Receive AI-generated dietary advice

### History Tracking

* View previously analyzed foods
* Nutrition log history
* Timestamped food records

### Analytics Dashboard

* Daily calorie summaries
* Weekly nutrition overview
* Interactive chart visualizations
* AI-generated insights

### Responsive Design

* Mobile-friendly layout
* Tablet support
* Desktop optimized UI

---

# 🛠 Tech Stack

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| React            | UI Framework            |
| TypeScript       | Type Safety             |
| React Router DOM | Routing                 |
| Axios            | API Communication       |
| Context API      | Global State Management |
| CSS              | Styling                 |
| Vite             | Build Tool              |
| Golang           | Backend                 |

---

# 📂 Project Structure

```text
src/
├── api/
│   ├── index.ts
│   ├── auth.ts
│   ├── food.ts
│   └── analytics.ts
│
├── components/
│   ├── Layout.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── FoodForm.tsx
│   ├── FoodCard.tsx
│   ├── HistoryList.tsx
│   ├── AnalyticsChart.tsx
│   ├── Card.tsx
│   ├── Button.tsx
│   └── Input.tsx
│
├── contexts/
│   └── AuthContext.tsx
│
├── pages/
│   ├── DashboardPage.tsx
│   ├── FoodAnalyzePage.tsx
│   ├── HistoryPage.tsx
│   ├── DailyAnalyticsPage.tsx
│   ├── WeeklyAnalyticsPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── NotFoundPage.tsx
│
├── styles/
│   ├── global.css
│   ├── colors.css
│   └── layout.css
│
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

---

# 🔗 Backend Requirements

## NOTE: REQUIRES .ENV FILE WITH GROQ API KEY

This frontend expects a Go + Gin backend running on:

```bash
http://localhost:8080
```

Supported API endpoints:

### Authentication

```http
POST /auth/register
POST /auth/login
GET /auth/me (auth protected)
```

### Food Analysis

```http
POST /food/analyze
GET /food/history
```

### Analytics

```http
GET /analytics/daily
GET /analytics/weekly
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/nutrition-ai-frontend.git
cd nutrition-ai-frontend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Backend URL

Update:

```ts
src/api/index.ts
```

```ts
const api = axios.create({
  baseURL: "http://localhost:8080",
});
```

Replace with your deployed backend URL if needed.

---

# ▶️ Running the Application

Start the development server:

```bash
npm run dev
```

Vite will start on:

```text
http://localhost:5173
```

---

# 🔐 Authentication Flow

1. User registers an account.
2. User logs in.
3. Backend returns a JWT token.
4. Token is stored in:

```javascript
localStorage
```

5. Axios automatically attaches:

```http
Authorization: Bearer <token>
```

to protected API requests.

---

# 📊 Data Models

## Login Response

```json
{
  "token": "jwt-token"
}
```

## Food Analysis Response

```json
{
  "id": 1,
  "food": "Chicken Rice",
  "calories": 650,
  "protein": 40,
  "carbs": 65,
  "fats": 18,
  "advice": "Balanced meal with good protein content.",
  "created_at": "2026-06-25T12:00:00Z"
}
```

## Daily Analytics

```json
{
  "calories": 2100,
  "insight": "You are within your target calorie range."
}
```

## Weekly Analytics

```json
{
  "2026-06-19": 1800,
  "2026-06-20": 2100,
  "2026-06-21": 1950,
  "2026-06-22": 2200,
  "2026-06-23": 2050,
  "2026-06-24": 1900,
  "2026-06-25": 2150
}
```

---

# 🎨 UI Screens

### Login Page

* Email Input
* Password Input
* Login Button

### Register Page

* Email Input
* Password Input
* Register Button

### Dashboard

* Daily Summary Card
* Weekly Summary Card
* Quick Food Analysis
* Recent Activity

### Food Analysis

* Food Entry Form
* Nutrition Results
* AI Recommendations

### History

* Searchable Food Logs
* Nutrition Details
* Timestamp Information

### Analytics

* Daily Calories
* Weekly Trends
* Interactive Charts

---

# 📦 Recommended Future Enhancements

* Dark Mode
* User Profile Management
* Goal Tracking
* Meal Categorization
* Barcode Scanning
* Nutrition Image Recognition
* Push Notifications
* PWA Support
* Multi-language Support
* Real Chart.js/Recharts Integration

---

# 🧪 Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Built with React, TypeScript, and ❤️ for AI-powered nutrition tracking, by [PhantomHydrino](https://github.com/PahntomHydrino/)
