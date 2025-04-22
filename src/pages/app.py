from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/searchUser', methods=['POST'])
def search_user():
    try:
        data = request.get_json()
        if not data or 'userId' not in data:
            return jsonify({"error": "userId is required"}), 400

        # Convert userId to integer for comparison
        user_id = int(data['userId'])

        # Check if file is accessible
        try:
            with open('data.json') as f:
                users = json.load(f)
        except Exception as e:
            return jsonify({"error": f"Error reading data.json: {str(e)}"}), 500

        # Search for the user by userId
        user = next((item for item in users if item['user id'] == user_id), None)

        if user:
            # Save user details to a text file
            with open('user_details.txt', 'w') as file:
                for key, value in user.items():
                    file.write(f"{key}: {value}\n")

            return jsonify(user), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route('/api/saveWeldGunDetails', methods=['POST'])
def save_weld_gun_details():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Write the data to a text file
        with open('weld_gun_details.txt', 'w') as file:
            for key, value in data.items():
                file.write(f"{key}: {value}\n")

        return jsonify({"message": "Weld Gun details saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
