import requests

# Define the API URL
listing_id = "your_listing_id_here"
api_url = f"http://localhost:5000/api/listings/{listing_id}"

# Define the updated listing data
updated_listing = {
    "title": "Updated Apartment",
    "description": "An updated description of the apartment.",
    "amenities": ["Updated Pool", "Updated Gym", "Updated WiFi"],
    "price": "USD 1600 per month",
    "location": "New York, USA",
    "rating": 4.9
}

# Send a PUT request to update the listing
response = requests.put(api_url, json=updated_listing)

# Check if the request was successful
if response.status_code == 200:
    listing = response.json()
    print(f"Listing with ID {listing_id} updated successfully:")
    print(listing)
else:
    print(f"Failed to update listing. Status code: {response.status_code}")
    print("Error:", response.json())
