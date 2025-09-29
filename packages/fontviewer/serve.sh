#!/bin/bash
# Check if http-server is installed
if ! command -v http-server &> /dev/null; then
    echo "http-server is not installed. Installing now..."
    npm install -g http-server
fi

# Setup variables for platform independence and host specificity
OS=$(uname -s)
export OS

# Start server with caching disabled and CORS enabled
echo "Starting server with caching disabled..."

http-server -c-1 --cors --silent &

# Wait for the port to become available
while ! nc -z localhost 8080; do
    sleep 0.1
done


        # URL to open
        URL="http://localhost:8080"

        # Open URL based on platform
        if [[ "$OS" == "Darwin" ]]; then
            # macOS
            open "$URL"
        elif [[ "$OS" == "Linux" ]]; then
            # Linux
            xdg-open "$URL"
        elif [[ "$OS" == "CYGWIN"* ]] || [[ "$OS" == "MINGW"* ]] || [[ "$OS" == "MSYS"* ]]; then
            # Windows
            start "$URL"
        else
            echo "Unknown OS. Please open $URL manually in your browser."
        fi

        echo "Server running at $URL"
        echo "Press Ctrl+C to stop the server"

        # Wait for server to be stopped
        wait
