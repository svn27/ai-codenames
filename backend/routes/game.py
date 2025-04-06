from fastapi import APIRouter, Form
from fastapi.responses import JSONResponse
from models import GameState, SpymasterRequest, OperatorRequest
from services import ai_spymaster, ai_guesser, create_new_gamestate
from typing import List

router = APIRouter()


@router.get("/get_new_game", response_model=GameState)
def get_new_game():
    """Returns a new game state"""
    game_state = create_new_gamestate()
    
    return game_state


# @router.post(f"{start_url}/get_ai_spymaster")
# def get_ai_spymaster(game_state: GameState):
#     """Returns the ai spymaster word and goes"""
#     board = [word.word for word in game_state.board_words]
#     ai_words = [word.word for word in game_state.board_words if word.role == game_state.get_active_team().name and not word.used]
    
#     spymaster_word, goes = ai_spymaster(board, ai_words)
    
#     response = {"spymaster_word": spymaster_word, "goes": goes}
#     return JSONResponse(content=response)

@router.post("/get_ai_spymaster")
def get_ai_spymaster(data: SpymasterRequest):
    """Returns the ai spymaster word and goes"""    
    spymaster_word, goes = ai_spymaster(data.all_words, data.ai_words)
    
    response = {"spymaster_word": spymaster_word, "goes": goes}
    return JSONResponse(content=response)

    
# @router.post("/get_ai_guesses")
# def get_ai_guesses(game_state: GameState, spymaster_word: str, goes: int):
#     """Returns the ai guesses"""
#     board = [word.word for word in game_state.board_words]
    
#     guesses = ai_guesser(board, spymaster_word, goes)
    
#     response = {"guesses": guesses}
#     return JSONResponse(content=response)

@router.post("/get_ai_guesses")
def get_ai_guesses(data: OperatorRequest):
    """Returns the ai guesses"""
    guesses = ai_guesser(data.all_words, data.spymaster_word, data.goes)
    
    response = {"guesses": guesses}
    return JSONResponse(content=response)










@router.post("/switch_active_team", response_model=GameState)
def switch_active_team(game_state: GameState):
    """Switches the active team"""
    game_state.current_team_name = game_state.get_opposition_team().name
    return game_state

@router.post("/get_score")
def get_score(game_state: GameState):
    """Returns the score of the game"""
    red_team_score = game_state.get_remaining_words(game_state.red_team)
    blue_team_score = game_state.get_remaining_words(game_state.blue_team)
    
    response = {"red": len(red_team_score), "blue": len(blue_team_score)}
    return JSONResponse(content=response)

@router.post("/update_spymaster", response_model=GameState)
def update_spymaster(game_state: GameState, spy_master_word: str, goes: int):
    """Update the spy master word and operative goes"""
    game_state.update_spy_master(spy_master_word, goes)
    
    return game_state

@router.post("/operative_guess", response_model=GameState)
def operative_guess(game_state: GameState, guess: str):
    """Update the spy master word and operative goes"""
    game_state.operative(guess)
    
    return game_state
