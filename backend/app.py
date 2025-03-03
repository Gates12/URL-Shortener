from flask import Flask, request, jsonify, redirect
import redis
import validators
import random
import string
from db import redis_client  # Import from db.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Generate a unique short URL
def generate_short_url():
    while True:
        short_url = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
        if not redis_client.exists(short_url):  # Ensure uniqueness
            return short_url

# Endpoint to shorten a URL
@app.route("/shorten", methods=["POST"])
def shorten_url():
    data = request.json
    long_url = data.get("long_url")

    if not long_url or not validators.url(long_url):
        return jsonify({"error": "Invalid URL"}), 400  # Send "Invalid URL" message

    # Check if URL already exists in Redis
    existing_short_url = redis_client.get(long_url)
    if existing_short_url:
        # No need to decode if it's already a string
        return jsonify({"short_url": existing_short_url})

    # Generate a new short URL
    short_url = generate_short_url()
    
    # Store mappings in Redis
    redis_client.set(short_url, long_url)
    redis_client.set(long_url, short_url)  # Store long_url to short_url mapping for quick lookup
    redis_client.set(f"count:{short_url}", 0)  # Initialize access count

    return jsonify({"short_url": short_url})

# Endpoint to redirect short URL to original URL
@app.route("/<short_url>")
def redirect_to_long(short_url):
    long_url = redis_client.get(short_url)
    if long_url:
        redis_client.incr(f"count:{short_url}")  # Increment access count
        return redirect(long_url)
    return jsonify({"error": "Short URL not found"}), 404

# Endpoint to get access count for a short URL
@app.route("/stats/<short_url>")
def get_stats(short_url):
    access_count = redis_client.get(f"count:{short_url}")
    
    if access_count is not None:
        return jsonify({"access_count": int(access_count)})  # Return access count as integer
    return jsonify({"error": "Short URL not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
