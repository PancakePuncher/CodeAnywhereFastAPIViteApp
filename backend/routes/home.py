from fastapi import APIRouter

router = APIRouter(
    tags=["Root Route"]
)

@router.get("/")
async def root():

    return "This is where all my apps will go..."