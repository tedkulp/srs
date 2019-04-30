import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { actions, loadVocabItems, getNewItem } from './redux';
import { store } from '../store';

import Wanakana from '../common/wanakana';

class ReviewsMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'input',
    };
    this.moveToNextWord = this.moveToNextWord.bind(this);
    this.handleCorrectWord = this.handleCorrectWord.bind(this);
  }

  componentDidMount() {
    return this.props.dispatch(loadVocabItems()).then(() => {
      return this.props.dispatch(getNewItem(store));
    });
  }

  onTextInputSubmit(text) {
    const { currentItem } = this.props;

    if (currentItem.language === 'japanese') {
      if (text === currentItem.data['vocab-kana']) {
        this.handleCorrectWord();
      } else {
        this.setState({mode: 'incorrect'});
      }
    } else {
      const possibleWords = _.split(currentItem.data['vocab-translation'], /[,;] ?/);
      if (_.find(possibleWords, t => t.toLowerCase() === text.toLowerCase())) {
        this.handleCorrectWord();
      } else {
        this.setState({mode: 'incorrect'});
      }
    }
  }

  handleCorrectWord() {
    const { currentItem, dispatch } = this.props;

    dispatch(actions.removeItem(currentItem));
    return dispatch(getNewItem(store));
  }

  numberOfWordsRemaining() {
    return _.uniqBy(this.props.vocabItems, item => {
      return item.data._id;
    }).length;
  }

  moveToNextWord(evt) {
    const { dispatch } = this.props;

    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();

    this.setState({mode: 'input'});
    return dispatch(getNewItem(store));
  }

  render() {
    const { currentItem } = this.props;
    return (
      <div>
      <div className="row">
        <div className="col-md-12">
          Current Count: {this.numberOfWordsRemaining()} ({ this.props.vocabItems.length })
        </div>
      </div>
      {this.props.currentItem && (
        <div className="row">
        <div className="col-md-4 offset-md-4">
            <h3>{currentItem.data.vocab} ({currentItem.data['vocab-kana']}) ({currentItem.data['vocab-translation']})</h3>
            {this.state.mode === 'input' && (
              <Wanakana onInputSubmit={this.onTextInputSubmit.bind(this)} translate={currentItem.language === 'japanese'} />
            )}
            {this.state.mode === 'incorrect' && (
              <p>
                {currentItem.language === 'japanese' && (
                  <span>
                    Correct: <strong>{ currentItem.data['vocab-kana'] }</strong><br />
                  </span>
                )}
                {currentItem.language === 'english' && (
                  <span>
                    Correct: <strong>{ currentItem.data['vocab-translation'] }</strong><br />
                  </span>
                )}
                <a href="#" onClick={e => this.moveToNextWord(e)}>Next Word</a>
              </p>
            )}
          </div>
        </div>
      )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vocabItems: state.reviews.vocabItems,
    loading: state.reviews.loading,
    currentItem: state.reviews.currentItem,
  };
}

export default connect(mapStateToProps)(ReviewsMain);