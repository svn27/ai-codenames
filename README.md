# 🕵️‍♂️ CODENETICS

![image](https://github.com/user-attachments/assets/2b548b9a-df00-4b33-a86d-0037845ff169)

A classic word game **Codenames**, with an AI spin!

---

## 🎯 Features

- 🤖 **AI Spymaster**: Generates clues using word vector embeddings (GloVe via Gensim).
- 🧠 **AI Operative**: Makes educated guesses based on the clue and board state.
- 🧑‍🤝‍🧑 **Human Player**: Play as the human Spymaster or Operative.
- 💬 **Backend in FastAPI** with Gensim NLP for vector-based clue generation.
- ⚡ **Frontend in React.js** with dynamic board rendering.
- 🎨 **Responsive UI** with real-time AI turns and guesses.

---

## 💻 Installation

### 🖥️ Backend Setup (FastAPI + Python)

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Install required Python packages:**

    ```bash
    pip install -r requirements.txt
    ```

3. **Run the backend:**

    - On **Windows**:

    ```bash
    python main.py
    ```

    - On **Mac**:

    ```bash
    python3 main.py
    ```

    Make sure you have internet access for the first time you run the backend as it will download the word vector model using Gensim.

---

### 🖥️ Frontend Setup (React.js)

1. **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2. **Install required dependencies:**

    ```bash
    npm install all
    ```

3. **Start the frontend development server:**

    ```bash
    npm run dev
    ```

    Your React app will now be running, and you should be able to interact with the game in your browser.

---

## 🧠 How the AI Works

- The **AI Spymaster** calculates average vectors of its team's words and finds the closest word in GloVe space as the clue.
- The **AI Operative** uses the clue and vector similarity to select the most likely associated words on the board.

---

## 📸 Screenshots / Demo

<img width="981" alt="image" src="https://github.com/user-attachments/assets/8917613c-e57b-45ba-81e4-26710d4943d2" />
