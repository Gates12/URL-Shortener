const API_URL = "http://127.0.0.1:5000";  // Backend URL

// Function to shorten a URL
async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const shortUrlRow = document.getElementById("shortUrlRow");
    const generatedShortUrl = document.getElementById("generatedShortUrl");

    // Hide previous result and reset access count display
    shortUrlRow.style.display = "none";  
    document.getElementById("accessCountRow").style.display = "none";  // Hide the access count row
    document.getElementById("accessCountResult").innerText = "";
    //document.getElementById("longUrl").value = "";  // Clear the input box
    document.getElementById("accessCountRow").value = "";  // Clear the input box
    document.getElementById("shortUrl").value = ""; 

    if (!longUrl.trim()) {
        alert("Please enter a valid URL.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/shorten`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ long_url: longUrl })  // Match the backend key
        });

        const data = await response.json();

        if (response.ok && data.short_url) {
            // If the URL is valid, display the shortened URL
            const fullShortUrl = `${API_URL}/${data.short_url}`;
            generatedShortUrl.href = fullShortUrl;  // Set the link
            generatedShortUrl.innerText = fullShortUrl;  // Display the link text
            shortUrlRow.style.display = "block";  // Show result
        } else {
            // If there's an error, display the error message as plain text
            generatedShortUrl.removeAttribute("href");  // Remove href attribute to prevent it from being clickable
            generatedShortUrl.style.color = "black";  // Optionally, change text color to make it clear it's an error
            generatedShortUrl.innerText = data.error || "Failed to shorten URL.";  // Display the error message
            shortUrlRow.style.display = "block";  // Show error message

        }
    } catch (error) {
        // Handle network or other errors
        generatedShortUrl.href = "#";  // Disable the link
        generatedShortUrl.innerText = "Error occurred while shortening the URL.";
        shortUrlRow.style.display = "block";  // Show error message
    }
}

// Function to get access count for a short URL
async function getAccessCount() {
    const shortUrl = document.getElementById("shortUrl").value.trim();
    const accessCountRow = document.getElementById("accessCountRow");
    const accessCountResult = document.getElementById("accessCountResult");

    

  

    if (!shortUrl) {
        alert("Please enter a valid short URL.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/stats/${shortUrl}`);

        const data = await response.json();

        if (response.ok && data.access_count !== undefined) {
            // If access count is found, display it
            accessCountResult.innerText = data.access_count;
            accessCountRow.style.display = "block";  // Show the access count
        } else {
            // If there's an error or invalid short URL, display the error message
            accessCountResult.innerText = data.error || "Failed to fetch access count.";
            accessCountRow.style.display = "block";  // Show the error message
        }
    } catch (error) {
        // Handle any network or unexpected errors
        accessCountResult.innerText = "Error occurred while fetching access count.";
        accessCountRow.style.display = "block";  // Show the error message
    }
}
