from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# Configuration for the backend API URL
API_BASE_URL = "http://localhost:5000/api"

# Fetch all listings
@app.route('/fetchListings', methods=['GET'])
def fetch_listings():
    try:
        response = requests.get(f"{API_BASE_URL}/listings")
        response.raise_for_status()  # Raise an exception for HTTP errors
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        print(f"Error fetching listings: {e}")
        return jsonify({"error": "Failed to fetch listings"}), 500

# Fetch a listing by ID
@app.route('/fetchListingById/<string:id>', methods=['GET'])
def fetch_listing_by_id(id):
    try:
        response = requests.get(f"{API_BASE_URL}/listings/{id}")
        response.raise_for_status()
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        print(f"Error fetching listing by ID: {e}")
        return jsonify({"error": f"Failed to fetch listing with ID {id}"}), 500

# Add a new listing
@app.route('/addListing', methods=['POST'])
def add_listing():
    try:
        listing_data = request.json
        headers = {'Content-Type': 'application/json'}
        response = requests.post(f"{API_BASE_URL}/listings", json=listing_data, headers=headers)
        response.raise_for_status()
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        print(f"Error adding listing: {e}")
        return jsonify({"error": "Failed to add listing"}), 500

if __name__ == '__main__':
    app.run(port=3001)  # You can set a port number that doesn't conflict with your backend
