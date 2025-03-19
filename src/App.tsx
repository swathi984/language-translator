import React, { useState } from 'react';
import { Languages, ArrowRight, RotateCcw } from 'lucide-react';

const LANGUAGES = {
  en: 'English',
  hi: 'Hindi',
  te: 'Telugu',
  ta: 'Tamil',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ru: 'Russian',
  zh: 'Chinese'
};

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('hi');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText
        )}&langpair=${fromLang}|${toLang}`
      );
      const data = await response.json();
      setOutputText(data.responseData.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setOutputText('Translation error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Languages className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Language Translator</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              className="w-40 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {Object.entries(LANGUAGES).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>

            <button
              onClick={swapLanguages}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>

            <select
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
              className="w-40 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {Object.entries(LANGUAGES).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-48 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <textarea
                value={outputText}
                readOnly
                placeholder="Translation will appear here..."
                className="w-full h-48 p-4 rounded-lg bg-gray-50 border border-gray-300 resize-none"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Translating...' : 'Translate'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Powered by MyMemory Translation API
        </p>
      </div>
    </div>
  );
}

export default App;