import fastapi
import uvicorn
from bullshit_oil_generator import generate_bullshit_oil

app = fastapi.FastAPI()

@app.get("/bullshit_oil")
async def _(length: int = 80, name: str = None, class_: str = None, event: str = None):
    return generate_bullshit_oil(length, name, class_, event)