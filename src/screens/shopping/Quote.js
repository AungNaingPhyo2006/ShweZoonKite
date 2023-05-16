import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Clipboard,
  Linking,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Translate} from 'translate';

const Quote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const randomQuote = () => {
    setLoading(true);
    setQuote('Loading Quote...');
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => {
        setQuote(data.content);
        setAuthor(data.author);
        setLoading(false);
      });
  };

  const translateToMyanmar = async text => {
    try {
      const translate = new Translate();
      const translatedText = await translate.text(text, {to: 'my'});
      console.log(translatedText); // Display the translated text
      Alert.alert(translatedText);
    } catch (error) {
      console.log('Error translating text:', error);
    }
  };
  translateToMyanmar();

  const speakQuote = () => {
    const textToSpeak = `${quote} by ${author}`;
    translateToMyanmar(textToSpeak);
  };

  const copyQuote = () => {
    Clipboard.setString(quote);
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?url=${quote}`;
    Linking.openURL(tweetUrl);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'pink', marginTop: 15}}>
      <Text style={{paddingVertical: 15, marginHorizontal: 15, fontSize: 18}}>
        {quote}
      </Text>
      <Text style={{paddingVertical: 15, alignSelf: 'center'}}>{author}</Text>
      <Button title="New Quote" onPress={randomQuote} disabled={loading} />

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 25,
          justifyContent: 'space-between',
          marginHorizontal: 15,
        }}>
        <TouchableOpacity onPress={speakQuote}>
          <Text>Sound</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={copyQuote}>
          <Text>Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={tweetQuote}>
          <Text>Twitter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Quote;

const styles = StyleSheet.create({});
