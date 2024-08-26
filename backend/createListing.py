import requests

# Define the API URL
api_url = "http://localhost:5000/api/listings"

# Define the listing data
new_listing = {
    "title": "New Apartment",
    "description": "A new modern apartment.",
    "amenities": ["Pool", "Gym", "WiFi"],
    "price": "USD 1500 per month",
    "location": "New York, USA",
    "rating": 4.8
}

# Send a POST request to create a new listing
response = requests.post(api_url, json=new_listing)

# Check if the request was successful
if response.status_code == 201:
    created_listing = response.json()
    print("Listing created successfully:")
    print(created_listing)
else:
    print(f"Failed to create listing. Status code: {response.status_code}")
    print("Error:", response.json())
