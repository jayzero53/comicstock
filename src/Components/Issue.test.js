import { shallow } from 'enzyme';
import expect from 'chai';
import ReactDOM from 'react-dom';
import React from 'react';

import { BigComic, Issue } from './Issue';

// eslint-disable-next-line no-undef
// it('Issue renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Issue />, div);
// });

// eslint-disable-next-line no-undef
it('Issue with no images', () => {
  const wrapper = shallow(<Issue thumbnail={{ pathIncludingExtension: '' }} />);
  expect(wrapper.find(<img alt="thumbnail" />)).to.have.length(1);
});

// eslint-disable-next-line no-undef
// it('BigComic renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<BigComic />, div);
//
//   // const wrapper = shallow(<BigComic images={[]} />);
//   // expect(wrapper.find({<img/>})).to.have.length(3);
// });
