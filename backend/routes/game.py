from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models import GameState
from services import ai_spymaster, ai_guesser

router = APIRouter()

start_url = ""

@router.get(f"{start_url}/get_new_game", response_model=GameState)
def get_new_game():
    pass

@router.post(f"{start_url}/get_ai_spymaster")
def get_ai_spymaster(game_state: GameState):
    """Returns the ai spymaster word and goes"""
    board = [word.word for word in game_state.board.words]
    ai_words = [word.word for word in game_state.get_active_team().spy_master.words]
    
    spymaster_word, goes = ai_spymaster(board, ai_words)
    
    response = {"spymaster_word": spymaster_word, "goes": goes}
    return JSONResponse(content=response)
    
@router.post(f"{start_url}/get_ai_guesses")
def get_ai_guesses(game_state: GameState, spymaster_word: str, goes: int):
    """Returns the ai guesses"""
    board = [word.word for word in game_state.board.words]
    
    guesses = ai_guesser(board, spymaster_word, goes)
    
    response = {"guesses": guesses}
    return JSONResponse(content=response)

@router.post(f"{start_url}/switch_active_team", response_model=GameState)
def switch_active_team(game_state: GameState):
    """Switches the active team"""
    game_state.current_team_name = game_state.get_opposition_team().name
    return game_state

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
