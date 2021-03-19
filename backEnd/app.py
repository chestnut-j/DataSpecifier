from flask import Flask, jsonify, request
from flask_cors import CORS

import csv, nltk
import os
from difflib import SequenceMatcher 




def preprocess_data(tree): 
    slist = []
    for sub in tree:
        if sub.label() == 'sub':
            for subsub in sub.subtrees():
                if subsub.label() == 'head':
                    slist.append(subsub.leaves()[0][0])

    substr = long_substr(slist)
    return substr
    

def long_substr(data):
    substr = ''
    if len(data) > 1 and len(data[0]) > 0:
        for i in range(len(data[0])):
            for j in range(len(data[0])-i+1):
                if j > len(substr) and all(data[0][i:i+j] in x for x in data):
                    substr = data[0][i:i+j]
    return substr





app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/origin',methods=['GET', 'POST'])
def get_origin_data():
    with open('./data/crime.csv', 'r') as f:
        reader = csv.reader(f)
        list1 = []
        for sentences in reader:
            list1.append(sentences)
        return jsonify(list1)

@app.route('/relation',methods=['GET', 'POST'])
def data_extration():
    # nltk.download('averaged_perceptron_tagger')
    with open('./data/crime.csv', 'r') as f:
        reader = csv.reader(f)

    # reader = request.get_data()
    # reader = request.get_data()
    # data = request.get_json(silent=True)
    # print(data)
    # print(data['rawData'])
    # print(reader)
        grammar = r"""
            head: {<NP>|<NN>|<JJ>|<NNP>|<VBG>+}
            line: {<CD>} 
            content: {<line>*}
            sub: {<head><content>}
        """
        cp = nltk.RegexpParser(grammar)
        list1 =  []
        for sentences in reader:
            if len(sentences) > 1:
                sentences= [','.join(sentences)]
            list1.extend(sentences)

        sent = nltk.pos_tag(list1)
        
        tree = cp.parse(sent)
        # print(tree)

        substr = preprocess_data(tree)

        tlist =[]

        for sub in tree:
            if sub.label() == 'sub':
                for subsub in sub.subtrees():
                    if subsub.label() == 'head':
                        tup1 = (subsub.leaves()[0][0].replace(substr,''),)
                    if subsub.label() == 'content':
                        for line in subsub.subtrees():
                            if line.label() == 'line':
                                tup2 = tuple(eval(line.leaves()[0][0]))
                                tup3 = tup1 + tup2
                                tlist.append(tup3)
    # print(tlist)

    return jsonify(tlist)
    # return jsonify(data)

if __name__ == '__main__':
    app.run()