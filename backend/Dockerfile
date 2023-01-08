FROM python:3.10

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

ADD . /backend

RUN pip install -r /backend/requirements.txt


EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]