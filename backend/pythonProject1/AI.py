from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)
client = OpenAI(api_key="sk-proj-9I0cvyl6bXD1Fh4z2CD7T3BlbkFJf2nCWiIEhYhra1VoUszy")

@app.route('/')
def home():
    return "Hello! How can I assist you today?"

@app.route('/api/ask', methods=['POST'])
def ask_ai():
    message = request.json['message']
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={ "type": "json_object" },
        messages=[
            {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
            {"role": "user", "content": message}
        ]
    )
    response_content = response.choices[0].message.content
    str_response = str(response_content)
    clean_response = str_response.replace("{", "").replace("}", "").replace("\"", "").replace("'", "")
    return jsonify(clean_response)

if __name__ == '__main__':
    app.run(debug=True)