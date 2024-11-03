import requests

# Define the API URL
listing_id = "your_listing_id_here"
api_url = f"http://localhost:5000/api/listings/{listing_id}"

# Send a DELETE request to delete the listing
response = requests.delete(api_url)

# Check if the request was successful
if response.status_code == 200:
    print(f"Listing with ID {listing_id} deleted successfully.")
else:
    print(f"Failed to delete listing. Status code: {response.status_code}")
    print("Error:", response.json())
