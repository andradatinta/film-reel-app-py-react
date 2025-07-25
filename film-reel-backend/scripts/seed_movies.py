import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database import create_movies_table
from app.seed import seed_movies

import asyncio


async def main():
    create_movies_table()
    await seed_movies(pages_to_fetch=5)


if __name__ == "__main__":
    asyncio.run(main())
