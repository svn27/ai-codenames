from models import BoardWord


bw = BoardWord(
    word="test",
    used=False,
    role="red"
)

print(bw.model_dump())