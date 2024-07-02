import uvicorn

if __name__ == "__main__":
    uvicorn.run("source.service:service", host="0.0.0.0", port=8000, reload=True)