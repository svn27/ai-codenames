from pydantic import BaseModel
from typing import List, Literal, Optional
from models.teams import Team

# Represents a single word card on the board
class BoardWord(BaseModel):
    word: str
    used: bool = False
    role: Literal["red", "blue", "neutral", "assassin"]


class Board(BaseModel):
    words: List[BoardWord]
    
class GameState(BaseModel):
    board: Board
    red_team: Team 
    blue_team: Team
    current_team_name: Literal["red", "blue"]
    winner: Optional[Literal["red", "blue"]] = None
    
    def get_active_team(self):
        """Returns the current active team"""
        return self.red_team if self.current_team_name == "red" else self.blue_team
    
    def get_opposition_team(self):
        """Returns the opposition to current active team"""
        return self.blue_team if self.current_team_name == "red" else self.red_team
    
    def get_remaining_words(self, team: Team):
        """Returns the unused words for the given team"""
        return [word for word in self.board.words if word.role == team.name and not word.used]
    
    def get_words(self, team: Team):
        """Returns all the words for the given team"""
        return [word for word in self.board.words if word.role == team.name]
    
    def check_winner(self, team: Team):
        remaining_words = self.get_remaining_words(team)
        if len(remaining_words) == 0:
            self.winner = team.name
    
    
    def update_spy_master(self, spy_master_word: str, goes: int):
        """Update goes for the operative in the spy master team"""
        active_team = self._get_team()
        active_team.spy_master.word = spy_master_word
        active_team.operative.goes = goes + 1
    
    def operative(self, guess: str):
        active_team = self.get_active_team()
        opposition_team = self.get_opposition_team()
        board_word = next((w for w in self.board.words if w.word == guess))
        
        board_word.used = True
        if board_word.role == active_team.name: 
            self.check_winner(active_team)
            active_team.operative.goes -= 1
            if active_team.operative.goes == 0:
                self.current_team_name = opposition_team.name
            
        elif board_word.role == opposition_team.name: 
            self.check_winner(opposition_team)
            self.current_team_name = opposition_team.name
            
        elif board_word.role == "neutral":
            self.current_team_name = opposition_team.name
                    
        elif board_word.role == "assassin": 
            self.winner = opposition_team.name
        

        