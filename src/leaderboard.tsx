import './App.css';
import React from 'react';
import './grid.css';
import { Link } from 'react-router-dom';

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

interface ScoreEntry {
    id: number;
    name: string;
    score: number;
}

interface LeaderboardState {
    scores: {
        easy: ScoreEntry[];
        medium: ScoreEntry[];
        hard: ScoreEntry[];
        expert: ScoreEntry[];
    };
}

interface LeaderboardProps {}

class Leaderboard extends React.Component<LeaderboardProps, LeaderboardState> {
    constructor(props: LeaderboardProps) {
        super(props);
        this.state = {
            scores: {
                easy: [],
                medium: [],
                hard: [],
                expert: [],
            },
        };
    }

    componentDidMount() {
        const gameKey = '8282e84b30a26cb68dad6c0a88ab78367943f01e'; // Replace with actual game key

        fetch(`https://purpletoken.com/update/v2/get_score?gamekey=${gameKey}&format=json&limit=20`)
            .then((response) => response.json())
            .then((data) => {
                const categorizedScores: LeaderboardState = {
                    scores: {
                        easy: [],
                        medium: [],
                        hard: [],
                        expert: [],
                    },
                };

                data.scores.forEach((entry: { id: number; player: string; score: number; date: string }) => {
                    if (entry.score < 1000) categorizedScores.scores.easy.push({ id: entry.id, name: entry.player, score: entry.score });
                    else if (entry.score < 5000) categorizedScores.scores.medium.push({ id: entry.id, name: entry.player, score: entry.score });
                    else if (entry.score < 10000) categorizedScores.scores.hard.push({ id: entry.id, name: entry.player, score: entry.score });
                    else categorizedScores.scores.expert.push({ id: entry.id, name: entry.player, score: entry.score });
                });

                this.setState(categorizedScores);
            })
            .catch((error) => {
                console.error('Error fetching scores:', error);
            });
    }

    renderLeaderboard(difficulty: Difficulty) {
        return this.state.scores[difficulty].map((entry, index) => (
            <div key={entry.id} className="score-entry">
                <div className="score-rank">{index + 1}</div>
                <div className="score-name">{entry.name}</div>
                <div className="score-value">{entry.score}</div>
            </div>
        ));
    }

    render() {
        return (
            <div className="TitleScreen">
                <h1>Leaderboard</h1>
                <div className="leaderboard-grid">
                    <div className="leaderboard-column">
                        <h2>Easy</h2>
                        {this.renderLeaderboard('easy')}
                    </div>
                    <div className="leaderboard-column">
                        <h2>Medium</h2>
                        {this.renderLeaderboard('medium')}
                    </div>
                    <div className="leaderboard-column">
                        <h2>Hard</h2>
                        {this.renderLeaderboard('hard')}
                    </div>
                    <div className="leaderboard-column">
                        <h2>Expert</h2>
                        {this.renderLeaderboard('expert')}
                    </div>
                </div>

                <Link to="/">
                    <div className="titlescreen-return">Title Screen</div>
                </Link>
            </div>
        );
    }
}

export default Leaderboard;
