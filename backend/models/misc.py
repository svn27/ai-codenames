from pydantic import BaseModel
from typing import List

class SpymasterRequest(BaseModel):
    all_words: List[str]
    ai_words: List[str]
    
class SpymasterRequest(BaseModel):
    all_words: List[str]
    ai_words: List[str]
    
class OperatorRequest(BaseModel):
    all_words: List[str]
    spymaster_word: str
    goes: int