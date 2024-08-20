from flask import Flask, request, jsonify
from flask_cors import CORS 
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lex_rank import LexRankSummarizer

app = Flask(__name__)
CORS(app)

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = LexRankSummarizer()
    summary = summarizer(parser.document, 5)
    
    summarized_text = ' '.join(str(sentence) for sentence in summary)
    
    return jsonify({'summary': summarized_text})

if __name__ == '__main__':
    app.run(debug=True)
