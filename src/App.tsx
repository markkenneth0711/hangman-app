import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import Keyboard from "./Keyboard"
import { getWord } from "./wordList"
import { Trophy, RotateCcw, Zap, Star, Award, Lightbulb } from "lucide-react"
import "./css/App.css"

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [stats, setStats] = useState({ wins: 0, losses: 0, streak: 0, bestStreak: 0 })
  const [showConfetti, setShowConfetti] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [hasUpdatedStats, setHasUpdatedStats] = useState(false)

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return
      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [addGuessedLetter])

  const resetGame = useCallback(() => {
    setGuessedLetters([])
    setWordToGuess(getWord())
    setHintsUsed(0)
    setHasUpdatedStats(false)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      resetGame()
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [resetGame])

  useEffect(() => {
    if (isWinner && !hasUpdatedStats) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      setStats(prev => ({
        wins: prev.wins + 1,
        losses: prev.losses,
        streak: prev.streak + 1,
        bestStreak: Math.max(prev.streak + 1, prev.bestStreak)
      }))
      setHasUpdatedStats(true)
    } else if (isLoser && !hasUpdatedStats) {
      setStats(prev => ({
        wins: prev.wins,
        losses: prev.losses + 1,
        streak: 0,
        bestStreak: prev.bestStreak
      }))
      setHasUpdatedStats(true)
    }
  }, [isWinner, isLoser, hasUpdatedStats])

  const getHint = () => {
    const remainingLetters = wordToGuess.split("").filter(l => !guessedLetters.includes(l))
    if (remainingLetters.length > 0 && hintsUsed < 2) {
      const randomLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)]
      addGuessedLetter(randomLetter)
      setHintsUsed(prev => prev + 1)
    }
  }

  const confettiColors = ["#fbbf24", "#ec4899", "#3b82f6", "#10b981"]

  return (
    <div className="app-container">
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <div 
                className="confetti-dot"
                style={{
                  background: confettiColors[Math.floor(Math.random() * 4)]
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="main-content">
        <div className="header">
          <h1 className="title">HANGMAN APP</h1>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <Trophy className="stat-icon" style={{ color: "#fbbf24" }} />
            <div className="stat-number">{stats.wins}</div>
            <div className="stat-label">Wins</div>
          </div>
          <div className="stat-card">
            <Award className="stat-icon" style={{ color: "#ef4444" }} />
            <div className="stat-number">{stats.losses}</div>
            <div className="stat-label">Losses</div>
          </div>
          <div className="stat-card">
            <Zap className="stat-icon" style={{ color: "#f97316" }} />
            <div className="stat-number">{stats.streak}</div>
            <div className="stat-label">Streak</div>
          </div>
          <div className="stat-card">
            <Star className="stat-icon" style={{ color: "#8b5cf6" }} />
            <div className="stat-number">{stats.bestStreak}</div>
            <div className="stat-label">Best</div>
          </div>
        </div>

        <div className="game-card">
          {(isWinner || isLoser) && (
            <div className={`game-over-banner ${isWinner ? 'winner' : 'loser'}`}>
              <div className={`game-over-title ${isWinner ? 'winner' : 'loser'}`}>
                {isWinner ? "🎉 YOU WIN!" : "💀 GAME OVER"}
              </div>
              <div className="game-over-message">
                {isWinner ? "Congratulations! You guessed the word!" : `The word was: ${wordToGuess.toUpperCase()}`}
              </div>
              <button onClick={resetGame} className="play-again-btn">
                <RotateCcw style={{ width: "1.5rem", height: "1.5rem" }} />
                Play Again
              </button>
            </div>
          )}

          <div className="drawing-container">
            <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
          </div>

          <div className="word-container">
            <HangmanWord
              reveal={isLoser}
              guessedLetters={guessedLetters}
              wordToGuess={wordToGuess}
            />
          </div>

          {!isWinner && !isLoser && (
            <div className="hint-container">
              <button
                onClick={getHint}
                disabled={hintsUsed >= 2}
                className={`hint-btn ${hintsUsed >= 2 ? 'disabled' : 'active'}`}
              >
                <Lightbulb style={{ width: "1.5rem", height: "1.5rem" }} />
                Get Hint ({2 - hintsUsed} left)
              </button>
            </div>
          )}

          <div className="keyboard-container">
            <Keyboard
              disabled={isWinner || isLoser}
              activeLetters={guessedLetters.filter(letter =>
                wordToGuess.includes(letter)
              )}
              inactiveLetters={incorrectLetters}
              addGuessedLetter={addGuessedLetter}
            />
          </div>
        </div>

        <div className="footer">
          <p>Press Enter to start a new game • Use keyboard or click buttons to guess</p>
        </div>
      </div>
    </div>
  )
}

export default App