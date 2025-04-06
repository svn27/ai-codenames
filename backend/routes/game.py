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

@router.post("/update")
def update_game_state(game_state: GameState, guess: str):
    """Update game state after a guess"""
    game_state.operative(guess)
    return game_state


@router.post(f"/get_ai_spymaster")
def get_ai_spymaster(game_state: GameState):
    """Returns the ai spymaster word and goes"""
    board = [word.word for word in game_state.board_words]
    ai_words = [word.word for word in game_state.board_words if word.role == game_state.get_active_team().name and not word.used]
    
    spymaster_word, goes = ai_spymaster(board, ai_words)
    
    response = {"spymaster_word": spymaster_word, "goes": goes}
    return JSONResponse(content=response)

# @router.post("/get_ai_spymaster")
# def get_ai_spymaster(data: SpymasterRequest):
#     """Returns the ai spymaster word and goes"""    
#     spymaster_word, goes = ai_spymaster(data.all_words, data.ai_words)
    
#     response = {"spymaster_word": spymaster_word, "goes": goes}
#     return JSONResponse(content=response)

    
@router.post("/get_ai_guesses")
def get_ai_guesses(game_state: GameState, spymaster_word: str, goes: int):
    """Returns the ai guesses"""
    board = [word.word for word in game_state.board_words]
    
    guesses = ai_guesser(board, spymaster_word, goes)
    
    response = {"guesses": guesses}
    return JSONResponse(content=response)

# @router.post("/get_ai_guesses")
# def get_ai_guesses(data: OperatorRequest):
#     """Returns the ai guesses"""
#     guesses = ai_guesser(data.all_words, data.spymaster_word, data.goes)
    
#     response = {"guesses": guesses}
#     return JSONResponse(content=response)
