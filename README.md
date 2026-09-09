# Hook Game

A top-down vampire-survivors-style browser game built with Flask (Python) on the backend and JavaScript for the gameplay, featuring user accounts and a grappling-hook capture mechanic.

## Demo

<img width="3004" height="1548" alt="image" src="https://github.com/user-attachments/assets/1e784b8d-5c32-40b6-a831-e09250803227" />
<img width="2030" height="1146" alt="image" src="https://github.com/user-attachments/assets/f67fa428-5980-4528-bc02-731d1b69ba19" />

## What it does

You play a vampire fighting off waves of monsters using a grappling hook instead of a standard attack. Aim with the mouse and fire the hook (`E`) toward the crosshair — if it connects with a monster, the hook latches on and you reel it in while it resists and can break free before it's in range. Once it's reeled in close, click to finish it off with a melee strike.

- Survive 5 waves of increasingly difficult monsters (goblins, humans, and vampire variants), each wave shifting the enemy mix and ramping up stats
- Wave 5 is a boss fight: a tougher enemy with ranged fireball attacks and simple probabilistic movement
- Health pickups spawn in the later waves to help you survive
- Score and coin counters track performance, with a full HUD (health, score, coins, wave number)
- Player accounts and sessions are handled server-side by Flask, so gameplay isn't lost between visits

## Features

- User authentication (signup & login) via Flask-WTF forms
- Server-side session management with Flask-Session
- Custom Canvas-based rendering: tile-based background, sprite animation (idle/walk/attack states), directional monster sprites
- Grappling-hook mechanic with physics touches — momentum, gravity drop-off, resistance/escape chance while reeling
- Wave-based enemy spawning with weighted monster-type distribution that shifts as waves progress
- Boss encounter with unique attack and movement patterns
- Collision detection, floating damage numbers, and dynamic health bars per monster

## Controls

| Key/Input | Action |
|---|---|
| `W` `A` `S` `D` | Move |
| Mouse | Aim (crosshair) |
| `E` | Fire hook at crosshair / hold to reel in a captured monster |
| `R` | Release the hook |
| Click | Melee attack a captured monster |

## Tech Stack

| Layer | Tech |
|---|---|
| Backend | Python, Flask |
| Session handling | Flask-Session |
| Forms / validation | Flask-WTF |
| Frontend | Vanilla JavaScript, HTML5 Canvas, CSS |
| Database | *(SQLite / none — fill in if applicable)* |

## Getting Started

### Prerequisites
- Python 3.12 (this project is **not** compatible with 3.14 — Flask-Session's `msgspec` dependency has build issues on it)

### Installation

```bash
# Clone the repo
git clone [your-repo-url]
cd [project-folder]

# Create and activate a virtual environment
python3.12 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Running the app

```bash
flask run
```

Then open `http://127.0.0.1:5000` in your browser.


## What I'd improve next

I'd like to add more adaptive UI to the Waves and Defeated or Victory labels. A pause function, and a re-play function, followed by a leaderboard.

## Author

Jake Sparks
