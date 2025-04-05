from pydantic import BaseModel
from typing import Literal

class Operative(BaseModel):
    name: str
    goes: int
    
class SpyMaster(BaseModel):
    name: str
    word: str  # word that is given to the operative
    
    
class Team(BaseModel):
    name: Literal["red", "blue"]
    operative: Operative
    spy_master: SpyMaster
