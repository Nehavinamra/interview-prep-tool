# 🧠 Interview Preparation Tool

This is a responsive and interactive web application that helps users prepare for job interviews. It dynamically generates mock questions, allows voice-based responses, analyzes those answers, and provides feedback with a performance score.

---

## 🚀 Features

- ✅ **Select Interview Round** (1–4 or custom input)
- 📄 **Paste Job Description** input field
- 📁 **Resume Upload** (PDF/DOCX)
- 🤖 **Mock Interview Questions** generator
- 🎙️ **Voice Input** using `react-speech-recognition`
- 🔊 **Text-to-Speech Output** to read questions aloud
- 📊 **Feedback + Scoring Algorithm** for user response
- 💡 **Visual Performance Bar + Custom Tips**
- 🎨 Fully custom **CSS-based UI** with responsive design and accessibility

---

## 🛠️ Tech Stack

| Layer        | Tools Used                                  |
| ------------ | ------------------------------------------- |
| Frontend     | React (with useState/useEffect), TypeScript |
| UI Framework | Custom CSS with CSS variables               |
| Speech Input | `react-speech-recognition`                  |
| Voice Output | `SpeechSynthesisUtterance` (Web API)        |
| Styling      | Modular `interviewPrep.css` using variables |
| Deployment   | Deployed on Vercel                          |

---

## 📦 Folder Structure

```
/interview-prep
├── page.tsx                # Main InterviewPrepPage React Component
├── interviewPrep.css       # Complete UI styling using CSS variables
```

---

## 🧠 Scoring Algorithm (Voice Response)

On clicking **Analyze My Answer**, the transcript is scored across 5 dimensions:

1. **Length**: +2 if ≥ 20 words
2. **Outcome keywords**: +3 if includes results/impact
3. **Teamwork mentions**: +2 if collaborative words used
4. **Action verbs**: +2 for verbs like “led”, “solved”
5. **Avoid vague terms**: +1 if words like “stuff/things” avoided

> Max Score = 10  
> Feedback is customized based on missing criteria

---

## 🎨 Styling (CSS Highlights)

Custom styles are managed using a theme-like system with `:root` CSS variables:

```css
--primary: #4361ee;
--accent: #4895ef;
--danger: #f72585;
--warning: #f8961e;
--success: #4cc9f0;
--light-gray: #e9ecef;
```

Key Sections:

- `.form-section` – Inputs for round, JD, resume
- `.generate-button` – Animated button with spinner
- `.question-item` – Animated card layout for questions
- `.voice-controls` – Active state styles + pulsing animation
- `.score-box` – Gradient bar + score message

Responsive styles use media queries to optimize layout on mobile.

---

## 🎙️ Speech & Audio APIs

### 1. **Voice Input**

- Library: [`react-speech-recognition`](https://www.npmjs.com/package/react-speech-recognition)
- Methods used:
  - `startListening({ continuous: false })`
  - `stopListening()`
  - `transcript`, `resetTranscript`

### 2. **Voice Output**

- Built-in: `window.speechSynthesis.speak()`

---

## 📂 Future Improvements

- [ ] Use OpenAI API for dynamic question generation
- [ ] Add login & saved session history
- [ ] Deploy via Vercel with resume parsing backend

---

## 👤 Author

**Neha Vinamra**
