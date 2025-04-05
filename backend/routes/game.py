from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models import GameState

router = APIRouter()

start_url = "/shrix/and/his/spooky/rix"

@router.get(f"{start_url}")
def test():
    return JSONResponse(content={"message": f"Rix, a handsome fellow was once possessed by a demon. He was a great spymaster, but now he is a mere operative. He is trying to get back his spymaster powers. Can you help him?"}) 

@router.post(f"{start_url}/get_score")
def get_score(game_state: GameState):
    """Returns the score of the game"""
    red_team_score = game_state.get_remaining_words(game_state.red_team)
    blue_team_score = game_state.get_remaining_words(game_state.blue_team)
    
    response = {"red": len(red_team_score), "blue": len(blue_team_score)}
    return JSONResponse(content=response)

@router.post(f"{start_url}/update_spymaster", response_model=GameState)
def update_spymaster(game_state: GameState, spy_master_word: str, goes: int):
    """Update the spy master word and operative goes"""
    game_state.update_spy_master(spy_master_word, goes)
    
    return game_state

@router.post(f"{start_url}/operative_guess", response_model=GameState)
def operative_guess(game_state: GameState, guess: str):
    """Update the spy master word and operative goes"""
    game_state.operative(guess)
    
    return game_state
