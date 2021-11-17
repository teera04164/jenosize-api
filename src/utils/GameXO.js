const { nanoid } = require('nanoid')
const { redisDB } = require('../db/redisDB')

const PLAYER = {
    USER: 'X',
    BOT: 'O',
}

class GameXO {
    game_id = null
    board = []
    winner = null
    status = 'in_progress'
    message = null

    constructor(game_id) {
        this.game_id = game_id
    }

    getKey = () => {
        return `xo-${this.game_id}`
    }

    getDefaultData = () => {
        return {
            game_id: this.game_id,
            board: this.board,
            updateAt: new Date,
            winner: this.winner,
            status: this.status,
            message: this.getMessage()
        }
    }

    initial = async () => {
        this.game_id = nanoid()
        this.board = Array(9).fill(null)

        const obj = {
            game_id: this.getKey(),
            board: this.board,
            updateAt: new Date,
            winner: null,
            status: this.status,
            message: this.getMessage()
        }

        redisDB.set(this.getKey(), obj)

        return obj
    }

    getData = async () => {
        const cached = await redisDB.get(this.game_id)
        if (cached) {
            const { board, message, status, winner } = cached
            this.board = board
            this.message = message
            this.status = status
            this.winner = winner
            return cached
        }
        return null
    }

    movePosition = async (position) => {
        let oldData = await this.getData()
        if (oldData) {
            let { board } = oldData
            if (board[position] != null || this.winner) {
                return this.getDefaultData()
            }

            const updatedBoard = [...board];
            updatedBoard[position] = PLAYER.USER;
            this.board = updatedBoard
            const boardBot = this.botMovePosition(updatedBoard)
            const winner = this.calculateWinner(boardBot)
            if (winner) {
                this.winner = winner
            }
            this.save()
            return this.getDefaultData()
        }
        return null
    }

    botMovePosition = (board) => {
        let newBoard = [...board]
        let bestPosition = this.findBestSquare(newBoard, PLAYER.BOT)
        newBoard[bestPosition] = PLAYER.BOT
        this.board = newBoard
        return newBoard
    }

    getMessage = () => {
        if (this.winner) {
            return `Winner is ${this.winner} 🎊`
        }
        else if (this.isBoardFull(this.board)) {
            return `It's draw ❗️`;
        }
        else {
            return `Next Turn: ${PLAYER.USER}`;
        }
    }

    reset = () => {
        this.board = Array(9).fill(null)
        this.winner = null
        this.status = 'in_progress'
        this.message = null
        this.save()
        return this.getDefaultData()
    }

    save = async () => {
        return redisDB.set(this.game_id, this.getDefaultData())
    }

    calculateWinner(blocks) {
        const possibleWins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < possibleWins.length; i++) {
            const [x, y, z] = possibleWins[i];
            if (blocks[x] && blocks[x] === blocks[y] && blocks[x] === blocks[z]) {
                return blocks[x];
            }
        }
        return null;
    }

    isBoardFull(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i] == null) {
                return false;
            }
        }
        return true;
    }

    findBestSquare(board, player) {
        // 'player' is the maximizing player
        // 'opponent' is the minimizing player
        const opponent = player === 'X' ? 'O' : 'X';

        const minimax = (board, isMax) => {
            const winner = this.calculateWinner(board);

            // If player wins, score is +1
            if (winner === player) return { square: -1, score: 1 };

            // If opponent wins, score is -1
            if (winner === opponent) return { square: -1, score: -1 };

            // If Tie, score is 0
            if (this.isBoardFull(board)) return { square: -1, score: 0 };

            // Initialize 'best'. If isMax, we want to maximize score, and minimize otherwise.
            const best = { square: -1, score: isMax ? -1000 : 1000 };

            // Loop through every square on the board
            for (let i = 0; i < board.length; i++) {
                // If square is already filled, it's not a valid move so skip it
                if (board[i]) {
                    continue;
                }

                // If square is unfilled, then it's a valid move. Play the square.
                board[i] = isMax ? player : opponent;
                // Simulate the game until the end game and get the score,
                // by recursively calling minimax.
                const score = minimax(board, !isMax).score;
                // Undo the move
                board[i] = null;

                if (isMax) {
                    // Maximizing player; track the largest score and move.
                    if (score > best.score) {
                        best.score = score;
                        best.square = i;
                    }
                } else {
                    // Minimizing opponent; track the smallest score and move.
                    if (score < best.score) {
                        best.score = score;
                        best.square = i;
                    }
                }
            }

            // The move that leads to the best score at end game.
            return best;
        };

        // The best move for the 'player' given current board
        return minimax(board, true).square;
    }

}

module.exports = {
    GameXO,
};
