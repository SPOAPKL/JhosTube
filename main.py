from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import videos
from db import create_all_table

app = FastAPI(title="API Videos", lifespan=create_all_table)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(videos.router)

@app.get("/")
def root():
    return {"hello": "world"}