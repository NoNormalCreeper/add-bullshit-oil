import fastapi
from fastapi.responses import HTMLResponse
import uvicorn
from bullshit_oil_generator import generate_bullshit_oil

app = fastapi.FastAPI()

@app.get("/bullshit_oil")
async def _(length: int = 80, name: str = None, class_: str = None, event: str = None):
    return generate_bullshit_oil(length, name, class_, event)


@app.get("/", response_class=HTMLResponse)
async def _():
    return open("index.html", encoding="utf-8").read()