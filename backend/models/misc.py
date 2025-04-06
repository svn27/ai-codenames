from pydantic import BaseModel
from typing import List

class RawWords(BaseModel):
    words: List[str]