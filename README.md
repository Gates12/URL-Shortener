# URL Shortener

## Introduction
This is a **URL Shortener** project that converts long URLs into shorter, easy-to-share links. It also tracks how many times a shortened URL has been accessed.

## Features
✅ Shorten long URLs into unique short links
✅ Redirect users to original URLs using short links
✅ Track the number of times a short URL has been accessed
✅ Simple frontend for ease of use
✅ Fast performance using Flask and Redis

## Tech Stack
- **Backend:** Flask (Python), Redis (Database)
- **Frontend:** HTML, CSS, JavaScript
- **Other:** Flask-CORS, Validators

---

## Project Structure
```
URL-SHORTENER/
│── backend/
│   │── __pycache__/       # Python compiled files
│   │── __init__.py        # Package initialization
│   │── app.py             # Main Flask app
│   │── config.py          # Configuration file
│   │── db.py              # Database connection (Redis)
│── frontend/
│   │── index.html         # Webpage UI
│   │── script.js          # JavaScript for frontend logic
│   │── style.css          # CSS for styling
│── venv/                  # Virtual environment
│── .gitignore             # Files to ignore in Git
```

---

## Backend (Flask + Redis)
### 1. **Flask App (app.py)**
- Handles API routes for shortening and redirecting URLs.
- Uses Redis as the database.
- Functions:
  - `generate_short_url()`: Creates a random short URL.
  - `shorten_url()`: Accepts a long URL and returns a shortened version.
  - `redirect_to_long()`: Redirects short URL to the original long URL.
  - `get_stats()`: Returns how many times a short URL was accessed.

### 2. **Database (db.py & config.py)**
- **Redis Storage:**
  - Short URL → Long URL
  - Long URL → Short URL (for quick lookups)
  - Access counts

### 3. **API Endpoints**
| Route | Method | Description |
|---|---|---|
| `/shorten` | POST | Accepts a long URL and returns a shortened version. |
| `/<short_url>` | GET | Redirects to the original long URL. |
| `/stats/<short_url>` | GET | Returns access count for the short URL. |

---

## Frontend (HTML, CSS, JavaScript)
### **index.html**
- Provides input fields and buttons for shortening URLs and checking stats.

### **script.js**
- Calls backend API to shorten URLs and fetch access counts.

### **style.css**
- Basic styling for a clean UI.

---

## How to Run the Project
### **1. Backend Setup:**
```bash
pip install flask redis flask-cors validators
python app.py
```

### **2. Frontend Setup:**
- Open `index.html` in a browser.

### **3. Using the App:**
- Enter a long URL and click "Shorten URL".
- Copy and use the generated short URL.
- Enter the short code in "Get Access Count" to see usage stats.

---

## Conclusion
This URL Shortener provides a lightweight and efficient way to generate short links, ensuring fast redirections and access tracking. 
