from datetime import datetime, timezone
from sqlmodel import Field, Relationship, SQLModel


class VideosCreate(SQLModel):
    titulo: str
    descripcion: str = ""
    categoria: str
    source: str          
    thumbnail: str       
    es_publico: bool = True


class Videos(VideosCreate, table=True):
    id: int | None = Field(default=None, primary_key=True)
    comments: list["Comments"] = Relationship(
        back_populates="video", cascade_delete=True
    )


class CommentsCreate(SQLModel):
    autor: str
    texto: str


class Comments(CommentsCreate, table=True):
    id: int | None = Field(default=None, primary_key=True)
    video_id: int = Field(foreign_key="videos.id")
    creado: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    video: Videos | None = Relationship(back_populates="comments")