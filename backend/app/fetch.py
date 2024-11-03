import requests

# Define the API URL
api_url = "http://localhost:5000/api/listings"

# Send a GET request to fetch all listings
response = requests.get(api_url)

# Check if the request was successful
if response.status_code == 200:
    listings = response.json()
    print("Listings fetched successfully:")
    print(listings)
else:
    print(f"Failed to fetch listings. Status code: {response.status_code}")
    print("Error:", response.json())
