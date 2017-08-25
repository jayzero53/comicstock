import { shallow } from 'enzyme';
import expect from 'chai';
import ReactDOM from 'react-dom';
import React from 'react';

import ComicIssuesContainer from './Issues';

// eslint-disable-next-line no-undef
it('BigComic renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ComicIssuesContainer />, div);

  // const wrapper = shallow(<BigComic images={[]} />);
  // expect(wrapper.find({<img/>})).to.have.length(3);
});
