from sqlalchemy import Column, BigInteger, SmallInteger, String, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class InGameTreausre(Base):
    __tablename__ = 'InGameTreausre'

    igt_id = Column(BigInteger, primary_key=True, autoincrement=True)
